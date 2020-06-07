'use strict';
const db = uniCloud.database();
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId,
		articleId,
		page = 1,
		pageSize = 5
	} = event
	const article = await db.collection('article')
		.aggregate()
		.match({
			_id: articleId
		})
		// 使用指定的数组字段中的每个元素，对文档进行拆分。拆分后，文档会从一个变为一个或多个，分别对应数组的每个元素。 
		.unwind('$comment')
		.project({
			_id: 0,
			comment: 1
		})
		// 指定一个计算出的新字段作为根节点
		.replaceRoot({
			newRoot: '$comment'
		})
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()

	return {
		code: 200,
		message: "获取评论列表成功",
		result: article.data
	}
};
