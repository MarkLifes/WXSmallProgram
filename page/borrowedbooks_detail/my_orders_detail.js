var order_detail = "https://www.bjdtd.cc/v2.0.0/get/orderDetail";
var cancelorder_url = "https://www.bjdtd.cc/v2.0.0/cancelOrder";

/**
 *  查询订单详情
 */

function find_order_detail(that,orderId){

     wx.showToast({
                title: '正在查询...',
                icon: 'loading',
                duration: 10000
     });
     
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: order_detail,
            data: {
              out_trade_no:orderId,
              
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded',
              'sk':sk
            
            }, // 设置请求的 header
            success: function (res) {
              // success
              
                wx.hideToast();
               
             // console.log(res);
               console.log(res.data);
               console.log(res.data.data);
               that.setData({
                 datas:res.data.data
              });
                
            },
            fail: function () {
              // fail
              // wx.hideToast();
            },
            complete: function () {
              // complete
            }
          })
}
/**
 * 取消订单接口
 */
function cancelOrderFunction(out_trade_no){

     wx.showToast({
                title: '正在查询...',
                icon: 'loading',
                duration: 10000
     });
     
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: cancelorder_url,
            data: {
              out_trade_no:out_trade_no,
              
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded',
              'sk':sk
            
            }, // 设置请求的 header
            success: function (res) {
              // success
              
                wx.hideToast();
                wx.showToast({
                    title: '取消成功',
                    duration: 1000
                  });
             // console.log(res);
               console.log(res.data);
               console.log(res.data.data);
               
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


            },
            fail: function () {
              // fail
              // wx.hideToast();
            },
            complete: function () {
              // complete
            }
          })
}

var out_trade_no_param;
Page({
    data:{
    
        datas:null,
        select_one:true
        },
  
      onLoad:function(options){
    
     // console.log("page3333="+this.data.page);
        console.log("订单详情="+options.id);
        console.log(""+options.selectIndex)
        var that = this;
        out_trade_no_param = options.id;
        if (options.selectIndex == 0){
           this.setData({
             select_one:true
           });
        }else{
            this.setData({
             select_one:false
           });
        }
        find_order_detail(that,options.id);
      //  find_order_detail('oMDrs0HEluEX5GcaD7Ic2nDH7qTM');
    },
    cancelOrder:function(e){
        cancelOrderFunction(out_trade_no_param);
    }
   
})