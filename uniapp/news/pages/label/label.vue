<template>
	<view class="content">
		<!-- 标签编辑区域 -->
		<view class="edit-box">
			<view class="edit-head">
				<text>我的标签</text>
				<text @click="displayClear">{{isDisplay?'完成':'编辑'}}</text>
			</view>
			<uni-load-more status="loading" v-if="loading"></uni-load-more>
			<view class="edit-area" v-else>
				<view v-if="!selfTab.length" class="noTab">没有关注的分类</view>
				<view v-else class="label-item" v-for="(item,index) in selfTab" :key="index">{{item.name}}
					<uni-icons type="clear" color="#ff5722" size="20" class="label-clear" v-if="isDisplay" @click="delTab(index)"></uni-icons>
				</view>
			</view>

		</view>
		<!--  标签推荐区域 -->
		<view class="edit-box">
			<view class="edit-head">
				<text>推荐标签</text>
			</view>
			<uni-load-more status="loading" v-if="loading"></uni-load-more>
			<view class="edit-area" v-else>
				<view v-if="!residueTab.length" class="noTab">没有更多推荐标签</view>
				<view v-else class="label-item" v-for="(item,index) in residueTab" :key="index" @click="addTab(index)">{{item.name}}</view>

			</view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isDisplay: false,
				selfTab: [],
				residueTab: [],
				loading: true

			}
		},
		onLoad() {
			this.getTabList()
		},
		methods: {
			displayClear() {
				this.isDisplay = !this.isDisplay
				if (!this.isDisplay) {
					this.putTabList(this.selfTab)
					// 更新首页的状态栏
					// uni.$emit('refreshIndexPage')
				}
			},
			getTabList() {
				this.$api.getTabListC({
					type: 'all'
				}).then(res => {
					this.loading = false
					const {
						data
					} = res.result
					this.selfTab = data.filter(item => item.self)
					this.residueTab = data.filter(item => !item.self)
				})
			},
			delTab(index) {
				this.residueTab.push(this.selfTab[index])
				this.selfTab.splice(index, 1)
			},
			addTab(index) {
				if (!this.isDisplay) return
				this.selfTab.push(this.residueTab[index])
				this.residueTab.splice(index, 1)
			},
			putTabList(arr) {
				let labels = []
				// 只需保存标签的_id即可
				arr.forEach(item => {
					labels.push(item._id)
				})
				uni.showLoading({
					title: "保存中..."
				})
				// 发送请求
				this.$api.putTabListC({
					labels
				}).then(res => {
					uni.hideLoading()
					uni.showToast({
						title: "编辑成功",
						icon: "none"
					})
					// 刷新首页标签
					uni.$emit('putTabList')
				}).catch(() => {
					uni.hideLoading()
					uni.showToast({
						title: "编辑失败",
						icon: "none"
					})
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		margin: 10px 10px 0;

		.edit-box {
			// height: 200px;
			background-color: #fff;
			// border-bottom: 5px solid #f5f5f5;
			border-radius: 5px;
			margin-bottom: 10px;

			.edit-head {
				display: flex;
				justify-content: space-between;
				align-items: center;
				// height: 50px;
				border-bottom: 1px solid #eee;
				padding: 10px;

				text {
					color: #666;
					font-size: 16px;
					font-weight: bold;
				}

				text:last-child {
					color: #4cd964;
					;
				}

				text:first-child {
					color: #ff5722;
				}



			}

			.edit-area {
				padding: 10px;
				display: flex;
				flex-wrap: wrap;

				.label-item {
					padding: 5px 10px;
					border: 1px solid #ccc;
					border-radius: 5px;
					color: #ccc;
					font-size: 14px;
					margin: 0 10px 10px 0;
					position: relative;

					.label-clear {
						position: absolute;
						top: -8px;
						right: -8px;
					}

				}

				.noTab {
					width: 100%;
					text-align: center;
					color: #ccc;
					font-size: 16px;
				}
			}

		}
	}
</style>
