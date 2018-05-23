// pages/index/index.js
var app = getApp();
var util = require('../../utils/util.js');
var formatTime = util.formatTime;
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     trips:[],
     start:0,
     loading:false,
     windowWidth:app.systemInfo.windowWidth,
     windowHeight: app.systemInfo.windowHwight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.loadMore();
  },

  loadMore:function(e,needRefresh){
      that = this;
      var loading = that.data.loading;
      var next_start = that.data.start;
      if(loading){
        return;
      };
      that.setData({
        loading:true
      });
      util.getHotTripList(next_start,function(data){
         var newList = data.data.elements;
         newList.map((trip)=>{
           var item = trip;
           item.data[0].date_added = item.data[0].first_day; 
           return item;
         })
         if(needRefresh){
           wx.stopPullDownRefresh();
         }
         else{
           newList = that.data.trips.concat(newList);
         };
         that.setData({
           trips:newList,
         });
         var nextStart = data.data.next_start;
         that.setData({
           start:nextStart,
           loading:false
         });
      });
  },


  viewTrip:function(ev){
    var ds =ev.currentTarget.dataset;
    wx.navigateTo({
      url: '../trip/trip?id='+ds.id+'&name='+ds.name,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
     this.loadMore(null,true);
  },
  //下拉加载函数
  onReachBottom: function () {
    that = this;
    var next_start = that.data.start;
    util.getHotTripList(next_start, function (data) {
      var newList = data.data.elements;
      newList.map((trip) => {
        var item = trip;
        item.data[0].date_added = item.data[0].first_day;
        return item;
      })
      that.setData({
        trips: newList,
      });
      newList = that.data.trips.concat(newList);
      var nextStart = data.data.next_start;
      that.setData({
        start: nextStart,
      });
    });
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})