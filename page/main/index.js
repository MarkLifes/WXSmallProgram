// page/one/index.js
import {findBorrowOrder,findBorrowOrderShopList,show_dialog,close_wx_dialog,shaoyishao,confirm_accept_dialog,show_weixin_dialog,
click_borrow_item,click_lend_item} from '../../page/borrowedbooks/borrowedservice';

import {findLendOrder,findLendShopList} from '../../page/lendbooks/lendservice';

import {findMyliBrary,findLibraryListAndSave} from '../../page/mylibrary/mylibraryservice';

import {findNearLibrary} from '../../page/nearbylibrary/nearbylibraryservice.js';

import {scanISBNCode,moveEventHandle,moveEventEndHandle,moveStart,deleteFunc} from './mainservice.js';

//菜单导航
function toIndex(that,index){
    switch(index){
        case 0:
            that.switchPage(0,'动态');
            break;
        case 1:
            that.switchPage(1,'附近图书管');
            findNearLibrary(that,1,20);
            break;
        case 2:
            that.switchPage(2,'我的图书管');
            var haveShop = wx.getStorageSync('haveShop');
            if (haveShop==0){
                wx.navigateTo({url: '../create_shop/create_shop',});
            }else{
                findMyliBrary(that,1,20);
            }
            break;
        case 3:
             that.switchPage(3,'借入图书');
            //  that.setData({mylibrary_list : null,isLibrary:true});
            //  findBorrowOrderShopList(that,1,20);
             findBorrowOrder(that,1,20);
            break;
        case 4:
            that.switchPage(41,'借出图书');
            that.setData({mylibrary_list : null,isLibrary:true});
            findLendShopList(that,1,20);
            // findLendOrder(that,1,20);
            break;
        case 5:
            that.switchPage(5,'关于我们');
            break;
        case 6:
            wx.setStorageSync('sk','');
            that.back();
            // this.switchPage(6,'退出登陆');
            break;
      }
}



 var lend_confirm_accept_index;
 var apply_back_index;
 /**借入 */
 var borrow_confirm_accept_index;

 var CMD_CREATE_ORDER = 1;

