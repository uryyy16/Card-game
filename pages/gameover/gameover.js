// pages/gameover/gameover.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'result': null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tmp = app.globalData.winner
    if(tmp == 1){
      this.setData({
        result : 'The Second Player Win!'
      })
    }
    else if(tmp == 0){
      this.setData({
        result : 'The First Player Win!'
      })
    }else{
      this.setData({
        result : 'The Score Was Tied!'
      })
    }
    //console.log(this.data.result)
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
    var tmp = app.globalData.winner
    if(tmp == 1){
      this.setData({
        result : 'The Second Player Win!'
      })
    }
    else if(tmp == 0){
      this.setData({
        result : 'The First Player Win!'
      })
    }else{
      this.setData({
        result : 'The Score Was Tied!'
      })
    }
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