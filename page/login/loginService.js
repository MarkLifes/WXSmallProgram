

var app = getApp();
export var login = loginService;
/**
 * 登陆服务
 */
export function loginService(that,callback){
        app.getUserInfo(function(userInfo){
                console.log("userinfo");      
                if (callback!=null && typeof callback.success){
                            console.log("userinfo2");  
                        // if ('function' == callback.success){
                              callback.success(userInfo);
                        // }
                }else{
                            console.log("userinfo3");  
                }
          }); 
}