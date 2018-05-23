// pages/picture/picture.js
var http = require('../../utils/util.js');
var app = getApp();
var url = 'http://japi.juhe.cn/joke/img/text.from'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    hideFooter: true,
    loadingHide: true,
    picList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      http.request( url,this.data.page,function(dataJson){
          that.setData({
            picList:that.data.picList.concat(dataJson.result.data),
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
      hideFooter: !this.data.hideFooter
    })
    http.request(url, ++this.data.page, function (dataJson) {
      that.setData({
        picList: that.data.picList.concat(dataJson.result.data),
        hideFooter: !that.data.hideFooter
      })
    }, function (reason) {
      that.setData({
        hideFooter: !that.data.hideFooter
      })
    })
  },
 
})