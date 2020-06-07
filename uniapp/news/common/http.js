import store from '@/store/index.js'
export default function $http(options) {
	return new Promise((resovle, reject) => {
		const {
			name,
			data
		} = options
		const obj = {
			userId: store.state.userInfo._id,
			...data
		}

		uniCloud.callFunction({
			name,
			data: obj
		}).then(res => {
			if (res.result.code === 200) {
				resovle(res)
			} else {
				reject(res)
			}
		}).catch((err) => {
			reject(err)
		})

	})
}
