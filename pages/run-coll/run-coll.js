// pages/run-coll/run-coll.js
Page({
  /*页面的初始数据*/
  data: {
    data_type: "run",
    x_acc: "待采集",
    y_acc: "待采集",
    z_acc: "待采集",
    xAccs: [],
    yAccs: [],
    zAccs: [],
    timeStamps: [],     /* 时间戳 */
    startTime: 0,       /* 采集开始时间 */
    timeStep: 0,        /* 采集持续时间 */
    is_reading: false   /* 防止“开始”按钮误触 */
  },

  onLoad(){},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){},

    /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // wx.stopAccelerometer({
    //   fail: function name(res) {
    //     console.log(res.fail)
    //   }
    // })
  },

  /* 点击“开始”后执行采集 */
  startCollection: function (){
    /** 启动加速度计 */
    wx.startAccelerometer({
      interval: 'game',
      success: (res) => {console.log('加速器接口调用成功！')}
    })

    const that = this
    let tpAccXs = []
    let tpAccYs = []
    let tpAccZs = []
    let tpTimes = []
    that.setData({
      startTime: new Date().getTime(),
      timeStep: 0,
      is_reading: true
    })

    /** 进行为时10s的监听 */
    wx.onAccelerometerChange(function (res) {
      /* 从点击开始键起，记录时间 */
      let nowTime_tp = new Date().getTime()
      that.setData({
        timeStep: (nowTime_tp - that.data.startTime) / 1000
      })
      
      if (that.data.timeStep < 10) {
        that.setData({
          x_acc: parseFloat(res.x.toFixed(5)),
          y_acc: parseFloat(res.y.toFixed(5)),
          z_acc: parseFloat(res.z.toFixed(5))
        });
        tpAccXs.push(res.x)
        tpAccYs.push(res.y)
        tpAccZs.push(res.z)
        tpTimes.push(nowTime_tp)
      } else {  /* 停止采集，将采集到的数据放入页面中 */
        that.stopCollection()
        that.setData({
          xAccs: tpAccXs,
          yAccs: tpAccYs,
          zAccs: tpAccZs,
          timeStamps: tpTimes,
          x_acc: "采集完成",
          y_acc: "采集完成",
          z_acc: "采集完成",
          startTime: 0,
          timeStep: "10",
          is_reading: false
        })

        /* 询问用户是否将数据上传 */
        wx.showModal({
          title: '上传数据',
          content: '您确定上传本次数据吗？',
          success (res) {
            if (res.confirm) {
              that.updateData()
            } else if (res.cancel) {
              wx.showToast({
                'title': '取消上传'
              })
            }
          }
        })
        return;
      }
    })
  },

  /**
   * 上传数据
   */
  updateData: function () {
    const db = wx.cloud.database()
    const tb =  db.collection('testGait')
    tb.add({
      data: {
        dataType: this.data.data_type,
        timeStamps: this.data.timeStamps,
        xAccs: this.data.xAccs,
        yAccs: this.data.yAccs,
        zAccs: this.data.yAccs
      }
    })
    .then(res => {
      console.log("ok", res)
      wx.showToast({
        title: '上传成功',
      })
    })
    .catch(err => {
      console.log("not ok", err)
      wx.showToast({
        title: '上传失败',
        icon: 'error'
      })
    })
  },

  /**
   * 停止采集
   */
  stopCollection: function () {
    wx.offAccelerometerChange()
    wx.stopAccelerometer({
      success: (res) => {console.log('停止读取了')}
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // wx.stopAccelerometer({
    //   fail: function name(res) {
    //     console.log(res.fail)
    //   }
    // })
    this.stopCollection()
    this.setData({
      timeStep: 0
    })
  }
})