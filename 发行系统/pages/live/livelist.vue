<template>
	<view >
		<view class="box" v-if="list.length>0">
			<view v-for="item in list" class="v-box" >
				<video :src="item.url" 
				controls="false"  
				muted="true" 
				autoplay="true" 
				object-fit="fill"
				show-play-btn="false"
				show-fullscreen-btn="false"
				>
					<cover-view class="name">{{item.user_name}}正在直播</cover-view>
					<cover-view  @click="tovideo(item.url,item.user_name,item.title)" class="view"></cover-view>
					<cover-view class="title">{{item.title}}</cover-view>
				</video>
			</view>
		</view>
		<view class="box" v-else-if="videolist.length>0">
			<view v-for="item in videolist" class="v-box" >
				<video :src="item.videoUrl" 
				controls="false"  
				muted="true" 
				object-fit="fill"
				show-play-btn="false"
				show-fullscreen-btn="false"
				:poster="item.picUrl"
				>
					<cover-view  @click="tol(item.videoUrl)" class="view"></cover-view>
				</video>
			</view>
		</view>
		<view v-else class="elseBox">
			<image src="../../static/image/nolive.png" style="width: 149px;height: 128px;"></image>
			<view>暂无直播~~~</view>
		</view>
	</view>
</template>

<script>
	import {livelist,mvideo} from"@/api/user.js";
	export default {
		data(){
			return{
				num:0,
				list:[],
				videolist:[],
				flag:true
			}
		},
		onLoad() {
			this.getvideo()
		},
		onShow() {
			// this.num=0
			this.getlivelist()
		},
		onReachBottom() {
			if(this.flag){
				this.getlivelist()
			}
		},
		methods:{
			transition(e){
				console.log(e)
			},
			// 获取默认视频列表
			async getvideo(){
				let res=await this.get(mvideo);
				// this.videolist=[...this.videolist,res]
				res.forEach(item=>{
					this.videolist.push(item)
				})
				console.log("视频",res)
			},
			async getlivelist(){
				this.num++;
				let res=await this.get(livelist,{pageNum:this.num});
				if(res.code==0){
					if(res.result.list<10){
						this.flag=false
					}
					// this.list=res.result.list;
					res.result.list.forEach(item=>{
						// item.url="rtmp://hzxinghe.top/live/"+item.user_id
						item.url="rtmp://pull.sigequanwangluokeji.com/live/"+item.user_id;
						this.list.push(item)
					})
				}
				console.log("直播列表",this.list)
			},
			tolive(){
				uni.navigateTo({
					url:"./livecon"
				})
			},
			tovideo(url,name,title){
				console.log(url)
				console.log(name)
				console.log(title)
				uni.navigateTo({
					url:"./livevideo?url="+url+"&name="+name+"&title="+title 
				})
			},
			tol(url){
				uni.navigateTo({
					url:"../index/showvideo?url="+url
				})
			}
		}
	}
</script>

<style scoped>
	.elseBox{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
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
		width: 374px;
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
		color: #fff;
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
