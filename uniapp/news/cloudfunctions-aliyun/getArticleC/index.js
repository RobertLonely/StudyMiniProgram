'use strict';
const db = uniCloud.database()
const command = db.command
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId
	} = event
	let userInfo = await db.collection('user').doc(userId).get()
	userInfo = userInfo.data[0]
	const article = await db.collection('article')
		.aggregate()
		.addFields({
			isLike: $.in(['$_id', userInfo.article_likes_ids])
		})
		.project({
			content: 0
		})
		.match({
			id: command.in(userInfo.article_ids)
		})
		.end()
	//返回数据给客户端
	return {
		code: 200,
		message: "获取成功",
		result: article.data
	}
};
