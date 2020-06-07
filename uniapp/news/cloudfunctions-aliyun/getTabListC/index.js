'use strict';
// 导入数据库
const db = uniCloud.database();
// 导入聚合操作符
const $ = db.command.aggregate;
exports.main = async (event, context) => {
	// 按需解构请求参数
	const {
		userId,
		type
	} = event
	// 设置返回label的条件，不为'all'时，只返回用户自己设置的标签，否则全部返回
	let matchObj = (type !== 'all') ? {
		self: true
	} : {}

	// 查询用户集合
	const user = await db.collection('user').doc(userId).get()
	let userInfo = user.data[0]
	// 查询label集合
	const res = await db.collection('label')
		.aggregate()
		// 为用户label_ids中的文章，添加字段self
		.addFields({
			self: $.in(['$_id', $.ifNull([userInfo.label_ids, []])])
		})
		// 只返回self字段为true的label
		.match(matchObj)
		.end()
	return {
		code: 200,
		message: "请求成功",
		data: res.data
	}
};
