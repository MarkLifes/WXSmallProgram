var find_thing_detial_url = "https://www.bjdtd.cc/getitemdetail"

var createorder_url = "https://www.bjdtd.cc/createorder"

var shangjia_url = "https://www.bjdtd.cc/lockitemstate"

var xiajia_url = "https://www.bjdtd.cc/unlockitemstate"
/**
 * 上架
 */
function lockItem(that,itemId){
    wx.showToast({
            title: '',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     console.log(itemId);
     wx.request({
            url: shangjia_url,
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
               console.log("修改状态");
               console.log(res.data);
               console.log(res.data.data);

                 wx.hideToast();
                 if (res.data.err_no ==0){
                  wx.showToast({
                      title: '修改成功',
                      icon: 'loading',
                      duration: 1000
                  });
                 }else{
                   wx.showToast({
                      title: '修改失败',
                      icon: 'loading',
                      duration: 1000
                  });
                 }
                  request_things_detail(that,groub_itemId,2);

            },
            fail: function (e) {
              // fail
              console.log("请求失败"+e);
               wx.hideToast();
            },
            complete: function () {
              // complete
                
            }
          })
}

/**
 * 下架
 */
function unLockItem(that,itemId){
    wx.showToast({
            title: '',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     console.log(itemId);
     wx.request({
            url: xiajia_url,
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
              
               console.log(res.data);
               console.log(res.data.data);

                 wx.hideToast();
                 wx.showToast({
                    title: '修改成功',
                    icon: 'loading',
                    duration: 1000
                 });
              
              request_things_detail(that,groub_itemId,2);
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
                console.log(res.data);
                wx.hideToast();
       
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

var groub_itemId;
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
       },
     onLoad:function(options){
     // console.log("page3333="+this.data.page);
        console.log(options.id);
        groub_itemId = options.id;
        var that = this;
       
        request_things_detail(that,options.id,2);
    },
    
    rentalClick:function(){
        var _this = this;
        console.log("修改状态");
          wx.showActionSheet({
            itemList: ['上架','下架'],
            itemColor: "#005757",
            success: function(res) {
                if (!res.cancel) {
                    if(res.tapIndex == 0){
                         unLockItem(_this,groub_itemId);         
                    }else if(res.tapIndex == 1){
                         lockItem(_this,groub_itemId);
                    }
                }
            }
        })
    },onPreview:function(event){
        var that = this;
        console.log(event);
        console.log("图片详情"+event.currentTarget.id);
        if (this.data.data!=null){
            console.log(this.data.data.imageUrl);
            if (this.data.data.imageUrl!=null &&this.data.data.imageUrl.length>0 ){
                  wx.previewImage({
                  current: this.data.data.imageUrl[currentSwipe], // 当前显示图片的http链接
                  urls: this.data.data.imageUrl // 需要预览的图片http链接列表
              });
            }
        }
    }
  
})