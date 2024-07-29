<template>
	<view class="ttttt">
		<!-- 资产购买 -->
		<!-- <topSearch headNavigationTitle="项目详情" @fan="fan"></topSearch> -->
 
		<view style="text-align: center;"  >
			<image :src="datainfo.img_url  | tttt" style="width: 500upx;height: 500upx;margin: 50upx;" mode=""></image>
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
						资产名称:
					</view>
					<view class="q2">
						{{datainfo.project_name}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						挂牌单价:
					</view>
					<view class="q2">
						{{datainfo.sell_price}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						挂牌资产数量:
					</view>
					<view class="q2">
						{{datainfo.project_count}}
					</view>
				</view>
				<view class="quota">
					<view class="q1">
						资产分类:
					</view>
					<view class="q2" v-for="item in hangye">
						{{item.text}}
					</view>
				</view>
			</view>
			<view class="foot">
				<view class="quota">
					<view class="q1">
						推荐星级:
					</view>
					<view class="q2 qq2">
						<uni-rate disabled="true" :value="datainfo.recommended_stars" size="20" activeColor="#c9161e"></uni-rate>
					</view>
				</view>


			</view>
			<view class="fttt">
				<view class="list">
					<view class="one">
						特殊说明:
					</view>
					<view class="two" v-html="datainfo.project_contents">

					</view>
				</view>

			</view>
<!-- 			<view class="phone" v-if="isguan">
				<view class="oone">
					<text>管理合伙人</text>:
					<text>{{datainfo.create_user}}</text>
				</view>
				<view class="oone">
					<text>手机号</text>:
					<text>{{datainfo.managing_partner}}</text>
				</view>
			</view> -->
			<view class="conter">
			<view class="ui-all " style=" margin-bottom: 80upx;
			width: 100%;
			height: 150upx;
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;text-align: center;">
				<view class="ui-list">
					<view class="one">
						购买数量:
					</view>
					<image style="margin-bottom: -10px; width: 25px;height: 25px;" src="../../static/image/minues.png"
						mode="" @click="downcount"></image>
					<input
						style="margin-left: 10px; margin-right: 10px;width: 50px; font-size: large; text-align: center; "
						type="number" placeholder="购买数量" name="buyCount" v-model="buyCount" @input="bindbuyCount"
						placeholder-class="place" />
			
					<image style="margin-bottom: -10px;width: 25px;height: 25px;" src="../../static/image/plus.png"
						mode="" @click="upcount"></image>
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
					立即购买
				</view>
			</view>
		</view>
		<view class="bbb" v-show="show" @click="show=false">
			<view class="buy">
				<view class="top1">
					<image src="../../static/image/lingdang.png" mode=""></image>
				</view>
				<view class="text">
					温馨提示
					<text class="textc">"{{datainfo.project_name}}"</text>
					仅支持实名用户购买。
				</view>
				<button class="confirm-btn" @click="goRealname">去实名</button>
				<button class="confirm-btn" @click="show=false">关闭</button>
			</view>
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
		hezuo,
		getRealName,
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
				isguan: true,
				buyCount: 0,
				real_name: {},
				orderId:0
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
		mounted() {
		
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
		onLoad(e) {
			if (uni.getStorageSync("userNum").userType == 1) {
				this.isguan = false
			}
			if (e.type) {
				this.flag = false
			}
			this.orderId = e.id;
			this.getinfo(e.id);
			this.gethangye()
		},
		methods: {
			fan() {
				uni.navigateBack({
					delta: 1
				})
			},
			//获取详情数据
			async getinfo(id) {
				let res = await this.get(allProjectEnum, {});
				let data = res.result.professionalFieldTreeList["3"]
				let ress = await this.get(zichanchushouCon, {
					id: id,
					userId: uni.getStorageSync("userNum").id
				});
				if (ress.code == 0) {
					this.datainfo = ress.result;
					let arr = ress.result.property_type.split(',');
					data.forEach(item => {
						arr.forEach(it => {
							if (item.id == it) {
								this.hangye.push(item)
							}
						})

					})
				} else {
					this.code(ress)
				}
			},
			async toRegister(e) {

				this.$get(projectCollectApiadd, {
					createUser: uni.getStorageSync("userNum").id,
					projectId: this.datainfo.id,
					cooperateType: 3
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
					cooperateType: 3
				}).then(r => {
					this.$api.msg(`取消收藏`);
					this.hangye = [];
					this.getinfo(this.datainfo.id);
				}).catch(err => {
					console.log(err)
				})
			},
/* 			async shenqing() {
				this.show = true;
				let res = await this.get(hezuo, {
					applyUserId: uni.getStorageSync("userNum").id,
					projectId: this.datainfo.id,
					cooperateType: "3"
				});
				console.log(res)
			}, */
			goRealname() {
				uni.navigateTo({
					url: '../../pages/my/authentication'
				})
			},
			
			bindbuyCount(e) {
				let count = parseInt(e.detail.value);
				if (count> this.datainfo.project_count) {
					this.buyCount = 0;
					this.$api.msg("购买数量不能超过挂牌数量:" + this.datainfo.project_count);
			
				}
			},
			upcount(e) {
				if (this.buyCount < this.datainfo.project_count) {
					this.buyCount = this.buyCount + 1;
				} else {
					this.$api.msg("购买数量不能超过挂牌数量:" + this.datainfo.project_count);
				}
			},
			downcount(e) {
				if (this.buyCount > 0) {
					this.buyCount = this.buyCount - 1;
				}
			},
			shenqing() {
			
				if (this.buyCount == 0) {
			
					this.$api.msg("购买数量不为零。");
			
				} else {
					 
			
						if (this.real_name.status != 2) {
							this.show = true;
			
						} else {
							uni.navigateTo({
								url: '../PayInfo/PayInfo?projectname=' + this.datainfo.project_name + "&price=" + this
									.datainfo
									.sell_price + "&amount=" + this.buyCount + "&projectId=" + this.datainfo.project_financing_loan_id+"&payType=1&selluserid="+this.datainfo.user_id+"&orderId="+this.orderId
							})
						}
					 
				}
			},

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
				text-align: right;
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
				margin-left: 60upx;
				.bnum {
					position: absolute;
					top: -5rpx;
					left: 80rpx;
					background-color: #F43F3B;
					color: #FFFFFF;
					line-height: 24rpx;
					font-size: 24rpx;
					padding: 6rpx 10rpx;
					border-radius: 20rpx;
				}
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
				background: linear-gradient(180deg, rgba(201,22,30,1) 0%,rgba(201,20,30,1) 100%);
			}
		}
	}
</style>
