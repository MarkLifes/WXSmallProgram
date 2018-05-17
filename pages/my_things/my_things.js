var url = "http://www.imooc.com/course/ajaxlist";

var find_mythings_url = "https://www.bjdtd.cc/myitems"
/**
 * 查询物品
 */
function request_mythings(that, index , pageSize){
    console.log(index+"--"+pageSize);
    wx.showToast({
            title: '正在查询...',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');
     console.log("sk="+sk+"index="+index+"pageSize="+pageSize);
     wx.request({
            url: find_mythings_url,
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

                wx.hideToast();
               
             // console.log(res);
               console.log(res.data);
               console.log(res.data.data);
               if(res.data.data!=null){
                    var list = that.data.list;
                    for(var i = 0; i < res.data.data.length; i++){
                        list.push(res.data.data[i]);
                        console.log(res.data.data[i].imageUrl[0])
                    }
                    that.setData({
                        list : list,
                    });
                    that.data.page++
                    // page ++;
                    
                    // that.setData({
                    //     hidden:true,
                    
                        
                    // });
               }else{
                   console.log("数据是null");
                    // that.setData({
                    //     hidden:true,
                    // });
               }
              

            },
            fail: function () {
              // fail
               wx.hideToast();
            },
            complete: function () {
              // complete
                wx.hideToast();
            }
          })
}

/**
 * 查询物品
 */
function request_mythings2(that, index , pageSize){
    console.log(index+"--"+pageSize);
    wx.showToast({
            title: '正在查询...',
            icon: 'loading',
            duration: 10000
          });
     var sk = wx.getStorageSync('sk');
     console.log("sk="+sk+"index="+index+"pageSize="+pageSize);
     wx.request({
            url: find_mythings_url,
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

                wx.hideToast();
               
             // console.log(res);
               console.log(res.data);
               console.log(res.data.data);
               if(res.data.data!=null){
                    var list = [];
                    for(var i = 0; i < res.data.data.length; i++){
                        list.push(res.data.data[i]);
                        console.log(res.data.data[i].imageUrl[0])
                    }
                    that.setData({
                        list : list,
                    });
                    that.data.page++
                    // page ++;
                    
                    // that.setData({
                    //     hidden:true,
                    
                        
                    // });
               }else{
                     that.setData({
                        list : null,
                    });
                   console.log("数据是null");
                    // that.setData({
                    //     hidden:true,
                    // });
               }
              

            },
            fail: function () {
              // fail
               wx.hideToast();
            },
            complete: function () {
              // complete
                wx.hideToast();
            }
          })
}

var page_size = 20;
var sort = "last";
var is_easy = 0;
var lange_id = 0;
var pos_id = 0;
var unlearn = 0;

var GetList = function(that){
    that.setData({
        hidden:false
    });
    wx.request({
        url:url,
        data:{
            page : this.data.page,
            page_size : page_size,
            sort : sort,
            is_easy : is_easy,
            lange_id : lange_id,
            pos_id : pos_id,
            unlearn : unlearn
        },
        success:function(res){
            //console.info(that.data.list);
            var list = that.data.list;
            for(var i = 0; i < res.data.list.length; i++){
                list.push(res.data.list[i]);
            }
            that.setData({
                list : list,
                page :page++
            });
            // this.data.page ++;
            that.setData({
                hidden:true
            });
        }
    });
}
Page({
  data:{
    hidden:true,
    list:[],
    scrollTop : 0,
    scrollHeight:0,
    page:1
  },
   listenSwiper:function(e) {
            //打印信息
            currentSwipe = e.detail.current;
            console.log(e.detail.current)
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
  onLoad:function(){
     // console.log("page3333="+this.data.page);
      var that = this;
      wx.getSystemInfo({
          success:function(res){
              console.info(res.windowHeight);
              that.setData({
                  scrollHeight:res.windowHeight
              });
          }
      });
  },
  onShow:function(){
    var that = this;
    // GetList(that);
    console.log("page11111="+this.data.page);
    var page = this.data.page;
   // request_mythings(that,page,10);
      this.data.page = 1;   
     request_mythings2(that,this.data.page,10);
  },
  bindDownLoad:function(){
      var that = this;
          console.log("page22222="+this.data.page);
      request_mythings(that,this.data.page,10);
      //GetList(that);
  },
  scroll:function(event){
     this.setData({
         scrollTop : event.detail.scrollTop
     });
  },
  refresh:function(event){
      this.data.page = 1;
      this.setData({
          list : [],
          scrollTop : 0
      });
      var that = this;
           console.log("page333333="+this.data.page);
       request_mythings2(that,this.data.page,10);
     //GetList(this)
  },
  onAddThingsClick:function(event){
         wx.navigateTo({
              url:'../publish/publish'
         })
  },  
  onClickItem: function(event) {
    console.log("我的物品详情"+event.currentTarget.id);
        wx.navigateTo({
            url:'../my_things_detail/my_things_detail?id='+event.currentTarget.id+'&token=13'
        })
    }
})