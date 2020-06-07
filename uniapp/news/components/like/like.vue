<template>
	<view @click.stop="collect">
		<uni-icons :type="flag?'heart-filled':'heart'" color="#ff5722" size="26"></uni-icons>
	</view>
</template>

<script>
	export default {
		props: {
			articleInfo: {
				type: Object,
				default: function() {
					return {}
				}
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				flag: false

			};
		},
		mounted() {
			this.flag = this.articleInfo.isLike
		},
		methods: {
			collect() {
				// 加载提示
				uni.showLoading()
				// 访问云函数
				this.$api.putLikeC({
					// userId: '5ecdd2d9550399004d70b8bb',
					articleId: this.articleInfo._id
				}).then(res => {
					// 点亮红心
					this.flag = !this.flag
					// 加载完成，隐藏加载图标
					uni.hideLoading()
					// 显示消息提示框
					uni.showToast({
						title: this.flag ? '收藏成功' : '取消收藏',
						icon: this.flag ? 'success' : 'none'
					})
					uni.$emit('updataLike', this.types)
					// console.log(this.types)
				}).catch(() => {
					// 加载完成，隐藏加载图标
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>

</style>