Page({
  data:{
    index:1,
    open : false,
    downX: 0,
    moveX: 0,
    downY: 0,
    moveY: 9,
    istoright:true,
    headerUrl:null,
    nick_name:null,
    borrow_selected:true,
    borrow_list:[],
    borrow_page:1,
    lend_list:[],
    lend_page:1,
    mylibrary_list:[],
    mylibrary_page:1,
    nearbylibrarylist:[],
    isEditing:false,
    showConfirmAcceptStatus: false,
    acceptQrStatus:false,
    showQRcodeModelStauts:false,
    confirmBackStatus:false,
    applyBackStatus:false,
    weixinStatus:false,
    accept_qrcode_url:null,
    back_qrcode_url:null,
    acceptQrStatus:false,
    backQrStatus:false,
    isLibrary:false,
    //下单后回来的数据
    bookdetailResultData:0,
    main_booklist:[],
    shopId:null
  
  },

  onShow:function(e){
    
    if (wx.getStorageSync('lat')==null || wx.getStorageSync('lat')=='' ){
        wx.getLocation({
            type: 'wgs84',
            success: function(res) {
                console.log(res);
                var lat = res.latitude
                var lng = res.longitude
                var speed = res.speed
                var accuracy = res.accuracy
                wx.setStorageSync('lat', lat);
                wx.setStorageSync('lng', lng);
            }
        })
    }

    // this.setData({open:true});
    var sk = wx.getStorageSync('sk');
    if ( sk== null || sk.length==0){
       console.log("未登陆")
       wx.navigateTo({
          url: '../login/login'
       });
       return;
    }else{
        findLibraryListAndSave(this,1,50);
    }

    


    var avatarUrl = wx.getStorageSync('avatarUrl');
    var nickName = wx.getStorageSync('nickName');
    if(avatarUrl!=null && avatarUrl!=''){
      this.setData({
            headerUrl:avatarUrl
      });
    }else{
      this.setData({
          headerUrl:'../../images/default_header.jpg'
      });
    }
    if(nickName!=null && nickName!=''){
      this.setData({
          nick_name:nickName
      });
    }

    console.log(this.data.bookdetailResultData);
    console.log("main页面展示完成"+this.data.index);

    if (this.data.bookdetailResultData == CMD_CREATE_ORDER){
       this.switchPage(3,'借入图书');
       this.setData({bookdetailResultData:0});
       findBorrowOrder(this,1,20);
    }else{
       //TO Test
        toIndex(this,this.data.index);
    }

  },
  onReady:function(e){
    console.log("页面渲染完成");
    // this.setData({open:false});
  },
  onMenuClick:function(e){ //菜单点击事件
      var index = e.target.dataset.index;
      console.log("点击位置"+index);   
      toIndex(this,index);
  },
  borrow_show_weixin_dialog:function(e){//显示微信联系方式
        show_weixin_dialog(this,e);
  },
  borrow_close_weixin_dialog:function(event){//关闭微信联系方式
        close_wx_dialog(this,event);
  },
  confirmAccept: function (e) { //确认收到,出示二维码
        borrow_confirm_accept_index = parseInt(e.currentTarget.dataset.index); 
        console.log("borrowIndex="+borrow_confirm_accept_index);
         confirm_accept_dialog(this,e,borrow_confirm_accept_index);
  },
  confirm_shaoyishao_dialog:function(e){ //确认对话框
        show_dialog(this,"close");
        shaoyishao(this,borrow_confirm_accept_index);
  },
  confirmArrived:function(event){
        //出借人提示付款码
        lend_confirm_accept_index = parseInt(event.currentTarget.dataset.index); 
        console.log("confirm_accept"+lend_confirm_accept_index);
        var that = this;

        var qrcodeNoTip = wx.getStorageSync('qrcodeNoTip');
        if (qrcodeNoTip){
             console.log("直接展示二维码");
             show_dialog(this,"close");
             this.onPreviewGetPayCode(event);
           return;
        }
        var currentStatu = event.currentTarget.dataset.statu; 
        show_dialog(this,currentStatu);
        if ("close".endsWith(currentStatu)){
           console.log("展示二维码");
           this.onPreviewGetPayCode(event);
        }         

  },
  lend_ok:function(event){
      show_dialog(this,"close");
      this.onPreviewGetPayCode(event);
  },
  close_image:function(event){
      show_dialog(this,"close_image");
  },
  onPreviewGetPayCode:function(event){
        //展示收款码
        var that = this;
        console.log(event);
        // var index = parseInt(event.currentTarget.dataset.index); 
        console.log("index="+lend_confirm_accept_index);
        console.log(this.data.lend_list);
        
        if (this.data.lend_list!=null&& this.data.lend_list.length>0){
            console.log(this.data.lend_list[lend_confirm_accept_index]);
         
              //  var currentStatu = e.currentTarget.dataset.statu; 
               this.setData({
                 accept_qrcode_url: this.data.lend_list[lend_confirm_accept_index].ownerQRCode
               });
               show_dialog(this,"open_show_image");
              //     wx.previewImage({
              //     current: this.data.lendlist[confirm_accept_index].ownerQRCode, // 当前显示图片的http链接
              //     urls: [this.data.lendlist[confirm_accept_index].ownerQRCode] // 需要预览的图片http链接列表
              // });
            
        }
    },
  checkboxChange: function(e) { //checkboxChange
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
      if(e.detail.value!=null&&e.detail.value.length>0){
            wx.setStorageSync('noTip', true);
      }else{
            wx.setStorageSync('noTip', false);
      }
  },
  clickBorrowItem:function(e){
      click_borrow_item(this,e);
  },
  clickLendItem:function(e){
      click_lend_item(this,e);
  },
  onEdit:function(e){//编辑
      this.setData({
          isEditing:true
      });
  },
  onSave:function(e){//保存
      this.setData({
          isEditing:false
      });
  },
  onSearchNearLibrary:function(e){
      
  },
  onFeedbackList:function(e){//反馈
      wx.navigateTo({url:"../feedback/feedback"});
  },
  toPersonalPage:function(e){
      wx.navigateTo({url:"../personal/personal"});
  },
  onClickLibrary:function(e){
      var id = e.currentTarget.id;
      console.log("id="+id);
     if(this.data['index']==31){
        console.log("跳转借入订单");
     }else if(this.data['index']==41){
          console.log("跳转借出订单");
          this.switchPage(4,'借出图书');
          findLendOrder(this,id,1,20);
     }else{
        
        wx.navigateTo({url:"../library/library"+"?flag=0&shopId="+id});
     }
  },
  onClickNearLibrary:function(e){
      //传递一个参数标志是附近图书还是我的图书

     var id = e.currentTarget.id;
     wx.navigateTo({url:"../library/library"+"?flag=1&shopId="+id});
  },
  onClickItem:function(event){
   wx.navigateTo({
          url:'../book_detail/book_detail?id='+event.currentTarget.id+'&isHide=0'
      })
  },
  toUpdateBook:function(e){
    //  toast("修改");
     console.log(this.data['main_booklist'][0]);

     let str=JSON.stringify(this.data['main_booklist'][0]);

     wx.navigateTo({
       url: '../publish/publish?'+"isUpdate=0&data="+str
       });
  },toDeleteBook:function(e){
    //  toast("删除"+e.currentTarget.id);

     deleteFunc(this,this.data['shopId'],e.currentTarget.id);
  },
  switchPage:function(index,title){
      wx.setNavigationBarTitle({  title: title});
      this.setData({ index:index, open : false, title:title });
  },
  back:function(){
      wx.navigateBack({delta: 1})// 回退前 delta(默认为1) 页面
  },
  openMenu: function(e){
    if(this.data.open){
      this.setData({open : false});
    }else{
      this.setData({open : true});
    }
  },
  onPublish:function(e){
    var haveShop = wx.getStorageSync('haveShop');
    if (haveShop==0){
        wx.navigateTo({url: '../create_shop/create_shop',});
    }else{
         scanISBNCode(this,e);
    }
  },
  tap_start:function(e){
     // touchstart事件
      moveStart(this,e);
  },
  tap_drag: function(e){
      moveEventHandle(this,e)

  },
  tap_end: function(e){
     // touchend事件
     moveEventEndHandle(this,e)
  }
})