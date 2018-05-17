var util = require('../../util/util.js')
import {$,$POST,$Get} from '../../util/http';
import {CREATE_SHOP} from '../../util/url';


var publish_url = "https://www.bjdtd.cc/v2.0.0/add/item";

var upload_image_url = "https://www.bjdtd.cc/v2.0.0/upload/image";
/**
 * 图片上传
 */

function createShop(shopName,description,imageUrl,address,lng,lat,that){

    var data = {name:shopName,description:description,imageUrl:imageUrl,address:address,lng:lng,lat:lat};
    console.log("请求参数="+data);
     var callback = {
        success:function(res){
                wx.hideToast();
          
                if(res.data.err_no==0){
                       toast("创建成功");
                       wx.setStorageSync('haveShop', 1);
                }
                console.log("请求结果"+res.data);
                toast("创建成功");
              },
        fail:function(res){
              wx.hideToast();
              console.log(res.data);
              console.log("请求失败》》》》》");
        }
        
      };
     $(CREATE_SHOP,'POST',data,callback);
}


function textIsEmpty(text){
    // console.log(text);
    //  console.log(text.length);
    if (text == null || text.length==0){
        console.log("text is empty");
        return true;
    }else{
        return false;
    }

}
function toast(msg){
    wx.showToast({
        title: msg,
        icon: 'loading',
        duration: 500
    });
}
var app = getApp()
var lat;
var lng;

Page({
    data: {
       

        lat:null,
        lng:null,
       
        upload1:null,
        upload2:null,
        userInfo:null,
        phone:null,
        leftPicture:"../publish/tianjiatupian_a.png",

        picture1:'../publish/tianjiatupian_a.png',
        shopName:null,
        description:null


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
    

    onLoad: function () {
        console.log('onLoad')
        var localPhone = wx.getStorageSync('phone');
        var lat = wx.getStorageSync('lat');
        var lng = wx.getStorageSync('lng');
        console.log("localPhone="+localPhone+"lat="+lat+"lng="+lng);
        this.setData({
            phone : localPhone,
            lat:lat,
            lng:lng
        });
   
    },
    //创建
    bindSaveTap: function(e){
       // console.log(e)
       // var sk = wx.getStorageSync('sk');
      //  console.log("sk="+sk);
      var that = this;
      console.log(e.detail.value);
        var formData = {
            shopName:e.detail.value.shopName,
            description:e.detail.value.description
        }
     
    
        if("../publish/tianjiatupian_a.png".endsWith(this.data.picture1)){
              toast("请添加图书馆图片");
              return;
        }
   
        if(textIsEmpty(formData.shopName)){
            console.log("请输入图书馆名称");
            toast("请输入图书馆名称");
            return;
        }
       
         if(textIsEmpty(formData.description)){
            console.log("请填写出图书馆介绍");
            toast("请填写出图书馆介绍");
            return;
        }
   
       
                 wx.showToast({
                        title: '正在上传...',
                        icon: 'loading',
                        duration: 10000
                    });
                var sk = wx.getStorageSync('sk');
                console.log("sk="+sk);
                var fPath = this.data['picture1'];
                console.log(fPath[0]);
                wx.uploadFile({
                        url: upload_image_url, 
                        filePath: fPath[0]+'',
                        name: 'userfile',
                        formData:{
                            'user': 'test'
                        },
                        header: {
                                // 'content-type': 'application/json'
                                'content-type':'multipart/form-data',
                                'sk':sk
                                
                                }, // 设置请求的 header
                        success: function(res){

                                // console.log(res.data.data);
                                var jsonObject = JSON.parse(res.data);
                                console.log("上传结果"+jsonObject.data[0]);
                                that.setData({
                                    upload1:jsonObject.data[0],
                                    picture1:jsonObject.data[0]
                                });

                               createShop(formData.shopName,formData.description,jsonObject.data[0],'',
                               that.data['lng']+'',that.data['lat'],that);
                            
                        },
                        fail:function(e){
                            console.log("上传失败="+e);
                        }
                    })
    }, 


    onLeft:function(type){
           var _this = this;
           wx.chooseImage({  
                count: 1, // 默认9  
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
                success: function (res) {  
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                    _this.setData({  
                    picture1:res.tempFilePaths  
                    })  
                }  
            })  
    }
   
})