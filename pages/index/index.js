const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    student_id:"",
    password:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  inputName: function(e){
    this.data.student_id = e.detail.value;
    console.log(this.data.name)
  },

  inputPWD: function(e){
    this.data.password = e.detail.value;
  },

  login: function(e){
    wx.request({
      url: 'http://172.17.173.97:8080/api/user/login',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: ({
        student_id: this.data.student_id,
        password: this.data.password
      }),
      success: res => {
        console.log(res.data.data)
        console.log('status:'+res.data.status)
        if (res.data.status != '200'){
          wx.showToast({
            title: '请输入正确的账号密码',
            icon: 'none',
            duration: 2000//持续的时间
          })
        }
        else{
          app.globalData.token = res.data.data.token
          wx.setStorageSync('token', res.data.data.token)
          wx.navigateTo({
            url: '/pages/mode/mode'
          })          
        }
       
      },
      fail: err => {
        console.log(err)
      }
    })
  }
})