// pages/waypoint/waypoint.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
     waypoint:null,
     replies:{
       comment_count:0,
       recommender_count:0,
       recommendets:[],
       comments:[]
     },
     title:'',
     windowWidth:0
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const that = this;
    console.log(that);
    //写在onReady中可以防止title变化后再变化成自己的标题 在页面初次渲染是拿不到onload中的title
    wx.setNavigationBarTitle({
      title: that.data.title,
    });
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     that = this;
    //  从trip.js 中的跳转传来 tripId 与 waypointId
     var tripId = options.tripId;
     var waypointId = options.waypointId;
     that.setData({
       windowWidth:app.systemInfo.windowWidth,
     });
     util.getWaypointInfoByID(tripId,waypointId,function(data){
        var waypiont = data;
        if(data){
          that.setData({
            title:waypiont.trip_name,
            waypoint:waypiont
          })
          if(waypiont.comments>0){
            that.getWaypointReplies(tripId,waypointId);
          }
        }
     })
  },

  getWaypointReplies:function(tripId,waypointId){
    that = this;
    util.getWaypointReplyByID(tripId, waypointId,function(data){
      var replies = data;
      replies.comments.map((reply)=>{
        var item = reply;
        item.date_added = util.formatTime(new Date(item.date_added * 1000),2);
        return item;
      })
      that.setData({
        replies:replies
      })
    }); 
  },

  //查看图片
  previewImage:function(ev){
    var url = ev.currentTarget.dataset.src;
     wx.previewImage({
       current:url,
       urls: [url],
     })
  },

  //查看会员
  gotoUser:function(ev){
     var userId = ev.target.dataset.id;
     wx.navigateTo({
       url: '../user/user?id='+userId,
     })
  },

})