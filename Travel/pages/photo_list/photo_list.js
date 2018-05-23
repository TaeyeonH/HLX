// pages/photo_list/photo_list.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    windowHeight:app.systemInfo.windowHeight,
    widowWidth: app.systemInfo.widowWidth,
    text:null,
    photos:null,
    start:0,
    count:20,
    gallery_mode:true,
    id: null,
    type: null, 
    pixelRatio: app.systemInfo.pixelRatio,
    loading: false,
    hasMore: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    var id = options.id;
    var type = options.type;
    wx.showToast({
      title: 'Loading',
      icon:'loading',
      duration:10000,
    });
    var start = that.data.start;
    var count = that.data.count;
    var gallery_mode = true;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight:res.windowHeight,
          windowWidth:res.windowWidth
        })
      },
    })
    that.setData({
      type:type,
      id:id
    })
    this.getPhoto(type,id,start,count,gallery_mode,true);
  },

  getPhoto:function(type,id,start,count,gallery_mode,needFresh){
    that = this;
    var loading = that.data.loading;
    var hasMore = that.data.hasMore;
    if(loading && (!hasMore && !needFresh)){
      return;
    } 
    that.setData({
      loading:true
    }); 
    if(needFresh){
      that.setData({
        photos:[],
        start:0,
        hasMore:true
      })
    }
    var start = that.data.start;
    util.getMorePhoto(type,id,start,count,gallery_mode,function(data){
    var pho = data.items;
     if(needFresh){
       console.log('needFresh');
     }else{
       pho = that.data.photos.concat(pho);
     }
     console.log(data);
     var next_start = data.next_start;
     if(next_start){
       that.setData({
         start:next_start
       })
     }else{
       that.setData({
         hasMore:false
       })
     }
     that.setData({
       photos:pho,
       loading:false
     });
     wx.hideToast();
    })
  },  


  loadMore:function(){
     that = this;
     that.getPhoto(that.data.type,that.data.id,that.data.start,that.data.count,that.data.gallery_mode,false);
  },  


  previewImage: function (ev) {
    var url = ev.currentTarget.dataset.src;
    wx.previewImage({
      current: url,
      urls: [url],
    })
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
  
  }
})