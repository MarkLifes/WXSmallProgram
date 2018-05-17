// page/one/index.js


Page({
  data:{
    selected:true
  },
  onShow:function(e){
    // this.setData({open:true});
    console.log("borrowed页面展示完成");
  },
  onReady:function(e){
    console.log("borrowed页面渲染完成");
    // this.setData({open:false});
  }
  
})