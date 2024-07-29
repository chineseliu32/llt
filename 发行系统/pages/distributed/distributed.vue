<template>
	<view>
		<topSearch headNavigationTitle="分部消息" @fan="fan"></topSearch>
		<view class="conter">
			<view class="center">
				该模块正在开发中...
			</view>

		</view>
	</view>
</template>

<script>
	import topSearch from "@/components/rf-top1/rf-top1.vue"
	export default {
		components: {topSearch},
		data() {
			return {
			}
		},
		methods: {
			fan() {
				console.log("231")
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	//头部
	// .top {
	// 	width: 100%;
	// 	height: 100upx;
	// 	background: url(../../static/image/topbgc.png) no-repeat left 0 fixed;
	// 	background-size: 100% 250upx;
	// 	margin-bottom: 40upx;
	// 	.title {
	// 		position: relative;
	// 		text-align: center;
	// 		color: #FFFFFF;
	// 		line-height: 100upx;
	// 	}
	// 	.fan {
	// 		position: absolute;
	// 		left: 18upx;
	// 		top: 8upx;
	// 		width: 30upx;
	// 		height: 40upx;
	// 		image {
	// 			width: 100%;
	// 			height: 100%;
	// 		}
	// 	}

	// }
	//底部
	.conter {
		.center {
			margin-bottom: 50upx;
			width: 90%;
			margin-left: 5%;
			background-color: #F8F8F8;
			font-size: 28upx;
			border-radius: 20upx;
			color: #666666;
      padding: 10px;
		}
	}
</style>
