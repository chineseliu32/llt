<template>
	<view>
		<view class="conter">
			<view class="center">
				<view class="toppp">
					<view class="title">
						您提交的AA项目已审核
					</view>
					<view class="time">
						2020/06/12
					</view>
				</view>
				<view class="foot">
					西安市环境和城市基础设施建设重点项目，采用“热水解+厌氧消化+离心脱水+低温干化”的工艺对污泥进行彻底处置。
				</view>                           
			</view>
			<view class="center">
				<view class="toppp">
					<view class="title">
						您提交的AA项目已审核
					</view>
					<view class="time">
						2020/06/12
					</view>
				</view>
				<view class="foot">
					西安市环境和城市基础设施建设重点项目，采用“热水解+厌氧消化+离心脱水+低温干化”的工艺对污泥进行彻底处置。
				</view>                           
			</view>
			<view class="center">
				<view class="toppp">
					<view class="title">
						您提交的AA项目已审核
					</view>
					<view class="time">
						2020/06/12
					</view>
				</view>
				<view class="foot">
					西安市环境和城市基础设施建设重点项目，采用“热水解+厌氧消化+离心脱水+低温干化”的工艺对污泥进行彻底处置。
				</view>                           
			</view>
			<view class="center">
				<view class="toppp">
					<view class="title">
						您提交的AA项目已审核
					</view>
					<view class="time">
						2020/06/12
					</view>
				</view>
				<view class="foot">
					西安市环境和城市基础设施建设重点项目，采用“热水解+厌氧消化+离心脱水+低温干化”的工艺对污泥进行彻底处置。
				</view>                           
			</view>
		</view>
	</view>
</template>

<script>
	import topSearch from "@/components/rf-top/rf-top.vue"
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
	.top {
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		margin-bottom: 40upx;
		.title {
			position: relative;
			text-align: center;
			color: #FFFFFF;
			line-height: 100upx;
		}
		.fan {
			position: absolute;
			left: 18upx;
			top: 8upx;
			width: 30upx;
			height: 40upx;
			image {
				width: 100%;
				height: 100%;
			}
		}

	}
	page{
		background-color: #F8F8F8;
	}
	//底部
	.conter {
		.center {
			padding: 20upx;
			box-sizing: border-box;
			margin-bottom: 50upx;
			width: 90%;
			margin-left: 5%;
			font-size: 28upx;
			background-color: #FFFFFF;
			border-radius: 20upx;
			color: #666666;
			.toppp {
				border-bottom: 1px solid #F6F6F6;
				padding-bottom: 10upx;
				.title {
					display: inline-block;
					color: #333333;
					font-size: 32upx;
				}
				.time {
					display: inline-block;
					float: right;
					margin-right: 20upx;
				}
			}
			.foot {
				padding-top: 20upx;
			}
		}
	}
</style>
