// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      currentTab:0,
      winHeight:1544,
      winWidth:0,
      indicatorDots:false,
      autoplay:true,
      interval:5000,
      duration:1000,
      imgUrls:[
        '/images/haibao/1.jpg',
        '/images/haibao/2.jpg',
        '/images/haibao/3.jpg',
        '/images/haibao/4.jpg'
      ],
      movies:[]
  },
  //绑定页面
  switchNav:function(e){
     var id = e.currentTarget.id;
     this.setData({currentTab:id})
  },

  //加载api中数据
  loadMovies:function(e){
     var page = this;
     wx.request({
       url: 'https://api.douban.com/v2/movie/in_theaters',
       method:'GET',
       header:{
         'Content-Type':'Application/json'
       },
       success:function(res){
         var subjects = res.data.subjects;
         //获取电影行数
         var size = subjects.length;
         console.log(size);
         //设置每行设置3行
         var len = parseInt(size/3);
         //将电影加到movies数组中去
         page.setData({movies:subjects});
         page.setData({winWidth:(len + 1)*230});
       }
     })
  },
  loadDetail:function(e){
     var id = e.currentTarget.id
     wx.navigateTo({
       url: '../movieDetail/movieDetail?id='+ id,
     })
  },
  onLoad:function(e){
      var page = this;
      wx.getSystemInfo({
        success: function (res) {
          console.log(res);
          page.setData({ winWidth: res.windowWidth });
        },
      });
      this.loadMovies();
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