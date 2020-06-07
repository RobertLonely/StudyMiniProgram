<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.$api.getUserC({
				userId: '5ecdd2d9550399004d70b8bb'
			}).then(res => {
				this.$store.commit('setUserInfo', res.result.result)
				// console.log(this.$store.state)
			}).catch(res => {
				console.log(res.result.message)
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 导入gaoyia-parse插件的样式 */
	@import url("@/components/gaoyia-parse/parse.css");
</style>
