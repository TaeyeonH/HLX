// pages/destination/destination.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     windowWidth:app.systemInfo.windowWidth,
     windiwHeight:app.systemInfo.windowHeight,
     title:'',
     pois:null,
     info:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that = this;
     //拿到explore.js传来的type,id,name
     var id = options.id;
     var type = options.type;
     var name = options.name;
     wx.showToast({
       title: 'Loading...',
       icon:'loading',
       duration:10000
     });
     that.setData({
       title:name
     });
     util.getPlaceInfoByID(id,type,function(data){
        that.setData({
          info:data
        })
     });
    that.getPOI(type,id);
  },
  
  getPOI:function(type,id){
     that = this;
     var poiType = 'all';
     var start = ''
     util.getPlacePOIByID(type,id,poiType,start,function(data){
       var pois = data.items;
       that.setData({
         pois:pois
       });
       wx.hideToast();
     })
  },
  
  viewPOIList:function(){
    that = this;
    wx.navigateTo({
      url: '../poi_list/poi_list?type='+that.data.info.type+'&id='+that.data.info.id+'&name='+that.data.title,
    })
  },

  viewTripList:function(){
     that = this;
     wx.navigateTo({
       url: '../trip_list/trip_list?type='+that.data.info.type+'&id='+that.data.info.id+'&name='+that.data.title,
     })
  },

  loadMorePic:function(){
      that = this;
      wx.navigateTo({
        url: '../photo_list/photo_list?type='+that.data.info.type+'&id='+that.data.info.id,
      })
  },

  viewDescription:function(ev){
    var ds = ev.currentTarget.dataset;
    console.log(ev);
    wx.navigateTo({
      url: '../place_list/place_list?type=' + ds.type + '&id=' + ds.id,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
     that = this;
     wx.setNavigationBarTitle({
       title: that.data.title,
     });
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