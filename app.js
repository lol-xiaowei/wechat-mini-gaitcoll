// app.js
App({
  onLaunch:function () {
    // 分享功能
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })

    //云开发环境初始化
    wx.cloud.init({
      env: "cloud1-3g2bokoec37ebdea"
    })
    console.log("小程序启动, 云环境初始化成功！")
  }
})
