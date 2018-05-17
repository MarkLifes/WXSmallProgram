
import {$,$POST,$Get} from '../../util/http';
import {BORROW_URL} from '../../util/url';


export var findBorrowOrder = findOrderBorrow;
export var show_dialog = ShowDialog;
export var close_wx_dialog = closeWeiXinDialog;
export var shaoyishao = ShaoYiShao;
export var confirm_accept_dialog = ConfirmAcceptDialog;
export var show_weixin_dialog = ShowWeiXinDialog;
export var click_borrow_item = ClickItem;
export var findBorrowOrderShopList = FindBorrowShopList;



export function FindBorrowShopList(that,index,pageSize){
         var data = {index:index,offset:pageSize};

         var list = [];

         var shop = {name:'人工智能',description:'很好'};
         list.push(shop);
            list.push(shop);

         that.setData({
                mylibrary_list : list,
                isLibrary:true
          });

}

/**
 * 分页查询借入订单,当传入1就清空之前的
 * @param {*} that 
 * @param {*} index 
 * @param {*} pageSize 
 */
export function findOrderBorrow(that,index,pageSize){
    console.log("findOrderBorrow");
    wx.showToast({title: '正在查询...',icon: 'loading',duration: 10000});
    var data = {index:index,offset:pageSize};

    var callback = {
        success:function(res){
                wx.hideToast();
                console.log(res.data);
                console.log("请求成功 end》》》》");
                if (res.data==null || res.data.data==null){
                   console.log("请求数据为null");
                   return;
                }
              
                console.log(res.data.data);
                var list;
                if (index!=1){
                    list = that.data.borrow_list;
                    var page = that.borrow_page + 1;
                }else{
                    list = [];
                }
             
                for(var i = 0; i < res.data.data.length; i++){
                    list.push(res.data.data[i]);
                }

                that.setData({
                   borrow_list : list,
                   borrow_page : page
                });
               
                that.setData({
                    hidden:true
                });
              },
        fail:function(res){
              wx.hideToast();
              console.log(res.data);
              console.log("请求失败》》》》》");
        }
        
      };
     $(BORROW_URL,'GET',data,callback);
  
}



export function ShowDialog(that,currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        that.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        that.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          that.setData({ 
            animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
            that.setData( 
            { 
              weixinStatus: false,
              showConfirmAcceptStatus: false,
              showQRcodeModelStauts:false,
       
            } 
          ); 
          } 

          if (currentStatu == "close_image"){
             that.setData( 
            { 
               acceptQrStatus:false
            });
          }
        }.bind(that), 200) 
          
        // 显示
        if (currentStatu == "open_wx_dialog") { 
            that.setData( 
            { 
              weixinStatus: true
            } 
          ); 
        }else if (currentStatu == "open_confirm_dialog"){
            that.setData( 
            { 
              showConfirmAcceptStatus: true
            } 
          ); 
        }else if(currentStatu == "open_accept_qrcode"){
           that.setData( 
            { 
              showQRcodeModelStauts: true
            });
        }else if(currentStatu == "open_show_image"){
            that.setData({
                acceptQrStatus:true
            });
        }
    }

export function closeWeiXinDialog(that,event){
        var weixin_no =event.currentTarget.dataset.weixin;
         wx.setClipboardData({
           data: weixin_no,
           success: function(res){
             wx.showToast({
                title: '已经复制到剪切板',
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
        show_dialog(that,"close");
}

export function ShaoYiShao(that,borrow_index){
       console.log("borrowlist="+that.data.borrow_list);
       console.log("applyPay="+borrow_index);
       var item = that.data.borrow_list[borrow_index];
       console.log("data"+item);
    
    //    let _this = that;
           wx.scanCode({
                success: (res) => {
                    // _this.setData({
                    //     isbn:res.result
                    // })
                    console.log(res);
                    console.log(res.result);
                    var array = res.result.split("@");
                    console.log(array);
                    wx.navigateTo({
                          url:'../request-payment/request-payment?orderId='+array[0]+"&money="+item.deposit
                    })
                }
         })
}

export function ConfirmAcceptDialog(that,e,borrow_confirm_accept_index){
    console.log("**************");
    var noTip = wx.getStorageSync('noTip');
    var borrowIndex = parseInt(e.currentTarget.dataset.index); 
    console.log();
    if (noTip){
        console.log("直接吊起扫码");
        show_dialog(that,"close") ;
        // shaoyishao(that,borrow_confirm_accept_index );
        return;
    }
    
    var currentStatu = e.currentTarget.dataset.statu; 
    show_dialog(that,currentStatu) 
    if ("close".endsWith(currentStatu)){
        console.log("吊起扫码");
        // ShaoYiShao(that,2);
    }
}

export function ShowWeiXinDialog(that,e){
    console.log("展示微信");
        var index = parseInt(e.currentTarget.dataset.index); 
        that.setData({
          weixin_no:that.data.borrow_list[index].ownerwechat
        });
        var currentStatu = e.currentTarget.dataset.statu; 
        show_dialog(that,currentStatu) 
}

export function ClickItem(that,event){
          console.log("查看详情"+event.currentTarget.id);
          wx.navigateTo({
               url:'../borrowedbooks_detail/my_orders_detail?id='+event.currentTarget.id+'&selectIndex='+0
           })
 }