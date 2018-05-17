// page/feedback/feedbback.js
Page({
  data:{
    feedback_list:[]
  },

  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var list = this.data.feedback_list;
  
    var item = {itemId:"1",imageUrl:"../../images/default_header.jpg",itemName:"Android",itemDescription:"精美绝伦",createTime:"2017.9.3"};
    var i = 0;
    for (;i<15;i++){
      list.push(item);
    }
    this.setData({feedback_list:list});
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})