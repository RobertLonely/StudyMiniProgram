<template>
	<card-view class="card-view">
		<view>
			<card :item="item" v-for="(item,index) in cardList" :key="index"></card>
			<!-- <card :item="item" v-for="(item,index) in list" :key="index"></card> -->
		</view>
		<uni-load-more :status="load?'loading':'noMore'"></uni-load-more>
		<!-- <uni-load-more v-if="cardList.length === 0 || cardList.length > 7" iconType="snow" :status="load.loading || []"></uni-load-more> -->
	</card-view>
</template>

<script>
	export default {
		props: {
			cardList: {
				type: Array,
				default: function() {
					return []
				}

			},
			load: {
				type: Boolean,
				default: true
			},

			// load: {
			// 	type: Object,
			// 	default () {
			// 		return {
			// 			loading: "loading"
			// 		}
			// 	}
			// }
		},
		data() {
			return {
				list: [],
			}
		},
		methods: {},
		created() {
			// console.log(3)
		}
	}
</script>

<style lang="scss">
	.card-view {
		height: 100%;
	}
</style>
