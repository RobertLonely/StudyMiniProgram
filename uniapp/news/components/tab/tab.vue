<template>
	<view class="content">
		<scroll-view class="slide" scroll-x>
			<view class="slide-box">
				<view class="item" v-for="(item,index) in list" :key="index" @click="currentTab(item,index)" :style="activeTab===index?'color:#ff5722':''">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="gear" @click="toLabelPage">
			<uni-icons type="gear" size="24" color="666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		props: [
			"list"
		],
		data() {
			return {
				activeTab: 0
			};
		},
		methods: {
			// 切换标签时，高亮显示当前选中标签
			currentTab(item, index) {
				this.activeTab = index
				// 将当前选中的标签索引传递给gesture组件
				this.$parent.$children[2].cut(index)
			},
			// 手势切换卡片视图区域时，设置高亮标签
			getActiveIndex(index) {
				this.activeTab = index
			},
			// 跳转到标签管理页
			toLabelPage(){
				uni.navigateTo({
					url:'../../../pages/label/label'
				})
			}
				
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-bottom: 1px solid #ccc;
		box-sizing: border-box;

		.slide {
			// flex: 1;
			box-sizing: border-box;
			overflow: hidden;

			.slide-box {
				height: 45px;
				display: flex;
				align-items: center;

				.item {
					flex-shrink: 0;
					padding: 0 15px;
					color: #333;
					font-size: 14px;
				}
			}

		}

		.gear {
			line-height: 30px;
			padding: 0 10px;
			text-align: center;
			width: 30px;
			height: 30px;
			border-left: 1px solid #ccc;
		}

	}
</style>
