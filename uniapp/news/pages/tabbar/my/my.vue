<template>
	<view class="container">
		<view class="box-background">
			<image :src="userInfo.avatar" mode=""></image>
		</view>
		<view class="user-box">
			<!-- 头部 -->
			<view class="user-head">
				<!-- 用户头像 -->
				<view class="user-img">
					<image :src="userInfo.avatar" mode=""></image>
				</view>
				<!-- 用户姓名 -->
				<text>{{userInfo.author_name}}</text>
			</view>
			<!-- 尾部 -->
			<view class="user-tail">
				<!-- 关注人数 -->
				<view class="user-tail-item">
					<text class="focus-title">关注</text>
					<text class="focus-count">{{userInfo.follow_count}}</text>
				</view>
				<!-- 粉丝人数 -->
				<view class="user-tail-item">
					<text>粉丝</text>
					<text>{{userInfo.fans_count}}</text>
				</view>
				<!-- 积分数目 -->
				<view class="user-tail-item">
					<text class="integral-title">积分</text>
					<text class="integral-count">{{userInfo.integral_count || 0}}</text>
				</view>

			</view>
		</view>
		<view class="user-options">
			<!-- 我的文章 -->
			<view class="option" @click="goMyArticle">
				<view class="option-head">
					<uni-icons type="contact" color="#ff5722" size="25" class="icons"></uni-icons>
					<text>我的文章</text>
				</view>
				<view class="option-tail">
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
			<!-- 反馈意见-->
			<view class="option" @click="goFeedback">
				<view class="option-head">
					<uni-icons type="help" color="#ff5722" size="25" class="icons"></uni-icons>
					<text>反馈意见</text>
				</view>
				<view class="option-tail">
					<uni-icons type="forward"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: this.$store.state.userInfo
			}
		},
		methods: {
			goMyArticle(){
				uni.navigateTo({
					url:'../../article/article'
				})
			},
			goFeedback(){
				uni.navigateTo({
					url:'../../feedback/feedback'
				})
			}

		},
		// created() {
		// 	console.log(this.userInfo)
		// }
	}
</script>

<style lang="scss">
	page {
		// display: flex;
		height: 100%;
	}

	.container {
		// width: 100%;
		height: 100%;
		background-color: #f5f5f5;
	}

	.user-box {
		// background: pink;
		padding-bottom: 15px;
		position: relative;
		margin-bottom: 15px;

		// width: 100%;
		.user-head {
			padding: 20px 0;
			// width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;

			.user-img {
				width: 100px;
				height: 100px;
				// border: 1px solid red;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 15px;

				image {
					width: 100%;
					height: 100%;
				}
			}

			text {
				color: #333;
				font-size: 20px;
				font-weight: bold;
			}
		}

		.user-tail {
			display: flex;
			justify-content: space-around;

			.user-tail-item {
				display: flex;
				flex-direction: column;
				align-items: center;


				text {
					color: #666;
					font-size: 16px;

					&:last-child {
						color: #ccc;
						font-size: 14px;
					}
				}


			}
		}
	}

	.box-background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		left: 0;
		opacity: 0.3;
		filter: blur(8px);
		text-align: center;
		overflow: hidden;

		image {
			width: 100%;
		}
	}

	.user-options {
		.option {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #fff;
			padding: 10px;
			margin-bottom: 10px;

			.option-head {
				display: flex;
				align-items: center;
				font-weight: bold;
				font-size: 18px;
				color: #444;

				.icons {
					margin-right: 10px;
				}
			}

			.option-tail {}
		}

	}
</style>
