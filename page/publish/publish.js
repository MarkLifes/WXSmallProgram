var util = require('../../util/util.js')

// var publish_url = "https://www.bjdtd.cc/v2.0.0/add/item";

var publish_url = "https://www.bjdtd.cc/v2.0.0/add/shopItem";
var update_url = "https://www.bjdtd.cc/v2.0.0/update/itemInfo";

var upload_image_url = "https://www.bjdtd.cc/v2.0.0/upload/image";
/**
 * 图片上传
 */

function upload_Image2(isbn,that,nativeURl1,nativeURl2,itemType,itemName,itemDescription,itemPrice,lat,lng,chargeRule,chargeDay,chargePrice,deposit,weChat,phone){
    console.log(nativeURl1[0]);
      wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');



     if (that.data['isUpdate']==0){
         var fdStart = nativeURl1.indexOf("http");
         var fdStart2 = nativeURl2.indexOf("http");

         if (fdStart>0 && fdStart2>0){
             //都大于0不做处理
             console.log("上传两张");
         }else{

                var toUploadUrl = null;
                var index = -1;
                console.log("nativeURl1[0]="+nativeURl1);
                  console.log("nativeURl2[0]="+nativeURl2);
                if (fdStart==0){
                    that.setData({
                        upload1:nativeURl1,
                        picture1:nativeURl1,
                    });
                }else{
                    console.log("1111");
                    index = 0;
                    toUploadUrl = nativeURl1;
                }
                if (fdStart2==0){
                    that.setData({
                        upload2:nativeURl2,
                        picture2:nativeURl2
                    });
                }else{
                       console.log("2222");
                    index = 1;
                    toUploadUrl = nativeURl2;
                }

                if (toUploadUrl==null){
                       console.log("都不上传");
                     updatefinalPublish(that,isbn,1,itemName,"","12",lat,lng,1,chargeDay,chargePrice,deposit,weChat,phone);
                }else{
                    console.log("上传一张");
                    wx.uploadFile({
                        url: upload_image_url, 
                        filePath: toUploadUrl+'',
                        name: 'userfile',
                        formData:{
                            'user': 'test'
                        },
                        header: {
                        // 'content-type': 'application/json'
                        'content-type':'multipart/form-data',
                        'sk':sk
                        
                        },
                        success: function(res){
                            console.log(res.data+"2222");
                            var data = res.data
                            var jsonObject = JSON.parse(res.data);

                            //do something
                            if (index == 0){
                                 that.setData({
                                    upload1:jsonObject.data[0],
                                    picture1:jsonObject.data[0]
                                });
                            }else{
                                 that.setData({
                                    upload2:jsonObject.data[0],
                                    picture2:jsonObject.data[0]
                                });
                            }

                            console.log("图片上传结果");
                            updatefinalPublish(that,isbn,1,itemName,"","12",lat,lng,1,chargeDay,chargePrice,deposit,weChat,phone);
            
                        }
                    })
                }
              return;
         }
         

      
     }


     wx.uploadFile({
        url: upload_image_url, 
        filePath: nativeURl1[0]+'',
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
                console.log("上传结果"+res);
                var jsonObject = JSON.parse(res.data);
                that.setData({
                    upload1:jsonObject.data[0],
                    picture1:jsonObject.data[0]
                });
                wx.uploadFile({
                    url: upload_image_url, 
                    filePath: nativeURl2[0]+'',
                    name: 'userfile',
                    formData:{
                        'user': 'test'
                    },
                    header: {
                // 'content-type': 'application/json'
                'content-type':'multipart/form-data',
                'sk':sk
                
                },
                success: function(res){
                    console.log(res.data+"2222");
                    var data = res.data

                    var jsonObject = JSON.parse(res.data);

                    //do something
                    that.setData({
                        upload2:jsonObject.data[0],
                        picture2:jsonObject.data[0]
                    });

                    console.log("图片上传结果");
                     finalPublish(that,isbn,1,itemName,"","12",lat,lng,1,chargeDay,chargePrice,deposit,weChat,phone);
                    // console.log("图片上传结果");
                    // console.log(that.data['upload1']+"&&&&"+that.data['upload2']);
                    // var imageurl = that.data['upload1'] +"@" + that.data['upload2'];
                    // console.log(lat+"--"+lng);
                    // publish(that,isbn,imageurl,1,"","","12",lat,lng,1,chargeDay,chargePrice,deposit,weChat,phone);
                    
                }
            })
      },
      fail:function(e){
         console.log("上传失败="+e);
      }
    })
}

