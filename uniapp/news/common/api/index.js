// 批量导入文件
const requireApi = require.context(
	// 其文件目录的相对路径
	'./',
	// 是否查询其子目录
	false,
	// 匹配基础组件文件名的正则表达式
	/.js$/
)
const module = {}
//requireApi=["./indedx.js","./list.js"]
requireApi.keys().forEach(item => {
	if (item === './index.js') return
	// requireApi()相当于import
	Object.assign(module, requireApi(item))
})
// 使用export导出会报错
export default module
