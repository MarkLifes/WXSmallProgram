 
import {LOGIN_URL} from './util/url';

// var API_URL = "https://www.bjdtd.cc/login";

function login(that,cb,code,encryptedData,iv){ 
   
    // console.log('code='+code+'&encryptedData='+encryptedData+'&iv='+iv);

         //创建一个dialog
          wx.showToast({
            title: '正在登录...',
            icon: 'loading',
            duration: 10000
          });
          //请求服务器
          
          wx.request({
            url: LOGIN_URL,
            data: {
              code:code,
              encryptedData:encryptedData,
              iv:iv
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded'
            
            }, // 设置请求的 header
            success: function (res) {
              // success
              wx.hideToast();
              // console.log(res);
              // console.log(res.data);
              // console.log(res.data.data);
              console.log("登录服务器返回"+JSON.stringify(res));
              wx.setStorageSync('sk', res.data.data.sessionId);
              wx.setStorageSync('phone',res.data.data.phone);
              wx.setStorageSync('haveShop',res.data.data.haveShop);

              typeof cb == "function" && cb(that.globalData.userInfo)
              

            },
            fail: function (e) {
               console.log("e="+e);
                 // fail
               wx.hideToast();
               wx.showToast({
                  title: '请求失败...'+e,
                  icon: 'loading',
                  duration: 2000
              });
            },
            complete: function () {
              // complete
            }
          })
  }

App({
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false
  },
    getUserInfo:function(cb){
    var that = this
    
      console.log("login");
      wx.login({
        success: function (loginRes) {
          if (loginRes.code) {
              var code = loginRes.code;
                wx.getUserInfo({
                  success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    console.log(res.userInfo);
                    wx.setStorageSync('avatarUrl',res.userInfo.avatarUrl);
                    wx.setStorageSync('nickName',res.userInfo.nickName);
      
                      var encryptedData = encodeURIComponent(res.encryptedData);//一定要把加密串转成URI编码
                      var iv = res.iv;
                        //请求自己的服务器
             
                       login(that,cb,code,encryptedData,iv);
                      //console.log(util.formatTime(new Date()));
                  }
                })
           }else{
                console.log('获取用户登录态失败！' + res.errMsg)
           }
        }
      })
 
  }
})
