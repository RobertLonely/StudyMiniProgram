<template>
	<view class="home">
		<!-- 顶部导航栏 -->
		<navbar></navbar>
		<!-- 标签栏 -->
		<tab :list="tabList"></tab>
		<!-- 卡片视图 -->
		<!-- <view class="card-list"> -->
		<gesture :tab="tabList" class="gesture"></gesture>
		<!-- </view> -->
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				tabList: [],
				// tabIndex: 0
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		watch: {
			userInfo(newVal) {
				this.getTabList()
			}
		},
		onLoad() {
			// console.log(1)
			// 监听自定义事件
			// uni.$on('refreshIndexPage', () => {
			// 	// 当标签页编辑完成时，重置标签栏数据
			// 	this.tabList = []
			// 	this.getTabList()
			// })
			uni.$on('putTabList', () => {
				this.tabList = []
				this.getTabList()
			})
			// this.getTabList()

		},
		methods: {
			getTabList: function() {
				this.$api.getTabListC({
					type: ''
				}).then(res => {
					this.tabList = res.result.data;
					// 添加全部标签
					this.tabList.unshift({
						name: '全部'
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;

		.home {
			display: flex;
			flex-direction: column;
			flex: 1;

			.card-list {
				height: 100%;
			}

			.gesture {
				height: 100%;
			}

		}
	}
</style>
