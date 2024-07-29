<template>
	<view class="ttttt">

		<view class="conter" v-if="datainfo!=null">

			<view class="none">
				<view class="cone">

					<view class="right">
						<view class="tpp">
							<view class="one" style="font-size:25px">
								{{datainfo.project_name}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="foot">
				<view class="quota">
					<view class="q1">
						收货人姓名：
					</view>
					<view class="q2">
						{{datainfo.recipient_name}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						收货人手机：
					</view>
					<view class="q2">
						{{datainfo.recipient_phone}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						收货地址：
					</view>
					<view class="q2">
						{{datainfo.address}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						状态：
					</view>
					<view class="q2">
						{{datainfo.state==1?"审核中":"已发货"}}
					</view>
				</view>
			</view>
			<view class="foot">
				<view class="quota">
					<view class="q1">
						提货时间：
					</view>
					<view class="q2">
						{{datainfo.listing_start_time}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						提货数量
					</view>
					<view class="q2">
						{{datainfo.investment_limit}}份
					</view>
				</view>

				<view class="introduction2">
					<p class="zuopinName">
						提货说明:
						<image src="../../static/image/textbj.png" alt="" />
					</p>
					<p v-html="datainfo.special_desc" class="textcon"></p>

				</view>
			</view>

			<div class="instructions" v-if="datainfo.verify_state!=1">
				<p class="fenge">
					<span></span>
					<span>发货说明</span>
					<span></span>
				</p>
				<p class="instructionsDetail" v-html="datainfo.express_memo"></p>
			</div>

			<view class="phone" v-if="isguan">
				<view class="oone">
					<text>管理合伙人</text>:
					<text>{{datainfo.create_user}}</text>
				</view>
				<view class="oone">
					<text>手机号</text>:
					<text>{{datainfo.managing_partner}}</text>
				</view>
			</view>
			<view class="under" v-if="flag">
				<view class="collect" v-if="datainfo.collect==1" @tap="toRegister1()">
					<image src="../../static/image/collect.png" mode=""></image>
					<text>已收藏</text>
				</view>
				<view class="collect" v-else @tap="toRegister()">
					<image src="../../static/image/collect.png" mode=""></image>
					<text>收藏</text>
				</view>
				<view class="right" @click="shenqing">
					申请合作
				</view>
			</view>
		</view>
		<view class="bbb" v-show="show" @click="show=false">
			<view class="buy">
				<view class="top1">
					<image src="../../static/image/success.png" mode=""></image>
				</view>
				<view class="text">
					您已成功申请参与
					<!-- <text class="textc">"{{datainfo.project_name}}"</text> -->
					的合作，该项目的管理合伙人会收到您的合作信息，会与您的专属管理合伙人联系，或者您也可通过您的专属管理合伙人联系该项目的管理合伙人，沟通推进项目合作。
				</view>
				<button class="confirm-btn" formType="submit">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import topSearch from "@/components/rf-top/rf-top.vue"
	import {
		projectFinancingLoangetById, //融资借款
		daikuanCon,
		//资产购买详情
		zichanCon,
		//资产出售详情
		zichanchushouCon,
		//服务提供详情
		fuwutigongCon,
		//服务采购详情
		fuwucaigouCon,
		projectCollectApiadd,
		getUserInfo,
		projectCollectApicancel,
		allProjectEnum,
		shailist,
		hezuo
	} from "@/api/user.js";
	export default {
		components: {
			topSearch,
			uniRate
		},
		data() {
			return {
				datainfo: null,
				show: false,
				hangye: [],
				fangshi: [],
				flag: false,
				isguan: true
			}
		},
		filters: {
			// 时间格式化
			ttt(val) {
				// return moment(val).Math.ceil(val)
				return Math.ceil(val)
			},
			tttt(val) {
				// return val.slice(0,val.length-1)
				return val.split(",")[0]
			},
			// 计算评论与追评时间
			againDay(val) {
				const day = moment(val.again_addtime * 1000).format('DD') - moment(val.created_at * 1000).format('DD');
				return day ? `${day}天后追加` : '当天追加'
			}
		},
		onLoad(e) {
			if (uni.getStorageSync("userNum").userType == 1) {
				this.isguan = false
			}
			if (e.type) {
				this.flag = false
			}
			this.getinfo(e.id);
		},
		methods: {
			fan() {
				console.log("231")
				uni.navigateBack({
					delta: 1
				})
			},
			//获取详情数据
			async getinfo(id) {
				let res = await this.get(shailist, {});
				let re = await this.get(allProjectEnum, {});
				let data1 = re.result.professionalFieldTreeList["2"]
				let data = res.result;
				let ress = await this.get(daikuanCon, {
					id: id,
					userId: uni.getStorageSync("userNum").id
				});
				console.log(ress)
				if (ress.code == 0) {
					this.datainfo = ress.result;

				} else {
					this.code(ress)
				}

			},
			async toRegister(e) {

				this.$get(projectCollectApiadd, {
					createUser: uni.getStorageSync("userNum").id,
					projectId: this.datainfo.id,
					cooperateType: 2
				}).then(r => {
					this.$api.msg(`收藏成功`);
					this.fangshi = [];
					this.getinfo(this.datainfo.id);
				}).catch(err => {
					console.log(err)
				})
			},
			async toRegister1(e) {
				this.$get(projectCollectApicancel, {
					projectId: this.datainfo.id,
					userId: uni.getStorageSync("userNum").id,
					cooperateType: 2
				}).then(r => {
					this.$api.msg(`取消收藏`);
					this.fangshi = [];
					this.getinfo(this.datainfo.id);
				}).catch(err => {
					console.log(err)
				})
			},
			async shenqing() {
				this.show = true;
				let res = await this.get(hezuo, {
					applyUserId: uni.getStorageSync("userNum").id,
					projectId: this.datainfo.id,
					cooperateType: "2"
				});
				console.log(res)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ttttt {
		padding-bottom: 200rpx;
	}

	.textcon {
		padding: 0 20rpx;
		margin: 20rpx;
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
				background: linear-gradient(180deg, rgba(230,106,69,1) 0%,rgba(234,106,69,1) 100%);
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

		.overshou {
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
					background: #FF5640;
					border-radius: 4upx;
					color: white;
					text-align: center;
					line-height: 40upx;
					margin: 0upx 10upx;
				}
			}
		}

		.instructions {
			width: 690upx;
			margin: 0 auto;
			margin-top: 25upx;
			background: #f7f7f7;
			border-radius: 12upx;
			overflow: hidden;
			margin-bottom: 160upx;
			padding-bottom: 20upx;

			.fenge {
				display: flex;
				justify-content: center;
				margin-top: 37upx;

				span {
					display: block;
					font-size: 28upx;
					color: #3e3e3e;
					line-height: 28upx;

					&:nth-child(2) {
						margin: 0 15upx;
					}

					&:first-child,
					&:last-child {
						width: 70upx;
						height: 1upx;
						background: #4c4c4c;
						// line-height: 28upx;
						margin-top: 12upx;
					}
				}
			}

			.instructionsDetail {
				width: 630upx;
				font-size: 24upx;
				font-weight: 400;
				color: #989898;
				line-height: 36upx;
				margin: 0 auto;
				margin-top: 30upx;
			}
		}

		.introduction2 {
			width: 690upx;
			margin: 0 auto;
			margin-top: 30upx;

			.peple {
				width: 750upx;
				height: 331upx;
				background: linear-gradient(111deg, #fefcfd 0%, #fbebed 100%);
				border-radius: 2upx;
				margin-top: 26upx;
				overflow: hidden;

				.jieshao {
					font-size: 28upx;
					margin-top: 25upx;
					margin-bottom: 27upx;
				}

				dl {
					display: flex;

					dt {
						img {
							width: 80upx;
							height: 80upx;
							border-radius: 100%;
						}
					}

					dd {
						margin-left: 22upx;

						p {
							&:first-child {
								font-size: 32upx;
								color: #333;
							}

							&:last-child {
								font-size: 24upx;
								color: #989898;
							}
						}
					}
				}

				.pepledetail {
					width: 690upx;
					height: 110upx;
					background: linear-gradient(90deg, #fceaea 0%, #f9e3e6 100%);
					border-radius: 16upx;
					font-size: 24upx;
					font-weight: 400;
					color: #333333;
					letter-spacing: 1upx;
					padding: 20upx;
					margin-top: 11upx;
					box-sizing: border-box;
				}
			}

			.imgdetail {
				width: 690upx;
				height: 900upx;
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
			margin-left: -10upx;

			image {
				width: 62upx;
				height: 8upx;
				position: absolute;
				left: 0;
				bottom: 0;
			}
		}

		.footer {
			width: 750upx;
			height: 135upx;
			background: #ffffff;
			box-shadow: 0upx 2upx 24upx 0upx rgba(0, 0, 0, 0.08);
			margin-top: 26upx;
			position: fixed;
			bottom: 0;

			.footer_detail {
				width: 690upx;
				height: 135upx;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				align-items: center;

				span {
					font-size: 36upx;
					color: #ea0606;
				}

				.van-button {
					width: 240upx;
					height: 75upx;
					background: #ff3b22;
					border-radius: 47upx;

					.van-button__text {
						color: #ffffff;
						font-size: 36upx;
					}
				}

				.button_time {
					background: #ccc;
					// .van-button__text {
					//   font-size: 28upx;
					// }
				}

				.shouqing {
					background: #ccc;

					.van-button__text {
						font-size: 36upx;
					}
				}
			}
		}


	}
</style>