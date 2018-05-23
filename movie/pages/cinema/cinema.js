// pages/cinema/cinema.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
         text:"This is why we play" ,
         array:[{text:"init data"}],
         object:{text:"init data"},
         id:"1",
         condition:true,
         case:true,
         array:[{
           message:'foo',
         },{
           message:'bar',
         }],
         objectArray:[
           {id:5,unique:'unique_5'},
           { id: 5, unique: 'unique_5' },
           { id: 4, unique: 'unique_4' },
           { id: 3, unique: 'unique_3' },
           { id: 2, unique: 'unique_2' },
           { id: 1, unique: 'unique_1' },
         ],
         item:{
           index: 0,
           msg:'this is why we play',
           time:'2017-12-18'
         }
  },
  changeText:function(){
    // setData 是设置函数  将数据从逻辑层传到试图层，同时改变this.data的值
    this.setData({
      text:"一路向北"
    })
  },
  changeItemArray:function(){
    this.setData({
      'array[0].text':"easy love"
    })
  },
  changeObjectItem:function(){
    this.setData({
      'object.text':"zhoujielun"
    })
  },
  addNewFiled:function(){
    this.setData({
      'newField.text':"what you want to add"
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
      return{
        title:"what you want to share?",
        desc:"How to desc you?",
        path:"pages/movie/movie"
      }
  }
})