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


//获取 热门旅游列表
function getHotTripList(next_start,callback) {
  wx.request({
    url: 'http://api.breadtrip.com/v2/index/',
    data: {
        next_start:next_start
    },
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
};
//获取探索发现地方
function getExplorePlaceList(callback) {
  wx.request({
    url: 'http://api.breadtrip.com/destination/v3/',
    data: {

    },
    method: 'GET',
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

//通过ID获取地方信息
function getPlaceInfoByID(id, type, callback) {
  wx.request({
    url: 'http://api.breadtrip.com/destination/place/' + type + '/' + id + '/',
    method: 'GET',
    data: {

    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

//通过id获取热门地点 需要传入start来获取刷新数
function getPlacePOIByID(type, id, poiType,start, callback) {
  wx.request({
    url: 'http://api.breadtrip.com/destination/place/' + type + '/' + id + '/pois/' + poiType + '/',
    method: 'GET',
    data: {
        start:start 
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

//获取图片
function getPhotoPOIByID(type,id,start,count,gallery_mode,callback){
  wx.request({
    url: 'http://api.breadtrip.com/destination/place/'+type+'/'+id+'/photos/',
    method:'GET',
    data:{
      start:start,
      count:count,
      gallery_mode:gallery_mode
    },
    header:{
      'Content-Type':'application/json'
    },
    success:function(res){
      var data = res.items;
      callback(data);
    }
  })
}

//通过Trip信息
function getTripInfoByID(tripId, callback) {
  wx.request({
    url: 'http://api.breadtrip.com/trips/' + tripId + '/waypoints/',
    method: 'GET',
    data: {
      
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

//获取地方
function getPlaceTripByID(type, id, start, callback) {
  wx.request({
    // http://api.breadtrip.com/v2/destination/place/1/US/trips/?start=0&count=20
    url: 'http://api.breadtrip.com/v2/destination/place/' + type + '/' + id + '/trips/',
    method: 'GET',
    data: {
       start:start
    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

//获取用户信息
function getUserInfoByID(userId, callback) {
  wx.request({
    url: 'http://api.breadtrip.com/users/' + userId + '/v2/',
    method: 'GET',
    data: {

    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

//获取waypointInfo
function getWaypointInfoByID(tripId, waypointId, callback) {
  wx.request({
    url: 'http://api.breadtrip.com/trips/' + tripId + '/waypoints/' + waypointId + '/',
    method: 'GET',
    data: {

    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

function getWaypointReplyByID(tripId, waypointId, callback) {
  wx.request({
    url: 'http://api.breadtrip.com/trips/' + tripId + '/waypoints/' + waypointId + '/replies/',
    method: 'GET',
    data: {

    },
    header: {
      'Content-Type': 'application/json'
    },
    success: function (res) {
      var data = res.data;
      callback(data);
    }
  })
}

function getMorePhoto(type, id, start, count, gallery_mode, callback){
  wx.request({
    url: 'http://api.breadtrip.com/destination/place/'+type+'/'+id+ '/photos/',
    data:{
      start:start,
      count:count,
      gallery_mode:gallery_mode
    },
    header:{
      'Content-Type':'application/json'
    },
    success:function(res){
      var data = res.data;
      callback(data);
    }
  })
}


module.exports = {
  formatTime: formatTime,
  formatNumber:formatNumber,
  getHotTripList:getHotTripList,
  getExplorePlaceList: getExplorePlaceList,
  getPlaceInfoByID: getPlaceInfoByID,
  getPlacePOIByID: getPlacePOIByID,
  getTripInfoByID: getTripInfoByID,
  getPlaceTripByID: getPlaceTripByID,
  getUserInfoByID: getUserInfoByID,
  getWaypointInfoByID: getWaypointInfoByID,
  getWaypointReplyByID: getWaypointReplyByID,
  getMorePhoto: getMorePhoto
}
