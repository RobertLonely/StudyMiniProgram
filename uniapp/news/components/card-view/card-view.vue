<template>
	<view class="card-view">
		<scroll-view scroll-y class="scroll-box" @scrolltolower="loadMore">
			<view class="item-box">
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			loadMore() {
				// 通过事件中心，传递事件
				this.$EventBus.$emit('loadCard')
			}
		}
	}
</script>

<style lang="scss">
	.card-view {
		height: 100%;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;

		.scroll-box {
			height: 100%;
		}
	}
</style>
