// pages/join/join.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      invite_code:""
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
  
    },
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
  
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
  
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
    inputInfo:function(e){
      this.data.invite_code = e.detail.value;
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
            wx.navigateTo({
              url: '/pages/pvp/pvp'
            })         
          }
           console.log(res)
        }
      })
    }
  })