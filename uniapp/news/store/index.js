// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 进行挂载
Vue.use(Vuex)
// 创建store对象
const store = new Vuex.Store({
	state: {
		userInfo: uni.getStorageSync('userInfo') || {},
		// 先找本地缓存，没有的话设置为空数组
		historyList: uni.getStorageSync('history') || []
	},
	mutations: {
		addHistory(state, record) {
			state.historyList.unshift(record)
			// 重新设置本地缓存
			uni.setStorageSync('history', state.historyList)
		},
		emptyHistory(state) {
			state.historyList = []
			// 清空本地缓存
			uni.clearStorageSync('history')
		},
		setUserInfo(state, info) {
			state.userInfo = info
			// 重新设置本地缓存
			uni.setStorageSync('userInfo', state.userInfo)
		}
	},
	actions: {}

})

// 导出
export default store
