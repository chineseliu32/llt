<template>



	<view class="ttttt">
		<view class="conter">

			<div class="wait">
				<p>等待买家付款</p>

			</div>
			<div class="shopdetail">
				<p class="zuopinName">
					购买商品
					<image src="../../static/image/textbj.png" alt="" />
				</p>
				<div class="box">
					<dl>
						<dt>
							<image :src="index.img_url | tttt" style="width: 300upx;height: 300upx;" mode=""></image>
						</dt>
						<dd>
							<p>{{projectname}}</p>
							<p>申购数量：<span>{{amount}}</span></p>
							<p>商品单价：<span>¥{{price}}</span></p>
						</dd>
					</dl>
					<p class="price">
						应付金额:
						<span>¥{{amount*price | formatNumber}}</span>
					</p>
				</div>
			</div>

			<view class="under">
				<view class="collect" @tap="backward()">
					<image src="../../static/image/collect.png" mode=""></image>
					<text>取消</text>
				</view>
				<view class="right" @click="zhifu()">
					去支付
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseUrl
	} from "@/api/params";
	import {
		huifupay,
		huifuclose,
		projectFinancingLoangetById
	} from "@/api/user.js"
	export default {
		data() {
			return {
				projectname: "",
				price: 0,
				amount: 0,
				projectId: 0,
				left_time: 0,
				count_down_time: 0,
				time_data: {},
				salestatus: 0,
				day: 0,
				hr: 0,
				min: 0,
				sec: 0,
				index: null,
				payType: 0,
				orderId: 0

			}
		},
		onLoad(e) {
			this.projectname = e.projectname;
			this.price = e.price;
			this.amount = e.amount;
			this.projectId = e.projectId;
			this.payType = e.payType;
			this.selluserid = e.selluserid;
			this.orderId = e.orderId;
			this.initData();
			console.log(e)
		},
		filters: {
			// 截取字符串
			subStringText(value, index) {
				const str = String(value);
				if (!value) return 0;
				return str.length > index ? str.substring(0, index) + '...' : str;
			},
			tttt(val) {
				// return val.slice(0,val.length-1)
				return val.split(",")[0]
			},
			// 格式化数字
			formatNumber(num, decimals) {
				num = parseFloat(num).toFixed(2);
				num += '';
				const x = num.split('.');
				let x1 = x[0];
				const x2 = x.length > 1 ? '.' + x[1] : '';
				const rgx = /(\d+)(\d{3})/;
				if (',' && isNaN(parseFloat(','))) {
					while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + ',' + '$2');
					}
				}
				return x1 + x2;
			},
		},
		methods: {

			initData() {
				console.log(this.orderId);
				console.log("初始化")
				this.$get(`${projectFinancingLoangetById}`, {
					id: this.projectId,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					console.log(r)
					this.index = r.result
					if (r.result.recommended_stars == null) {
						//this.$refs.rateStar.valueSync = 0
					} else {
						//this.$refs.rateStar.valueSync = r.result.recommended_stars
					}
					console.log(this.index)
					console.log("img_url")
					console.log(this.index.img_urls[0])
				}).catch((err) => {
					console.log(err)
				});
			},

			backward() {
				uni.navigateBack({
					delta: 1
				})
			},

			async zhifu() {
				if (this.amount * this.price == 0) {
					this.$api.msg("支付金额必须大于零。");
				} else {


					let data = {
						userId: uni.getStorageSync("userNum").id,
						number: this.amount,
						price: this.price,
						projectId: this.projectId,
						projectName: this.projectname,
						payType: this.payType,
						memberId: this.selluserid,
						orderId: this.orderId
					}

					/* 						var server = baseUrl + "/api/projectFinancingLoan/buyAsset?id="+this.projectId+"&amount="+this.amount; //检查更新地址
											
										 this.$post(`${server}`  ).then(r => {
										 		console.log("数据",r.result);
										 }).catch((err) => {
										 }); */

					console.log(data);
					let res = await this.get(huifupay, data);
					console.log(res);
					var topic = "alipays://platformapi/startapp?saId=10000007&qrcode=";
					var code = res.data.expend.pay_info;

					//console.log(code);

					// 从汇付正扫接口获取的参数（以下值仅为示例）
					var qrcodeUrl = "https://qr.alipay.com" + code
					// 字符串拼接
					var jumpUrl = topic + code;
					// 按以上示例拼接得出结果
					// jumpUrl 为 alipays://platformapi/startapp?saId=10000007&qrcode=https://qr.alipay.com/bax02911brluc2xieoph6001
					console.log(jumpUrl);
					void plus.runtime.openURL(jumpUrl);

					uni.showModal({
						title: '提示',
						content: '是否已完成支付？',
						cancelText: "支付未完成",
						confirmText: "支付成功",
						success: (res) => {
							if (res.confirm) {
								console.log('用户点击成功');
								let url = "";
								if (this.payType == 1) {
									url = `../../pagesA/details/details5?id=${this.orderId}`
								} else {
									url = `../../pagesA/details/details?id=${this.projectId}`
								}
								uni.navigateTo({
									url: `${url}`
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
								let url = "";
								if (this.payType == 1) {
									url = `../../pagesA/details/details5?id=${this.orderId}`
								} else {
									url = `../../pagesA/details/details?id=${this.projectId}`
								}
								uni.navigateTo({
									url: `${url}`
								})
							}
						}
					});
				}
			},

			countDownChange(d) {
				this.time_data = d
				this.left_time = this.left_time - 1000
			},
		}
	}
</script>

<style lang="scss" scoped>
	.ttttt {
		padding-bottom: 200rpx;
	}

	.textcon {
		padding: 0 20rpx;
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
				width: 430upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 50px;
				background: #3C87DB;
				color: #fff;
				font-size: $font-lg;
				position: absolute;
				bottom: 10upx;
				left: 50%;
				transform: translate(-50%, 0);

				&:after {
					border-radius: 100px;
				}
			}
		}
	}

	.phone {
		margin-bottom: 120upx;

		.oone {
			margin: 10upx 20upx 0 20upx;
			color: #333333;
			font-size: 28upx;
		}
	}

	.fttt {
		margin-top: 40upx;

		.list {
			margin-bottom: 40upx;

			.one {
				color: #333;
				font-size: 30upx;
				margin-left: 20upx;
			}

			.two {
				margin: 20upx 20upx 0 20upx;
				font-size: 30upx;

				.tt {
					margin-top: 20upx;

					.tt1 {
						.ee {
							color: #928F92;
							font-size: 28upx;
							margin-left: 20upx;
						}
					}

					.tt2 {
						color: #928F92;
						font-size: 26upx;
					}
				}
			}
		}
	}

	.banner {
		width: 100%;
		height: 300upx;
		margin: auto;

		image {
			width: 100%;
			height: 100%;
		}
	}

	//内容
	.conter {
		margin-top: 20upx;

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
			width: 90%;
			margin-left: 40upx;

			.cone {
				position: relative;
				display: flex;
				margin-bottom: 20upx;

				.right {
					width: 100%;

					.tpp {
						font-weight: bolder;
						font-size: 34upx;

						.one {
							display: inline-block;
							// background-color: #E4E4E4;
							// color: #919090;
						}
					}

					.label {
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

		.introduction {
			width: 100%;
			margin-bottom: 30upx;

			.quota {
				width: 100%;
				margin-top: 25upx;
				margin-left: 20upx;
				line-height: 50upx;
				// height: 50upx;

				.q1 {
					display: inline-block;
					opacity: 1;
					color: #333333;
					font-size: 28upx;
					font-weight: bold;
				}

				.q2 {
					margin-left: 20upx;
					display: inline-block;
					color: #000000;
					font-size: 28upx;
				}

				.qq2 {
					float: right;
					margin-top: 15upx;
				}
			}
		}

		.foot {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.quota {
				width: 47%;
				margin-top: 25upx;
				margin-left: 20upx;
				line-height: 50upx;
				height: 50upx;

				.q1 {
					display: inline-block;
					opacity: 1;
					color: #333;
					font-size: 28upx;
					font-weight: bold;
				}

				.q2 {
					margin-left: 20upx;
					display: inline-block;
					color: #000000;
					font-size: 28upx;
				}

				.qq2 {
					float: right;
					margin-top: 15upx;
				}
			}
		}

		.under {
			display: flex;
			width: 100%;
			height: 100upx;
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;

			// border-top: 8upx solid #F6F6F6;
			.collect {
				width: 40%;
				line-height: 100upx;
				text-align: center;
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
				background: linear-gradient(180deg, rgba(230, 106, 69, 1) 0%, rgba(234, 106, 69, 1) 100%);
			}

			.rightDone {
				width: 100%;
				color: #FFFFFF;
				line-height: 100upx;
				text-align: center;
				font-size: 32upx;
				border-radius: 10upx;
				background: #8e8e93
			}
		}

		.ui-all {
			padding: 20rpx 40rpx;

			.avatar {
				width: 100%;
				text-align: left;
				padding: 20rpx 0;
				border-bottom: solid 1px #f2f2f2;
				position: relative;

				.imgAvatar {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					display: inline-block;
					vertical-align: middle;
					overflow: hidden;

					.iavatar {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				text {
					display: inline-block;
					vertical-align: middle;
					color: #8e8e93;
					font-size: 28rpx;
					margin-left: 40rpx;
				}

				&:after {
					content: ' ';
					width: 20rpx;
					height: 20rpx;
					border-top: solid 1px #030303;
					border-right: solid 1px #030303;
					transform: rotate(45deg);
					-ms-transform: rotate(45deg);
					/* IE 9 */
					-moz-transform: rotate(45deg);
					/* Firefox */
					-webkit-transform: rotate(45deg);
					/* Safari 和 Chrome */
					-o-transform: rotate(45deg);
					position: absolute;
					top: 85rpx;
					right: 0;
				}
			}

			.btn-list {
				width: 100%;
				text-align: center;
				padding: 20rpx 0;
				border-bottom: solid 1px #f2f2f2;
				position: relative;

				.stepbutton {
					background: #c9161e;
					border: none;
					color: #ffffff;
					margin-top: 40rpx;
					margin-left: 20rpx;
					font-size: 28rpx;
					vertical-align: middle;
					width: 40%;
				}

				button {
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					background: none;
					margin: 0;
					padding: 0;

					&::after {
						display: none;
					}
				}

			}

			.ui-list {
				width: 100%;
				text-align: left;
				padding: 20rpx 0;
				border-bottom: solid 1px #f2f2f2;
				position: relative;

				.aa {
					color: #74A6FE;

					.aaa {
						color: #FE0202;
					}
				}

				.one {
					color: #4a4a4a;
					font-size: 35rpx;
					font-weight: bold;
					display: inline-block;
					vertical-align: middle;
					min-width: 100rpx;
					margin-right: 40upx;
				}

				.thrr {
					color: #878787;
				}

				.two {
					color: #FF0000;
					font-size: 28rpx;
					display: inline-block;
					vertical-align: middle;
				}

				input {
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
				}

				button {
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					background: none;
					margin: 0;
					padding: 0;

					&::after {
						display: none;
					}
				}

				picker {
					width: 80%;
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					position: absolute;
					top: 20rpx;
					left: 200rpx;

				}

				.picker1 {
					width: 80%;
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					position: absolute;
					top: 20rpx;
					left: 200rpx;
				}

				textarea {
					color: #030303;
					font-size: 30rpx;
					vertical-align: middle;
					height: 150rpx;
					width: 100%;
					margin-top: 50rpx;
				}

				.place {
					color: #999999;
					font-size: 28rpx;
				}
			}

			.right:after {
				content: ' ';
				width: 20rpx;
				height: 20rpx;
				border-top: solid 1px #030303;
				border-right: solid 1px #030303;
				transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				/* IE 9 */
				-moz-transform: rotate(45deg);
				/* Firefox */
				-webkit-transform: rotate(45deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(45deg);
				position: absolute;
				top: 30rpx;
				right: 0;
			}

			.save {
				background: #c9161e;
				border: none;
				color: #ffffff;
				margin-top: 40rpx;
				font-size: 28rpx;
			}

		}

		.wait {
			height: 88upx;
			background: #ffffff;
			box-shadow: 0upx 0upx 12upx 0upx #efeff6;
			border-radius: 2upx;
			padding: 0 30upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			p {
				&:first-child {
					font-size: 28upx;
					color: #333333;
				}

				&:last-child {
					font-size: 24upx;
					font-weight: 400;

					span {
						color: #ea0606;
					}
				}
			}

			.overshoustart {
				width: 690upx;
				margin: 0 auto;
				font-size: 24upx;
				font-weight: 400;
				color: #989898;
				padding: 48upx 0 24upx 0;

				p {
					display: flex;
					justify-content: right;
					align-items: center;

					span {
						display: flex;
						display: block;
						width: 40upx;
						height: 40upx;
						background: #55aa7f;
						border-radius: 4upx;
						color: white;
						text-align: center;
						line-height: 40upx;
						margin: 0upx 10upx;
					}
				}
			}
		}

		.shopdetail {
			width: 690upx;
			margin: 0 auto;
			margin-top: 20upx;

			.box {
				box-shadow: 0upx 2upx 24upx 0upx rgba(0, 0, 0, 0.08);
			}

			dl {
				display: flex;
				width: 630upx;
				margin: 0 auto;
				padding: 30upx 0;
				border-bottom: 2upx solid rgba($color: #000000, $alpha: 0.2);
				margin-top: 20upx;

				dt {
					img {
						width: 140upx;
						height: 140upx;
						border-radius: 10upx;
					}
				}

				dd {
					margin-left: 20upx;

					p {
						&:first-child {
							font-size: 28upx;
							font-weight: 400;
							color: #333333;
							letter-spacing: 1upx;
							margin-top: 20upx;
						}

						&:last-child {
							font-size: 24upx;
							font-weight: 400;
							color: #989898;
							letter-spacing: 1upx;
							margin-top: 22upx;

							span {
								color: #333333;
								letter-spacing: 1upx;
							}
						}
					}
				}
			}

			.price {
				width: 630upx;
				height: 90upx;
				margin: 0 auto;
				text-align: right;
				font-size: 32upx;
				line-height: 90upx;
				font-weight: 600;
				color: #333333;

				span {
					color: #ea0606;
				}
			}
		}

		.zuopinName {
			position: relative;
			// width: 128upx;
			height: 36upx;
			font-size: 32upx;
			font-weight: 600;
			color: #333333;
			line-height: 36upx;
			margin-top: 30upx;

			image {
				width: 62upx;
				height: 8upx;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}


	}
</style>