function updatefinalPublish(that,isbn,itemType,itemName,itemDescription,itemPrice,lat,lng,chargeRule,chargeDay,chargePrice,deposit,weChat,phone){
        var imageurl = that.data['upload1'] +"@" + that.data['upload2'];
        console.log(lat+"--"+lng);
        modify_thing(update_url,that,"",imageurl,itemType,itemName,"","12",lat,lng,1,chargeDay,chargePrice,deposit,weChat,phone);
}
function finalPublish(that,isbn,itemType,itemName,itemDescription,itemPrice,lat,lng,chargeRule,chargeDay,chargePrice,deposit,weChat,phone){
        var imageurl = that.data['upload1'] +"@" + that.data['upload2'];
        console.log(lat+"--"+lng);
        publish(publish_url,that,"",imageurl,itemType,itemName,"","12",lat,lng,1,chargeDay,chargePrice,deposit,weChat,phone);
}
/**
 * 图片上传
 */

function upload_Image(nativeURl){
      wx.showToast({
            title: '正在上传...',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');
     wx.request({
      url: upload_image_url, 
      data:{
          files:nativeURl,
      },
      header: {
              // 'content-type': 'application/json'
              'content-type':'multipart/form-data',
              'sk':sk
            
            }, // 设置请求的 header
      success: function(res){
            wx.hideToast();
            wx.showToast({
                title: '上传成功',
                icon: 'loading',
                duration: 1000
            });
            var data = res.data
            console.log("图片上传结果");
            console.log(data);

      }
    })
}
/**
 * 发布物品
 */
function publish(url,that,isbn,imageUrl,itemType,itemName,itemDescription,itemPrice,lat,lng,chargeRule,chargeDay,chargePrice,deposit,weChat,phone){
    console.log("isbn="+isbn+"--imageUrl="+imageUrl+"--itemName="+itemName+"--itemType="+itemType+"--itemDescription="+itemDescription+"---itemPrice="+itemPrice+"--lat="+
    lat+"--lng="+lng+"--chargeRule="+chargeRule+"--chargeDay="+chargeDay+"--chargePrice="+chargePrice+"--deposit="+deposit+"--weChat="+weChat+"--"+"phone="+phone);
 
     var sk = wx.getStorageSync('sk');

    //  var testShopOpenId = '2b3b279c-bd0d-1622-db08-3df22044f8d8';
    var testShopOpenId = that.data['shopIds'][nameIndex];
    console.log("testShopOpenId="+testShopOpenId);


     wx.request({
            url: url,
            data: {
              imageUrl:imageUrl,
              itemType:itemType,
              itemName:itemName,
              itemDescription:itemDescription,
              itemPrice:itemPrice,
              lat:lat,
              lng:lng,
              chargeRule:chargeRule,
              chargeDay:chargeDay,
              chargePrice:chargePrice,
              deposit:deposit,
              weChat:weChat,
              phone:phone,
              shopOpenId:testShopOpenId
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
                if (res.data.err_no==0){
                    wx.showToast({
                        title: '上传成功',
                        icon: 'loading',
                        duration: 1000
                    });

                    that.setData({
                        picture1:"./tianjiatupian_a.png",
                        picture2:"./tianjiatupian_b.png",
                        isbn:null,
                        userInfo:null
                    });
                    wx.navigateBack();
                    //  wx.navigateTo({
                    //     url:'../my_things/my_things'
                    // })
                }
              console.log(res);
              console.log(res.data);
             
              

            },
            fail: function () {
              // fail
              // wx.hideToast();
                wx.showToast({
                        title: '上传失败',
                        icon: 'loading',
                        duration: 500
                    });
            },
            complete: function () {
              // complete
            }
          })
}

/**
 * 修改物品
 */
function modify_thing(url,that,isbn,imageUrl,itemType,itemName,itemDescription,itemPrice,lat,lng,chargeRule,chargeDay,chargePrice,deposit,weChat,phone){
    console.log("isbn="+isbn+"--imageUrl="+imageUrl+"--itemName="+itemName+"--itemType="+itemType+"--itemDescription="+itemDescription+"---itemPrice="+itemPrice+"--lat="+
    lat+"--lng="+lng+"--chargeRule="+chargeRule+"--chargeDay="+chargeDay+"--chargePrice="+chargePrice+"--deposit="+deposit+"--weChat="+weChat+"--"+"phone="+phone);
 
     var sk = wx.getStorageSync('sk');

    //  var testShopOpenId = '2b3b279c-bd0d-1622-db08-3df22044f8d8';
    var testShopOpenId = that.data['updateShopId'];
    var itemId = that.data['bookBean'].itemId;
    console.log("testShopOpenId="+testShopOpenId+"itemId="+itemId);
    
    
     wx.request({
            url: url,
            data: {
              itemId:itemId,
              imageUrl:imageUrl,
              itemType:itemType,
              itemName:itemName,
              itemDescription:itemDescription,
              itemPrice:itemPrice,
              lat:lat,
              lng:lng,
              chargeRule:chargeRule,
              chargeDay:chargeDay,
              chargePrice:chargePrice,
              deposit:deposit,
              weChat:weChat,
              phone:phone,
              shopOpenId:testShopOpenId
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
                if (res.data.err_no==0){
                    wx.showToast({
                        title: '上传成功',
                        icon: 'loading',
                        duration: 1000
                    });

                    that.setData({
                        picture1:"./tianjiatupian_a.png",
                        picture2:"./tianjiatupian_b.png",
                        isbn:null,
                        userInfo:null
                    });
                    wx.navigateBack();
                    //  wx.navigateTo({
                    //     url:'../my_things/my_things'
                    // })
                }
              console.log(res);
              console.log(res.data);
             
              

            },
            fail: function () {
              // fail
              // wx.hideToast();
                wx.showToast({
                        title: '上传失败',
                        icon: 'loading',
                        duration: 500
                    });
            },
            complete: function () {
              // complete
            }
          })
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
 var nameIndex = 0;
Page({
    data: {
        sex_items: [
        {name:'1', value:'小王子'},
        {name:'2', value:'小公主'},
        {name:'0', value:'尚无'}
        ],
        picture1:'./tianjiatupian_a.png',
        lat:null,
        lng:null,
        isbn:null,
        picture2:'./tianjiatupian_b.png',
        upload1:null,
        upload2:null,
        userInfo:null,
        phone:null,
        leftPicture:"../publish/tianjiatupian_a.png",
        rightPicture:"../publish/tianjiatupian_b.png",
        index:0,
        array: [],
        bookBean:null,
        isUpdate:1,
        shopName:null,
        shopIds:[],
        updateShopId:null,

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
    
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
        // url: '../logs/logs'
        // url: '../load/load'
        })
    },
    onLoad: function (options) {

        console.log(options.isUpdate,options.data);

        this.setData({  isUpdate:options.isUpdate});
        if (options.isUpdate==0){
            console.log("修改");
            let item=JSON.parse(options.data);
            console.log(item.imageUrl);
            this.setData({
                picture1:item.imageUrl[0],
                picture2:item.imageUrl[1],
                isUpdate:options.isUpdate,
                updateShopId:options.shopId
            });
       
            this.setData({
                bookBean:item
            });

            // console.log(this.data['bookBean'].itemId);
        }

        console.log('onLoad')
        var localPhone = wx.getStorageSync('phone');
        var lat = wx.getStorageSync('lat');
        var lng = wx.getStorageSync('lng');
        console.log("localPhone="+localPhone+"lat="+lat+"lng="+lng);

        var shopArray = wx.getStorageSync("library_list");
        var names = [];
        var ids = [];
        for (var i = 0;i<shopArray.length;i++){
            names.push(shopArray[i].name);
            ids.push(shopArray[i].shopOpenId);
        }
        this.setData({
            phone : localPhone,
            lat:lat,
            lng:lng,
            array:names,
            shopIds:ids,
            shopName:names[0]
        });
   
    },
    //发布
    bindSaveTap: function(e){
       // console.log(e)
       // var sk = wx.getStorageSync('sk');
      //  console.log("sk="+sk);
      var that = this;
      console.log(e.detail.value);
        var formData = {
            uid:"11",
            itemname:e.detail.value.itemName,
            isbn:e.detail.value.isbn,
            chargePrice:e.detail.value.chargePrice,
            deposit:e.detail.value.deposit,
            chargeDay:e.detail.value.chargeDay,
            phone:e.detail.value.phone,
            weixin:e.detail.value.weixin
        }
     
    
        if("./tianjiatupian_a.png".endsWith(this.data.picture1)){
              toast("请添加物品正面照");
              return;
        }
        if("./tianjiatupian_b.png".endsWith(this.data.picture2)){
              toast("请添加物品反面照");
              return;
        }
        if(textIsEmpty(formData.deposit)){
            console.log("请填写押金");
            toast("请填写押金");
            return;
        }
        if(formData.deposit<5){
            toast("押金要大于5元");
            return;
        }
         if(textIsEmpty(formData.chargePrice)){
            console.log("请填写租金");
            toast("请填写租金");
            return;
        }
        if(formData.chargePrice<2){
            toast("租金要大于2元")
            return;
        }
        if(textIsEmpty(formData.weixin)){
            toast("请填写微信账户");
            console.log("请填写微信账户");
            return;
        }
        if(textIsEmpty(formData.chargeDay)){
            toast("请填写出租天数");
            return;
        }
        /**
         * 先上传图片
         */
        // app.apiFunc.upload_file(app.apiUrl.modify_user, this.data.logo, 'photos', formData, 
        //     function(res){
        //         console.log(res);
        //     },
        //     function(){
        //     })

        /**
         * 
         */
      //  console.log(""+this.data['picture1']);
        console.log("picture1="+this.data['picture1']);
        // console.log(this.data['picture1']+"------"+this.data['picture2']);
        upload_Image2(formData.isbn,this,this.data['picture1'],this.data['picture2'],1,formData.itemname,"","",this.data.lat,this.data.lng,1,formData.chargeDay,formData.chargePrice,formData.deposit,formData.weixin,formData.phone);
       //publish(1,"Android","一本好书2",25,lat,lng,1,30,20,50,1,18240332323);
    }, 
    
    chooseImageTap: function(){
        let _this = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function(res) {
                if (!res.cancel) {
                    if(res.tapIndex == 0){
                         _this.chooseWxImage('album')
                    }else if(res.tapIndex == 1){
                        _this.chooseWxImage('camera')
                    }
                }
            }
        })
    
    },
    chooseImageTap2: function(){
        let _this = this;
        wx.showActionSheet({
            itemList: ['从相册中选择', '拍照'],
            itemColor: "#f7982a",
            success: function(res) {
                if (!res.cancel) {
                    if(res.tapIndex == 0){
                         _this.chooseWxImage2('album')
                    }else if(res.tapIndex == 1){
                        _this.chooseWxImage2('camera')
                    }
                }
            }
        })
    
    },
    chooseWxImage:function(type){
        let _this = this;
        wx.chooseImage({
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: function (res) {
                console.log(res);
                _this.setData({
                        picture1: res.tempFilePaths[0],
                })
            }
        })
    },
    chooseWxImage2:function(type){
        let _this = this;
        wx.chooseImage({
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: function (res) {
                console.log(res);
                _this.setData({
                        picture2: res.tempFilePaths[0],
                })
            }
        })
    },
    shaoyishao:function(event){
        let _this = this;
           wx.scanCode({
                success: (res) => {
                    _this.setData({
                        isbn:res.result
                    })
                    console.log(res);
                    console.log(res.result);
                }
         })
    },
    bindFocusEvent:function(event){
        // let _this = this;
        //    wx.scanCode({
        //         success: (res) => {
        //             _this.setData({
        //                 isbn:res.result
        //             })
        //             console.log(res);
        //             console.log(res.result);
        //         }
        //  })
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
    },
    onRight:function(type){
           var _this = this;
           wx.chooseImage({  
                count: 1, // 默认9  
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
                success: function (res) {  
                    // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
                    _this.setData({  
                    picture2:res.tempFilePaths  
                    })  
                }  
            })
    },
    bindPickerChange:function(e){
         nameIndex = e.detail.value;  
        //  console.log(this.data['shopIds'][0]);
         this.setData({  
             shopName: this.data['array'][nameIndex] 
         })  
    }
})