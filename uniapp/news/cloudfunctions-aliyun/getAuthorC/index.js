'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId
	} = event
	let user = await db.collection('user').doc(userId).get()
	let likeAuthor = user.data[0].author_likes_ids

	const userList = await db.collection('user')
		.aggregate()
		.addFields({
			isLike: $.in(['$id', likeAuthor])
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
		result: userList.data
	}
};
