// pages/coll-index/coll-index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    console.log("销毁")
  },

  /**
   * 转向走路数据采集
   */
  toWalkCollection(){
    wx.navigateTo({
      url: '/pages/walk-coll/walk-coll',
    })
  },
  
  /**
   * 转向跑步数据采集
   */
  toRunCollection(){
    wx.navigateTo({
      url: '/pages/run-coll/run-coll',
    })
  },

    /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // console.log("id隐藏")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // console.log("id销毁")
  }
})