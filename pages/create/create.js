// pages/create/create.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'contents':''
  },
joingame(){
  app.globalData.owner = 0
  wx.setStorageSync('owner', 0)
  wx.navigateTo({
    url: '/pages/online/online',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'http://172.17.173.97:9000/api/game',
      method: "POST",
      header: {
        "Authorization": wx.getStorageSync('token')
      },
      data: {
        private: true
      },
      success: res => {
        this.setData({
          contents : res.data.data.uuid
        })
        app.globalData.uuid = res.data.data.uuid
        wx.setStorageSync('uuid', res.data.data.uuid)
        wx.showToast({
          //title: '邀请码已成功复制',
        })
        wx.setClipboardData({
          data: res.data.data.uuid,
          success: function (res) {
            wx.getClipboardData({   
              success: function (res) {
                // console.log(res.data) // data
              }
            })
          }
        })
        console.log(res)
      }
    })

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

  }
})