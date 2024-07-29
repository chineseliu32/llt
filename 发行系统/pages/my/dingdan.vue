<template>
	<view>
		<view class="none" v-for="(item, index) in ordertoken" :key="index" @click="xiang(item)">
			<view class="cone">
				<view class="left">
					<image :src="item.image_url | imgurl" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="tpp">
						<!-- <view class="one" v-if="type==6">
							{{item.organization_name}}
						</view> -->
						<view class="one">
							{{item.product_name}}
						</view>
					</view>

					<view class="num">
						<text class="o2">订单编号:{{item.order_id}}</text>
					</view>
					<view class="num">
						<text class="o2">订单时间:{{item.modified_date |formatTimestamp}}</text>
						<view class="label"  style="background-color:orange; color: dimgray;"  v-if="item.status==0">
							{{getstatus(0)}}
						</view>
						<view class="label" style="background-color:green; color: white;" v-else-if="item.status==1">
							{{getstatus(1)}}
						</view>
						<view class="label" style="background-color:red; color: black;" v-else-if="item.status==2">
							{{getstatus(2)}}
						</view>
						<view class="label" style="background-color:lightskyblue; color: white;" v-else>
							{{getstatus(3)}}
						</view>
					</view>
					<view class="num">
						<text class="o2">单价:{{item.unit_price}}元</text>
						<text class="o2">购买数量:{{item.order_qty}}份</text>
						<text class="o2">总价:{{item.order_qty*item.unit_price}}元</text>
					</view>

				</view>
			</view>
		</view>
		<view class="conter" v-if="this.ordertoken == ''">
			<!-- <view class="conter" v-show="isshow"> -->
			<view class="image" align="center">
				<image src="../../static/image/newsno.png" mode=""></image>
			</view>
			<view class="xx">
				暂无项目
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shengqing,
		getUserSubscriptionListApi,
		getAssetCertifyOrderListApi,
		projectFinancingLoangetById,
		getAssetCertifytokenDingDanApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				num: 0,
				flag: true,
				list: [],
				ordertoken: [],
				assetIdtoken: '',
				ordertokenshaixuan: [],
			}
		},
		onLoad(options) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('acceptDataFromOrderOpenerPage', (data) => {
				console.log(data)
				this.status = data.orderstatus;
				this.productId = data.orderprojectId;
				
				// this.getAssetCertifyListOrderApi();
				uni.getStorageSync("userNum")
				if (uni.getStorageSync("userNum").userType == 1) {
					this.isguan = false
				}
			});
			this.getlist();
		},
		onReachBottom() {
			if (this.flag) {
				this.getlist();
			}
		},
		filters: {
			imgurl(val) {
				let arr = val.split(",");
				let url = arr[0]
				return url
			},
			num(e) {
				return parseInt(e)
			},

			formatTimestamp(timestamp) {
				const date = new Date(timestamp); // 注意要乘以1000，因为时间戳单位是秒而不是毫秒
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
			}

		},
		methods: {
			async getlist() {
				this.$get(`${getAssetCertifyOrderListApi}`, {
					userId: uni.getStorageSync("userNum").id,
					productId: this.productId,
					status: this.status,
				}).then(r => {
					if (r.code == 0) {
						console.log(r);
						this.ordertoken = [];
						r.result.forEach(item => {
							this.ordertoken.push(item)
						})
					}
				}).catch((err) => {
					console.log(err);
				});
				
			},

			// 点击跳转项目详情
			xiang(type) {
				let url = "";
				if (type.cooperateType == 1) {
					url = "../../pagesA/details/details"
				}
				if (type.cooperateType == 2) {
					url = "../../pagesA/details/details6"
				}
				if (type.cooperateType == 3) {
					url = "../../pagesA/details/details5"
				}
				if (type.cooperateType == 4) {
					url = "../../pagesA/details/details4"
				}
				if (type.cooperateType == 5) {
					url = "../../pagesA/details/details3"
				}
				if (type.cooperateType == 6) {
					url = "../../pagesA/details/details2"
				}
				uni.navigateTo({
					url: `${url}?id=${type.id}`
				})
				this.daizhifu(type);
			},
			getstatus(status) {
				let result = "";
				if (status == 0) {
					result = "待支付";
				} else if (status == 1) {
					result = "取消";
				} else if (status == 2) {
					result = "超时取消";
				} else if (status == 3) {
					result = "支付成功";
				}
				return result;
			},
			async daizhifu(type) {
				// 检查数组是否为空
					const assetIdString = type.asset_id;
					const tokenorderId = type.order_id;
					const orderdingdanpostData = {
						user_id: uni.getStorageSync("userNum").id,
						order_id: tokenorderId,
						asset_id: assetIdString,
					};
					let res = await this.post(getAssetCertifytokenDingDanApi, orderdingdanpostData);
					if (res.code == 0) {
					    console.log(type.status);
					    if (type.status == 0) {
					        uni.navigateTo({
					            url: '../../pagesA/PayInfo/tokendingdan',
					            success: function(res) {
					                // 向被打开页面发送数据
					                res.eventChannel.emit('acceptDataFromdingdanOpenerPage', {
					                    assetIdtoken: assetIdString
					                });
					            }
					        });
					    } else if (type.status == 3) {
					        uni.navigateTo({
					            url: '../../pagesA/PayInfo/tokendingdanchenggong', 
					            success: function(res) {
					                // 向被打开页面发送数据
					                res.eventChannel.emit('acceptDataFromdingdanOpenerPage', {
					                    assetIdtoken: assetIdString
					                });
					            }
					        });
					    }
					} else {
						console.error('没有找到状态为0的订单');
					}
				}
			},
		
	}
