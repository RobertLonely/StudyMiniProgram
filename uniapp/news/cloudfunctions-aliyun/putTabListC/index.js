'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const {
		userId,
		labels
	} = event

	await db.collection('user').doc(userId).update({
		label_ids: labels
	})

	//返回数据给客户端
	return {
		code: 200,
		message: "更新标签成功"
	}
};
