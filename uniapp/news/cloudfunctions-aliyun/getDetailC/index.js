'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId,
		articleId
	} = event
	let user = await db.collection('user').doc(userId).get()
	user = user.data[0]
	const article = await db.collection('article')
		.aggregate()
		.addFields({
			isLikeAuthor: $.in(['$author.id', user.author_likes_ids]),
			isLikeArticle: $.in(['$_id', user.article_likes_ids]),
			isthumbs: $.in(['$_id', user.thumbs_up_article_ids]),
		}).match({
			_id: articleId
		}).project({
			coments: 0
		}).end()

	//返回数据给客户端
	return {
		code: 200,
		message: "请求成功",
		result: article.data[0]
	}
};
