// pages/create_or_join/create_or_join.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    createRoom() {
        // console.log(wx.getStorageSync('token'))
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
            wx.navigateTo({
              url: '/pages/join/join'
            })         
              console.log(res)
          }
        })
    }
})