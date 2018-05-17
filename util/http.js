
class Test {
    constructor(){
        this.type = 'test'
    }
    says(say){
        console.log(this.type + ' says ' + say)
    }
}

// sk, type , header , data,  callback

//获取微信的上下文
var app = getApp();

export var $ = httpRequestBySk;
/**
 * 对请求方式 sk header 已经封装，还有sk过期校验
 */
export var $Get = httpRequestHeaderGet;
/**
 * 对请求方式 sk header 已经封装，还有sk过期校验
 */
export var $Post = httpRequestHeaderPost;




/**
 * 封装 GET HEADER  添加Filter
 */
export function httpRequestHeaderGet(url,data,callback){ 
     console.log("httpRequestHeaderGet");
     httpRequestBySk(url,'GET',data,callback);
}
/**
 * 封装 POST HEADER 有Filter
 */
export function httpRequestHeaderPost(url,data,callback){
    httpRequestBySk(url,'POST',data,callback);
}
/**
 * 封装 POST 无Filter
 */
export function httpRequestPost(url,header,data,callback){
      httpRequest( url,'POST',header,data,callback,null);
}
/**
 * 封装 GET 无Filter
 */
export function httpRequestGet(url,header,data,callback){
    //   httpRequest( url,'GET',header,data,callback);
     httpRequest( url,'GET',header,data,callback,null);
}
/**
 * 封装 GET HEADER 无Filter
 */
export function httpRequestHeaderGetNoFilter(url,data,callback){
    var sk = wx.getStorageSync('sk');
    httpRequest( url,'GET',header,data,callback,null);
}
/**
 * 封装Header 无Filter
 */
export function httpRequestHeaderNoFilter(url,type,data,callback){
    var sk = wx.getStorageSync('sk');
    console.log("httpRequestBySk-sk="+sk);
    httpRequest( 
            url,
            type,
            {
              'content-type': 'application/x-www-form-urlencoded',
              'sk':sk
            },data, callback,null);
}
/**
 * 封装 HEADER 有Filter
 */
export function httpRequestBySk(url,type,data,callback){
    var sk = wx.getStorageSync('sk');
    console.log("请求参数打印**************************");
    console.log("url="+url);
    console.log("sk="+sk);
    console.log("type="+type);
    console.log("data="+data);
    console.log("请求参数打印**************************");
    httpRequest( 
            url,
            type,
            {
              'content-type': 'application/x-www-form-urlencoded',
              'sk':sk
            },data, callback,{
                checkResult:function(res){
                    //判断code
                    console.log("请求结果》》》》 err_no ="+res.data.err_no);
                    if(res.data.err_no != 0){
                        login(url,type,data,callback);
                        return false;
                    }else{
                        return true;
                    }
                }
            })
}

/**
 * 原子化最小单元
 * 初步封装，未加任何限制
 * 公共的request
 * header 传递一个对象{}
 * callback 传递一个对象{}
 */
export function httpRequest(url,type,header,data,callback,filter){
    console.log("httpRequest");
    wx.request({
      url: url,
      data: data,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: header, // 设置请求的 header
      success: function(res){
         // success
         if ('function' == typeof callback.success){
             //先检验filter，再通过filter检验结果
               if (filter!=null && typeof filter.checkResult){
                    if (filter.checkResult(res)){
                        console.warn("sk有效");
                        callback.success(res);
                    }
               }else{
                     //不做sk校验
                     console.warn("刚刚登陆不做校验");
                     callback.success(res);
               }
         }else{
               console.warn("success 没有被实现");
         }
      },
      fail: function(res) {
        // fail
         if ('function' == typeof callback.fail){
               callback.fail(res);
         }else{
               console.warn("fail 没有被实现"); 
         }
      },
      complete: function(res) {
        // complete
         if ('function' == typeof callback.complete){
              callback.complete(res);
         }else{
              console.warn("complete 没有被实现");
         }
      }
    })
}

export function request(find_nearthings_url,lat,lng,index,pageSize){
    var sk = wx.getStorageSync('sk');
    console.log("http封装的request 第二次查询sk="+sk);
    httpRequestHeaderGet(
             find_nearthings_url,
            {
              lat:lat,
              lng:lng,
              index:index,
              offset:pageSize
              
            }, {
              success:function(res){
                    console.log("请求成功 before》》》》");
                    console.log(res.data);
                    console.log("请求成功 end》》》》");
                    },
              fail:function(res){
                    console.log("请求失败》》》》》");
                    console.log(res.data);
                    }
              
            })

}

/**
 * 重新登录并发送查询请求
 */
function login(url,type,data,callback){
        app.getUserInfo(function(userInfo){
                console.warn("登陆成功");
                if (isCanStart()){
                    console.warn("重新定位");
                    wx.getLocation({
                      type: 'wgs84',
                      success: function(res) {
                          console.log(res);
                          lat = res.latitude
                          lng = res.longitude
                          var speed = res.speed
                          var accuracy = res.accuracy
                          wx.setStorageSync('locationTime',Date.now());
                          wx.setStorageSync('lat',lat);
                          wx.setStorageSync('lng',lng);
                          console.log("刷新请求");
                          httpRequestHeaderNoFilter(url,type,data,callback);
                      }
                   })
                }else{
                    console.warn("不需要定位");
                    var lat = wx.getStorageSync('lat',lat);
                    var lng = wx.getStorageSync('lng',lng);
                    console.log(lat + "=="+ lng);
                    console.log("刷新请求");
                    httpRequestHeaderNoFilter(url,type,data,callback);
                }
                
          }); 
}

/**
 * 是否重新定位
 */
function isCanStart(){
   var lastTime = wx.getStorageSync('locationTime');
   var currentTime = Date.now();
   console.log(currentTime - lastTime);
   if (currentTime - lastTime>5*60 *1000){
       return true;
   }else{
       return false;
   }
}

export function Request(){
    this.get = request;
}



export function area(radius) {
        // return Math.PI * radius * radius;  
        this.name = "jsdf";
        this.age = "566"
    }