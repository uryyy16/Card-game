// pages/join/join.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invite_code:""
  },

  
  inputInfo:function(e){
    this.data.invite_code = e.detail.value;
    app.globalData.uuid = this.data.invite_code
    wx.setStorageSync('uuid', this.data.invite_code)
  },
  //将token和邀请码作为参数发送给服务器，成功则到在线游戏界面，否则输出提示信息
  bindbtn:function(e){
    wx.request({
      url: 'http://172.17.173.97:9000/api/game/' + this.data.invite_code,
      method: "POST",
      header: {
        "Authorization": wx.getStorageSync('token')
      },
      data: {
        uuid:this.data.invite_code
      },
      success: res => {
        if(res.data.code != '200'){
          wx.showToast({
            title: res.data.data.err_msg,
            icon: 'none',
            duration: 2000//持续的时间
          })
        }else{
          app.globalData.owner = 0
          wx.setStorageSync('owner', 0)
          wx.navigateTo({
            url: '/pages/online/online'
          })         
        }
         console.log(res)
      }
    })
  }
})
