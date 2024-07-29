<template>
	<view>
		<view class="inputbox">
			<input type="text" v-model="phone" placeholder="请输入会员手机号" />
			<view @click="chaxun">查询</view>
		</view>
		<view class="none">
			<view class="cone">
				<view class="right">
					<view class="tpp">
						<view class="one"
							style="margin-left: 30upx;margin-top: 20upx; color: #969696;font-size: 25upx;">
							会员数量:{{this.memberAmount}}
						</view>
						<view class="one" style="margin-left: 30upx;margin-top: 20upx;color: #969696;font-size: 25upx;">
							申购商品数量:{{this.productAmount}}
						</view>
						<view class="one" style="margin-left: 30upx;margin-top: 20upx;color: #969696;font-size: 25upx;">
							申购总数量:{{this.assetAmount}}
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="box">
			<view class="item">
				<view>姓名</view>
				<view>手机号</view>
				<view>申购商品</view>
				<view>申购数量</view>
			</view>
			<view class="item" v-for="item in list">
				<view>{{item.full_name}}</view>
				<view>{{item.user_phone}}</view>
				<view>{{ item.project_name ? item.project_name : '-----' }}</view>
				<view>{{item.amount}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		guanxi,
		huiyuan,
		getMemberCountApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				phone: "",
				list: [],
				memberAmount: 0,
				productAmount: 0,
				assetAmount: 0
			}
		},
		onLoad(e) {
			this.initData();
			this.initData2();
		},
		methods: {
			async chaxun() {
				if (this.phone == "") {
					uni.showToast({
						title: "请输入手机号",
						icon: "none",
						mask: true
					})
				} else {
					if (!(/^1[34578]\d{9}$/.test(this.phone))) {
						uni.showToast({
							title: "请输入正确的手机号",
							icon: "none",
							mask: true
						})
						return false;
					} else {
						let res = await this.get(huiyuan, {
							userPhone: this.phone,
							userId: uni.getStorageSync("userNum").id
						})
						if (res.code == 0) {
							this.list = res.result.list
						} else {
							uni.showToast({
								title: res.message
							})
						}
						console.log(res)
					}
				}
			},

			initData() {
				// let res = await this.get(huiyuan, {
				// 	userId: uni.getStorageSync("userNum").id
				// })
				// console.log("asdfasdf" + res.result);
				// if (res.code == 0) {
				// 	this.list = res.result.list
				// }
				this.$get(`${huiyuan}`, {
					userId: uni.getStorageSync("userNum").id
				}).then(res => {
					this.list = res.result.list
					console.log(this.list)
					// 	console.log("asdfasdf" + r.result);

				}).catch((err) => {
					console.log(err)
				});
			},

			initData2() {
				// let r = await this.get(getMemberCountApi, {
				// 	userId: uni.getStorageSync("userNum").id
				// })
				// console.log("asdfasdf" + r.code);
				// if (r.code == 0) {
				// 	this.memberAmount = r.result.memberAmount;
				// 	this.productAmount = r.result.productAmount;
				// 	console.log("asdfasdf" + r.result);
				// }
				this.$get(`${getMemberCountApi}`, {
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					this.memberAmount = r.result.memberAmount;
					this.productAmount = r.result.productAmount;
					this.assetAmount = r.result.assetAmount;
					// 	console.log("asdfasdf" + r.result);
				}).catch((err) => {
					console.log(err)
				});

			}

		}
	}
</script>

<style scoped>
	.box {
		padding: 40rpx 10rpx;
		box-sizing: border-box;
	}

	.item {
		width: 100%;
		display: flex;
	}

	.item>view {
		width: 28%;
		height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		/* 移除 nowrap，允许文本换行 */
		/* 设置 word-break 为 break-all 允许单词在任意字符处断行 */
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.item>text {
		width: 16%;
		height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		/* 同上 */
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.inputbox {
		display: flex;
		justify-content: space-between;
		padding: 10rpx 80rpx;
		align-items: center;
	}

	.inputbox>view {
		padding: 10rpx 20rpx;
		border-radius: 4rpx;
		background-color: #c9161e;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.inputbox>input {
		border: 2rpx #999999 solid;
		border-radius: 5px;
		/* padding:10rpx; */
		height: 60rpx;
		padding-left: 10rpx;
		font-size: 30rpx;
	}

	.navbar {

		left: 0;
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: #c9161e;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid #c9161e;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.iconfont {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: #c9161e;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	.none {
		width: 100%;

		.cone {
			position: relative;
			display: flex;
			margin-bottom: 20upx;
			border-bottom: 20upx solid #F5F9FF;

			.left {
				width: 180upx;
				height: 180upx;
				margin-right: 20upx;
				margin-left: 20upx;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.right {
				width: 75%;

				.tpp {
					color: #333333;
					font-size: 38upx;
					height: 100upx;
					ext-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

					.one {
						display: inline-block;
						padding-right: 10upx;
						font-size: 34upx;
					}

					.tow {
						display: inline-block;
						font-size: 34upx;
					}
				}

				.num {
					font-size: 25upx;
					margin-top: 10upx;
					color: #969696;
					margin-top: 20upx;

					.o1 {
						margin-right: 8upx;
						color: #FF1100;
						font-size: 36upx;
					}

					.o2 {
						margin-right: 8upx;
						margin-left: 20upx;
						color: #666666;
						font-size: 28upx;
					}

					.o3 {
						float: right;
						margin-top: 10upx;
						margin-right: 20upx;
						color: #333333;
					}
				}

				.label {
					margin-top: 20upx;
					width: 100upx;
					height: 34upx;
					display: inline-block;
					font-size: 24upx;
					background: rgba(0, 92, 255, 0.2);
					margin-right: 20upx;
					line-height: 34upx;
					text-align: center;
					color: #c9161e;
					border-radius: 5upx;
				}
			}
		}
	}
</style>