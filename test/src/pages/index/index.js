// src/pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr:["十万个为什么","追风筝的人","从你的全世界路过","挪威的森林"],
    index:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("index------------onLoad")

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("index------------onReady")

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("index------------onShow")

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("index------------onHide")

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("index------------onUnlaod")

  },
  clickMe:function(){
    wx.navigateTo({
      url: `../detail/detail?id=1`,
    })
    // wx.redirectTo({
    //   url: '../detail/detail?id=1',
    // })
  }
})