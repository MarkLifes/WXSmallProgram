// page/one/index.js
// page/one/index.js
Page({
  data:{
    index:4,
    open : false,
    mark: 0,
    newmark: 0,
    istoright:true
  },
  onShow:function(e){
    // this.setData({open:true});
    console.log("页面展示完成");
  },
  onReady:function(e){
    console.log("页面渲染完成");
    // this.setData({open:false});
  },
  
  tap_ch: function(e){
    if(this.data.open){
      this.setData({
        open : false
      });
    }else{
      this.setData({
        open : true
      });
    }
  },
  tap_start:function(e){
    // touchstart事件
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function(e){
    // touchmove事件
 
    /*
     * 手指从左向右移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    this.data.newmark = e.touches[0].pageX;
    if(this.data.mark < this.data.newmark){
      this.istoright = true;
    }
    /*
     * 手指从右向左移动
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标
     */
    if(this.data.mark > this.data.newmark){
      this.istoright = false;
      
    }
    this.data.mark = this.data.newmark;

  },
  tap_end: function(e){
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    if(this.istoright){
      this.setData({
        open : true
      });
    }else{
      this.setData({
        open : false
      });
    }
  }
})