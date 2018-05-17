

import {$,$POST,$Get} from '../../util/http';
import {FIND_BOOK_DETAIL_BY_ISBN_URL,DELETE_BOOK} from '../../util/url';

import {findMyliBrary} from '../../page/mylibrary/mylibraryservice';

export var scanISBNCode = scanISBN;
export var moveEventHandle = moveEvent;
export var moveEventEndHandle = moveEventEnd;
export var moveStart = moveStartEvent;
export var deleteFunc = deleteFunction;


function scanISBN(that,e){
  
    var haveShop = wx.getStorageSync('haveShop');
    if (haveShop==0){
        wx.navigateTo({url: '../create_shop/create_shop',});
        return;
    }

    let _this = that;
      wx.showActionSheet({
        
            itemList: ['扫描图书ISBN','手动录入'],
            itemColor: "#005757",
            success: function(res) {
                if (!res.cancel) {
                    if(res.tapIndex == 0){
                          
                            wx.scanCode({
                                  success: (res) => {
                                    //   _this.setData({
                                    //       isbn:res.result
                                    //   })
                                    //   console.log(res);
                                      console.log(res.result);

                                    findBookDetailByISBN(res.result);
                      
                                  }
                          })
                    }else if(res.tapIndex == 1){

                      
                         wx.navigateTo({url:"../publish/publish?"+"isUpdate=1"});
                    }
                }
            }
        })
   
}

function moveEvent(that,e){
    console.log("move");
    // touchmove事件
 
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    that.data.moveX = e.touches[0].pageX;
    that.data.moveY = e.touches[0].pageY;
    if((that.data.moveX-that.data.downX)>(that.data.moveY-that.data.downY)){
      that.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if((that.data.moveX-that.data.downX)<(that.data.moveY-that.data.downY)){
      that.istoright = false;
      
    }
    that.data.downX = that.data.moveX;
    that.data.downY = that.data.moveY;
}

function moveEventEnd(that,e){
    that.data.downX = 0;
    that.data.moveX = 0;
    that.data.downY = 0;
    that.data.moveY = 0;
    if(that.istoright){
      console.log("open");
      that.setData({
        open : true
      });
    }else{
      console.log("close");
      that.setData({
        open : false
      });
    }
}

function moveStartEvent(that,e){
     that.istoright = false;
    console.log("down");
    that.data.downX = that.data.moveX = e.touches[0].pageX;
    that.data.downY = that.data.moveY = e.touches[0].pageY;
}

function findBookDetailByISBN(isbn){

    // console.log("findBookDetailByISBN");
    // wx.showToast({title: '正在查询...',icon: 'loading',duration: 5000});
    // var data = {isbn:isbn};
    // var callback = {
    //     success:function(res){
    //             wx.hideToast();
    //             console.log(res.data);
    //             console.log("请求成功 end》》》》");
    //             if (res.data == null || res.data.data == null){
    //                console.log("请求数据为null");
    //                return;
    //             }
    //             console.log(res.data.data);
    //             wx.navigateTo({url:"../publish/publish"});

    //           },
    //     fail:function(res){
    //           wx.hideToast();
    //           console.log(res.data);
    //           console.log("请求失败》》》》》");
    //     }
        
    //   };
    //  $(BORROW_URL,'GET',data,callback);
    wx.navigateTo({url:"../publish/publish"});
}



function deleteFunction(that,shopId,id){

    console.log("shopId="+shopId);
    var data = {shopOpenId:shopId,itemId:id};

    console.log("请求参数="+data);

    //测试代码end
    var callback = {
        success:function(res){
                wx.hideToast();
                console.log(res.data);
                console.log("请求成功 end》》》》");
             
                that.setData({
                    isEditing:false
                });
                findMyliBrary(that,1,20);

              },
        fail:function(res){
              wx.hideToast();
              console.log(res.data);
              console.log("请求失败》》》》》");
        }
        
      };
     $(DELETE_BOOK,'POST',data,callback);
}