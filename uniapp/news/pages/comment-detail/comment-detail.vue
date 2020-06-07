<template>
	<view>
		<view class="comment-view" v-for="(item,index) in commentList" :key="index">
			<comment :comment="item"></comment>
		</view>
		<uni-load-more :status="loading"></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commentList: [],
				articleId: '',
				page: 1,
				pageSize: 5,
				loading: 'loading'

			}
		},
		onReachBottom() {
			if (this.loading === 'noMore') return
			this.page++
			this.getCommentList()
			// console.log(1)
		},
		methods: {
			getCommentList() {
				this.$api.getCommentC({
					articleId: this.articleId,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					let data = res.result.result
					if (data.length === 0 || data.length < 5) {
						this.loading = "noMore"
					}
					let oldList = this.commentList
					oldList.push(...data)
					this.commentList = oldList
					// console.log(res)
				})
			}

		},
		onLoad(query) {
			// 获取其他页面传递过来的文章ID
			this.articleId = query.id
			// console.log(this.articleId)
			// 获取评论列表
			this.getCommentList()
		}
	}
</script>

<style lang="scss">
	.comment-view {
		padding: 0 15px;
	}
</style>
