<template>
	<div class="certificate">
		<div class="banner">
			<div v-if="index !=null">
				<view style="text-align: center;">
					<image :src="index.img_url | tttt" style="width: 500upx;height: 500upx;margin: 50upx;" mode="">
					</image>
				</view>
				<view class="namedetail">
					<span>{{ index.project_name }}</span>
				</view>
				<view class="zuopin">
					<p class="zuopinName">
						商品简介:
						<image style="width: 62upx;
			height: 8upx;
			position: absolute;
			left: 0;
			bottom: 0;" src="../../static/image/textbj.png" alt="" />
					</p>
					<p v-html="index.project_introduction" class="textcon"></p>
				</view>
			</div>
			<div v-else>未找到资产详情</div>
		</div>
	</div>
	</div>
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
		//申请合作
		hezuo,
		projectCollectApiadd,
		getUserInfo,
		projectCollectApicancel,
		allProjectEnum,
		shengqing,
		getRealName,
		uploadFiles,
		getAssetCertifyListApi,
		getAllAssetCertifyListByUserApi,
		publishProject,
		getUserAdapaySettleAccount,
		productTokenListByAssetId
	} from "@/api/user.js";
	export default {
		components: {
			topSearch,
			uniRate
		},
		data() {
			return {
				show: false,
				id: '',
				xing: '3',
				cooperateType: '1',
				myid: '',
				index: null,
				indexlist: [],
				recommended_stars: '',
				InvestableIncomeEnum: [],
				InvestablePeriodEnum: [],
				FinancingCurrencyEnum: [],
				flag: true,
				isguan: true, //显示管理员手机号,
				buyCount: 0,
				list: [],
				num: 1,
				flag: true,
				real_name: {},
				day: 0,
				hr: 0,
				min: 0,
				sec: 0,
				day2: 0,
				hr2: 0,
				min2: 0,
				sec2: 0,
				salestatus: 0,
				amount: 0,
				tokens: [],
				selected_asset_id: 0,
				limit: 5,
				token_count: 0,
				page: 1,
				isAllChecked: false,
				checkeditem: false,
				alltokens: [],
				assetPrice: '',
				assetCount: '',
				listingCount: 0, //可挂牌数量
				message: '', //发布说明,
				isSettleAccount: 0
			}
		},
		onLoad(option) {
			if (option.type) {
				this.flag = false
			}
			console.log(option.id); //打印出上个页面传递的参数。
			this.asset_id = option.asset_id
			this.product_id = option.product_id
			this.initData();
			// this.loadTransEvidence();
			// this.getUserInfo();
			uni.getStorageSync("userNum")
			if (uni.getStorageSync("userNum").userType == 1) {
				this.isguan = false
			}
			console.log(uni.getStorageSync("userNum"))
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
		methods: {
			loadTransEvidence() {
				console.log(this.product_id)
				this.$get(`${productTokenListByAssetId}`, {
					assetId: this.asset_id,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {

					this.index = r.result
					console.log(this.index)
				}).catch((err) => {
					console.log(err)
				});
			},
			getUserInfo() {
				//查询实名信息
				this.$get(`${getRealName}`).then(r => {
					if (r.code == 0) {

						this.real_name = r.result;
						console.log(this.real_name)
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			initData() {
				console.log("初始化")
				this.$get(`${productTokenListByAssetId}`, {
					assetId: this.asset_id,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {

					console.log(r.result);
					if (r.result) {
						this.index = r.result
					}

					console.log(this.index);
				}).catch((err) => {
					console.log(err)
				});
			},
			async toRegister(e) {

				this.$get(projectCollectApiadd, {
					createUser: uni.getStorageSync("userNum").id,
					projectId: this.id,
					cooperateType: this.cooperateType
				}).then(r => {
					//this.$api.msg(`收藏成功`);
					this.initData();
				}).catch(err => {
					console.log(err)
				})
			},
			async toRegister1(e) {

				this.$get(projectCollectApicancel, {
					projectId: this.id,
					userId: uni.getStorageSync("userNum").id,
					cooperateType: this.cooperateType
				}).then(r => {
					//this.$api.msg(`取消收藏`);
					this.initData();
				}).catch(err => {
					console.log(err)
				})
			},
			shenqing() {
				if (this.assetPrice == "") {
					this.$api.msg("请输入发布价格。");
					return;
				}
				//isSettleAccount标记是否绑卡：0未绑卡；为了测试环境调试改为1
				if (this.isSettleAccount == 0) {
					this.show = true;
				} else {
					console.log(this.tokens.filter(item => item.isChecked == true).length)
					let applyamount = this.tokens.filter(item => item.isChecked == true).length
					let data = {
						tokenList: this.alltokens.filter(el => el.isChecked == true),
						userId: uni.getStorageSync("userNum").id,
						assetCount: this.alltokens.filter(el => el.isChecked == true).length,
						assetPrice: this.assetPrice,
						publishMemo: this.message,
						projectId: this.id
					}
					this.post(publishProject, data).then(res => {
						console.log(res);
						if (res.code == 200) {
							this.$api.msg("商品发布成功。");
							uni.navigateTo({
								url: "../my/mySaleList"
							})
						}
					})
				}
			},
		}

	};
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
		z-index: 299;

		.buy {
			width: 70%;
			height: 500upx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10px;
			background-color: #FFFFFF;


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
				background: #c9161e;
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
			z-index: 199;

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


	.workslist {
		width: 690upx;
		margin: 0 auto;
		margin-top: 30upx;

		.layout {
			position: relative;
			box-shadow: 0upx 0upx 12upx 0upx #efeff6;
			border-radius: 16upx;
			margin-top: 20upx;
			max-height: 720upx;
			overflow: auto;

			.van-col {
				display: flex;
				height: 130upx;
				border-bottom: 1upx solid #ebebeb;
				align-items: center;
				width: 100%;

				.van-checkbox {
					width: 24upx;
					height: 24upx;
					border: 1upx solid;

					.van-checkbox__icon--checked .van-icon {
						background: #ee2231;
						color: white;
						border: 1upx solid #ee2231;
						/* line-height: 22upx; */
					}
				}

				&:first-child {
					height: 70upx;
					position: sticky;
					top: -1upx;
					background: white;
					z-index: 1;
					// position: fixed;
					// top: 0;
				}

				.div-row {
					font-size: 30upx;
					font-weight: 400;
					color: #333333;
					flex: 1;
					text-align: center;

					.quanyi-title {
						display: flex;
						flex-direction: column;
						font-size: 20upx;
					}

					&:first-child {
						display: flex;
						justify-content: center;
					}

					&:nth-child(2) {
						flex: 1;
					}

					p {
						img {
							width: 51upx;
							// height: 32upx;
						}
					}

					.van-checkbox {
						justify-content: center;
					}
				}
			}
		}

		.van-pagination {
			justify-content: center;

			.van-pagination__item {
				width: 58upx;
				height: 58upx;
				flex: none;
				margin: 20upx 10upx;
				background: #ffffff;
				border-radius: 8upx;
				border: 2upx solid #e9eaf2;
				color: #333333;
			}

			.van-pagination__item--active {
				background: #ff3b22;
				color: white;
			}
		}
	}

	.namedetail {
		width: 690upx;
		min-height: 160upx;
		padding-bottom: 20upx;
		margin: 0 auto;
		margin-top: 30upx;
		text-align: center;
		box-shadow: 0upx 0upx 12upx 0upx #efeff6;
		border-radius: 2upx;
		font-size: 25px;
		font-weight: bold;

		dl {
			overflow: hidden;

			dt {
				// margin-top: 20upx;
				height: 80upx;
				display: flex;
				align-items: center;

				span {
					display: inline-block;
					vertical-align: middle;

					// &:first-child {
					//   width: 112upx;
					//   // height: 34upx;
					//   background: #4182e7;
					//   border-radius: 4upx;
					//   font-size: 24upx;
					//   font-weight: 600;
					//   color: #ffffff;
					//   text-align: center;
					//   margin-left: 30upx;
					// }
					&:last-child {
						font-size: 34upx;
						// height: 34upx;
						font-weight: 600;
						color: #333333;
						margin-left: 30upx;
					}
				}
			}

			dd {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 20upx;

				.dd_child {
					&:first-child {
						line-height: 40upx;

						span {
							font-size: 24upx;
							color: #989898;
							margin-left: 20upx;

							&:first-child {
								margin-left: 30upx;

								span {
									color: black;
								}
							}
						}
					}

					&:last-child {
						display: flex;

						div {
							width: 60upx;
							height: 60upx;
							font-size: 20upx;
							text-align: center;

							img {
								width: 24upx;
								height: 24upx;
							}

							&:first-child {
								background: #fff9f9;
								border-radius: 8upx;
								// border: 1upx solid #db3b3b;
								margin-right: 25upx;
								color: #ea0000;
							}

							&:last-child {
								background: #fe9955;
								border-radius: 6upx;
								margin-right: 30upx;
								color: #ffffff;
							}
						}
					}
				}
			}
		}
	}

	.zuopin {
		width: 690upx;
		margin: 0 auto;
		margin-top: 30upx;

		.layout {
			margin-top: 26upx;
			background: #f7f7f7;

			.van-col {
				font-size: 24upx;
				// height: 60upx;
				padding: 18upx 0 18upx 30upx;
				// border-bottom: 1upx solid white;
			}

			.van-col--24 {
				border-bottom: 1upx solid white;
				display: flex;
				align-items: center;
			}

			.van-col--7 {
				font-weight: 400;
				color: #333333;
				border-right: 1upx solid white;
			}

			.van-col--17 {
				font-weight: 400;
				color: #989898;
			}
		}
	}

	.zuopinName {
		position: relative;
		//   width: 128upx;
		height: 36upx;
		font-size: 32upx;
		font-weight: 600;
		color: #333333;
		line-height: 36upx;
		margin-bottom: 30upx;

		.van-button {
			position: absolute;
			right: 0;
			justify-items: center;
			align-items: center;
			height: 50upx;
			font-size: 30upx;
		}

		img {
			width: 62upx;
			height: 8upx;
			position: absolute;
			left: 0;
			bottom: 0;
		}
	}
</style>