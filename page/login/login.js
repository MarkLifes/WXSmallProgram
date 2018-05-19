// page/exit/login.js

/**
 * 重新登录并发送查询请求
 */
// import {area,request,Request,$Get} from '../../util/http';
import {login} from '../../page/login/loginService';


var app = getApp();
Page({
  data:{},
  onClickLogin:function(e){
     wx.navigateBack({
             delta: 1, // 回退前 delta(默认为1) 页面
             success: function(res){
               // success
             },
             fail: function(res) {
               // fail
             },
             complete: function(res) {
               // complete
             }
           })
    //  login(this,{
    //    success:function(data){
    //        wx.navigateBack({
    //          delta: 1, // 回退前 delta(默认为1) 页面
    //          success: function(res){
    //            // success
    //          },
    //          fail: function(res) {
    //            // fail
    //          },
    //          complete: function(res) {
    //            // complete
    //          }
    //        })
    //    }
    //  });
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})