<template>
	<view class="box">
		<view class="feedback-box">
			<!-- 标题 -->
			<view class="box-title">
				<text>意见反馈：</text>
			</view>
			<!-- 内容 -->
			<view class="box-body">
				<!-- 文本内容 -->

				<textarea placeholder="请输入您的意见..." class="text" v-model="content" />

				<view class="img">
					<view class="box-title">
						<text>反馈图片：</text>
					</view>
					<view class="imgs">
						<view class="imgs-item" v-for="(item,index) in imgList" :key="index">
							<view class="close" @click="cancelSlect(index)">
								<uni-icons type="closeempty" size="20" color="#ffF"></uni-icons>
							</view>
							<view class="img-box">
								<image :src="item.url" mode=""></image>
							</view>
							
						</view>
						<view class="imgs-item" v-if="imgList.length<9" @click="selectImg">
							<view class="add">
								<uni-icons type="plusempty" size="50" color="#ccc"></uni-icons>
							</view>
							<view class="img-box"></view>
						</view>
						
						
					</view>
				</view>
			</view>
			<!-- 提交按钮 -->
			<view class="submit" @click="submit">提交反馈</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgList:[],
				content:''

			}
		},
		methods: {
			selectImg(){
				let count  = 9 - this.imgList.length
				uni.chooseImage({
					count,
					success:(e)=>{
						let tempFilePaths=e.tempFilePaths
						tempFilePaths.forEach((item,index)=>{
							if(count>index){
								this.imgList.push({
									url:item
								})
							}
						})
					}
				})
			},
			cancelSlect(index){
				this.imgList.splice(index,1)
			},
			async submit(){
				let imgPaths=[]
				uni.showLoading({
					title:"上传中..."
				})
				if(!this.content){
					uni.hideLoading()
					uni.showToast({
						title:"请输入反馈意见",
						icon:"none"
					})
					return
				}
				
				// 遍历imgList,准备上传文件
				for(let i=0;i<this.imgList.length;i++){
					let filePath=this.imgList[i].url
					filePath=await this.uploadImg(filePath)
					imgPaths.push(filePath)
				}
				this.postFeedback(this.content,imgPaths)
			},
			// 上传图片获取图片在云端的路径
			async uploadImg(filePath){
				const result=await uniCloud.uploadFile({
					filePath,
				})
				return result.fileID
			},
			postFeedback(content,imgPaths){
				this.$api.postFeedbackC({content,imgPaths}).then(res=>{
					uni.hideLoading()
					uni.showToast({
						title:"上传成功,2s后将返回个人中心",
						icon:"none"
					})
					setTimeout(()=>{
						uni.switchTab({
							url:'../tabbar/my/my'
						})
					},2000)
				}).catch((err)=>{
					console.log(err)
					uni.hideLoading()
					uni.showToast({
						title:"上传失败",
						icon:"none"
					})
				})
			}

		}
	}
</script>

<style lang="scss">
	page{
		// display: flex;
		height: 100%;
	}
	.box{
		// display: flex;
		// flex: 1;
		height: 100%;
	}
	.feedback-box{
		height: 100%;
		padding: 10px;
		background-color: #f5f5f5;
		// border: 1px solid red;
		box-sizing: border-box;
		.box-title{
			margin-bottom: 10px;
			color: #333;
			font-size: 18px;
			font-weight: bold;
		}
		.box-body{
			margin-bottom: 10px;
			.text{
				box-sizing: border-box;
				border: 1px solid #ccc;
				border-radius: 5px;
				height: 100px;
				padding: 10px;
				width: 100%;
				margin-bottom: 10px;
				background-color: #fff;
			}
			.img{
				width: 100%;
				.imgs{
					display: flex;
					flex-wrap: wrap;
					// justify-content: center;
					// align-items: center;
					.imgs-item{
						flex-shrink: 0;
						position: relative;
						width: 33.33%;
						height: 0;
						padding-top: 33.33%;
						
						
						// overflow: hidden;
						// margin: 0 9px 10px  0;
						.img-box{
							position: absolute;
							top: 5px;
							left: 5px;
							right: 5px;
							bottom: 5px;
							border: 1px solid #ccc;
							border-radius: 5px;
							background-color: #fff;
							image{
								width: 100%;
								height: 100%;
							}
						}
						
						.close{
							display: flex;
							justify-content: center;
							align-items: center;
							position: absolute;
							top: 0px;
							right: 0px;
							width: 18px;
							height: 18px;
							border-radius: 50%;
							background-color: #ff5722;
							z-index: 999;
							
						}
						.add{
							top: 0;
							left: 0;
							right: 0;
							bottom: 0;
							position: absolute;
							display: flex;
							justify-content: center;
							align-items: center;
							z-index: 999;
						}
					}
				}
			}
		}
		.submit{
			width: 100%;
			padding: 10px;
			text-align: center;
			color: #fff;
			background-color: #ff5722;
			border-radius: 5px;
			box-sizing: border-box;
		}
		
	}

</style>
