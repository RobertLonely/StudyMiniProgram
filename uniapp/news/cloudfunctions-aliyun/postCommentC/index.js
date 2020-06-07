'use strict';
const db = uniCloud.database()
const command = db.command
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		userId,
		articleId,
		comment,
		// 回复文章评论时不为空，发布文章评论时为空
		commentId = "",
		replayId,
		isReplay
	} = event
	let user = await db.collection('user').doc(userId).get()
	// 获取用户信息
	user = user.data[0]
	// 获取所有的评论
	let comments = await db.collection('article').doc(articleId).get()
	comments = comments.data[0].comment


	// 设置评论对象
	let commentObj = {
		comment_id: createId(6),
		comment,
		create_time: Date.now(),
		// 为false时是主回复
		isReplay: isReplay,
		author: {
			avatar: user.avatar,
			professional: user.professional,
			_id: user._id,
			author_name: user.author_name,
			gender: user.gender
		},
		replays: []
	}
	// 发布文章评论
	if (!commentId) {
		commentObj.replays = []
		commentObj = command.unshift(commentObj)
	} else {
		// 回复文章评论

		// 获取评论索引
		let commentIndex = comments.findIndex(item => item.comment_id === commentId)
		let name = ''
		if (isReplay) {
			// 子回复
			name = comments[commentIndex].replays.find(item=>item.comment_id === replayId)
		} else {
			// 主回复
			name = comments.find(item => item.comment_id === commentId)
		}
		// 获取评论中作者名字
		name = name.author.author_name
		commentObj.to = name
		// 更新评论信息
		commentObj = {
			[commentIndex]: {
				replays: command.unshift(commentObj)
			}
		}


	}
	await db.collection('article').doc(articleId).update({
		comment: commentObj
	})

	return {
		code: 200,
		message: "数据提交成功",
		// result: article.data[0].comment
	}
};

function createId(length) {
	return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
