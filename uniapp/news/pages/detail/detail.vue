<template>
	<view class="content">
		<view class="detail-box">
			<!-- 文章标题 -->
			<view class="detail-title">
				{{detail.title}}
			</view>
			<!-- 作者信息 -->
			<view class="writer">
				<!-- 作者头像 -->
				<view class="writer-img">
					<view class="img">
						<image :src="detail.author.avatar" mode=""></image>
					</view>

					<!-- 作者姓名及文章相关信息 -->
					<view class="writer-name">
						<!-- 姓名 -->
						<text class="name">{{detail.author.author_name}}</text>
						<!-- 相关信息 -->
						<view class="article-info">
							<text>{{detail.create_time}}</text>
							<text>{{detail.browse_count}} 浏览</text>
							<text>{{detail.thumbs_up_count}} 赞</text>
						</view>
					</view>
				</view>

				<view class="attention-writer" @click="attentionAuthor(detail.author.id)">
					{{detail.isLikeAuthor?"取关":"关注"}}
				</view>
			</view>
			<!-- 文章内容 -->
			<view class="article-content">
				<u-parse :content="detail.content" :noData="noData"></u-parse>
			</view>
			<view class="comments">
				<!-- 评论列表头部 -->
				<view class="comments-head">评论列表</view>
				<view class="comments-body" v-for="(item,index) in comments" :key="index">
					<comment :comment="item" @goPopup="goPopup"></comment>
				</view>
			</view>
			<!-- 底部操作框 -->
			<view class="bottom-operate">
				<view class="comment" @click="openDialog">
					<text>谈谈您的看法</text>
					<uni-icons type="compose" size="16" color="#ff5722"></uni-icons>
				</view>
				<uni-icons type="chat" size="20" color="#ff5722" @click="goCommentDetail"></uni-icons>
				<uni-icons :type="detail.isLikeArticle?'heart-filled':'heart'" size="20" color="#ff5722" @click="likeArticle(detail._id)"></uni-icons>
				<uni-icons :type="detail.isthumbs?'hand-thumbsup-filled':'hand-thumbsup'" size="20" color="#ff5722" @click="putPraise(detail._id)"></uni-icons>
			</view>
		</view>
		<!--实现弹出层 -->
		<uni-popup ref="popup" type="bottom">
			<!-- <uni-popup-dialog> -->
			<view class="comment-box">
				<view class="comment-head">
					<text @click="closeDialog">取消</text>
					<text @click="submit">发布</text>
				</view>
				<view class="comment-edit">
					<textarea v-model="value" placeholder="请输入评论内容..." maxlength="200" />
					<text>{{value.length}}/200</text>
						</view>
				</view>
			<!-- </uni-popup-dialog> -->
		</uni-popup>
	</view>
</template>

