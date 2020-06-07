'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId
	} = event
	let user = await db.collection('user').doc(userId).get()
	let likeArticel = user.data[0].article_likes_ids

	const article = await db.collection('article')
		.aggregate()
		.addFields({
			isLike: $.in(['$_id', likeArticel])
		})
		.project({
			content: 0
		})
		.match({
			isLike: true
		})
		.end()

	//返回数据给客户端
	return {
		code: 200,
		message: "获取成功",
		result: article.data
	}
};
