'use strict';
const db = uniCloud.database()
const command = db.command
exports.main = async (event, context) => {
	const {
		userId,
		authorId
	} = event
	const user = await db.collection('user').doc(userId).get()
	let likeAuthors = user.data[0].author_likes_ids
	let handle = null
	if (likeAuthors.includes(authorId)) {
		// 关注了，进行取消
		handle = command.pull(authorId)
	} else {
		// 没关注，进行关注
		handle = command.addToSet(authorId)
	}
	
	await db.collection('user').doc(userId).update({
		author_likes_ids: handle
	})
	//返回数据给客户端
	return {
		code: 200,
		message: "操作成功",
	}
};
