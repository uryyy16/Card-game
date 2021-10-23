// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    token: wx.getStorageSync('token'), // 从缓存中获取 token
    winner: -1,  //记录赢家
    mode: 0,  //记录选择的游戏模式
    uuid: wx.getStorageSync('uuid')
  }
})
