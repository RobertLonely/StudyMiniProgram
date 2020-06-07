<template>
	<view class="follow-box">
		<!-- 导航栏 -->
		<view class="	follow-nav">
			<view class="follow-nav-box">
				<!-- 切换按钮 -->
				<view class="nav-button" :class="{active:activeIndex === 0}" @click="tap(0)">
					文章
				</view>
				<view class="nav-button" :class="{active:activeIndex === 1}" @click=" tap(1)">
					作者
				</view>
			</view>
		</view>
		<!-- 内容呈现区域 -->
		<view class="follow-list">
			<swiper class="swiper" :current="activeIndex" @change="gestureSwiper">
				<swiper-item class="swiper-item ">
					<uni-load-more status="loading" v-if="followList.length === 0 && isContent"></uni-load-more>
					<view class="noContent" v-if="!isContent">
						还没有关注文章~
					</view>
					<card-view>
						<card v-for="(item,index) in followList" :key="index" :item="item" :types="'follow'"></card>
					</card-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<view class="noContent" v-if="!isAuthor">
						还没有关注作者~
					</view>
					<card-view>
						<author-list :item="item" v-for="(item,index) in authorList" :key="index"></author-list>
					</card-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: 0,
				followList: [],
				isContent: true,
				authorList: [],
				isAuthor: true
			}
		},
		onLoad() {
			this.getFollow()
			this.getAuthor()
			uni.$on('updataLike', () => {
				this.getFollow()
			})
			uni.$on('updateAuthor', () => {
				this.getAuthor()
			})
		},
		methods: {
			tap(index) {
				this.activeIndex = index
			},
			getFollow() {
				this.$api.getFollowC().then(res => {
					this.followList = res.result.result
					this.isContent = this.followList.length !== 0 ? true : false
				})
			},
			gestureSwiper(event) {
				this.activeIndex = event.detail.current
			},
			getAuthor() {
				this.$api.getAuthorC().then(res => {
					this.authorList = res.result.result
					this.isAuthor = this.authorList.length !== 0 ? true : false
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.follow-box {
		display: flex;
		height: 100%;
		flex-direction: column;
		flex: 1;
		box-sizing: border-box;
		// border: 1px solid red;

		.follow-nav {
			display: flex;
			padding: 15px 20px;
			// height: 60px;
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #ccc;

			.follow-nav-box {
				height: 30px;
				width: 100%;
				border: 1px solid $my-color-navbar;
				border-radius: 5px;
				display: flex;

				// box-sizing: border-box;
				.nav-button {
					display: flex;
					width: 100%;
					height: 100%;
					justify-content: center;
					align-items: center;
					color: #666;
					font-size: 14px;
					font-weight: bold;

					&:first-child {
						border-right: 1px solid $my-color-navbar;
					}
				}

				.active {
					background-color: $my-color-navbar;
					color: #fff;
				}
			}
		}

		.follow-list {
			height: 100%;
			flex: 1;

			.swiper {
				height: 100%;

				.swiper-item {
					height: 100%;

					.noContent {
						display: flex;
						width: 100%;
						height: 100%;
						align-items: center;
						justify-content: center;
						color: #ccc;
						font-size: 14px;
					}
				}
			}
		}
	}
</style>
