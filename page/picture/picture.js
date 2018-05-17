Page({
    data:{
        leftPicture:"../publish/tianjiatupian_a.png",
        rightPicture:"../publish/tianjiatupian_b.png"
    },
    onLoad:function(options){
      // 页面初始化 options为页面跳转所带来的参数
    },
    onReady:function(){
      // 页面渲染完成
    },
    onShow:function(){
      // 页面显示
      console.log("$$$$$$$$$$$$$$$");
    },
    onHide:function(){
      // 页面隐藏
    },
    onUnload:function(){
      // 页面关闭
    },

    onLeft:function(type){
           var _this = this;
           wx.chooseImage({
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: function (res) {
                console.log(res);
                _this.setData({
                        leftPicture: res.tempFilePaths[0],
                })
            }
          })
    },
    onRight:function(type){
           var _this = this;
           wx.chooseImage({
                sizeType: ['original', 'compressed'],
                sourceType: [type],
                success: function (res) {
                console.log(res);
                _this.setData({
                        rightPicture: res.tempFilePaths[0],
                })
            }
          })
    }
  })