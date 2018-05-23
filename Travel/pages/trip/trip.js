// pages/trip/trip.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     trip:{},
     options:null,
     windowWidth:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;
      //拿到首页传过来的id
      var tripId = options.id;
      that.setData({
        options,
        windowWidth:app.systemInfo.windowWidth,
      });
      wx.showToast({
        title: 'Loading...',
        icon:'loading',
        duration:10000,
      })
      util.getTripInfoByID(tripId,function(data){
          var trip = data;
          that.setData({
            trip:trip,
          });
          wx,wx.hideToast();
      })
  },


  viewWaypoint:function(e){
      that = this;
      var ds = e.currentTarget.dataset;
      wx.navigateTo({
        url: '../waypoint/waypoint?waypointId='+ds.waypoint+'&tripId='+this.data.trip.id,
      })
  },

  gotoUser:function(e){
     var userId = e.target.dataset.id;
     wx.navigateTo({
       url: '../user/user?id='+userId,
     })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    that = this;
    wx.setNavigationBarTitle({
      title: that.data.options.name,
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