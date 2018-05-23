// pages/cdlist/cdlist.js
var util = require('../../utils/util.js');
var app = getApp();
var that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dissname:'',
      visitnum:0,
      nickname:'',
      songlist:[],
      foucusBg:'',
      listBgColor:'',
      songData:null,
      songlists:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      that = this;
      var id = options.cdListId;
      wx.showLoading({
        title: 'Loading Data...',
        mask:true
      })
      util.getCdlistInfo(id, function(data){
        wx.hideLoading();
        that.setData({
          songlists:data.songlist,
          songData:data,
          dissname:data.dissname,
          nickname:data.nickname,
          visitnum:data.visitnum,
          songlist:data.songlist,
          focusBg:data.logo,
          listBgColor:that.dealColor(data.logo)
        });
      });
  },

  dealColor:function(pic_url){
    util.calculateBgColor(pin_url,function(data){
      var magic_color = data.magic_color;
      var r = (magic_color & 0x00ff0000) >> 16,
        g = (magic_color & 0x0000ff00) >> 8,
        b = (magic_color & 0x000000ff);
        that.setData({
          listBgColor: 'rgb(' + r + ',' + g + ',' + b + ')'
        })
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    })
  },


  playsongTap:function(ev){
     app.setGlobalData({
       songData:ev.currentTarget.dataset.data,
       songlists:this.data.songlists
     });
     var id = ev.currentTarget.dataset.id;
     var mid = ev.currentTaget.dataset.mid;
     var ablummid = ev.currentTarget.dataset.ablummid;
     var songFrom = ev.curentTarget.dataset.from;
     var no = ev.currentTarget.dataset.no;
     wx.navigateTo({
       url: '../playsong/playsong?id=' + id + '&mid=' + mid + "&albummid=" + albummid + '&songFrom=' + songFrom + '&no=' + no,
     })  
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})