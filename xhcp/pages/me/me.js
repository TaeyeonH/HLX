// pages/me/me.js
function getRandomColor(){
  let rab = []
  for(let i = 0;i < 3; ++i){
    let color = Math.floor(Math.random() * 256).toString(16)
    color =  color.length == 1?'0' + color :color
    rab.push(color)
  }
  return '#' + rab.join('')
}

 
Page({
 
  //onReady 与 初始的 onload不可以重复
  onReady:function(e){
    this.audioCtx = wx.createAudioContext('myAudio')
    this.videoContext = wx.createVideoContext('video')
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res.model)
        // console.log(res.pixelRatio)
        // console.log(res.windowWidth)
        // console.log(res.windowHeight)
        // console.log(res.language)
        // console.log(res.version)
        // console.log(res.system)
        // console.log(res.pixelRatio)
        // console.log(res.platform)
      },
    })
    wx.getNetworkType({
      success: function(res) {
        console.log(res.networkType)
      },
    })
    wx.onAccelerometerChange(function(res){
        console.log(res.x)
        console.log(res.y)
        console.log(res.z) 
    }),
   

    // wx.showToast({
    //   title: 'merry you',
    //   duration:5000,
    //   mask:true,
    //   icon:'success'

    // })

    wx.showLoading({
      title: 'merry you',
      mask:true,
    })
    setTimeout(function(){
      wx.hideLoading()
    },5000)

    // wx.showModal({
    //   title: 'Nothing',
    //   content: '弹窗',
    //   success:function(res){
    //     if(res.confirm){
    //       console.log(res.confirm)
    //     }else if(res.cancel){
    //       console.log(res.cancel)
    //     }
    //   }
    // })

    // wx.showActionSheet({
    //   itemList: ['A','B','C'],
    //   itemColor:"pink",
    //   success:function(res){
    //     console.log(res)
    //     console.log(res.tapIndex)
    //   },

    //   complete:function(res){
    //     console.log(res)
    //   },
    //   fail:function(res){
    //     console.log(res.errMsg)
    //   } 
    // })
   
    wx.setNavigationBarColor({
      frontColor:"#000000",
      backgroundColor:"#FFC0CB",
       animation:{
         duration:5000,
         timingFunc: "easeOut",
       },
       complete:function(e){
         console.log(e)
       },
       fail:function(res){
         console.log(res.msg)
       },
       success:function(res){
         console.log(res)
       }
    })
    // wx.makePhoneCall({
    //   phoneNumber: '13767937960',
    // })


    // wx.scanCode({
    //   success:(res)=>{
    //     // console.log(res)
    //     console.log(res.path)
    //   }
    // })

    wx.setScreenBrightness({
      value: .5,
    })

    wx.getScreenBrightness({
      success:function(res){
        console.log(res.value)
      }
    })

    wx.vibrateLong({
      success:function(res){
        console.log(res)
      }
    })
 
    // wx.addPhoneContact({
    //   firstName: 'zhou',
    //   mobilePhoneNumber:'13767937960'
    // })
    // wx.scanCode({
    //   onlyFromCamera:true,
    //   success:(res)=>{
    //     // console.log(res)
    //     console.log(res.path)
    //   }
    // })
  },
  inputValue:'',
  /**
   * 页面的初始数据
   */
  data: {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '此时此刻',
    author: '许巍',
    src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
    markers:[{
      iconPath:"/resources/others.png",
      id:0,
      latitude: 23.099994,
      longitude: 113.324520,
      width:50,
      height:50

    }],
    polyline:[{
      points:[{
        longitude: 113.3245211,
        latitude: 23.10229,
      
      },{
          longtitude: 113.324520,
          latitude:23.21229,
      }],
      color:'#FF0000DD',
      width:2,
      dottedLine:true,

    }],
   
    contorls:[{
      id: 1,
      iconPath: '/resources/location.png',
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],


    regionchange:function(e){
      console.log(e.detail.type);
    },
    controltap:function(e){
      console.log(e.controlId)
    },
    markerTap(e){
      console.log(e.markerId)
    }
  },
  audioPlay: function () {
    this.audioCtx.play()
  },
  audioPause: function () {
    this.audioCtx.pause()
  },
  audio14: function () {
    this.audioCtx.seek(14)
  },
  audioStart: function () {
    this.audioCtx.seek(0)
  },

  funpause: function () {
    console.log("audio pause");
  },
  funtimeupdate: function (u) {
    console.log(u.detail.currentTime);
    console.log(u.detail.duration);
  },
  funended: function () {
    console.log("audio end");
  },
  funerror: function (u) {
    console.log(u.detail.errMsg);
  },
  bindInputBlur:function(e){
    this.inputValue = e.detail.value
  },

  bindSendDanmu:function(){
    this.videoContext.sendDanmu({
        text:this.inputValue,
        color:getRandomColor()

    })
   
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