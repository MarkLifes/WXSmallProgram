var url = "http://www.imooc.com/course/ajaxlist";
var page =0;
var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;


var confirm_send_url = "https://www.bjdtd.cc/itemsended";
var apply_back_url ="https://www.bjdtd.cc/applyreturn";
var comfirm_back_url = "https://www.bjdtd.cc/payorderfee";

/**
 * 确认归还
 */
function confirm_back(that,out_trade_no){
 

    wx.showToast({
                title: '正在查询...',
                icon: 'loading',
                duration: 10000
     });

    //  var yangsk = '6f7de3c8-c672-ed19-3aab-f8e41722f956';
    
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: comfirm_back_url,
            data: {
              out_trade_no:out_trade_no
              
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
               console.log("归还成功");
              //  findOrderBorrowOut(that,1,40);

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
 * 申请归还
 */
function apply_back(that,out_trade_no){
 

    wx.showToast({
                title: '正在查询...',
                icon: 'loading',
                duration: 10000
     });

    //  var yangsk = '6f7de3c8-c672-ed19-3aab-f8e41722f956';
    
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: apply_back_url,
            data: {
              out_trade_no:out_trade_no
              
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
 * 确认送达
 */
function confirm_send(that,out_trade_no){
 

    wx.showToast({
                title: '正在查询...',
                icon: 'loading',
                duration: 10000
     });

    //  var yangsk = '6f7de3c8-c672-ed19-3aab-f8e41722f956';
    
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: confirm_send_url,
            data: {
              out_trade_no:out_trade_no
              
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
                 findOrderBorrowOut(this,1,40);
        

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

var find_my_borrow_out_url="https://www.bjdtd.cc/lendorders";

/**
 * 查询借出订单
 */
function findOrderBorrowOut(that,index,pageSize){
   console.log("findOrderBorrowOut");
  
 
    wx.showToast({
                title: '正在查询...',
                icon: 'loading',
                duration: 10000
     });

     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: find_my_borrow_out_url,
            data: {
              index:index,
              offset:pageSize
              
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
               
             // console.log(res);
               console.log(res.data);
               console.log(res.data.data);
                 var list = that.data.lendlist;
                 console.log( res.data.data.length);
                for(var i = 0; i < res.data.data.length; i++){
                    list.push(res.data.data[i]);
                }
                // for(var i = 0; i < 10; i++){
                //     list.push(2);
                // }
                that.setData({
                    lendlist : list
                });
                page ++;
                that.setData({
                    hidden:true
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
var find_my_borrow_in_url = "https://www.bjdtd.cc/borroworders";
/**
 * 查询借入订单
 */
function findOrderBorrowIn(that,index,pageSize){
    console.log("findOrderBorrowIn");

    wx.showToast({
                title: '正在查询...',
                icon: 'loading',
                duration: 10000
     });
     
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: find_my_borrow_in_url,
            data: {
              index:index,
              offset:pageSize
              
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
               
             // console.log(res);
               console.log(res.data);
               console.log(res.data.data);
                 var list = that.data.borrowlist;
                //  console.log( res.data.data.length);
              
                for(var i = 0; i < res.data.data.length; i++){
                    list.push(res.data.data[i]);
                }
                //  for(var i = 0; i < 10; i++){
                //     list.push(1);
                // }
                that.setData({
                    borrowlist : list
                });
                page ++;
                that.setData({
                    hidden:true
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
 * 申请归还
 */
var applyreturn = "https://www.bjdtd.cc/applyreturn";
function apply_back(that,orderId){

     
    wx.showToast({
        title: '提交申请中',
        icon: 'loading',
        duration: 10000
    });
     var sk = wx.getStorageSync('sk');
     console.log(sk);
     wx.request({
            url: applyreturn,
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
   
            
             // console.log(res);
                console.log(res.data);
               console.log(res.data.data);
               
                   wx.showToast({
                        title: '已经提交申请',
                        icon: 'loading',
                        duration: 1000
                   });
                    findOrderBorrowIn(this,1,40);
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

function clearData(that){
        that.setData({
            hidden:false,
            borrowlist:[],
            lendlist:[],
            scrollTop : 0,
            scrollHeight:0
        });

}

 var confirm_accept_index;
 var apply_back_index;
 /**借入 */
 var borrow_confirm_accept_index;

 var page = 1;
Page({
    data:{
        selected:true,
        selected1:false,
        borrowlist:[],
        lendlist:[],
        showModalStatus: false,
        showQRcodeModelStauts:false,
        confirmBackStatus:false,
        applyBackStatus:false,
        weixinStatus:false,
        accept_qrcode_url:null,
        back_qrcode_url:null,
        acceptQrStatus:false,
        backQrStatus:false
        
    }, 
    onLoad:function(){
       console.log("myorder onLoad");
    },
  
    powerDrawer: function (e) { 
      var noTip = wx.getStorageSync('noTip');
      borrow_confirm_accept_index = parseInt(e.currentTarget.dataset.index); 
      if (noTip){
         console.log("直接吊起扫码");
         this.util("close") ;
         this.shaoyishao(e);
         return;
      }
     
      var currentStatu = e.currentTarget.dataset.statu; 
      this.util(currentStatu) 
      if ("close".endsWith(currentStatu)){
         console.log("吊起扫码");
          this.shaoyishao(e);
      }
      // this.util(currentStatu) 
    },confirm_shaoyishao_dialog:function(e){
        this.util("close") 
        this.shaoyishao(e);
    },
    util: function(currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({ 
          animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
          this.setData( 
          { 
          showModalStatus: false
          } 
          ); 
          } 
        }.bind(this), 200) 
          
        // 显示 
        if (currentStatu == "open") { 
          this.setData( 
          { 
          showModalStatus: true
          } 
          ); 
        } 
    },
    qrcodeUtil: function(currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({ 
          animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
          this.setData( 
          { 
          showQRcodeModelStauts: false
          } 
          ); 
          } 
        }.bind(this), 200) 
          
        // 显示 
        if (currentStatu == "open") { 
          this.setData( 
          { 
          showQRcodeModelStauts: true
          } 
          ); 
        } 
    },
      confirmBackUtil: function(currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({ 
          animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
          this.setData( 
          { 
          confirmBackStatus: false
          } 
          ); 
          } 
        }.bind(this), 200) 
          
        // 显示 
        if (currentStatu == "open") { 
          this.setData( 
          { 
          confirmBackStatus: true
          } 
          ); 
        } 
    },
     applyBackUtil: function(currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({ 
          animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
          this.setData( 
          { 
          applyBackStatus: false
          } 
          ); 
          } 
        }.bind(this), 200) 
          
        // 显示 
        if (currentStatu == "open") { 
          this.setData( 
          { 
          applyBackStatus: true
          } 
          ); 
        } 
    },weixin_dialog: function(currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({ 
          animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
          this.setData( 
          { 
             weixinStatus: false
          } 
          ); 
          } 
        }.bind(this), 200) 
          
        // 显示 
        if (currentStatu == "open") { 
          this.setData( 
          { 
             weixinStatus: true
          } 
          ); 
        } 
    },
    selected:function(e){
        console.log("left");
        this.setData({
            selected1:false,
            selected:true
        });
         this.setData({
            hidden:false,
            borrowlist:[],
            lendlist:[],
            scrollTop : 0,
            scrollHeight:0
        });
        console.log("选择借入订单");
        findOrderBorrowIn(this,1,100);
    },
    selected1:function(e){
        console.log("right");
        this.setData({
            selected:false,
            selected1:true
        });
          this.setData({
            hidden:false,
            borrowlist:[],
            lendlist:[],
            scrollTop : 0,
            scrollHeight:0
        });
        findOrderBorrowOut(this,1,40);
    },
    onShow:function(){
       page = 1;
       this.setData({
            hidden:false,
            borrowlist:[],
            lendlist:[],
            scrollTop : 0,
            scrollHeight:0
        });
        var that = this;
        //GetList(that);
        // findOrderBorrowOut(that,1,20);
        console.log("查询订单");
  
      wx.connectSocket({
        url: 'wss://www.bjdtd.cc/ws'
      })

      //注意这里有时序问题，
      //如果 wx.connectSocket 还没回调 wx.onSocketOpen，而先调用 wx.closeSocket，那么就做不到关闭 WebSocket 的目的。
      //必须在 WebSocket 打开期间调用 wx.closeSocket 才能关闭。
      wx.onSocketOpen(function() {
        // wx.closeSocket()
        console.log("连接成功");
           var sk = wx.getStorageSync('sk');
        wx.sendSocketMessage({
          data: sk,
          success: function(res){
            // success
                 console.log("发送成功");
                 
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        })
      })

      wx.onSocketMessage(function(res) {
        console.log('收到服务器内容：' + res.data)

         that.accept_qrcode_dialog("close");
         that.back_qrcode_dialog("close");

         if(that.data.selected){
            //  console.log("111");
            page = 1;
            clearData(that);
            findOrderBorrowIn(that,1,40);
          }else{
            // console.log("222");
            page = 1;
            clearData(that);
            findOrderBorrowOut(that,1,40);
          }

      })
      wx.onSocketClose(function(res) {
        console.log('WebSocket 已关闭！')
      })
      if(this.data.selected){
        //  console.log("111");
         page = 1;
         clearData(this);
         findOrderBorrowIn(this,1,40);
      }else{
        // console.log("222");
         page = 1;
         clearData(this);
         findOrderBorrowOut(this,1,40);
      }
          // findOrderBorrowIn(this,1,40);
    },
    bindDownLoad:function(){
        var that = this;
               // findOrderBorrowIn(that,1,20);
    
       // GetList(that);
    },
    bindDownLoad2:function(){
        var that = this;
        //    findOrderBorrowOut(that,1,20);
        // findOrderBorrowIn(that,1,20);
       // GetList(that);
    },
    clickItem:function(event){
        console.log("查看详情"+event.currentTarget.id);
          var index;
            if(this.data.selected){
            //  console.log("111");
              index = 0;
           }else{
              index = 1;
           }
          wx.navigateTo({
               url:'../my_orders_detail/my_orders_detail?id='+event.currentTarget.id+'&selectIndex='+index
           })
    },
    confirm_accept:function(event){
        //出借人提示付款码
         confirm_accept_index = parseInt(event.currentTarget.dataset.index); 
        console.log("confirm_accept"+confirm_accept_index);
        var that = this;

        var qrcodeNoTip = wx.getStorageSync('qrcodeNoTip');
        if (qrcodeNoTip){
           console.log("直接展示二维码");
           this.qrcodeUtil("close");
             this.onPreviewGetPayCode(event);
           return;
        }
        var currentStatu = event.currentTarget.dataset.statu; 
        this.qrcodeUtil(currentStatu); 
        if ("close".endsWith(currentStatu)){
           console.log("展示二维码");
           this.onPreviewGetPayCode(event);
        }         

    
    },confirm_accept_dialog:function(event){
          this.qrcodeUtil("close"); 
          this.onPreviewGetPayCode(event);
    },
    confirm_back:function(event){
      //出借人确认归还
        var currentStatu = event.currentTarget.dataset.statu; 
        var confirmBackNoTip = wx.getStorageSync('confirmBackNoTip');

        var _this = this;
        if (confirmBackNoTip){
          this.confirmBackUtil("close");
        
           //调用扫码
           wx.scanCode({
                success: (res) => {
                   
                    console.log(res);
                    console.log(res.result);
                     var array = res.result.split("@");
                     console.log(array[0])
                    confirm_back(this,array[0]);
                  
                }
         })
          return;
        }
        if("close".endsWith(currentStatu)){
            //调用扫码
            wx.scanCode({
                success: (res) => {
                   
                    console.log(res);
                    console.log(res.result);
                    var array = res.result.split("@");
                    console.log(array[0])
                    confirm_back(this,array[0]);
                }
         })
        }
        this.confirmBackUtil(currentStatu);
        // confirm_back(that,event.currentTarget.id);
        console.log("confirm_back"+event.currentTarget.id);

        
    },
    apply_back:function(event){
        //承接人申请归还
       
        apply_back_index = parseInt(event.currentTarget.dataset.index); 
         console.log("apply back_index"+apply_back_index);
        var applyBackNoTip = wx.getStorageSync('applyBackNoTip');
        if (applyBackNoTip){
           //展示归还码
           this.onPreviewBackCode(event);
           this.applyBackUtil("close");
           return;
        }
        var currentStatu = event.currentTarget.dataset.statu; 
        if ("close".endsWith(currentStatu)){
             //展示归还码
           this.onPreviewBackCode(event);
        }
        this.applyBackUtil(currentStatu)
        // apply_back(that,event.currentTarget.id);
    },apply_back_dialog:function(event){
       
         console.log("apply back close");
         this.applyBackUtil("close")
         this.onPreviewBackCode(event);
    },
    applyPay:function(event){
       //承接人支付押金
      //  var index = parseInt(event.currentTarget.dataset.index); 
      //  console.log("applyPay"+index);
      //  var item = this.data.lendlist[index];
      //  console.log("data"+item);
       
    },
    shaoyishao:function(event){
      //确认收到物品的扫一扫
        // var index = parseInt(event.currentTarget.dataset.index); 
               console.log("borrowlist="+this.data.borrowlist);
       console.log("applyPay"+borrow_confirm_accept_index);
       var item = this.data.borrowlist[borrow_confirm_accept_index];
       console.log("data"+item);
       
       let _this = this;
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
    }, checkboxChange: function(e) {
       console.log('checkbox发生change事件，携带value值为：', e.detail.value)
       if(e.detail.value!=null&&e.detail.value.length>0){
            wx.setStorageSync('noTip', true);
       }else{
             wx.setStorageSync('noTip', false);
       }
    },showQRcodeChange:function(e){
         console.log('showQRcodeChange事件，携带value值为：', e.detail.value)
        if(e.detail.value!=null&&e.detail.value.length>0){
            wx.setStorageSync('qrcodeNoTip', true);
        }else{
            wx.setStorageSync('qrcodeNoTip', false);
        }
    },confirmBackChange:function(e){
        console.log('confirmBackChange事件，携带value值为：', e.detail.value)
        if(e.detail.value!=null&&e.detail.value.length>0){
            wx.setStorageSync('confirmBackNoTip', true);
        }else{
            wx.setStorageSync('confirmBackNoTip', false);
        }
    },applyBackChange:function(e){
       console.log('applyBackChange事件，携带value值为：', e.detail.value)
        if(e.detail.value!=null&&e.detail.value.length>0){
            wx.setStorageSync('applyBackNoTip', true);
        }else{
            wx.setStorageSync('applyBackNoTip', false);
        }
      },onPreviewGetPayCode:function(event){
        //展示收款码
        var that = this;
        console.log(event);
        // var index = parseInt(event.currentTarget.dataset.index); 
        console.log("index="+confirm_accept_index);
        console.log(this.data.lendlist);
        
        if (this.data.lendlist!=null&& this.data.lendlist.length>0){
            console.log(this.data.lendlist[confirm_accept_index]);
         
              //  var currentStatu = e.currentTarget.dataset.statu; 
               this.setData({
                 accept_qrcode_url: this.data.lendlist[confirm_accept_index].ownerQRCode
               });
               this.accept_qrcode_dialog("open");
              //     wx.previewImage({
              //     current: this.data.lendlist[confirm_accept_index].ownerQRCode, // 当前显示图片的http链接
              //     urls: [this.data.lendlist[confirm_accept_index].ownerQRCode] // 需要预览的图片http链接列表
              // });
            
        }
    },onPreviewBackCode:function(event){
        //展示归还码
        var that = this;
        console.log(event);
        console.log("归还码"+apply_back_index);
        console.log(this.data.borrowlist);
        if (this.data.borrowlist!=null && this.data.borrowlist.length>0){
            console.log(this.data.borrowlist[apply_back_index]);
            // if (this.data.data.imageUrl!=null &&this.data.data.imageUrl.length>0 ){
               this.setData({
                 back_qrcode_url: this.data.borrowlist[apply_back_index].customerQRCode
               });
               this.back_qrcode_dialog("open");
              //   wx.previewImage({
              //     current: this.data.borrowlist[apply_back_index].customerQRCode, // 当前显示图片的http链接
              //     urls: [this.data.borrowlist[apply_back_index].customerQRCode] // 需要预览的图片http链接列表
              // });
            // }
        }
    },callTap:function(event){
       var index = parseInt(event.currentTarget.dataset.index); 
       console.log("callTap"+index);
       console.log("callTap-item"+this.data.borrowlist[index])
           wx.makePhoneCall({
             phoneNumber: this.data.borrowlist[index].ownerPhone
+"", //此号码并非真实电话号码，仅用于测试
          success:function(){
            console.log("拨打电话成功！")
          },
          fail:function(){
            console.log("拨打电话失败！")
          }
      })
    },weixinTap:function(e){
        console.log("展示微信");
        var index = parseInt(e.currentTarget.dataset.index); 
        this.setData({
          weixin_no:this.data.borrowlist[index].ownerwechat

        });
        var currentStatu = e.currentTarget.dataset.statu; 
        this.weixin_dialog(currentStatu) 
    },weixin_close:function(event){
        // console.log(event.currentTarget.id);
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
        this.weixin_dialog("close");
    },accept_qrcode_dialog: function(currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({ 
          animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
          this.setData( 
          { 
             acceptQrStatus: false
          } 
          ); 
          } 
        }.bind(this), 200) 
          
        // 显示 
        if (currentStatu == "open") { 
          this.setData( 
          { 
             acceptQrStatus: true
          } 
          ); 
        } 
    },back_qrcode_dialog: function(currentStatu){ 
        /* 动画部分 */
        // 第1步：创建动画实例 
        var animation = wx.createAnimation({ 
          duration: 200, //动画时长 
          timingFunction: "linear", //线性 
          delay: 0 //0则不延迟 
        }); 
          
        // 第2步：这个动画实例赋给当前的动画实例 
        this.animation = animation; 
          
        // 第3步：执行第一组动画 
        animation.opacity(0).rotateX(-100).step(); 
          
        // 第4步：导出动画对象赋给数据对象储存 
        this.setData({ 
          animationData: animation.export() 
        }) 
          
        // 第5步：设置定时器到指定时候后，执行第二组动画 
        setTimeout(function () { 
          // 执行第二组动画 
          animation.opacity(1).rotateX(0).step(); 
          // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
          this.setData({ 
          animationData: animation 
          }) 
          
          //关闭 
          if (currentStatu == "close") { 
          this.setData( 
          { 
             backQrStatus: false
          } 
          ); 
          } 
        }.bind(this), 200) 
          
        // 显示 
        if (currentStatu == "open") { 
          this.setData( 
          { 
             backQrStatus: true
          } 
          ); 
        } 
    },close_accept_qrcode:function(e){
        this.accept_qrcode_dialog("close");
         page = 1;
        clearData(this);
        findOrderBorrowOut(this,1,40);
    },close_back_qrcode:function(e){
        this.back_qrcode_dialog("close"); 
        page = 1;
        clearData(this);
        findOrderBorrowIn(this,1,40);
    }


})