

var util = require('../../util/util.js')
import {$,$POST,$Get} from '../../util/http';
import {FIND_BOOK_DETAIL,createorder_url} from '../../util/url';

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
     console.log("sk"+sk);
     console.log("itemId="+itemId+"createorder_url="+createorder_url);
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
               
               var pages = getCurrentPages();
                // var currPage = pages[pages.length - 1];   //当前页面
                var prevPage = pages[pages.length - 3];  //上二个页面

                //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                prevPage.setData({
                    bookdetailResultData: 1
                })
                wx.showToast({
                            title: '下单成功',
                            icon: 'loading',
                            duration: 1000
                });
                wx.navigateBack({
                          delta: 2, // 回退前 delta(默认为1) 页面
                          success: function(res){
                            // success
                                  wx.showToast({
                                    title: '下单成功',
                                    icon: 'loading',
                                    duration: 1000
                                  });
                                
                          }
                        })
                // wx.navigateBack({
                //   delta: 2, // 回退前 delta(默认为1) 页面
                //   success: function(res){
                //     // success
                //           wx.showToast({
                //             title: '下单成功',
                //             icon: 'loading',
                //             duration: 1000
                //           });
                //           var pages = getCurrentPages();
                //           var currPage = pages[pages.length - 1];   //当前页面
                //           var prevPage = pages[pages.length - 2];  //上一个页面

                //           //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
                //           prevPage.setData({
                //             mydata: {a:1, b:2}
                //           })


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
     wx.showToast({title: '正在查询...',icon: 'loading',duration: 10000});
     var data = {itemId:goods_id};
     console.log("请求参数="+data);
     var callback = {
        success:function(res){
                 wx.hideToast();
                 console.log(res.data.data);
                 that.setData({
                     data:res.data.data
                 });
              },
        fail:function(res){
              wx.hideToast();
              console.log(res.data);
              console.log("请求失败》》》》》");
        }
      };

     $(FIND_BOOK_DETAIL,'GET',data,callback);
}

var currentSwipe = 0;
Page({
    data:{
        selected:true,
        selected1:false,
        data:null,
        isHide:0,
        id:null,
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
    //  console.log("page3333="+this.data.page);
        console.log(options.id);

     
        this.setData({isHide:options.isHide,id:options.id});
    
    },
    onShow:function(e){
        request_things_detail(this,this.data['id'],2);
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