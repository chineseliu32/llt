<template>
	<view>
		<video :src="url" controls class="videos" autoplay="true" :show-fullscreen-btn="false" :loop="true">
			<cover-view class="chabox" @click="chabtn">
				停止
				<!-- <cover-image src="../../static/image/cha.png" class="cha"></cover-image> -->
			</cover-view>
		</video>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				url:""
			}
		},
		onLoad(e) {
			this.url=e.url
		},
		methods: {
			chabtn(){
				uni.navigateBack({
					delta:1
				})
			}
		},
	}
</script>

<style scoped="">
	.chabox{
		width: 60rpx;
		height: 40rpx;
		position: absolute;
		bottom: 20rpx;
		padding: 4rpx;
		line-height: 24rpx;
		right: 10rpx;
		font-size: 24rpx;
		border-radius: 20rpx;
		background-color: #FFFFFF;
	}
	.cha{
		width: 40rpx;
		height:40rpx;
		margin-top:10rpx;
		margin-left: 10rpx;
	}
	.videos{
		width: 100%;
		height: 100vh;
	}
</style>
