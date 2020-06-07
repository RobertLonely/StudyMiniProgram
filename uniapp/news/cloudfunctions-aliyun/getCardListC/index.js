'use strict';
// 导入数据库
const db = uniCloud.database();
// 声明聚合的操作符
const $ = db.command.aggregate
exports.main = async (event, context) => {
	// 按需结构
	const {
		userId,
		name,
		pageSize,
		page
	} = event
	
	let condition = {}
	if (name !== "全部") {
		condition = {
			classify: name
		}
	}
	// 查询指定用户信息
	const userInfo = await db.collection('user').doc(userId).get()
	const likeList = userInfo.data[0].article_likes_ids
	// 查询集合article
	const res = await db.collection('article')
		.aggregate()
		// 追加字段
		.addFields({
			// '$_id'表示当前集合中文章的_id
			isLike: $.in(['$_id', likeList])
		})
		.match(condition)
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.project({
			// 不返回文章内容字段
			"content": 0
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		message: '请求成功',
		result: res.data
	}
};
