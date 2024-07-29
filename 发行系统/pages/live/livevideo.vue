<template>
	<view class="box">
		<video :src="url" 
		autoplay="true" 
		show-play-btn="false"
		show-fullscreen-btn="false"
		controls="false"
		object-fit="cover"
		@error="huanchong">
		<cover-view class="name">{{title}}</cover-view>
			<cover-image class="but-img"  src="../../static/back.png" @click="back"></cover-image>
			<!-- <cover-view class="title">{{title}}</cover-view> -->
		</video>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				url:"",
				name:"",
				title:"",
				danmuList: [{
				                    text: '第 1s 出现的弹幕',
				                    color: '#ff0000',
				                    time: 1
				                },
				                {
				                    text: '第 3s 出现的弹幕',
				                    color: '#ff00ff',
				                    time: 3
				                }
				            ]
			}
		},
		onShow() {
			// 去除顶部状态栏
			plus.navigator.setFullscreen(true);
		},
		onLoad(e) {
			console.log(e)
			this.url=e.url
			this.name=e.name
			this.title=e.title
		},
		onUnload(){
			plus.navigator.setFullscreen(false);
		},
		onBackPress(e) {
		if (e.from == 'backbutton') {
		    uni.showModal({
		        title: '提示',
		        content: '是否退出观看',
		        success:(res)=> {
					plus.navigator.setFullscreen(false);
		            if (res.confirm) {
		              uni.navigateBack({
		                  delta: 1
		              });
		            } else if (res.cancel) {
		               return true; //阻止默认返回行为
		            }
		           
		        }
		    });
		   return true; //阻止默认返回行为
		}
		}, 
		methods:{
			back(){
				uni.showModal({
				    title: '提示',
				    content: '是否退出观看',
				    success:(res)=> {
						plus.navigator.setFullscreen(false);
				        if (res.confirm) {
				          uni.navigateBack({
				              delta: 1
				          });
				        } else if (res.cancel) {
				           return true; //阻止默认返回行为
				        }
				       
				    }
				});
			},
			huanchong(){
				uni.showToast({
					title:"网络不好"
				})
			}
		}
		
	}
</script>

<style scoped>
	.name{
		width: 100%;
		height: 80rpx;
		background-color: rgba(250,250,250,0.2);
		position: fixed;
		top: 0;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		color: #EC3E60;
		line-height: 80rpx;
	}
	.box{
		
	}
	video{
		width: 750rpx;
		height: 100vh;
		position: relative;
	}
	.view{
		width: 375rpx;
		height: 560rpx;
		position: absolute;
		top:0rpx;
		z-index: 99999999999999;
		background-image: url(../../static/back.png);
	}
	.meiyanbut{
		width: 80rpx;
		height: 80rpx;
		right: 30rpx;
		bottom: 100rpx;
		z-index: 9999999999;
		position: absolute;
		background-color: #FFFFFF;
		/* background-image: url("../../static/back.png"); */
	}
	.but-img{
		position: fixed;
		bottom: 60rpx;
		right: 20rpx;
		z-index: 99999999999999999999;
		width: 80rpx;
		height: 80rpx;
	}
</style>
