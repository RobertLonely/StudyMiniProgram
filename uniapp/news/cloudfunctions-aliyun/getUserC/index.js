'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		userId = ''
	} = event
	if (!userId) {
		return {
			code: 201,
			message: "获取用户信息失败",
			result: {}
		}
	}
	const userInfo = await db.collection('user').doc(userId).get()

	//返回数据给客户端
	return {
		code: 200,
		message: "获取用户信息成功",
		result: userInfo.data[0]
	}
};
