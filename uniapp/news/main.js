import Vue from 'vue'
import App from './App'
import Api from './common/api'
import store from './store'

Vue.config.productionTip = false
// 注册到全局
Vue.prototype.$api = Api
// 初始化全局的事件总线
Vue.prototype.$EventBus = new Vue()

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
