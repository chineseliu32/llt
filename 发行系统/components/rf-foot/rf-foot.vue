<template>
	<view class="foot">
		<view class="index" @click="indexx(1)">
			<view class="img">
				<image :src="is_indexx1==1?'../../static/image/index1.png':'../../static/image/index.png'" mode=""></image>
			</view>
			<view :class="is_indexx1==1?'text1':'text'">
				首页
			</view>
		</view>
		<view class="project" @click="indexx(2)">
			<view class="img">
				<image :src="is_indexx1==2?'../../static/image/project1.png':'../../static/image/project.png'" mode=""></image>
			</view>
			<view :class="is_indexx1==2?'text1':'text'" >
				项目
			</view>
		</view>
		<view class="release" @click="release()">
			<image src="../../static/image/release.png" mode=""></image>
		</view>
		<view class="news active" @click="indexx(3)" >
			<view class="img">
				<image :src="is_indexx1==3?'../../static/image/news1.png':'../../static/image/news.png'" mode=""></image>		
							</view>
			<view :class="is_indexx1==3?'text1':'text'">
				消息
			</view>
		</view>
		<view class="my" @click="indexx(4)">
			<view class="img">
				<image :src="is_indexx1==4?'../../static/image/my1.png':'../../static/image/my.png'" mode=""></image>
			</view>
			<view :class="is_indexx1==4?'text1':'text'">
				我的
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			is_indexx1:{
				type:String
			}
		},
		data () {
			return {
				is_indexx :'',
				isshow : true,
			}
		},
		created(){
		
		},
		methods:{
			xuanze() {
				this.isshow != this.show
			},
			release() {
				uni.navigateTo({
					url:'../../pages/release/release'
				})
			},
			indexx(type) {
			this.is_indexx = type;
			// console.log(type)
			if(type==1) {
				uni.navigateTo({
					url:'../../pages/index/index'
				})
			}
			
			if(type==2) {
				uni.navigateTo({
					url:'../../pages/project/project',
				})
			}
			if(type==3) {
				uni.navigateTo({
					url:'../../pages/news/news',
				})
			}
			if(type==4) {
				uni.navigateTo({
					url:'../../pages/my/my',
				})
			}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.conter {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 70%;
		height: 50%;
		background-color: #FFFFFF;
	}
	//底部
	.foot {
		z-index: 99;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		background-color: #FFFFFF;
		.index {
			width: 20%;
			height: 100%;
			margin-top: 20upx;
			// margin-left: 30upx;
			.img {
				image {
					display: block;
					margin: 0 auto;
					width: 50upx;
					height: 50upx;
				}
			}
			.text {
				margin-top: 10upx;
				font-size: 20upx;
				text-align: center;
			}
			.text1 {
				color: #c9161e;
				margin-top: 10upx;
				text-align: center;
				font-size: 20upx;
			}
		}
		.project {
			width: 20%;
			height: 100%;
			margin-top: 20upx;
			// margin-left: 30upx;
			.img {
				image {
					display: block;
					margin: 0 auto;
					width: 50upx;
					height: 50upx;
				}
			}
			.text {
				margin-top: 10upx;
				text-align: center;
				font-size: 20upx;
			}
			.text1 {
				color: #c9161e;
				margin-top: 10upx;
				text-align: center;
				font-size: 20upx;
			}
		}
		.release {
			width: 20%;
			height: 100%;
			image {
				display: block;
				margin: 0 auto;
				width: 100upx;
				height: 100upx;
				margin-top: 50%;
				transform: translate(0,-60%);
			}
		}
		.news {
			width: 20%;
			height: 100%;
			margin-top: 20upx;
			// margin-left: 30upx;
			.img {
				image {
					display: block;
					margin: 0 auto;
					width: 50upx;
					height: 50upx;
				}
			}
			.text {
				margin-top: 10upx;
				font-size: 20upx;
				text-align: center;
			}
			.text1 {
				color: #c9161e;
				margin-top: 10upx;
				text-align: center;
				font-size: 20upx;
			}
		}
		.my {
			width: 20%;
			height: 100%;
			margin-top: 20upx;
			// margin-left: 30upx;
			.img {
				image {
					display: block;
					margin: 0 auto;
					width: 50upx;
					height: 50upx;
				}
			}
			.text {
				margin-top: 10upx;
				font-size: 20upx;
				text-align: center;
			}
			.text1 {
				color: #c9161e;
				margin-top: 10upx;
				text-align: center;
				font-size: 20upx;
			}
		}
	}
	
</style>
