
// var url = "http://www.imooc.com/course/ajaxlist";
// var util = require('../../utils/http.js')
// import Animal from "../../utils/http"
  import {area,request,Request,$Get} from '../../utils/http';
  

var find_nearthings_url = "https://www.bjdtd.cc/nearbyitems"



/**
 * 分页查询附近物品,
 */
function request_nearthings(that,lat,lng, index , pageSize){
    console.log("request_nearthings="+index+"-"+pageSize);
    //   request(find_nearthings_url,lat,lng,1,10);
    //    var $ = new Request();
    //    $.get(find_nearthings_url,lat,lng,1,10)
    
    //   $Get(find_nearthings_url,lat,lng,1,10)
    
      that.setData({
        hidden:false
     });

     var sk = wx.getStorageSync('sk');
     console.log("第二次查询sk="+sk);
     wx.request({
            url: find_nearthings_url,
            data: {
              lat:lat,
              lng:lng,
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
                console.log(res.data);
                console.log(res.data.data);
                if (res.data.err_no == -1){
                    loginAndRequest(that);
                    return;
                }
                //当请求的数据为null的时候，当前页面是否有数据，
                if(res.data.data == null){
                     wx.hideToast();
                     //数据页面也等于null，整体显示空图片
                    if (that.data.list==null || that.data.list.length==0){
                           console.log("！清理数据");
                           that.setData({
                              hidden:true,
                              isHiddenScrollView:true,
                              loadingCount: 0,
                              images: []

                          });
                        return;
                    }else{
                           console.log("！！清理数据");
                        that.setData({
                            hidden:true,
                            isHiddenScrollView:false
                        });
                    }
           
                }

                let baseId = "img-" + (+new Date());

               // var list = that.data.list;
                var images = that.data.images;
                var list = that.data.list;
               // console.info(that.data.images);
               // console.info(res.data.list);
            
                for(var i = 0; i < res.data.data.length; i++){

                   var image = {id:"", pic: "", height: 0 ,itemName:"",chargePrice:"",itemId:"",distance:""};

                //    console.info(res.data.list[i].pic_url);
                   image.id = baseId + "-" + i;
                   image.pic = res.data.data[i].imageUrl[0];
                   image.height = 0;
                   image.itemName = res.data.data[i].itemName;
                   image.chargePrice = res.data.data[i].chargePrice;
                   image.itemId = res.data.data[i].itemId;
                   image.distance = res.data.data[i].distance;
                //    console.info(image);
                   //添加新的数据
                   images.push(image);
                   list.push(res.data.data[i]);
                }

                that.data.page ++;

                console.info("images"+images);
                console.info("list"+images);
                that.setData({
                    hidden:true,
                    loadingCount: images.length,
                    images: images,
                    list:list,
                    isHiddenScrollView:false
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
 * 第一次进入页面初始化附近物品
 */
function init_nearthings(that,lat,lng){
      that.setData({
        hidden:false
      });

     var sk = wx.getStorageSync('sk');
     console.log("init_nearthings--sk="+sk);
     wx.request({
            url: find_nearthings_url,
            data: {
              lat:lat,
              lng:lng,
              index:1,
              offset:10
              
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
               
                console.log(res.data);
                console.log(res.data.data);
                console.log(res.data.err_no);
               // if (res.data.err_no == -1){
               //    loginAndRequest(that);
               //    return;
               // }
           
          // if(res.data.data==null){
                wx.hideToast();
                if (res.data.data==null || res.data.data.length==0){
                    
                    that.setData({
                        hidden:true,
                        isHiddenScrollView:true,
                        images: []
                    });
                  
                    console.log("附近没有书籍");
                     var flag =  wx.getStorageSync('firstLogin');
                    if (!flag){
                        console.log("第一次已经登陆");
                        wx.setStorageSync('firstLogin',true);
                    }else{
                        console.log("slfjals");
                    }
                    return;
                }else{
                    that.setData({
                        hidden:true,
                        isHiddenScrollView:false
                    });
                      console.log("附近有书籍");
                }

               let baseId = "img-" + (+new Date());

               var images = that.data.images;
               var list = that.data.list;
           // console.info(that.data.images);
           // console.info(res.data.list);
                images = [];
                for(var i = 0; i < res.data.data.length; i++){

                    var image = {id:"", pic: "", height: 0 ,itemName:"",chargePrice:"",itemId:"",distance:""};

                    image.id = baseId + "-" + i;
                    image.pic = res.data.data[i].imageUrl[0];
                    image.height = 0;
                    image.itemName = res.data.data[i].itemName;
                    image.chargePrice = res.data.data[i].chargePrice;
                    image.itemId = res.data.data[i].itemId;
                    image.distance = res.data.data[i].distance;
                    images.push(image);
                    list = res.data.data;
                }
                that.data.images = images;
                col1H = 0
                col2H = 0;
                that.setData({
                    hidden:true,
                    images: images,
                    list:res.data.data
                });
               console.log("更新页面数据");
               console.log("images"+that.data.images.length);
               console.log("list"+that.data.list.length);
               var flag =  wx.getStorageSync('firstLogin');
                if (!flag){
                    console.log("第一次已经登陆");
                    wx.setStorageSync('firstLogin',true);
                }else{
                    console.log("slfjals");
                }

            },
            fail: function () {
              console.log("请求异常");
              // fail
              // wx.hideToast();
            },
            complete: function () {
              // complete
            }
          })
}
/**
 * 重新登录并发送查询请求
 */
function loginAndRequest(that2){
        app.getUserInfo(function(userInfo){
                
                console.log("userinfo");
                if (isCanStart()){
                    console.log("loginAndRequest重新定位");
                    wx.getLocation({
                      type: 'wgs84',
                      success: function(res) {
                          console.log(res);
                          lat = res.latitude
                          lng = res.longitude
                          var speed = res.speed
                          var accuracy = res.accuracy
                          
                            wx.setStorageSync('locationTime',Date.now());
                            wx.setStorageSync('lat',lat);
                            wx.setStorageSync('lng',lng);
                          // that2.data.page = 1;
              
                        // var flag =  wx.getStorageSync('firstLogin');
                        // if (!flag){
                        //     console.log("第一次已经登陆");
                        //     wx.setStorageSync('firstLogin',true);
                        // }
                          console.log("开始加载附近物品");
                    
                          init_nearthings(that2,lat,lng);
                      }
                   })
                }else{
                    console.log("loginAndRequest不需要定位");
                    var lat = wx.getStorageSync('lat',lat);
                    var lng = wx.getStorageSync('lng',lng);
                    console.log(lat + "=="+ lng);
                    init_nearthings(that2,lat,lng);
                }
                
          }); 
}

function isCanStart(){
   var lastTime = wx.getStorageSync('locationTime');
   var currentTime = Date.now();
   console.log(currentTime - lastTime);
   if (currentTime - lastTime>5*60 *1000){
       return true;
   }else{
       return false;
   }
}

/**
 * 左右两列的宽高
 */
let col1H = 0;
let col2H = 0;


var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;



var lat;
var lng;

var that2;
var localRequest =  false;
var app = getApp()
var showCount = 0;
Page({

    data: {
        scrollH: 0,
        imgWidth: 0,
        loadingCount: 0,
        images: [],
        col1: [],
        col2: [],
        list:[],
        collist1:[],
        collist2:[],
        page:1,
        isHiddenScrollView:false,
        backQrStatus:false
    },
 onShareAppMessage: function () {
    return {
      title: '物享',
      path: 'pages/index/index',
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
   onShow:function(){
        

       
        // let animal = new Animal();
        // animal.says('hello');
        //  var H = new $();
        //  console.log(H.getY(12312));
        // console.log(new area(4));
        var flag = wx.getStorageSync('firstLogin');
        showCount++;
        if (!flag){
                    this.setData({
                    urls:['./1.jpeg','2.jpeg','3.jpeg','4.jpeg']
                });
                this.guide_window("open"); 
              console.log("第一次登陆");
              if (showCount==1){
                 loginAndRequest(this);
               }
              return;
        }else{
            console.log("第二次登陆");
        }
        col1H = 0;
        col2H = 0;
        console.log("onShow");

        var that = this;
        // GetList(that);
        // console.log("page11111="+this.data.page);
        var page = this.data.page;
             
        var sk = wx.getStorageSync('sk');
        if (sk!=null && sk.length!=0){
                console.log("页面被后台回调前台，刷新界面 sk存在 ="+sk);
                if(isCanStart()){
                      console.log("onShow重新定位");
                      wx.getLocation({
                          type: 'wgs84',
                          success: function(res) {
                              // console.log(res);
                              lat = res.latitude
                              lng = res.longitude
                              var speed = res.speed
                              var accuracy = res.accuracy
                              
                              that.data.page = 1;
                              wx.setStorageSync('locationTime',Date.now());
                              wx.setStorageSync('lat',lat);
                              wx.setStorageSync('lng',lng);
                        //init_nearthings(that,lat,lng);
                            //   that.data.list = [];
                            //   that.data.images = [];
                            //   that.setData({
                            //         hidden:true,
                            //         isHiddenScrollView:true,
                            //         loadingCount: 0,
                            //         images: [],
                            //         list:[],
                            //         col1: [],
                            //         col2: []

                            //   });
                               that.data.list = [];
                    that.data.images = [];
                    that.data.col1 = [];
                    that.data.col2 = [];
                        
                              request_nearthings(that,lat,lng,that.data.page,100);
                          }
                      })
                }else{
                      console.log("onShow使用上次定位");
                    var lat = wx.getStorageSync('lat',lat);
                    var lng = wx.getStorageSync('lng',lng);
                    console.log(lat + "=="+ lng);
                    that.data.page = 1;
                    that.data.list = [];
                    that.data.images = [];
                    that.data.col1 = [];
                    that.data.col2 = [];
                    // that.setData({
                    //     hidden:true,
                    //     isHiddenScrollView:true,
                    //     loadingCount: 0,
                    //     images: [],
                    //     list:[],
                    //     col1: [],
                    //     col2: []

                    // });
                    //init_nearthings(that,lat,lng);
                    request_nearthings(that,lat,lng,that.data.page,100);
                }
             
        }else{
               console.log("第一次登录存sk不存在，调用登陆，查询");
               loginAndRequest(that);

        }
            
    
  },
    onLoad: function () {
        console.log("onLoad");
        col1H = 0;
        col2H = 0;

        that2 = this;

        // var aaa = wx.getStorageSync('firstLogin');
        // console.log(aaa);
        // if (!aaa){
        //     console.log("第一次登陆");
        //      loginAndRequest(this);
        //     return;
        // }else{
        //     console.log("第二次登陆");
        // }
     
        wx.getSystemInfo({
            success: (res) => {
                let ww = res.windowWidth;
                let wh = res.windowHeight;
                let imgWidth = ww * 0.48;
                let scrollH = wh;

                this.setData({
                    scrollH: scrollH,
                    imgWidth: imgWidth
                });

              //  this.loadImages();
            }
        });

    },
    /**
     * 当图片对象绑定完成后会回调返回图片信息
     */
    onImageLoad: function (e) {
        console.log("onImageLoad");
        let imageId = e.currentTarget.id;
        let oImgW = e.detail.width;         //图片原始宽度
        let oImgH = e.detail.height;        //图片原始高度
        let imgWidth = this.data.imgWidth;  //图片设置的宽度
        let scale = imgWidth / oImgW;        //比例计算
        let imgHeight = 400;     //自适应高度

        let images = this.data.images;
        let imageObj = null;
        let listObj = null;

        if (images==null || images.length==0){
            if(this.data.list==null || this.data.list.length==0){
                    console.log("清空数据");
                    this.setData({
                    col1: [],
                    col2: []
                    });
            }
            //如果本次image也是null也不更新界面
            return;
        }
        for (let i = 0; i < images.length; i++) {
            let img = images[i];
            let obj = this.data.list[i];
            if (img.id === imageId) {
                imageObj = img;
                listObj = obj;
                break;
            }
        }

        imageObj.height = imgHeight;

        let loadingCount = this.data.loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;
        // let collist1 = this.data.collist1;
        // let collist2 = this.data.collist2;
        //  console.log("col1H="+col1H);
        //  console.log("col2H="+col2H);
        //  console.log("col1="+col1.length);
        //  console.log("col2="+col2.length);
        //  console.log("imgHeight="+imgHeight);
        if (col1H <= col2H) {
            col1H += imgHeight;
            col1.push(imageObj);
            // collist1.push(listObj);
        } else {
            col2H += imgHeight;
            col2.push(imageObj);
            // collist2.push(listObj);
        }

        // console.log("collist1"+collist1);
        // console.log("collist1"+collist2);
        let data = {
            loadingCount: loadingCount,
            col1: col1,
            col2: col2,
        };
        console.log(data);
        // //当图片等于零这样置空
        if (!loadingCount) {
            data.images = [];
        }

        this.setData(data);
    },
    /**
     * 这里绑定的是滚动到底部函数，第一次我们手动调用一下
     */
    loadImages: function () {
        console.log("loadImages");
        // console.log("page2222="+this.data.page);
       // GetList(this);
        //  request_nearthings(this,lat,lng,this.data.page,10);
    },
    bindViewTapLeft: function(event) {
        console.log("左侧点击"+event.currentTarget.id);
        wx.navigateTo({
            url:'../index_detail/index_detail?id='+event.currentTarget.id+'&token=13'
        })
    },
    bindViewTapRight:function(event){
       console.log("右侧点击"+event.currentTarget.id);
         wx.navigateTo({
                url:'../index_detail/index_detail?id='+event.currentTarget.id+'&token=13'
            })
    },guide_window: function(currentStatu){ 
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
    },close_guide:function(){
          this.guide_window("close");
    }

})