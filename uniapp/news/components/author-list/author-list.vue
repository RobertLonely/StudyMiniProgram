<template>
	<view class="info-box">
		<view class="info">
			<!-- 主要信息 -->
			<view class="main-info">
				<!-- 头像 -->
				<view class="img">
					<image :src="item.avatar" mode=""></image>
				</view>
				<!-- 详细信息 -->
				<view class="detail-info">
					<text>{{item.author_name}}</text>
					<text>{{item.professional}}</text>
				</view>
			</view>
			<!-- 次要信息 -->
			<view class="minor-info">
				<text>发帖：{{item.follow_count}}</text>
				<text>粉丝：{{item.fans_count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.info-box {
		.info {
			padding: 10px;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			border-bottom: 1px solid #ccc;

			.main-info {
				display: flex;
				align-items: center;

				.img {
					height: 40px;
					width: 40px;
					overflow: hidden;
					border-radius: 50%;
					// border: 1px solid red;
					margin-right: 10px;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.detail-info {
					display: flex;
					height: 40px;
					flex-direction: column;
					justify-content: space-between;
					color: #666;
					font-size: 14px;

					text:first-child {
						color: #333;
						font-size: 16px;
						margin-bottom: 5px;
					}
				}
			}

			.minor-info {
				color: #333;
				font-size: 14px;

				text:first-child {
					margin-right: 10px;
				}
			}
		}
	}
</style>
