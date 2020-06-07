<template>
	<view class="container" @click="add" @tap="toDetail">
		<!-- 基础卡片 -->
		<view class="card-box" v-if="item.mode==='base'">
			<view class="img">
				<image :src="item.cover[0]"></image>
			</view>
			<view class="card-content base-content">
				<view class="title">
					<text class="long-limit">{{item.title}}</text>
					<like :articleInfo="item" :types="types"></like>
				</view>
				<view class="subhead">
					<view class="label">{{item.classify}}</view>
					<view class="count">浏览了{{item.browse_count}}次</view>
				</view>

			</view>
		</view>
		<!-- 多图卡片 -->
		<view class="card-box" v-else-if="item.mode==='column'">
			<view class="card-content">
				<view class="title">
					<text class="long-limit">{{item.title}}</text>
					<like :articleInfo="item"  :types="types"></like>
				</view>
				<view class="img more-img">
					<view class="more-item" v-if="index<3" v-for="(item,index) in item.cover" :key="index">
						<image :src="item"></image>
					</view>

				</view>
				<view class="subhead">
					<view class="label">{{item.classify}}</view>
					<view class="count">浏览了{{item.browse_count}}</view>
				</view>

			</view>
		</view>
		<!-- 大图卡片 -->
		<view class="big-box card-box" v-else>
			<view class="img big-img">
				<image :src="item.cover[0]"></image>
			</view>
			<view class="card-content">
				<view class="title">
					<text class="long-limit">{{item.title}}</text>
					<like :articleInfo="item"  :types="types"></like>
				</view>
				<view class="subhead">
					<view class="label">{{item.classify}}</view>
					<view class="count">浏览了{{item.browse_count}}</view>
				</view>

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
			},
			types: {
				type: String,
				default: ''
			}
		},
		data() {
			return {

			};
		},
		methods: {
			add() {
				this.$emit('addRecordBox')
			},
			toDetail() {
				let item = this.item
				let params = {
					author: item.author,
					browse_count: item.browse_count,
					create_time: item.create_time,
					thumbs_up_count: item.thumbs_up_count,
					title: item.title,
					_id: item._id

				}
				uni.navigateTo({
					url: "/pages/detail/detail?params=" + JSON.stringify(params)
				})
				// uni.$emit('delivery', this.item)
			}
		}
	}
</script>

<style lang="scss">
	.card-box {
		display: flex;
		align-items: center;
		margin: 10px;
		padding: 10px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		border-radius: 12px;

		.img {
			flex-shrink: 0;
			width: 90px;
			height: 90px;
			margin-right: 10px;
			border-radius: 5px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.more-img {
			display: flex;
			justify-content: space-between;
			width: 100%;
			margin: 5px 0;

			.more-item {
				width: 30%;
				height: auto;

				image {
					border-radius: 5px;
					overflow: hidden;
				}
			}
		}

		.card-content {
			flex-direction: column;
			justify-content: space-between;
			height: 100%;
			width: 100%;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-shrink: 0;
				font-size: 14px;
				color: #333;

				.long-limit {
					overflow: hidden;
					// 一个非规范的属性，需要与外来webkit属性结合使用
					-webkit-line-clamp: 2;
					// 将对象作为弹性伸缩盒子模型显示，必须结合
					display: -webkit-box;
					// 设置或检索伸缩盒对象的子元素的排列方式，必须结合
					-webkit-box-orient: vertical;
					// 有多行文本时，用“...”隐藏超出范围的文本，必须结合
					text-overflow: ellipsis
				}
			}

			.subhead {
				display: flex;
				font-size: 12px;
				justify-content: space-between;
				color: #aaa;

				.label {
					border: 1px solid $my-color-navbar;
					border-radius: 3px;
					color: $my-color-navbar;
					padding: 2px;
				}

				.count {}
			}
		}

		.base-content {
			display: flex;
			justify-content: space-between;
			height: 100px;
		}
	}

	.big-box {
		display: flex;
		flex-direction: column;

		.big-img {
			width: 100%;
			height: 150px;
		}

		.title {
			margin: 5px 0;
		}

	}
</style>
