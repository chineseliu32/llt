<template>
	<view >
		<view class="box" >
			<view v-for="item in list" class="v-box" >
				<video :src="item.video_url" controls="false"  muted="true" :poster="item.img_url" object-fit="cover">
					<cover-view  @click="xiang(item)" class="view"></cover-view>
					<cover-view class="title">{{item.title}}</cover-view>
					<!-- <cover-view class="videobox" v-if="show">
						<video :src="url" controls class="videos" autoplay="true" :show-fullscreen-btn="false" :loop="true">
							<cover-view class="chabox" @click="chabtn">
								<cover-image src="../../static/image/cha.png"></cover-image>
							</cover-view>
						</video>
					</cover-view> -->
				</video>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {nuyanTuiguang} from '../../api/user'
	export default {
		components:{
		},
		data() {
			return {
				list:[],
				num:0,
				type:0,
				show:false,
				url:""
			}
		},
		onLoad(e) {
			if(e.type){
				this.type=e.type
			}
			this.initData();
		},
		onShow() {
	
		},
		onReachBottom() {
			this.initData();
		},
		methods: {
			chabtn(){
				this.url=""
				this.show=false
			},
			xiang(item) {
				console.log("item")
				if(this.type==1){
					console.log(this.type)
					uni.navigateTo({
						url:"./nuyanCon?id="+item.id
					})
				}
				if(this.type==0){
					
					uni.navigateTo({
						url:"./showvideo?url="+item.video_url
					})
					// console.log(this.type)
					// this.url=item.video_url
					// this.show=true
					// console.log(this.show)
				}
				
				
			},
	
			async initData(){
				this.num++;
				let data={pageNum:this.num,pageSize:10}
				if(this.type==1){
					data.userId=uni.getStorageSync("userNum").id
				}
				let res= await this.get(nuyanTuiguang,data);
				if(res.message=="成功"){
					res.result.list.forEach(item=>{
						this.list.push(item)
					})
				}else{
					this.code(res)
				}
			}
		
		}
	}
</script>

<style scoped>
	.chabox{
		width: 60rpx;
		height: 60rpx;
		position: absolute;
		bottom: 20rpx;
		right: 10rpx;
		border-radius: 40rpx;
		background-color: #FFFFFF;
	}
	cover-image{
		width: 40rpx;
		height:40rpx;
		margin-top:10rpx;
		margin-left: 10rpx;
	}
	.videos{
		width: 100%;
		height: 100%;
	}
	.videobox{
		width: 100vw;
		height: 100vh;
		background-color: #000000;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 99999999999;
	}
	.box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.box>.v-box{
		width: 374rpx;
		height: 560rpx;
		overflow: hidden;
		position: relative;
		margin-bottom: 3rpx;
	}
	.view{
		width: 374rpx;
		height: 560rpx;
		position: absolute;
		top:0rpx;
		z-index: 99999999999999;
	}
	.name{
		width: 374rpx;
		height: 50rpx;
		position: absolute;
		top:0rpx;
		z-index: 999999999999999;
		background-color: rgba(250,250,250,0.5);
		text-align: center;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #EC008C;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.title{
		width: 374rpx;
		height: 80rpx;
		position: absolute;
		bottom:0rpx;
		z-index: 999999999999999;
		background-color: rgba(250,250,250,0.5);
		text-align: center;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #fff;
		font-weight: bold;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	video{
		position: relative;
		width: 374rpx;
		height: 560rpx;
	}
.mylive{
	position: fixed;
	bottom: 200rpx;
	left: 0;
	text-align: center;
	width: 750rpx;
}
.mylive>text{
	padding: 20rpx 40rpx ;
	font-size: 30rpx;
	color: #FFFFFF;
	background-color: #c9161e;
	border-radius: 20rpx;
}
</style>
