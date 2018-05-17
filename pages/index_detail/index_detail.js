var find_thing_detial_url = "https://www.bjdtd.cc/getitemdetail"

var createorder_url = "https://www.bjdtd.cc/createorder"

/**
 * 物品详情
 */
function request_createOrder(that,itemId){
    wx.showToast({
            title: '',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');
     console.log(sk);
  
     console.log(itemId);
     wx.request({
            url: createorder_url,
            data: {
               itemId:itemId
              
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded',
              'sk':sk
            
            }, // 设置请求的 header
            success: function (res) {
              // success
              
               
               console.log("下单");
               console.log(res.data);
               console.log(res.data.data);
               console.log(res.data.out_trade_no);
            

                 wx.hideToast();
                if (res.data.err_no!=0){
                     wx.showToast({
                          title: '未支付订单不能超过三个',
                          icon: 'loading',
                          duration: 1000
                      });
                   return;
                }
                wx.switchTab({
                    url: '../my_orders/my_orders'
                  });
                // wx.navigateBack({
                //   delta: 1, // 回退前 delta(默认为1) 页面
                //   success: function(res){
                //     // success
                //           wx.showToast({
                //           title: '下单成功',
                //           icon: 'loading',
                //           duration: 1000
                //       });
                //   },
                //   fail: function(res) {
                //     // fail
                //   },
                //   complete: function(res) {
                //     // complete
                //   }
                // })

            },
            fail: function () {
              // fail
               wx.hideToast();
            },
            complete: function () {
              // complete
            }
          })
}

/**
 * 物品详情
 */
function request_things_detail(that,goods_id,token){
    wx.showToast({
            title: '正在查询...',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');
    // console.log(sk);
     wx.request({
            url: find_thing_detial_url,
            data: {
               itemId:goods_id
              
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded',
              'sk':sk
            
            }, // 设置请求的 header
            success: function (res) {
              // success
              
                wx.hideToast();
                 console.log(res.data.data);
                 that.setData({
                     data:res.data.data
                 });
             
              

            },
            fail: function () {
              // fail
               wx.hideToast();
            },
            complete: function () {
              // complete
            }
          })
}

var currentSwipe = 0;
Page({
    data:{
        selected:true,
        selected1:false,
        data:null
        },
           listenSwiper:function(e) {
            //打印信息
            currentSwipe = e.detail.current;
            console.log(e.detail.current)
       },onPreview:function(event){
            var that = this;
            console.log(event);
            console.log("附近图片详情"+event.currentTarget.id);
            if (this.data.data!=null){
                console.log(this.data.data.imageUrl);
                wx.previewImage({
                current: this.data.data.imageUrl[currentSwipe], // 当前显示图片的http链接
                urls: this.data.data.imageUrl // 需要预览的图片http链接列表
              });
            }
    },
     onLoad:function(options){
     // console.log("page3333="+this.data.page);
        console.log(options.id);
        var that = this;
        request_things_detail(that,options.id,2);
    },
    rentalClick:function(){
        console.log("租用");
        var p = 23;
        //console.log(this.data.data);
         request_createOrder(this,this.data.data.itemId);

    //      wx.navigateTo({
    //        url:'../request-payment/request-payment?chargePrice='+p
    // })
    }
})