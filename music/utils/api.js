var baseUrl = 'http://tingapi.ting.baidu.com/v1/restserver/ting';

var apiMethod = {
   search:'baidu.ting.search.catalogSug',
   detail:'baidu.ting.song.play',
   lrc:'baidu.ting.song.lry',
   recommand: 'baidu.ting.song.getRecommandSongList',
   download: 'baidu.ting.song.downWeb',
   list:'baidu.ting.billboard.billList'
}

var query =  option => ({
  formate:'json'
})

var hackImg = url => 'http://www.beihaiw.com/pic.php?url=' + url
//请求  Promise 对象用于表示一个异步操作的最终状态（完成或失败），以及其返回的值
var request = data => new Promise((resolve,reject)=>{
  wx.request({
    url: baseUrl,
    data:data,
    success: (res) => {
   
      resolve(res.data);
    },
    fail: err => {
      reject(err)
    }
  })
})
//搜索
var search = (keyword) => request({
  method:apiMethod['search'],
  query:keyword
})

//获取歌单
var getOnline =  (type,paged)=>{
  var limit = 12;
  return request({
    method:apiMethod['list'],
    type:type,
    offset:limit * (paged - 1),
    size:limit
  }).then(data=>{
    data.billboard.pic_s210 = hackImg(data.billboard.pic_s210);
    data.billboard.pic_s260 = hackImg(data.billboard.pic_s260);
    data.billboard.pic_s444 = hackImg(data.billboard.pic_s444);
    data.billboard.pic_s640 = hackImg(data.billboard.pic_s640);
    data.song_list.forEach(item => {
      item.pic_big = hackImg(itme.pic_big);
      item.pic_small = hackImg(item.pic_small);
    })
    return data;

  })
}

//获取歌曲细节
var getDetail = id =>request({
  method:apiMethod['detail'],
  songid:id
})

//模块化 对上面的method
module.exports = {
  apiMethod,
  request,
  search,
  getOnline,
  getDetail
}

