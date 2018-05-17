//welcome.js
//获取应用实例

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  // 附近物品
  near_things_event: function(event) {
            console.log("ceshi");
    wx.navigateTo({
      url: '../near_things/near_things'
    })
  },
  // 我的订单
  my_orders_event:function(event){
     wx.navigateTo({
      url: '../my_orders/my_orders'
 
    })
  },
  //我的物品
  my_things_event:function(event){
    //逻辑判断有没有物品，如果没有跳到发布页面
     wx.navigateTo({
      // url: '../publish/publish'
      url:'../my_things/my_things'
 
    })
  }
})