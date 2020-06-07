<template>
	<view class="container">
		<!-- 顶部搜索框 -->
		<navbar :isSearch="true" @searchInput="searchInput" :word="keyword"></navbar>
		<!-- 搜索记录框 -->
		<view class="history-box" v-if="!keyword">
			<!-- 搜索框标题栏 -->
			<view class="title">
				<text>搜索历史</text>
				<text @click="clearHistory">清空</text>
			</view>
			<!-- 标签分类盒子 -->
			<view class="label-box">
				<view v-if="historyList.length ===0" class="empty">
					<uni-icons type="info-filled" color="#dd524d" size="26"></uni-icons>
					<text>历史记录为空</text>
				</view>
				<view class="label-item" v-else v-for="(item,index) in historyList" :key="index" @click="againSearch(item)">{{item}}</view>
			</view>
		</view>
		<!-- 查询结果 -->
		<view v-else>
			<uni-load-more status="loading" v-if="isLoad"></uni-load-more>
			<card-view class="card-view" v-if="searchList.length !== 0">
				<card :item="item" v-for="(item,index) in searchList" :key="index" @addRecordBox="addRecordBox"></card>
			</card-view>
			<view v-else-if="searchList.length===0 && !isLoad" class="notResult">
				<uni-icons type="info-filled" size="26" color="#ccc"></uni-icons>
				<text>没有相关文章</text>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				searchList: [],
				keyword: '',
				isLoad: false
			}
		},
		methods: {
			...mapMutations(['addHistory', 'emptyHistory']),
			searchInput(name) {
				// 显示加载图标
				this.isLoad = true
				this.keyword = name
				// 清空搜索值时，清除搜索结果列表
				if (!name.trim()) {
					this.searchList = []
					// 在清空搜索框时，最后一个字符，还会发送请求
					clearTimeout(this.timer)
					return
				}

				if (this.timer) clearTimeout(this.timer);
				this.timer = setTimeout(() => {
					this.getSearch(name)
					this.timer = null;
				}, 500);
			},
			getSearch(name) {

				this.$api.getSearchC({
					name
				}).then(res => {
					this.isLoad = false
					this.searchList = res.result.result
				})
			},
			addRecordBox() {
				// 如果历史记录中已经存在，直接返回，不在存储
				if (this.historyList.includes(this.keyword)) return
				this.addHistory(this.keyword)
			},
			againSearch(item) {
				this.keyword = item
				this.getSearch(item)
			},
			clearHistory() {
				// 将store中的historyList设置为空数组
				this.emptyHistory()
			}

		},
		computed: {
			...mapState(['historyList'])
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.container {
		display: flex;
		flex-direction: column;
		flex: 1;

		.history-box {
			// height: 200px;
			margin: 10px;
			border-radius: 5px;
			box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: .2);

			.title {
				height: 20px;
				border-bottom: 1px solid #ccc;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 10px;

				text {
					font-size: 14px;
					font-weight: bold;
				}

				text:first-child {
					color: #dd524d;
				}

				text:last-child {
					color: #4cd964;
				}
			}

			.label-box {
				display: flex;
				flex-wrap: wrap;
				padding: 10px;
				// height: 100%;


				.label-item {
					padding: 5px 10px;
					border: 1px solid #ccc;
					border-radius: 5px;
					color: #ccc;
					font-size: 16px;
					margin: 0 10px 10px 0;
				}

				.empty {
					height: 100%;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;

					text {
						margin: 0 5px;
						color: #ccc;
						font-size: 16px;
					}
				}
			}


		}

		.notResult {
			height: 200px;
			text-align: center;
			line-height: 200px;
			color: #ccc;
			font-size: 20px;
			margin: 10px;
			border-radius: 5px;
			background-color: #fff;
			box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: .2);
		}
	}
</style>