</script>

<style lang="scss" scoped>
	.none {
		width: 100%;
		margin-top: 30upx;

		.cone {
			position: relative;
			display: flex;
			height: 240upx;
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
					height: 60upx;
					ext-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

					.one {
						display: inline-block;
						font-size: 30upx;
					}

					.tow {
						display: inline-block;
						font-size: 34upx;
					}
				}

				.num {
					font-size: 25upx;
					color: #969696;
					margin-top: 10upx;
					white-space: nowrap;
					/* 确保订单编号不换行 */
					overflow: hidden;
					/* 隐藏超出容器宽度的部分 */
					text-overflow: ellipsis;
					/* 如果超出了容器，用省略号显示隐藏的部分 */
					max-width: 100%;
					/* 根据需要设置最大宽度 */
					font-family: monospace;
					/* 使用等宽字体，确保每个字符占据相同的空间 */

					.o1 {
						margin-right: 8upx;
						color: #FF1100;
						font-size: 36upx;
					}

					.o2 {
						margin-right: 8upx;
						margin-left: 20upx;
						color: #666666;
					}

					.o3 {
						margin-left: 200upx;
						color: #333333;
					}
				}

				.label {
					margin-top: 2px;
					/* 缩小上边距 */
					width: 80px;
					/* 缩小宽度 */
					height: 24px;
					/* 缩小高度 */
					display: inline-block;
					font-size: 14px;
					/* 缩小字体大小 */
					background: rgba(0, 92, 255, 0.2);
					margin-right: 10px;
					/* 缩小右边距 */
					margin-left: 10px;
					/* 缩小左边距 */
					line-height: 24px;
					/* 调整行高以适应新的高度 */
					text-align: center;
					color: #c9161e;
					border-radius: 3px;
					/* 缩小边框圆角 */
				}
			}
		}
	}

	//内容
	.conter {
		.image {
			margin-top: 20%;
			// margin-left: 8%;
		}

		.xx {
			text-align: center;
			color: #606060;
			font-size: 30upx;
		}

		.last {
			.title1 {
				height: 100upx;
				white-space: nowrap;
				overflow: hidden;
				background: #fff;
				border-bottom: 3upx solid #f3f3f3;

				.uni-scroll-view::-webkit-scrollbar {
					display: none;
				}

				.lt3 {
					position: relative;
					display: inline-block;
					color: #000;
					line-height: 100upx;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
				}

				.lt2 {
					position: relative;
					display: inline-block;
					line-height: 100upx;
					color: #c9161e;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
					background-size: 50% 10%;
				}
			}

			.title {
				height: 100upx;
				white-space: nowrap;
				overflow: hidden;
				background: #1066FF;

				.uni-scroll-view::-webkit-scrollbar {
					display: none;
				}

				.lt1 {
					position: relative;
					display: inline-block;
					color: #FFFFFF;
					line-height: 100upx;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
				}

				.lt {
					position: relative;
					display: inline-block;
					line-height: 100upx;
					color: #FFFFFF;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
					background: url(../../static/image/project_1.png) no-repeat center bottom;
					background-size: 50% 10%;
				}
			}
		}

		.topp {
			margin-bottom: 30upx;
			width: 90%;
			margin-left: 40upx;
			height: 60upx;
			background: url(../../static/image/index13.png) no-repeat;
			background-size: 100%;

			.zhi {
				float: left;
				width: 20upx;
				height: 26upx;
				margin-top: 4upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.toppp {
			margin-bottom: 30upx;
			width: 90%;
			margin-left: 40upx;
			height: 60upx;
			background: url(../../static/image/index14.png) no-repeat;
			background-size: 100%;

			.zhi {
				float: left;
				width: 20upx;
				height: 26upx;
				margin-top: 4upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.none {
			width: 100%;
			margin-top: 30upx;

			.cone {
				position: relative;
				display: flex;
				height: 240upx;
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
							font-size: 30upx;
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
						white-space: nowrap;
						/* 确保订单编号不换行 */
						overflow: hidden;
						/* 隐藏超出容器宽度的部分 */
						text-overflow: ellipsis;
						/* 如果超出了容器，用省略号显示隐藏的部分 */
						max-width: 100%;
						/* 根据需要设置最大宽度 */
						font-family: monospace;
						/* 使用等宽字体，确保每个字符占据相同的空间 */

						.o1 {
							margin-right: 8upx;
							color: #FF1100;
							font-size: 36upx;
						}

						.o2 {
							margin-right: 8upx;
							margin-left: 20upx;
							color: #666666;
						}

						.o3 {
							margin-left: 200upx;
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

		.under {
			display: flex;
			width: 100%;
			height: 100upx;
			position: absolute;
			bottom: 0;
			border-top: 8upx solid #F6F6F6;

			.collect {
				width: 30%;
				line-height: 100upx;
				display: inline-block;
				margin-left: 30upx;

				image {
					width: 50upx;
					height: 50upx;
					display: inline-block;
					vertical-align: middle;
					margin-right: 20upx;
				}

				text {
					font-size: 28upx;
				}
			}

			.right {
				width: 100%;
				color: #FFFFFF;
				line-height: 100upx;
				text-align: center;
				font-size: 32upx;
				border-radius: 10upx;
				background: linear-gradient(180deg, rgba(55, 127, 255, 1) 0%, rgba(0, 92, 255, 1) 100%);
			}
		}
	}
</style>