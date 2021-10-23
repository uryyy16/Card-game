// pages/create_or_join/create_or_join.js
const app = getApp()
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
        wx.navigateTo({
          url: '/pages/create/create'
        }) 
    },

    joinRoom() {
      wx.navigateTo({
        url: '/pages/join/join'
      }) 
    }
})