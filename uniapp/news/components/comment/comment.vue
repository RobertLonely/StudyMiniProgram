<template>
	<view class="container">
		<view class="userInfo">
			<view class="userAvatar">
				<image :src="comment.author.avatar" mode=""></image>
			</view>
			<view class="other">
				<text v-if="!comment.isReplay">{{comment.author.author_name}}</text>
				<text v-else>{{comment.author.author_name}} <text class="replayText">回复</text> {{comment.to}}</text>
				<text>{{comment.create_time | formatTime}}</text>
			</view>
		</view>
		<view class="comment">
			<view>
				{{comment.comment}}
			</view>
			<view class="replay-button">
				<text @click="toPopup({id:comment.comment_id,isReplay})">回复</text>
			</view>
			<view class="replays" v-for="(item,index) in comment.replays" :key="index">
				<comment :isReplay="true" :comment="item" @goPopup="toPopup"></comment>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import comment from '@/components/comment/comment.vue'
	import {
		parseTime
	} from '@/utils/index.js'
	export default {
		name: 'comment',
		components: {
			comment
		},
		props: {
			comment: {
				type: Object,
				default () {
					return {}
				}
			},
			// 默认是文章评论
			isReplay: {
				type: Boolean,
				default: false
			}
		},
		filters:{
			formatTime(time){
				return parseTime(time)
			}
		},
		data() {
			return {

			};
		},
		methods: {
			toPopup(obj) {

				// 为了区分子回复还是主回复
				if (obj.isReplay) {
					// 子回复id
					obj.replayId = obj.id;
					// 主回复id
					obj.id = this.comment.comment_id
				}
				// console.log(obj)
				// console.log(this.comment)
				// console.log(obj)
				this.$emit('goPopup', obj)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		// border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
		margin-top: 10px;
		box-sizing: border-box;

		.userInfo {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			margin-bottom: 10px;

			.userAvatar {
				width: 35px;
				height: 35px;
				border-radius: 50%;
				overflow: hidden;
				// border: 1px solid red;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.other {
				display: flex;
				// height: 35px;
				flex-direction: column;
				justify-content: space-between;
				margin-left: 10px;

				.replayText {
					margin: 0 10px;
				}

				text:first-child {
					color: #666;
					font-size: 14px;
				}

				text:last-child {
					color: #ccc;
					font-size: 12px;
				}
			}
		}

		.comment {
			// padding: 0 10px;
			font-size: 16px;
			color: #333;

			.replay-button {
				margin-top: 10px;
				box-sizing: border-box;

				text {
					border-radius: 5px;
					padding: 5px 10px;
					color: white;
					font-size: 14px;
					background-color: #ff5722;
				}
			}

			.replays {
				margin-top: 15px;
				border: 1px solid #ccc;
				border-radius: 5px;

			}
		}

	}
</style>
