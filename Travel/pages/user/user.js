// pages/user/user.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_info:null,
    trips:[],
    windowWidth:app.systemInfo.windowWidth,
    windowHeight:app.systemInfo.windowHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that = this;
     console.log(options);
     var userId = options.id || that.data.userId;
     util.getUserInfoByID(userId,function(data){
       var trips = data.trips;
       trips.map((trip)=>{
         var item = trip;
         item.date_added = util.formatTime(new Date(item.date_added * 1000),1);
         return item;
       });
       that.setData({
         trips:trips,
         userId:data.userId,
         user_info:data.user_info
       });
       wx.setNavigationBarTitle({
         title: data.user_info.name,
       }); 
     });
  },


  viewTrip:function(ev){
     var ds = ev.currentTarget.dataset;
     wx.navigateTo({
       url: '../trip/trip?id='+ds.id+'&name='+ds.name,
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