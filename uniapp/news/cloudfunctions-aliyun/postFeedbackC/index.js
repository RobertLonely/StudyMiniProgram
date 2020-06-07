'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		userId,
		content,
		imgPaths
	} = event
	await db.collection('feedback').add({
		user_id: userId,
		content,
		imgPaths
	})
	//返回数据给客户端
	return {
		code: 200,
		message: '提交反馈成功'
	}
};
