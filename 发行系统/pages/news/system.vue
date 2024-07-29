<template>
	<view>
		<view class="top">
			<view class="title">
				消息
			</view>
			<view class="co-n">
				<view class="co-1">
					<view class="img">
						<image src="../../static/image/news11.png" mode=""></image>
					</view>
					<view class="youyou">
						2
					</view>
					<view class="cnn">
						系统消息
					</view>
				</view>
				<view class="co-1">
					<view class="img">
						<image src="../../static/image/news2.png" mode=""></image>
					</view>
					<view class="cnn">
						项目审核
					</view>
				</view>
				<view class="co-1" @click="news()">
					<view class="img">
						<image src="../../static/image/news3.png" mode="" ></image>
					</view>
					<view class="cnn cccc">
						新闻
					</view>
				</view>
				<view class="co-1">
					<view class="img">
						<image src="../../static/image/news4.png" mode=""></image>
					</view>
					<view class="cnn">
						分部消息
					</view>
				</view>
			</view>
		</view>
		<view class="conter">
			<view class="image">
				<image src="../../static/image/newsno.png" mode=""></image>
			</view>
			<view class="xx">
				暂无信息
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
			}
		},
		methods: {
			news() {
				uni.navigateTo({
					url:"news"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cccc {
		color: #005BFF;
	}
	//头部
	.top {
		width: 100%;
		height: 360upx;
		background: url(../../static/image/news5.png) no-repeat left 0 fixed;
		background-size: 100% 250upx;
		.title {
			text-align: center;
			color: #FFFFFF;
			padding-top: 30upx;
		}
		.co-n {
			width: 100%;
			display: flex;
			padding-top: 100upx;
			.co-1 {
				position: relative;
				width: 25%;
				height: 160upx;
				display: inline-block;
				text-align: center;
				.img {
					width: 100upx;
					padding-left: 45upx;
					height: 100upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.cnn {
					font-size: 30upx;
				margin-top: 10upx;
				}
				.youyou {
					width: 35upx;
					height: 35upx;
					line-height: 35upx;
					color: #FFFFFF;
					position: absolute;
					right: 40upx;
					top: 0;
					font-size: 30upx;
					background:linear-gradient(180deg,rgba(255,0,0,1) 0%,rgba(240,0,0,1) 100%);
					border-radius: 50%;
				}
			}
		}
	}
	//底部
	.conter {
		width: 100%;
		.image {
			margin-top: 300upx;
			margin-left: 8%;
		}
		.xx {
			text-align: center;
			color: #606060;
			font-size: 30upx;
		}
	}
</style>
