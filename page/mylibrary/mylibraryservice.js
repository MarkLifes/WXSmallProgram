
import {$,$POST,$Get} from '../../util/http';
import {MY_LIBRARY,FIND_SHOP_DETAIL,DELETE_BOOK} from '../../util/url';


export var findMyliBrary = findMyLibraryList;

export var findLibraryListAndSave = findLibraryAndSave;


/**
 * 
 * @param {*} that 
 * @param {*} index 
 * @param {*} pageSize 
 */
export function findMyLibraryList(that,index,pageSize){
    console.log("findMyLibraryList");
    // wx.showToast({title: '正在查询...',icon: 'loading',duration: 10000});
    var data = {index:index,offset:pageSize};

    var callback = {
        success:function(res){
                wx.hideToast();
                console.log(res.data);
                console.log("请求成功 end》》》》");
               
                var list;
                if (index!=1){
                     //通用修改
                    list = that.data.mylibrary_list;
                    var page = that.mylibrary_page + 1;
                }else{
                    list = [];
                }

                if (res.data.data!=null || res.data.data.length>0){
                    for(var i = 0; i < res.data.data.length; i++){
                        list.push(res.data.data[i]);
                    }
                }
              
                var isLibraryStatus = true;
                if (list.length==1){
                    isLibraryStatus = false;
                    wx.setNavigationBarTitle({  title: list[0].name});
                    that.setData({
                        shopId:list[0].shopOpenId
                    });
                    findOtherLibraryList(that,list[0].shopOpenId,1,40);
                }else{
                    that.setData({
                        mylibrary_list : list,
                        mylibrary_page : page,
                        isLibrary:isLibraryStatus
                    });
                }
                //通用修改
              
               
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
     $(MY_LIBRARY,'GET',data,callback);
  
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
              
              
                console.log(res.data.data);
                var list;
                if (index!=1){
                     //通用修改
                    list = that.data.booklist;
                }else{
                    list = [];
                     var page = that.mylibrary_page + 1;
                }
                if (res.data.data!=null){
                    for(var i = 0; i < res.data.data.length; i++){
                        list.push(res.data.data[i]);
                    }
                }

                //通用修改
                that.setData({
                   main_booklist : list,
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



/**
 * 
 * @param {*} that 
 * @param {*} index 
 * @param {*} pageSize 
 */
export function findLibraryAndSave(that,index,pageSize){
    console.log("findMyLibraryList");
    // wx.showToast({title: '正在查询...',icon: 'loading',duration: 10000});
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

                var list = [];
            
                for(var i = 0; i < res.data.data.length; i++){
                    list.push(res.data.data[i]);
                }

                console.log("save 图书馆列表"+list);
                wx.setStorageSync('library_list', list);
         
              },
        fail:function(res){
              wx.hideToast();
              console.log(res.data);
              console.log("请求失败》》》》》");
        }
        
      };
     $(MY_LIBRARY,'GET',data,callback);
  
}