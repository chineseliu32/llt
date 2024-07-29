<template>
	<view class="ttttt">
		<!-- 资产购买 -->
		<!-- <topSearch headNavigationTitle="项目详情" @fan="fan"></topSearch> -->
		<view class="banner">
			<image :src="datainfo.img_url | tttt" mode="aspectFill"></image>
		</view>

		<view class="conter" v-if="datainfo!=null">

			<view class="none">
				<view class="cone">

					<view class="right">
						<view class="tpp">
							<view class="one">
								{{datainfo.project_name}}
							</view>
						</view>
						<!-- <view class="label">
							餐饮
						</view> -->
					</view>
				</view>

			</view>
			<view class="introduction">
				<view class="quota">
					<view class="q1">
						资产名称
					</view>
					<view class="q2">
						{{datainfo.project_name}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						资产区域
					</view>
					<view class="q2">
						{{datainfo.city_name}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						资产分类
					</view>
					<view class="q2" v-for="item in hangye">
						{{item.text}}
					</view>
				</view>
			</view>
			<view class="foot">
				<view class="quota">
					<view class="q1">
						购买币种
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==1">
						人民币
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==2">
						美元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==3">
						欧元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==4">
						英镑
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==5">
						加元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==6">
						欧元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==7">
						澳元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==8">
						日元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==9">
						新西兰元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==10">
						澳门元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==11">
						俄罗斯卢布
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==12">
						印度卢比
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==13">
						韩元
					</view>
					<view class="q2" v-if="datainfo.sale_currency ==14">
						瑞士法郎
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						购买报价
					</view>
					<view class="q2">
						{{datainfo.sale_limit}}万
					</view>
				</view>

				<view class="quota">
					<view class="q1">
						挂牌期限
					</view>
					<view class="q2" v-if="datainfo.listing_period==1">
						1个月
					</view>
					<view class="q2" v-if="datainfo.listing_period==2">
						3个月
					</view>
					<view class="q2" v-if="datainfo.listing_period==3">
						6个月
					</view>
					<view class="q2" v-if="datainfo.listing_period==4">
						1年
					</view>
					<view class="q2" v-if="datainfo.listing_period==5">
						2年
					</view>
					<view class="q2" v-if="datainfo.listing_period==6">
						3年
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						挂牌截止时间
					</view>
					<view class="q2">
						{{datainfo.deadline_for_listing}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						委托分类
					</view>
					<view class="q2" v-if="datainfo.commission_classification==1">
						独家委托
					</view>
					<view class="q2" v-if="datainfo.commission_classification==2">
						非独家委托
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						推荐星级
					</view>
					<view class="q2 qq2">
						<uni-rate disabled="true" :value="datainfo.recommended_stars" size="20" activeColor="#c9161e"></uni-rate>
					</view>
				</view>


			</view>
			<view class="fttt">
				<view class="list">
					<view class="one">
						特殊说明
					</view>
					<view class="two" v-html="datainfo.project_contents_desc">

					</view>
				</view>

			</view>
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
					<text class="textc">"{{datainfo.project_name}}"</text>
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
				flag: true,
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
			// this.gethangye()
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
				let res = await this.get(allProjectEnum, {});
				console.log(res);
				let data = res.result.professionalFieldTreeList["4"]
				let ress = await this.get(zichanCon, {
					id: id,
					userId: uni.getStorageSync("userNum").id
				});
				console.log(ress)
				if (ress.code == 0) {
					this.datainfo = ress.result;
					let arr = ress.result.trade_type_id.split(',');
					data.forEach(item => {
						arr.forEach(it => {
							if (item.id == it) {
								this.hangye.push(item)
							}
						})

					})
					console.log(arr)
				} else {
					this.code(ress)
				}

			},
			async toRegister(e) {

				this.$get(projectCollectApiadd, {
					createUser: uni.getStorageSync("userNum").id,
					projectId: this.datainfo.id,
					cooperateType: 4
				}).then(r => {
					this.$api.msg(`收藏成功`);
					this.hangye = [];
					this.getinfo(this.datainfo.id);
				}).catch(err => {
					console.log(err)
				})
			},
			async toRegister1(e) {

				this.$get(projectCollectApicancel, {
					projectId: this.datainfo.id,
					userId: uni.getStorageSync("userNum").id,
					cooperateType: 4
				}).then(r => {
					this.$api.msg(`取消收藏`);
					this.hangye = [];
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
					cooperateType: "4"
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

	.phone {
		margin-bottom: 120upx;

		.oone {
			margin: 10upx 20upx 0 20upx;
			color: #333;
			font-size: 28upx;
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
					width: 80%;

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
					margin-right: 50upx;
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
					margin-right: 50upx;
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
				background: linear-gradient(180deg, rgba(230,106,69,1) 0%,rgba(234,106,69,1) 100%);
			}
		}
	}
</style>