<script>
	// 导入解析富文本的插件
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		// 注册组件
		components: {
			uParse
		},
		data() {
			return {
				detail: {},
				noData: "<view style='text-align: center;'>详情加载中...</view>",
				value:'',
				comments:[],
				// 主回复id
				commentId:'',
				// 子回复id
				replayId:'',
				// 是否为子回复
				isReplay:false
			}
		},
		methods: {
			getDetail() {
				this.$api.getDetailC({
					articleId: this.detail._id
				}).then(res => {
					this.detail = res.result.result
				})
			},
			openDialog() {
				this.$refs.popup.open()
			},
			closeDialog(){
				this.$refs.popup.close()
			},
			submit(){
				uni.showLoading({
					title:"评论正在提交"
				})
				if(!this.value.trim()) {
					uni.showToast({
						title:"请输入评论内容",
						icon:"none"
					})
					return
				}
				let postData = {articleId:this.detail._id,comment:this.value,commentId:this.commentId,replayId:this.replayId,isReplay:this.isReplay}
				// console.log(postData)
				this.$api.postCommentC(postData).then(res=>{
					// console.log(2)
					uni.hideLoading()
					uni.showToast({
						title:"评论提交成功"})
						// 关闭评论框
						this.closeDialog()
				// 清空文本框
				this.value=""
				// 刷新评论区域
				this.getComment()
			    this.commentId=''
				})
			},
			getComment(){
				this.$api.getCommentC({articleId:this.detail._id}).then(res=>{
					this.comments=res.result.result
				})
			},
			goPopup(obj){
				// 弹出对话框
				this.openDialog()
				// 设置评论id
				this.commentId=obj.id
				this.isReplay=obj.isReplay
				// 判断是否存在子回复
				if(obj.replayId){
					this.replayId=obj.replayId
			    }
			},
			attentionAuthor(authorId){
				uni.showLoading({
					title:"加载中..."
				})
				this.$api.putAuthorIdC({authorId}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:this.detail.isLikeAuthor?"取关成功":"关注成功",
						icon:"none"
					})
					this.detail.isLikeAuthor = !this.detail.isLikeAuthor
					uni.$emit('updateAuthor')
				})
			},
			likeArticle(articleId){
				uni.showLoading({
					title:"加载中..."
				})
				this.$api.putLikeC({articleId}).then(res=>{
					// 刷新首页的文章收藏情况
					uni.$emit('updataLike','follow')
					uni.hideLoading()
					uni.showToast({
						title:this.detail.isLikeArticle?"取消收藏":"收藏成功",
						icon:"none"
					})
					this.detail.isLikeArticle = !this.detail.isLikeArticle
				})
			},
			putPraise(articleId){
				if(this.detail.isthumbs) return
				uni.showLoading({
					title:"加载中..."
				})
				this.$api.putPraiseC({articleId}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:this.detail.isLikeArticle?"还我赞来":"点赞成功",
						icon:"none"
					})
					this.detail.isthumbs = true
					this.detail.thumbs_up_count++
				})
			},
			goCommentDetail(){
				uni.navigateTo({
					url:"/pages/comment-detail/comment-detail?id="+this.detail._id
				})
			}
			
		},
		onLoad(query) {
			this.detail = JSON.parse(query.params)
			this.getDetail()
			this.getComment()
		},


	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 100%;
		// padding:  0 15px;
		padding-bottom: 45px;
		box-sizing: border-box;

		.detail-box {

			.detail-title {
				font-size: 20px;
				font-weight: bold;
				margin: 10px;
			}

			.writer {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin: 0 10px 10px;

				.writer-img {
					display: flex;

					.img {
						width: 40px;
						height: 40px;
						border-radius: 50%;
						// border: 1px solid red;
						overflow: hidden;
						margin-right: 10px;
						flex-shrink: 0;

						image {
							width: 100%;
							height: 100%;
						}
					}

					.writer-name {
						width: 100%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.name {
							color: #666;
							font-weight: bold;
							font-size: 16px;
						}

						.article-info {
							color: #999;
							font-size: 12px;
							display: flex;
							justify-content: space-around;
							flex-shrink: 0;

							text:nth-child(2) {
								margin: 0 10px;
							}
						}
					}
				}

				.attention-writer {
					border-radius: 5px;
					background-color: #ff5722;
					color: white;
					font-size: 14px;
					font-weight: bold;
					padding: 5px 10px;
				}
			}

			.article-content {
				padding: 0 10px;
				// box-sizing: border-box;
				// width: 340px;
				// min-height: 500px;
			}
			.comments{
				padding-bottom: 10px;
				.comments-head{
					border-bottom:1px solid #f5f5f5;
					padding: 10px;
					color: #666;
					font-size: 16px;
				}
				.comments-body{
					padding: 0 10px;
				}
				
				
			}

			.bottom-operate {
				background-color: #fff;
				width: 100%;
				height: 45px;
				// z-index: 999;
				position: fixed;
				bottom: 0;
				left: 0;
				border-top: 1px solid #ccc;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 10px;
				box-sizing: border-box;

				.comment {
					width: 45%;
					height: 30px;
					padding: 0 10px;
					align-items: center;
					display: flex;
					justify-content: space-between;
					border: 1px solid #ccc;
					border-radius: 5px;

					text {
						font-size: 14px;
						color: #ccc;
					}
				}
			}
		}
	}
	.comment-box{
		background-color: #fff;
		.comment-head{
			height: 40px;
			border-bottom: 1px solid #f5f5f5;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: #ccc;
			padding: 0 10px;
			font-size: 16px;
			
		}
		.comment-edit{
			display: flex;
			flex-direction: column;
			padding: 10px;
			// justify-content: flex-end;
			align-items: flex-end;
			textarea{
				width: 100%;
				height: 200px;
			}
			text{
				color: #ccc;
				font-size: 16px;
			}
		}
	}
</style>
