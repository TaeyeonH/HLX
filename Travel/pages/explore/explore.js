// pages/explore/explore.js
var app = getApp();
var util = require('../../utils/util.js');
var that = this;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     elements:[],
     windowWidth:app.systemInfo.windowWidth,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that = this;
     wx.showToast({
       title: 'Loading...',
       icon:'loading',
       duration:10000
     })
     util.getExplorePlaceList(function(data){
       var dest = data;
       that.setData({
         elements:dest.elements,
       });
       //隐藏提示框 在加载数据后
       wx.hideToast();
     })
  },


  viewPOI:function(ev){
      var data = ev.currentTarget.dataset;
      wx.navigateTo({
        url: '../destination/destination?type='+data.type+'&id='+data.id+'&name='+data.name,
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