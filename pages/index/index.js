// pages/recognize/recognize.js
Page({
  onLoad(){
    // wx.cloud.database().collection('test1')
    // .doc('3c13c71c64969e8c0005de60431542ff')
    // .get()
    // .then(res => {
    //   console.log('promise写法请求', res)
    //   })
    // .catch(res => {
    //   console.log('失败')
    // })
  },

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 转向动作识别页面
   */
  toRecognize(){
    wx.navigateTo({
      url: '/pages/recognize/recognize',
    })
  },

  /**
   * 转向数据采集页面
   */
  toCollectionIndex(){
    wx.navigateTo({
      url: '/pages/coll-index/coll-index',
    })
  }
})
