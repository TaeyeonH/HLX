// pages/poi_list/poi_list.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    type:null,
    id:null,
    pois:null,
    poiType:'all',
    start:0,
    loading:false,
    hasMore:true,
    windowWidth:app.systemInfo.windowWidth,
    windowHeight:app.systemInfo.windowHeight,
    pixelRatio:app.systemInfo.pixelRatio
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that = this;
     var type = options.type;
     var id = options.id;
     var name = options.name;
     wx.showToast({
       title: 'Loading...',
       icon:'loading',
       duration:10000,
     });
     this.setData({
       title:name,
       type,
       id,
     });
     wx.setNavigationBarTitle({
       title: name,
     });
     wx.getSystemInfo({
       success: function(res) {
         that.setData({
           windowHeight:res.windowHeight
         })
       },
     })
     this.getPOIList(type,id,'all',true);
  },

  getPOIList:function(type,id,poiType,needFresh){
     that = this;
     var loading = that.data.loading;
     var hasMore = that.data.hasMore;
     if(loading || (!hasMore && !needFresh)){
       return;
     }
     that.setData({
       loading:true,
     });
     if(needFresh){
       that.setData({
         pois:[],
         start:0,
         hasMore:true
       });
     }
     var start = that.data.start; 
     util.getPlacePOIByID(type,id,poiType,start,function(data){
        var newList = data.items;
        if(needFresh){
          console.log('needFresh');
        }else{
          newList = that.data.pois.concat(newList); 
        }
        var nextStart = data.next_start;
        if(nextStart){
          that.setData({
            start:nextStart
          });
        }else{
          that.setData({
            hasMore:false
          })
        }
        that.setData({
          pois:newList,
          loading:false,
        });
        wx.hideToast();
     })
  },


  loadMore:function(){
     that = this;
     this.getPOIList(that.data.type,that.data.id,that.data.poiType,false);
  },

  changePOIType:function(ev){
     that = this;
     var poiType = ev.currentTarget.dataset.type;
     that.setData({
       poiType:poiType
     });
     console.log(that);
     this.getPOIList(that.data.type,that.data.id,poiType,true);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     that = this;
     wx.setNavigationBarTitle({
       title: that.data.title,
     })
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
  
  }
})