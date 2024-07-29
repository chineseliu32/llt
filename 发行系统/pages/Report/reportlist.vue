<template>
	<view class="page">
		<view class="conter">
			<view class="lst" @click="userreport()">
				<view class="img">
					<image src="../../static/image/in_list2.png" mode="widthFix"></image>
				</view>
				<view class="lt">
					新增用户统计
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="lst" @click="moneyreport()">
				<view class="img">
					<image src="../../static/image/in_list2.png" mode="widthFix"></image>
				</view>
				<view class="lt">
					申购金额统计
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="lst" @click="incomereport()" style="display: none;">
				<view class="img">
					<image src="../../static/image/in_list2.png" mode="widthFix"></image>
				</view>
				<view class="lt" >
					收入金额统计
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="lst" @click="jigoureport()" style="display: none;">
				<view class="img">
					<image src="../../static/image/in_list2.png" mode="widthFix"></image>
				</view>
				<view class="lt">
					经济机构统计
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="lst" @click="pingtaireport()" style="display: none;">
				<view class="img">
					<image src="../../static/image/in_list2.png" mode="widthFix"></image>
				</view>
				<view class="lt">
					经济平台统计
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
			</view>
			<view class="lst" @click="jiedianreport()" style="display: none;">
				<view class="img">
					<image src="../../static/image/in_list2.png" mode="widthFix"></image>
				</view>
				<view class="lt">
					经济节点统计
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

			userreport() {
				uni.navigateTo({
					url: '../Report/userreport'
				})
			},
			moneyreport(){
				uni.navigateTo({
					url: '../Report/moneyreport'
				})
			},
			incomereport(){
				uni.navigateTo({
					url: '../Report/incomereport'
				})
			},
			jigoureport(){
				uni.navigateTo({
					url: '../Report/jigoureport'
				})
			},
			pingtaireport(){
				uni.navigateTo({
					url: '../Report/pingtaireport'
				})
			},
			jiedianreport(){
				uni.navigateTo({
					url: '../Report/jiedianreport'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* #ifdef APP-PLUS*/
	.xuanze {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999999999;

		.one {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 600upx;
			height: 820upx;
			background-color: #FFFFFF;
			border-radius: 20upx;

			.conter1 {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;

				.one1 {
					width: 40%;
					height: 80upx;
					margin-top: 30upx;

					.one11 {
						height: 80upx;
						text-align: center;
						font-size: 28upx;
						line-height: 80upx;
						border: 2rpx solid #7FA2FF;
						border-radius: 8rpx;
						font-weight: bold;
					}

					.one111 {
						height: 80upx;
						color: #FFFFFF;
						text-align: center;
						font-size: 28upx;
						line-height: 80upx;
						background: linear-gradient(180deg, rgba(68, 135, 255, 1) 0%, rgba(0, 92, 255, 1) 100%);
						border-radius: 8rpx;
						font-weight: bold;
					}
				}
			}

			.top {
				width: 100%;
				height: 100upx;
				display: inline-block;
				color: #333333;
				font-size: 34upx;
				line-height: 100upx;
				text-align: center;
				padding: 0;
				position: relative;
				font-weight: bolder;

				.cha {
					position: absolute;
					top: 0;
					right: 30upx;
					width: 30upx;
					height: 30upx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.foott {
				width: 90%;
				height: 100upx;
				margin: 0 auto;
				background: linear-gradient(180deg, rgba(68, 135, 255, 1) 0%, rgba(0, 92, 255, 1) 100%);
				border-radius: 8upx;
				line-height: 100upx;
				color: #FFFFFF;
				margin-top: 30upx;
				text-align: center;
				font-size: 36rpx;
			}
		}
	}

	/* #endif */
	.delet {
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		text-align: center;
		line-height: 100upx;
		color: #c9161e;
	}

	.page {
		width: 100%;
		background-size: contain;
		background-color: rgba(245, 249, 255, 1);
		height: 100vh;
		overflow: auto;
	}

	.top1 {

		width: 100%;
		height: 340upx;
		background: url(@/static/image/my_logo.png) no-repeat left 0 fixed;
		background-size: 100% 320upx;

		.bianji {
			float: right;
			margin-top: 150upx;
			margin-right: 20upx;
			width: 40upx;
			height: 40upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.user {
			padding-top: 120upx;
			height: 140upx;

			.img {
				float: left;
				margin-left: 30upx;
				width: 140upx;
				height: 140upx;
				border-radius: 70rpx;
				background-color: #f3f3f3;
				// background: url(../../static/image/missing-face.png) no-repeat;
				background-size: 100%;
				overflow: hidden;

				image {
					border-radius: 100px;
					width: 140rpx;
					height: 140rpx;
				}
			}

			.name {
				padding-top: 10upx;
				font-size: 36upx;
				font-weight: bold;
				color: #FFFFFF;
				margin-left: 180upx;
			}

			.cont {
				margin-left: 180upx;
				padding-top: 10upx;
				font-size: 25upx;
				color: #FFFFFF;
			}
		}
	}

	.conter {
		background-color: #FFFFFF;
		margin: 30upx;

		.lst {
			width: 100%;
			height: 100upx;
			line-height: 100upx;

			// background-color: pink;
			.img {
				width: 36upx;
				height: 36upx;
				margin-left: 30upx;
				float: left;
				margin-top: 8upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.lt {
				display: inline-block;
				color: #333333;
				font-size: 30upx;
				line-height: 100upx;
				margin-left: 30upx;
			}

			.img1 {
				width: 20upx;
				height: 20upx;
				float: right;
				margin-right: 40upx;
				margin-top: 5upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	//底部
	.foot {
		z-index: 9;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		background-color: #FFFFFF;

		.index {
			width: 25%;
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
			width: 25%;
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
				transform: translate(0, -60%);
			}
		}

		.news {
			width: 25%;
			height: 100%;
			margin-top: 20upx;
			position: relative;

			.bnum {
				position: absolute;
				top: -15rpx;
				right: 20rpx;
				background-color: #F43F3B;
				color: #FFFFFF;
				line-height: 24rpx;
				font-size: 24rpx;
				padding: 6rpx 10rpx;
				border-radius: 20rpx;
			}

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
			width: 25%;
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

	.bbb {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);

		.buy {
			width: 70%;
			height: 500upx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10px;
			background-color: #FFFFFF;
			z-index: 99;

			.top1 {
				width: 100%;
				height: 100upx;
				text-align: center;
				box-sizing: border-box;
				margin: 0 auto;
				background: url(../../static/image/success1.png)no-repeat;
				background-size: 100% 100%;

				image {
					margin-top: 20upx;
					width: 60upx;
					height: 60upx;
				}
			}

			.text {
				width: 100%;
				margin-top: 40upx;
				box-sizing: border-box;
				text-align: center;
				padding: 0 40upx 0 40upx;
				box-sizing: border-box;

				.textc {
					color: #3C87DB;
					font-size: 34upx;
				}
			}

			.confirm-btn {
				width: 230upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 50px;
				background: #3C87DB;
				color: #fff;
				font-size: $font-lg;
				float: left;
				top: 80upx;
				bottom: 10upx;
				left: 25%;
				margin: 10upx;
				transform: translate(-50%, 0);

				&:after {
					border-radius: 100px;
				}
			}
		}
	}

	/* #ifdef APP-PLUS */
	.top1 {
		width: 100%;
		height: 400upx;
		// background:url(../../static/image/my_logo.png) no-repeat left 0 fixed ;
		background-size: 100% 360upx;
		padding-top: 60upx;

		.bianji {
			float: right;
			margin-top: 20upx;
			margin-right: 20upx;
			width: 40upx;
			height: 40upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.user {
			padding-top: 80upx;
			height: 140upx;

			.img {
				float: left;
				margin-left: 30upx;
				width: 140upx;
				height: 140upx;
				border-radius: 50%;
				background-color: #f3f3f3;
				background: url(../../static/image/missing-face.png) no-repeat;
				background-size: 100%;

				image {
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
			}

			.name {
				padding-top: 10upx;
				font-size: 36upx;
				font-weight: bold;
				color: #FFFFFF;
				margin-left: 180upx;
			}

			.cont {
				margin-left: 180upx;
				padding-top: 10upx;
				font-size: 30upx;
				color: #FFFFFF;
			}

			.contaddress {
				margin-left: 150upx;
				padding-top: 10upx;
				font-size: 25upx;
				color: #999;
			}
		}
	}

	/* #endif */
</style>