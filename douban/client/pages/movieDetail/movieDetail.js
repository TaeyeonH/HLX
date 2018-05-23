// pages/movieDetail/movieDetail.js
Page({
   
  /**
   * 页面的初始数据
   */
  data: {
      movie:{},
      directors:[],
      casts:[], 
      currentTab:0,
      directorDetail:{},
      directorDetailMovie:[],
      sub:{},
      count:[]
  },
  switchNav:function(e){
    var id = e.currentTarget.id;
    this.setData({currentTab: id });
    var page = this;
    var tag = e.currentTarget.dataset.genres;
    if(tag == undefined){
        return false; 
    }else{
      wx.request({
        url: 'https://api.douban.com/v2/movie/search?tag=' + tag,
        method: 'GET',
        header: {
          'Content-Type': 'Application/json'
        },
        success: function (res) {
          var sub = res.data;
          var count = res.data.subjects
          page.setData({ sub: sub });
          page.setData({ count: count });
          var size = count.length;
          var len = parseInt(size / 3);
          page.setData({ winWidth: (len + 1) * 230 });
        },
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var page = this;
     var id =  options.id;
     wx.request({
       url: 'https://api.douban.com/v2/movie/subject/'+ id,
       method:'GET',
       header:{
         'Content-Type':'Application/json'
       },
       success:function(res){
         var movie = res.data;
         page.setData({movie:movie});
         page.setData({directors:movie.directors});
         page.setData({casts:movie.casts});
         page.setData({id:movie.id});
         wx.setNavigationBarTitle({
           title: movie.title,
         })
       }
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