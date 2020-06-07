<template>
	<swiper class="swiper-box" @change="userTouch" :current="currentIndex" skip-hidden-item-layout>
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<gesture-item :cardList="cardList[index]" :load="flag[index]"></gesture-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import gestureItem from './gesture-item.vue'
	export default {
		props: {
			tab: {
				type: Array,
				default: function() {
					return []
				}

			}
		},
		components: {
			gestureItem
		},
		data() {
			return {
				currentIndex: 0,
				cardList: [],
				// 页面显示的数据数量
				pageSize: 5,
				// 页数
				page: 1,
				// 是否处于加载状态
				flag: []
			};
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				// 在标签栏变化时，清空cardList的缓存
				this.cardList = []
				this.getCardList(this.currentIndex)
			}
		},
		methods: {
			// 手势切换卡片视图区域时，将当前选中的标签索引传递给tab组件
			userTouch(e) {
				let current = e.detail.current
				this.$parent.$children[1].getActiveIndex(current)
				// 切换卡片视图时，重置page属性
				this.page = 1
				// 切换卡片视图时，如果flag为false时，表明已经访问过并全部加载完
				if (this.flag[current] != null) return
				// 切换标签时，发起查询
				if (!this.cardList[current] || this.cardList[current].length === 0) {
					this.getCardList(e.detail.current)
				}
			},
			// 切换标签时，切换卡片视图区域
			cut(index) {
				this.currentIndex = index
			},
			// 获取卡片列表
			getCardList(index) {
				const name = this.tab[index].name
				this.$api.getCardListC({
					// userId: '5ecdd2d9550399004d70b8bb',
					name,
					pageSize: this.pageSize,
					page: this.page
				}).then(res => {
					let data = res.result.result
					// console.log(data)
					// 所有数据加载完成，关闭加载状态
					if (data.length < 5 || !data) {
						this.flag[index] = false
					}
					// 如果存在之前旧数据就缓存下来，没有就为空数组
					let upData = this.cardList[index] || []
					// 将新增数据添加到旧数组里面
					upData.push(...data)
					// 用最新数据替换旧数据
					this.$set(this.cardList, index, upData)
					// console.log(this.cardList)
				}).catch(err => {
					console.log(err)
				})
			}

		},
		mounted() {
			this.$EventBus.$on('loadCard', () => {
				// flag为false时，表明已经访问过并全部加载完
				if (this.flag[this.currentIndex] != null) return
				this.page++
				this.getCardList(this.currentIndex)
			})
		},
		created() {
			// uni.$on('updataLike', (types) => {
			// 	console.log(types)
			// 	if (types === '') return
			// 	this.cardList = []
			// 	this.getCardList(this.currentIndex)
			// })
			// console.log(2)
		}
	}
</script>

<style lang="scss">
	// page {
	// 	height: 100%;
	// }

	.swiper-box {
		height: 100%;

		.swiper-item {
			height: 100%;
		}
	}
</style>
