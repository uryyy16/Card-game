// pages/mode/mode.js
const app = getApp()
Page({
    //选择人人对战
    choose_1() {
        app.globalData.mode = 1
        wx.setStorageSync('mode', 1)
        wx.navigateTo({
          url: '/pages/local_1/local_1'
        }) 
    },

    //选择在线对战
    choose_2() {
        app.globalData.mode = 2
        wx.setStorageSync('mode', 2)
        wx.navigateTo({
          url: '/pages/create_or_join/create_or_join'
        }) 
    },

    //选择人机对战
    choose_3() {
        app.globalData.mode = 3
        wx.setStorageSync('mode', 3)
        wx.navigateTo({
          url: '/pages/local_2/local_2'
        }) 
    }
})