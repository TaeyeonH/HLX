const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//简化播放数
function fromatWan(n){
  n = n.toString();
  return (n/10000).toFixed(1) + "万";
}

//推荐频道
function getRecommend(callback){
   wx.request({
     url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
     data:{
       g_tk:5831,
       uin:0,
       format:'json',
       inCharset:'utf-8',
       outCharset:'utf-8',
       notice:0,
       platform:'h5',
       needNewCode:1,
       _:Date.now()
     },
     method:'GET',
     header:{'content-Type':'application/json'},
     success:function(res){
       if(res.statusCode == 200){
          var data = res.data;
          var songlist = data.data.songList;
          //api请求热门歌曲失败
          for(var i = 0;i<songlist.length;i++){
            songlist[i].accessnum = fromatWan(songlist[i].accessnum);
          }
          callback(data);
       }
     }
   })
}
//HotSong Search
function getHotSearch(callback){
    wx.request({
      url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
      data:{
        g_tk:5381,
        uin:0,
        format:'jsonp',
        inCharset:'utf-8',
        outCharset:'utf-8',
        notice:0,
        platform:'h5',
        needNewCode:1,
        _:Date.now()
      },
      method:'GET',
      header:{'content-Type':'application/json'},
      success:function(res){
        if(res.statusCode == 200){
            var data = res.data;
            data.data.hotkey = data.data.hotkey.slice(0,8)
            console.log(data.data.hotkey.slice(0,8));
            callback(data);
        }
      }
    })
}

function getSearchMusic(keyword,page,callback){
  wx.request({
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    data:{
      g_tk:5381,
      uin:0,
      format:'json',
      inCharset:'utf-8',
      outCharset:'utf-8',
      notice:0,
      platform:'h5',
      needNewCode:1,
      w:keyword,
      zhidaqu:1,
      catZhida:1,
      t:0,
      flag:1,
      ie:'utf-8',
      sem:1,
      aggr:0,
      perpage:20,
      n:20,
      p:page,
      remoteplace:'txt.mqq.all',
      _:Date.now() 
    },
  method:'GET',
  header:{'content-Type':'application/json'},
  success:function(res){
    if(res.statusCode == 200){
      callback(res.data);
    }
  }
  })
}

function getToplist(callback){
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    data:{
      format:'json',
      g_tk:5381,
      uin:0,
      inCharset:'utf-8',
      outCharset:'utf-8',
      notice:0,
      platform:'h5',
      needNewCode:1,
      _:Date.now()
    },
    method:'GET',
    header:{'content-Type':'application/json'},
    success:function(res){
      if(res.statusCode == 200){
        var data = res.data;
        var toplist = data.data.topList;
        for(var i=0;i<toplist.length;i++){
          toplist[i].listenCount = fromatWan(toplist[i].listenCount)
        }
        callback(toplist);
      }
    }
  })
}

function getToplistInfo(id,callback){
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    data:{
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id,
      _: Date.now()
    },
    method:'GET',
    header:{
      'content-Type':'application/json'
    },
    success:function(res){
      if(res.statusCode == 200){
        callback(res.data);
      }
    }
  })
}

function getCdlistInfo(id,callback){
  wx.request({
    url: 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
    data:{
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      new_format: 1,
      pic: 500,
      disstid: id,
      type: 1,
      json: 1,
      utf8: 1,
      onlysong: 0,
      nosign: 1,
      _: new Date().getTime()
    },
    method:'GET',
    header:{
      'content-Type':'application/json'
    },
    success:function(res){
      if(res.statusCode == 200){
        var data = res.data;
        var cdlist = data.cdlist;
        for(var i=0;i<cdlist.length;i++){
          cdlist[i].visitnum = fromatWan(cdlist[i].visitnum);
        }
        callback(cdlist[0]);
      }
    }
  })
}

function calculateBgColor(pic_url,callback){
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_gedanpic_magiccolor.fcg',
    data:{
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      pic_url: pic_url,
      _: new Date().getTime()
    },
    method:'GET',
    header:{
      'content-Type':'application/json'
    },
    success:function(res){
      if(res.statusCode == 200){
        var data = res.data;
        console.log(data);
        callback(data);//little change
      }
    }
  })
}

//没有接口
// function getLyric(id,callback){
//   wx.request({
//     url: 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric.fcg',
//     method:'GET',
//     data:{
//       nobase64:1,
//       musicid:id,
//       songtype:0,
//       callback:'jsonp1'
//     },
//     header:{
//       'Content-Type':'application/json'
//     },
//     success:function(res){
//       if(res.statusCode == 200){
//         console.log(res);
//         callback(res.data);
//       }
//     }
//   })
// }


//QQ音乐抓包
function getSongInfo(id,mid,callback){
   wx.request({
     url: 'https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg',
     data: {
       songmid: mid,
       tpl: 'yqq_song_detail',
       format: 'json',
       callback:'getOneSongInfoCallback',
       g_tk: 1134533366,
       jsonpCallback:'getOneSongInfoCallback',
       loginUin: 0,
       hostUin: 0,
       inCharset: 'utf8',
       outCharset: 'utf-8',
       notice: 0,
       platform: 'yqq',
       needNewCode: 0
     },
     method:'GET',
     header:{
       'content-Type':'application/json'
     },
     success:function(res){
       if(res.statusCode == 200){     
         var data = res.data.data[0];
         callback(data);
       }
     }
   })
}

module.exports = {
  formatTime: formatTime,
  getRecommend:getRecommend,
  getHotSearch: getHotSearch,
  getSearchMusic: getSearchMusic,
  getToplist: getToplist,
  getToplistInfo: getToplistInfo,
  getCdlistInfo: getCdlistInfo,
  calculateBgColor: calculateBgColor,
  // getLyric: getLyric,
  getSongInfo: getSongInfo
}
