


import {$,$POST,$Get} from '../../util/http';
import {NEARBY_LIBRARY} from '../../util/url';


export var findNearLibrary = findNearbyLibraryList;



/**
 * 
 * @param {*} that 
 * @param {*} index 
 * @param {*} pageSize 
 */
export function findNearbyLibraryList(that,index,pageSize){
    console.log("findNearbyLibraryList");
    // wx.showToast({title: '正在查询...',icon: 'loading',duration: 10000});
    var lat = wx.getStorageSync('lat');
    var lng = wx.getStorageSync('lng');
    console.info("lat="+lat+"lng="+lng);
    var data = {index:index,offset:pageSize,lat:lat,lng:lng};

    // //测试代码start
    // var item = {itemId:"1",imageUrl:"../../images/default_header.jpg",itemName:"Android",itemDescription:"精美绝伦",createTime:"2017.9.3"};
    // var listtest = that.data.mylibrary_list;
    // for (var i=0;i<15;i++){
    //   listtest.push(item);
    // }
    // that.setData({
    //     mylibrary_list : listtest
    //  });
    // return;
    //测试代码end
    var callback = {
        success:function(res){
                wx.hideToast();
                console.log("附近图书馆数据请求成功");
                // console.log(res.data.data);
                console.log(res.data.data.shops);
                var list;
                if (index!=1){
                     //通用修改
                    list = that.data.nearbylibrarylist;
                    var page = that.mylibrary_page + 1;
                }else{
                    list = [];
                }
                if ( res.data.data!=null&&res.data.data.shops!=null){
                    for(var i = 0; i < res.data.data.shops.length; i++){
                        list.push(res.data.data.shops[i]);
                    }
                }

                //通用修改
                that.setData({
                   nearbylibrarylist : list
                });

              },
        fail:function(res){
              wx.hideToast();
              console.log(res.data);
              console.log("请求失败》》》》》");
        }
        
      };
     $(NEARBY_LIBRARY,'GET',data,callback);
  
}




