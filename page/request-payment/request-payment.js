const paymentUrl = "https://www.bjdtd.cc/v2.0.0/pay5param";


function request_pay(orderID){
  
   var sk = wx.getStorageSync('sk');
   wx.request({
            url: paymentUrl,
            data: {
              out_trade_no:orderID

            },
            method: 'POST',
             header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded',
              'sk':sk
            
            },
            success: function(res) {
              console.log('unified order success, response is:', res)
              //var payargs = res.data.payargs
              console.log(res.data);
              console.log(res.data.data);
              console.log(res.data.data.appId);
              var wechatData = res.data.data;
              console.log(">>>>>>>>>>paySign>>>>>>>>>>>>>>>>"+wechatData.paySign);
              wx.requestPayment({
                'appId' : wechatData.appId,
                'timeStamp': wechatData.timeStamp,
                'nonceStr': wechatData.nonceStr,
                'package': wechatData.package,
                'signType': 'MD5',
                'paySign': wechatData.paySign,
              'success':function(res){
                console.log(res);
                console.log('success');
                 wx.showToast({
                    title: '支付成功',
                    duration: 1000
                  });
                     wx.navigateBack({
                        delta: 1, // 回退前 delta(默认为1) 页面
                        success: function(res){
                          // success
                                wx.showToast({
                                title: '下单成功',
                                icon: 'loading',
                                duration: 1000
                            });
                        },
                        fail: function(res) {
                          // fail
                        },
                        complete: function(res) {
                          // complete
                        }
                      })

                  
                  //  wx.navigateTo({
                  //     url:'../welcome/welcome'
                  // //url:'../things_detail/things_detail'
                  //     })
              },
              'fail':function(res){
                console.log(res);
                 wx.showToast({
                    title: '支付失败',
                    duration: 1000
                  });
                console.log('fail');
              },
              'complete': function(res){
                console.log(res);console.log('complete');
              }
            });
              

              // self.setData({
              //   loading: false
              // })
            }
          })
}
var app = getApp()

Page({
      data:{
        money:5,
        orderID:null,
        pName:null,
        loading:false
        },
      onLoad: function(options) {
        // console.log(options.chargePrice);
        console.log(options.orderId);
        this.setData(
          {
            orderID:options.orderId,
            money:options.money
            
          }
        )
      },  
    requestPayment: function() {
    
      var self = this

      self.setData({
        loading: true
      })
      console.log(this.data);
      console.log("支付"+this.data.orderID);
      request_pay(this.data.orderID);
    //  request_pay(this.data.orderID,this.data.pName,this.data.money);
   //   request_pay('14232709589161202971','Android框架揭秘',1);
      // 此处需要先调用wx.login方法获取code，然后在服务端调用微信接口使用code换取下单用户的openId
      // 具体文档参考https://mp.weixin.qq.com/debug/wxadoc/dev/api/api-login.html?t=20161230#wxloginobject
      // app.getUserOpenId(function(err, openid) {
      //   if (!err) {
         
      //   } else {
      //     console.log('err:', err)
      //     self.setData({
      //       loading: false
      //     })
      //   }
      // })
    }
})
