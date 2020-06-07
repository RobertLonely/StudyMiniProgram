// 格式化时间方法
export function parseTime(time) {
	let format = '{y}-{m}-{d} {h}:{z}:{s}'
	if (typeof time === 'string') {
		time = parseInt(time)
	}
	let date = new Date(time)
	let formatDate = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		z: date.getMinutes(),
		s: date.getSeconds()
	}
	let result = format.replace(/{(y|m|d|h|z|s)+}/g, (result, key) => {
		let value = formatDate[key]
		if (value < 10) value = '0' + value
		return value
	})
	return result
}
