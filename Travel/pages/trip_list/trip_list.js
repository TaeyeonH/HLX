// pages/trip_list/trip_list.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */

  data: {
     windowWidth:app.systemInfo.windowWidth,
     windowHeight:app.systemInfo.windowHeight,
     title:'',
     trips:[],
     id:null,
     type:null,
     start:0,
     loading:false,
     hasMore:true,
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
       title:'Loading...',
       icon:'loading',
       duration:10000
     });
     this.setData({
       title:name,
       type:type,
       id:id
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
     });
     this.getTrips(type,id);
  },

  getTrips:function(type,id){
     that = this;
     var loading = that.data.loading;
     var hasMore = that.data.hasMore;
     if(loading || !hasMore){
        return;
     } 
     that.setData({
       loading:true,
     });
     var start = that.data.start;
     util.getPlaceTripByID(type,id,start,function(data){
       var newList = data.data.items;
       if(newList.length >0){
         newList.map((trip) => {
           var item = trip;
           item.date_added = util.formatTime(new Date(item.date_added * 1000), 1);
           return item;
         });
         newList = that.data.trips.concat(newList);
         const nextStart = data.data.next_start;
         if (nextStart) {
           that.setData({
             start: nextStart,
           });
         } else {
           that.setData({
             hasMore: false,
           })
         }
         that.setData({
           trips: newList,
           loading: false,
         });
         wx.hideToast();
       }else{
         console.log(data);
         wx.showModal({
           title: '没有内容，等你探索',
           content: '等你探索',
         })
         wx.hideToast();
       }   
     })
  },

  loadMore:function(){
    that = this;
    this.getTrips(that.data.type,that.data.id);
  },

  viewTrip:function(e){
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../trip/trip?id='+ds.id+'&name='+ds.name,
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})