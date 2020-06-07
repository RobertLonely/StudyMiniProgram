import $http from '../http.js'

// 获取tab列表
const getTabListC = (data) => {
	return $http({
		name: 'getTabListC',
		data
	})
}

// 获取card列表
const getCardListC = (data) => {
	return $http({
		name: 'getCardListC',
		data
	})
}

// 设置文章关注
const putLikeC = (data) => {
	return $http({
		name: 'putLikeC',
		data
	})
}

// 设置文章关注
const getSearchC = (data) => {
	return $http({
		name: 'getSearchC',
		data
	})
}

// 更新标签页数据
const putTabListC = (data) => {
	return $http({
		name: 'putTabListC',
		data
	})
}

// 获取文章详细信息
const getDetailC = (data) => {
	return $http({
		name: 'getDetailC',
		data
	})
}

// 提交评论内容
const postCommentC = (data) => {
	return $http({
		name: 'postCommentC',
		data
	})
}

// 获取文章评论内容
const getCommentC = (data) => {
	return $http({
		name: 'getCommentC',
		data
	})
}

// 关注或取关文章作者
const putAuthorIdC = (data) => {
	return $http({
		name: 'putAuthorIdC',
		data
	})
}

// 点赞
const putPraiseC = (data) => {
	return $http({
		name: 'putPraiseC',
		data
	})
}

// 获取关注的文章
const getFollowC = (data) => {
	return $http({
		name: 'getFollowC',
		data
	})
}

// 获取用户关注的作者
const getAuthorC = (data) => {
	return $http({
		name: 'getAuthorC',
		data
	})
}
// 获取用户信息
const getUserC = (data) => {
	return $http({
		name: 'getUserC',
		data
	})
}
// 获取用户发表的文章
const getArticleC = (data) => {
	return $http({
		name: 'getArticleC',
		data
	})
}
// 提交用户的反馈
const postFeedbackC = (data) => {
	return $http({
		name: 'postFeedbackC',
		data
	})
}

export {
	getTabListC,
	getCardListC,
	putLikeC,
	getSearchC,
	putTabListC,
	getDetailC,
	postCommentC,
	getCommentC,
	putAuthorIdC,
	putPraiseC,
	getFollowC,
	getAuthorC,
	getUserC,
	getArticleC,
	postFeedbackC
}
