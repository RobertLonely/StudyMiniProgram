'use strict';
const db = uniCloud.database()
const command = db.command
exports.main = async (event, context) => {
	const {
		userId,
		articleId
	} = event
	const user = await db.collection('user').doc(userId).get()
	let thumbs = user.data[0].thumbs_up_article_ids
	let thumbs_article = null
	if (thumbs.includes(articleId)) {
		return {
			code: 200,
			message: "你已点过赞了"
		}
	} else {
		thumbs_article = command.addToSet(articleId)
	}
	// 更新
	await db.collection('user').doc(userId).update({
		thumbs_up_article_ids: thumbs_article
	})

	await db.collection('article').doc(articleId).update({
		thumbs_up_count: command.inc(1)
	})

	return {
		code: 200,
		message: "点赞成功"
	}
};
