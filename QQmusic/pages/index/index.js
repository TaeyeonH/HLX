// pages/index/index.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     navbar:[
       'Recommend','Ranking-List','Search'
     ],
     currentTab:0,
     slider:[],
     radioList:[],
     songList:[],
     topList:[],
     scrollviewH:0,

     inputFocus: false, // 搜索框是否获取焦点
     searchKeyword: "Apink", // 搜索关键词
     searchHotShow: true, // 是否显示热门搜索
     searchHistoryShow: false, // 是否显示搜索历史
     searchResultShow: false, // 是否显示搜索结果
     searchCancelShow: false, // 是否显示取消按钮

     searchHistorys: [], // 搜索历史记录
     searchSongList: [], // 搜索结果
     searchPageNum: 1, // 分页数
     searchLoading: false, // 加载更多
     searchLoadingComplete: false, // 加载更多结束
     scrollFlag: true, // 上拉分页加载条件

     searchPageSize: 0, // 每页多少
     searchTotalNum: 0, // 结果总条数
     scrollToView: 'scrollTop', // 返回顶部位置
     backToTop: false, // 返回顶部
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;
      wx.showLoading({title:'Loading...',mask:true});
      util.getRecommend(function(data){
        wx.hideLoading();
        that.setData({slider:data.data.slider, radioList:data.data.radioList, songList:data.data.songList});
      });
      util.getToplist(function(data){
        that.setData({
          topList:data.filter((item,i)=>item.id != 201)
        });
      });
      util.getHotSearch(function(data){
        that.setData({hotkey:data.data.hotkey, special:data.data.special_key});
      })

      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            scrollviewH:res.windowHeight - 90
          })
        },
      })

      //本地查询是否缓存 取10首
      var searchHistorys = wx.getStorageSync('searchHistorys') || [];
      if(searchHistorys.length > 0){
        that.setData({
           searchHistorys:searchHistorys.length >= 10 ?
           searchHistorys.slice(0,10):searchHistorys
        })
      }   
  },

  onNavbarTap:function(ev){
    that.setData({ currentTab: ev.currentTarget.dataset.index})
  },

  onSearchInput:function(ev){
     that.setData({searchKeyword:ev.detail.value});
  },
  onSearchFocus:function(ev){
     var searchKeyword = that.data.searchKeyword;
     if(searchKeyword.trim()){
       that.setData({searchHotShow:false,searchHistoryShow:false,searchResultShow:true,searchCancelShow:true});
     }else{
       that.setData({searchHotShow:false,searchHistoryShow:true,searchResultShow:false,searchCancelShow:true})
     }
  },
  onSearchCancel:function(ev){
    that.setData({
      searchHotShow:true,
      searchHistoryShow:false,
      searchResultShow:false,
      searchCancelShow:false,
      searchKwyword:'',
      inputFocus:false
    })
  },

  onClearInput:function(){
    that.setData({
      searchHotShow: false,
      searchHistoryShow: true,
      searchResultShow: false,
      searchCancelShow: true,
      searchKeyword: '',
      inputFocus: true
    })
  },

  onSearchConfirm:function(ev){
    var searchKeyword = ev.detail.value;
    var searchHistorys = that.data.searchHistorys;
    that.setData({
      searchKeyword:searchKeyword
    });
    if(searchKeyword.trim()){
        if(searchHistorys.length > 0){
          if(searchHistorys.indexOf(searchKeyword) < 0){
             searchHistorys.unshift(searchKeyword);
          }
        }else{
          searchHistorys.push(searchKeyword);
        }
    wx.setStorage({
      key: 'searchHistorysKey',
      data: searchHistorys,
      success:function(res){
        that.setData({searchHistorys:searchHistorys})
      }
    });
        that.setData({searchHotShow:false,searchHistoryShow:false,searchResultShow:true,searchSongList:[]});
        this.onFetchSearchList(1);
    }
  },

  onFetchSearchList: function (searchPageNum){
     var searchKeyword = that.data.searchKeyword;
     that.setData({searchLoading:true,scrollFlag:false});
     util.getSearchMusic(searchKeyword,searchPageNum,function(res){
       var res = res.data;
       that.setData({
         searchSongList:that
         .data
         .searchSongList
         .concat(res.song.list),
         zhida: res.zhida,
         searchLoading: false,
         searchPageNum: res.song.curpage,
         searchTotalNum: res.song.totalnum,
         searchPageSize: res.song.curnum,
         scrollFlag: true
       })
     })  
  },

  onSearchHistoryDelete:function(ev){
     var item = ev.currentTarget.dataset.item;
     var searchHistorys = wx.getStorageInfoSync('searchHistorysKey');
     searchHistorys.splice(searchHistorys.indexOf(item),1);
     wx.setStorage({
       key: 'searchHistorysKey',
       data:searchHistorys,
       success:function(){
         that.setData({ searchHistorys: searchHistorys});
       }
     });
  },

  onSearchHistoryDeleteAll:function(ev){
    wx.removeStorage({
      key: 'searchHistorysKey',
      success: function(res) {
        that.setData({ searchHistorys: []})
      },
    })
  },

  onScrollLower:function(){
      if(that.data.scrollFlag){
        var num = that.data.searchPageNum + 1;
        var total = Math.ceil(that.data.searchTotalNum/that.data.searchPageSize);
        if(num > total){
          that.setData({searchLoadingComplete:true});
        }else{
          if(num == total){
            that.setData({searchLoading:false});
          }else{
            that.setData({searchLoading:false});
          }
        }
        that.setData({searchPageNum:num});
        that.onFetchSearchList(that.data.searchPageNum);
      }
  },

  onScroll:function(ev){
     var scrollTop = ev.detail.scrollTop;
     if(scrollTop > 500){
       that.setData({backToTop:true});
     }else{
       that.setData({backToTop:false});
     }
  },

  onBackToTop:function(){
    that.setData({scrollToView:'scrollTop',backToTop:false})
  },

  // 跳转到cdlist
  onCdlistTap: function (ev) {
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../cdlist/cdlist?cdListId=' + id
    });
  },
  // 跳到到toplist
  onToplistTap: function (ev) {
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../toplist/toplist?topListId=' + id
    });
  },
  // 热门搜索点击执行搜索
  onHotkeyTap: function (ev) {
    var word = ev.currentTarget.dataset.text;
    this.setData({
      searchSongList: [],
      searchHotShow: false,
      searchHistoryShow: false,
      searchResultShow: true,
      searchCancelShow: true,
      searchKeyword: ev
        .currentTarget
        .dataset
        .text
        .trim(),
      inputFocus: false
    });
    this.onFetchSearchList(1);
  },
  // 搜索结果跳到播放页
  onPlaysongTap: function (ev) {
    app.setGlobalData({ songData: ev.currentTarget.dataset.data });
    var id = ev.currentTarget.dataset.id;
    var mid = ev.currentTarget.dataset.mid;
    var albummid = ev.currentTarget.dataset.albummid;
    var songFrom = ev.currentTarget.dataset.from;
    wx.navigateTo({
      url: '../playsong/playsong?id=' + id + '&mid=' + mid + "&albummid=" + albummid + '&songFrom=' + songFrom
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
     return{
       title: 'Can you listen me?',
       path: '/page/index/index',
     }
  }
})