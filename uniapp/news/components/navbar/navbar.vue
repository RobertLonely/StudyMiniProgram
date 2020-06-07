<template>
	<!-- 自定义导航头部 -->
	<view class="content">
		<view class="navFix">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view class="navbar-container" :style="{height:navBarHeight+'px',width:navBarWidth+'px'}">
				<view v-if="isSearch" class="backIcon" @click="back">
					<uni-icons type="back" color="#fff" size="26"></uni-icons>
				</view>
				<view class="navbar" :style="isSearch?'border-radius:5px':''">
					<!-- 搜索图标 -->
					<view class="icon">
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="search">
						<input type="text" placeholder="请输入关键词" v-if="isSearch" @input="inputChange" :value="word" />
						<text v-else @click.stop="toSearchPage">今日热搜：Uni-App</text>
					</view>
				</view>
			</view>
		</view>
		<view :style="{height:navBarHeight+statusBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isSearch: {
				type: Boolean,
				default: false
			},
			word: {
				type: [String, Number],
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight: 0,
				navBarHeight: 45,
				navBarWidth: 375
			}
		},
		created() {
			const res = uni.getSystemInfoSync()
			this.statusBarHeight = res.statusBarHeight
			this.navBarWidth = res.windowWidth
			// #ifndef H5||MP-ALIPAY||APP-PLUS
			const capsule = uni.getMenuButtonBoundingClientRect()
			// 导航栏高度=（胶囊底部坐标-状态栏坐标）+（胶囊顶部坐标-状态栏坐标）
			this.navBarHeight = (capsule.bottom - res.statusBarHeight) + (capsule.top - res.statusBarHeight)
			// 导航栏宽度=胶囊左边坐标
			this.navBarWidth = capsule.left
			// #endif
		},
		methods: {
			toSearchPage() {
				uni.navigateTo({
					url: '../../../pages/search/search',
					fail: function(err) {
						console.log(err)
					},
					success: function() {
						// this.isSearch = !this.isSearch
					}
				})
			},
			inputChange(e) {
				this.$emit('searchInput', e.detail.value)
			},
			back() {
				uni.switchTab({
					url: "../../pages/tabbar/index/index",
					fail(err) {
						cosnole.log(err)
					}
				})
			}

		}
	}
</script>

<style lang="scss">
	.content {
		.navFix {
			width: 100%;
			position: fixed;
			top: 0;
			left: 0;
			background-color: $my-color-navbar;

			.navbar-container {
				display: flex;
				align-items: center;
				padding: 0 15px;
				box-sizing: border-box;
				height: 45px;

				.navbar {
					background-color: #fff;
					width: 100%;
					height: 30px;
					display: flex;
					align-items: center;
					padding: 0 10px;
					border-radius: 30px;

					.icon {
						margin-right: 10px;
					}

					.search {
						width: 100%;
						color: #ccc;
						font-size: 12px;

						text {
							display: inline-block;
							width: 100%;
						}

						input {
							color: black;
						}
					}
				}

				.backIcon {
					margin-left: -15px;
					padding: 0 10px;
				}
			}
		}
	}
</style>
