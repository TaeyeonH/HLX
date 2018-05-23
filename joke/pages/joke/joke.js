// pages/joke/joke.js
var http = require('../../utils/util.js');
var app = getApp();
var url = 'http://japi.juhe.cn/joke/content/text.from'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     page:1,
     hideFooter:true,
     loadingHide:false,
     jokeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this;
     http.request(url,this.data.page,function(dataJson){
       that.setData({
         jokeList:that.data.jokeList.concat(dataJson.result.data),
         loadingHide:true,
       })
     },function(reason){
       that.setData({
         loadingHide:true
       })
     })
  },


  loadMore:function(){
      var that = this
      this.setData({
          hideFooter:!this.data.hideFooter
      })
      http.request(url,++this.data.page,function(dataJson){
        that.setData({
          jokeList: that.data.jokeList.concat(dataJson.result.data),
          hideFooter:!that.data.hideFooter
        })
      },function(reason){
         that.setData({
             hideFooter:!that.data.hideFooter
         })
      })
  }, 
  
  onPullDownRefresh() {
    var that = this
    this.setData( {
      page: 1,
      jokeList:[]
    })
    http.request( url, this.data.page, function( dataJson ) {
      that.setData( {
        jokeList: that.data.jokeList.concat( dataJson.result.data )
      })
      wx.stopPullDownRefresh()
    }, function( reason ) {
      console.log( reason )
      wx.stopPullDownRefresh()
    })
  },

})

