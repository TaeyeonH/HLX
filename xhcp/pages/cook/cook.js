// pages/cook/cook.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     array:[],
     indicatorDots:true,
     autoplay:true,
     interval:5000,
     duration:1000,
     imgUrls:[
         "../images/haibao/haibao-1.jpg",
         "../images/haibao/haibao-2.jpg",
         "../images/haibao/haibao-3.jpg",
     ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var array = this.initData();
     this.setData({array:array});
  },


  initData:function(){
     var array = [];
     var obj = new Object();
     obj.img = '../images/list/food-1.jpg';
     obj.title = '简单爱';
     obj.type = '周杰伦';
     obj.liulan = '520 浏览';
     obj.pinglun = '7 评论';
     array[0] = obj;
 
     var obj1 = new Object();
     obj1.img = '../images/list/food-2.jpg';
     obj1.title = '简单爱';
     obj1.type = '周杰伦';
     obj1.liulan = '520 浏览';
     obj1.pinglun = '7 评论';
     array[1] = obj1;

     var obj2 = new Object();
     obj2.img = '../images/list/food-3.jpg';
     obj2.title = '手写的从前';
     obj2.type = '周杰伦';
     obj2.liulan = '520 浏览';
     obj2.pinglun = '7 评论';
     array[2] = obj2;

     var obj3 = new Object();
     obj3.img = '../images/list/food-4.jpg';
     obj3.title = '星晴';
     obj3.type = '周杰伦';
     obj3.liulan = '520浏览';
     obj3.pinglun = '6 评论';
     array[3] = obj3;

     var obj4 = new Object();
     obj4.img = '../images/list/food-5.jpg';
     obj4.title = '珊瑚海';
     obj4.type = '周杰伦';
     obj4.liulan = '520浏览';
     obj4.pinglun = '6 评论';
     array[4] = obj4;

     return array; 

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