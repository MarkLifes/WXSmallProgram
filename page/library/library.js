// page/library/library.js
import {$,$POST,$Get} from '../../util/http';
import {FIND_SHOP_DETAIL,DELETE_BOOK} from '../../util/url';

export var deleteFunc = deleteFunction;

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
                if (res.data==null || res.data.data==null){
                   console.log("请求数据为null");
                   return;
                }
                
                findOtherLibraryList(this,this.data['shopId'],1,20);

              },
        fail:function(res){
              wx.hideToast();
              console.log(res.data);
              console.log("请求失败》》》》》");
        }
        
      };
     $(DELETE_BOOK,'POST',data,callback);
}
/**
 * 
 * @param {*} that 
 * @param {*} index 
 * @param {*} pageSize 
 */
function findOtherLibraryList(that,id,index,pageSize){
    console.log("findOtherLibraryList");
    // wx.showToast({title: '正在查询...',icon: 'loading',duration: 10000});
    var data = {shopOpenId:id,index:index,offset:pageSize};
    console.log("请求参数="+data);
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
                     //通用修改
                    list = that.data.booklist;
                }else{
                    list = [];
                }
                var page = that.mylibrary_page + 1;
                for(var i = 0; i < res.data.data.length; i++){
                    list.push(res.data.data[i]);
                }

                //通用修改
                that.setData({
                   booklist : list,
                   mylibrary_page : page
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
     $(FIND_SHOP_DETAIL,'GET',data,callback);
  
}

function toast(msg){
    wx.showToast({
        title: msg,
        icon: 'loading',
        duration: 500
    });
}

Page({
  data:{
    booklist:[],
    isHide:0,
    shopId:null
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
      console.log("flag="+options.flag);
      this.setData({isHide:options.flag,shopId:options.shopId});
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    console.info("新页面");
    findOtherLibraryList(this,this.data['shopId'],1,20);
    this.setData({isEditing:false});
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
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
  onClickItem:function(event){
      wx.navigateTo({
          url:'../book_detail/book_detail?id='+event.currentTarget.id+'&isHide='+this.data.isHide
      })
  },toUpdate:function(e){
     toast("修改");
     var index = e.currentTarget.id
     console.log(this.data['booklist'][index]);

     let str=JSON.stringify(this.data['booklist'][index]);

     wx.navigateTo({
       url: '../publish/publish?'+"isUpdate=0&data="+str+"&shopId="+this.data['shopId']
       });
  },toDelete:function(e){
     toast("删除"+e.currentTarget.id);
     deleteFunction(this,this.data['shopId'],e.currentTarget.id);
  }
})