
import {$,$POST,$Get} from '../../util/http';
import {LEND_URL,MY_LIBRARY} from '../../util/url';


export var findLendOrder = findOrderLend;
export var click_lend_item = ClickLendItem;

export var findLendShopList = findLendShop;



export function findLendShop(that,index,pageSize){
        // var data = {index:index,offset:pageSize};

        //  var list = [];

        //  var shop = {name:'人工智能2',description:'很好2'};
        //  list.push(shop);
        //     list.push(shop);

        //  that.setData({
        //         mylibrary_list : list,
        //         isLibrary:true
        //   });


        //     console.log("findMyLibraryList");
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
              
                that.setData({
                        mylibrary_list : list,
                        isLibrary:true
                });

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
 * 分页查询借入订单,当传入1就清空之前的
 * @param {*} that 
 * @param {*} index 
 * @param {*} pageSize 
 */
export function findOrderLend(that,shopOpenId,index,pageSize){
    console.log("findOrderLend"+"shopOpenId="+shopOpenId);
    wx.showToast({title: '正在查询...',icon: 'loading',duration: 10000});
    var data = {index:index,shopOpenId:shopOpenId,offset:pageSize};

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
                    list = that.data.lend_list;
                }else{
                    list = [];
                }
                var page = that.lend_page + 1;
                for(var i = 0; i < res.data.data.length; i++){
                    list.push(res.data.data[i]);
                }

                that.setData({
                   lend_list : list,
                   lend_page : page
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
     $(LEND_URL,'GET',data,callback);
  
}

export function ClickLendItem(that,e){
      console.log("查看详情"+event.currentTarget.id);
          wx.navigateTo({
               url:'../borrowedbooks_detail/my_orders_detail?id='+event.currentTarget.id+'&selectIndex='+1
           })
}
