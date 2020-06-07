'use strict';
const db = uniCloud.database();
// 引入公用工具方法
const common = db.command
exports.main = async (event, context) => {
	// 按需结构
	const {
		userId,
		articleId
	} = event
	// 查找用户信息
	let userInfo = await db.collection('user').doc(userId).get()
	let article_likes = userInfo.data[0].article_likes_ids
	let likes =
		// 判断用户的收藏夹中是否存在该文章
		(article_likes.includes(articleId)) ? common.pull(articleId) : common.addToSet(articleId)
	// 保存到数据库 
	await db.collection('user').doc(userId).update({
		article_likes_ids: likes
	})
	//返回数据给客户端
	return {
		code: 200,
		message: '设置成功',
		result: userInfo
	}
};
