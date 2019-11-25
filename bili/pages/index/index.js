//Page Object
Page({
  data: {
    // 首页导航数据
    nav: [],
    //导航栏中被选中的索引
    curIndex: 0,
    // 轮播图数据
    carousel: [],
    //视频列表数据
    watch: []
  },
  // 获取导航列表
  getNavList() {
    let that = this;
    wx.request({
      url: "https://api.apiopen.top/videoHomeTab",
      success(res) {
        if (res.data.code === 200) {
          that.setData({
            nav: res.data.result
          });
        }
      }
    });
  },
  //获取当前导航模块的索引
  getCur(e) {
    this.setData({
      curIndex: e.target.dataset.index
    });
  },
  //获取轮播图数据
  getCarousel() {
    let that = this;
    wx.request({
      url: "http://baobab.kaiyanapp.com/api/v5/index/tab/discovery",
      success(res) {
        that.setData({
          carousel: res.data.itemList[0].data.itemList
        });
        // console.log(res.data.itemList[0].data.itemList);
      }
    });
  },
  //获取视频列表
  getVideos() {
    let that = this;
    wx.request({
      url: "https://www.apiopen.top/satinApi?type=1&page=1",
      success(res) {
        that.setData({
          watch: res.data.data
        });
      }
    });
  },
  //options(Object)
  onLoad: function(options) {
    this.getNavList();
    this.getCarousel();
    this.getVideos();
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    this.getNavList();
    this.getCarousel();
    this.getVideos();
    wx.stopPullDownRefresh();
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {},
  onPageScroll: function() {},
  //item(index,pagePath,text)
  onTabItemTap: function(item) {}
});
