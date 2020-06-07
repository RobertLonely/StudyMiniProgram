<template>
	<view>
		<uni-load-more status="loading" v-if="articleList.length === 0 && isContent"></uni-load-more>
		<view class="noContent" v-if="!isContent">
			还没有发表过文章~
		</view>
		<card-view>
			<card v-for="(item,index) in articleList" :key="index" :item="item" :types="'follow'"></card>
		</card-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList: [],
				isContent: true
			}
		},
		methods: {

		},
		onLoad() {
			this.$api.getArticleC().then(res => {
				this.articleList = res.result.result
				this.isContent = this.articleList.length !== 0 ? true : false
			})
		}
	}
</script>

<style>

</style>
