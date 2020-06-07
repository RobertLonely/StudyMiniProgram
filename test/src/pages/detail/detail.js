// src/pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("detail-----------------onLoad")
    this.setData({id:options.id})

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("detail-----------------onReady")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("detail-----------------onShow")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("detail-----------------onHide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("detail-----------------onUnload")

  }
})