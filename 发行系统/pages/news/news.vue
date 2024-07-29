<template>
	<view>
		<view class="top1">
			<view class="title">
				消息
			</view>
			<view class="co-n">
				<view class="co-1" @click="toXiaoxi">
<!-- 					<view class="img">
						<image src="../../static/image/news11.png" mode=""></image>
					</view> -->
					<view class="youyou" v-if="newsNum!=0">
						{{newsNum}}
					</view>
					<view class="cnn">
						系统消息
					</view>
				</view>
				<view class="co-1" @click="toxiangmu">
<!-- 					<view class="img">
						<image src="../../static/image/news2.png" mode=""></image>
					</view> -->
					<!-- <view class="youyou" >
						2
					</view> -->
					<view class="cnn">
						审核消息
					</view>
				</view>
				<view class="co-1" @click="tonews">
<!-- 					<view class="img">
						<image src="../../static/image/news3.png" mode=""></image>
					</view> -->
					<view class="cnn">
						资讯公告
					</view>
				</view>
				<view class="co-1" @click="Division()">
<!-- 					<view class="img">
						<image src="../../static/image/news4.png" mode=""></image>
					</view> -->
					<view class="youyou" v-if="fenbunum!=''">
						{{fenbunum}}
					</view>
					<view class="cnn">
						节点消息
					</view>
				</view>
			</view>
		</view>
		<view v-if="xilist.length>0" class="itembox">
			<view v-for="(item,index) in xilist" :key="index" class="xitem" @click="tox(item)" v-if="item.is_read==0">
				<view class="xtitle">
					<text>{{item.type | getstatus}}</text>
					<text>{{item.is_read | gettype}}</text>
				</view>
				<view>{{item.content}}</view>
				<view class="time">{{item.create_time | getLocalTime}}</view>
			</view>
		</view>
		<view class="conter" v-if="newsNum==0">
			<view class="image" align="center">
				<image src="../../static/image/newsno.png" mode=""></image>
			</view>
			<view class="xx">
				暂无信息
			</view>
		</view>
		<!-- <rf-foot is_indexx1="3"></rf-foot> -->
		<view class="xuanze" v-if="isShow">
			<view class="one">
				<view class="top">
					请选申请项目
					<view class="cha" @click="cha()">
						<image src="../../static/image/cha.png" mode=""></image>
					</view>
				</view>
				<view class="conter1">
					<view class="one1" style="display: none;">
						<view :class="in_lest1==1?'one111':'one11'" @click="in_dex_x(1)">
							融资项目
						</view>
					</view>
					<view class="one1">
						<view :class="in_lest1==2?'one111':'one11'" @click="in_dex_x(2)">
							提货出库
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==3?'one111':'one11'" @click="in_dex_x(3)">
							资产出售
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==5?'one111':'one11'" @click="in_dex_x(5)">
							资产购买
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==4?'one111':'one11'" @click="in_dex_x(4)">
							服务采购
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==6?'one111':'one11'" @click="in_dex_x(6)">
							服务提供
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==7?'one111':'one11'" @click="in_dex_x(7)">
							路演视频
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==8?'one111':'one11'" @click="in_dex_x(8)">
							在线直播
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==9?'one111':'one11'" @click="in_dex_x(9)">
							会议活动
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==10?'one111':'one11'" @click="in_dex_x(10)">
							资讯公告
						</view>
					</view>
				</view>
				<view class="foott" @click="queren()">
					确定
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="index" @click="indexx(1)">
				<view class="img">
					<image :src="is_indexx1==1?'../../static/image/index1.png':'../../static/image/index.png'" mode="">
					</image>
				</view>
				<view :class="is_indexx1==1?'text1':'text'">
					首页
				</view>
			</view>
			<view class="project" @click="indexx(2)">
				<view class="img">
					<image :src="is_indexx1==2?'../../static/image/shoucang2.png':'../../static/image/shoucang1.png'"
						mode=""></image>
				</view>
				<view :class="is_indexx1==2?'text1':'text'">
					收藏
				</view>
			</view>
<!-- 			<view class="release" @click="release()">
				<image src="../../static/image/release.png" mode=""></image>
			</view> -->
			<view class="news active" @click="indexx(3)">
				<text class="bnum" v-if="newsNums>0">{{newsNum}}</text>
				<view class="img">
					<image :src="is_indexx1==3?'../../static/image/news1.png':'../../static/image/news.png'" mode="">
					</image>
				</view>
				<view :class="is_indexx1==3?'text1':'text'">
					消息
				</view>
			</view>
			<view class="my" @click="indexx(4)">
				<view class="img">
					<image :src="is_indexx1==4?'../../static/image/my1.png':'../../static/image/my.png'" mode="">
					</image>
				</view>
				<view :class="is_indexx1==4?'text1':'text'">
					我的
				</view>
			</view>
		</view>

		<view class="bbb" v-show='show' @click="show=false">
			<view class="buy">
				<view class="top1">
					<image src="../../static/image/lingdang.png" mode=""></image>
				</view>
				<view class="text">
					温馨提示
					完成实名认证后可以开启此功能。
				</view>
				<button class="confirm-btn" @click="goRealname">去实名</button>
				<button class="confirm-btn" @click="show=false">关闭</button>
			</view>
		</view>
	</view>
</template>

<script>
	// import uniRate from '@/components/rf-foot/rf-foot.vue'
	import {
		//获取分布消息详情
		fenbu,
		//我的分布消息列表
		fenbulist,
		// 我未读分布消息数量
		fenbunum,
		// 我的系统消息详情
		xitong,
		// 我的系统消息列表
		xitonglist,
		// 我的未读系统消息数量
		xitongnum,
		wnews,
		getRealName,
	} from "@/api/user.js";
	import moment from '@/utils/moment';
	export default {
		data() {
			return {
				in_lest1: '',
				is_indexx1: 3,
				isShow: false,
				is_indexx: '',
				xtlist: [],
				xtnum: "", //系统未读数量
				fenbunum: '', //分布未读数量
				xilist: [],
				flag: true, //是否触底加载
				num: 0,
				newsNum: 0,
				newsNums: 0,
				real_name: {},
				show: false,
			}
		},
		computed: {
			// newsNum(){
			// 	console.log()
			// 	return uni.getStorageSync("newNum")
			// }
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
		onLoad() {
			if (!uni.getStorageSync("userNum")) {
				uni.reLaunch({
					// #ifndef MP-WEIXIN
					url: '../login/login'
					// #endif
					// #ifdef MP-WEIXIN
					url: "../login/wxlogin"
					// #endif
				})
			}
		},
		onShow() {
			// this.newsNum=uni.getStorageSync("newNum")
			this.num = 0
			this.xilist = []
			this.getxinum()
			this.getfbnum()
			this.getxilist()
		},
		onReachBottom() {
			if (this.flag) {
				this.getxilist()
			}
		},
		filters: {
			getLocalTime(ns) {
				return moment(ns).format('YYYY-MM-DD HH:mm')
			},
			gettype(data) {
				if (data == 0) {
					return "未读"
				}
				if (data == 1) {
					return "已读"
				}
			},
			getstatus(data) {
				if (data == 1) {
					return "新的系统消息"
				}
				if (data == 2) {
					return "新的项目匹配"
				}
			}
		},
		methods: {
			toXiaoxi() {
				uni.navigateTo({
					url: './xiaoxiList'
				})
			},
			// 
			tox(type) {
				uni.navigateTo({
					url: "./xnewS?id=" + type.id
				})
			},
			// 获取系统未读数量
			async getxinum() {
				let res = await this.get(xitongnum, {
					userId: uni.getStorageSync("userNum").id
				});
				if (res.code == 0) {
					this.newsNum = res.result
					this.newsNums = res.result
				}
			},
			// 获取系统信息列表
			async getxilist() {
				this.num++;
				let res = await this.get(wnews, {
					userId: uni.getStorageSync("userNum").id,
					pageNum: this.num
				});
				console.log(res)
				if (res.code == 0) {
					if (res.result.list.length < 10) {
						this.flag == false
					}
					console.log(res.result.list)
					res.result.list.forEach(item => {
						this.xilist.push(item)
					})
				}
			},
			// 获取分布未读数量
			async getfbnum() {
				let res = await this.get(fenbunum, {
					userId: uni.getStorageSync("userNum").id
				});
				if (res.code == 0) {
					console.log("分布未读消息", res)
					this.fenbunum = res.result
					this.newsNums = this.newsNums + this.fenbunum
				}
			},
			queren() {
				if (this.in_lest1 == 1) {
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/release/release'
					})
				} else if (this.in_lest1 == 2) {
					// 投资/贷款
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/investment/investment'
					})
				} else if (this.in_lest1 == 3) {
					// 资产出售
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/assetsSale/assetsSale'
					})
				} else if (this.in_lest1 == 4) {
					// 服务采购
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/procurement/procurement'
					})
				} else if (this.in_lest1 == 5) {
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/buyAssets/buyAssets'
					})
				} else if (this.in_lest1 == 6) {
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/servDelivery/servDelivery'
					})
				} else if (this.in_lest1 == 7) {
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/news/luyan'
					})
				} else if (this.in_lest1 == 8) {
					this.isShow = false
					if (uni.getStorageSync("userNum").isLiveVideoAuth == 0 || uni.getStorageSync("userNum")
						.isLiveVideoAuth == null) {
						uni.showModal({
							title: '提示',
							content: '是否开通直播权限',
							success: (res) => {
								if (res.confirm) {
									this.get(liveqx, {
										userId: uni.getStorageSync("userNum").id
									}).then(res => {
										console.log(res)
										if (res.code == 0) {
											uni.showToast({
												title: "申请成功",
												mask: true
											})
										} else {
											uni.showToast({
												title: res.message,
												icon: "none",
												mask: true
											})
										}
									})
								} else if (res.cancel) {
									console.log('用户点击取消');
								}
							}
						});
					} else if (uni.getStorageSync("userNum").isLiveVideoAuth == 1) {
						uni.navigateTo({
							url: '/pages/live/livecon'
						})
					}
				} else if (this.in_lest1 == 9) {
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/news/huodong'
					})
				} else if (this.in_lest1 == 10) {
					this.isShow = false
					uni.navigateTo({
						url: '../../pagesA/news/gonggao'
					})
				}
			},
			in_dex(type) {
				this.in_lest = type
			},
			in_dex_x(type) {
				this.in_lest1 = type
			},
			cha() {
				this.isShow = false
			},
			xuanze() {
				// this.isshow != this.show
			},
			release() {
				/* 				if(uni.getStorageSync("userNum").userType!=1){
									if(uni.getStorageSync("userNum").memberFeeIsOpen==0){
										this.isShow = true
									}else if(uni.getStorageSync("userNum").memberFeeIsOpen==1){
										if(uni.getStorageSync("userNum").isFeeMember==""||uni.getStorageSync("userNum").isFeeMember==0){
											uni.showToast({
												title:"缴费会员才可发布项目",
												icon:"none",
												duration:1500,
												mask:true
											})
											setTimeout(()=>{
												uni.navigateTo({
													url:"../my/pay?type="+uni.getStorageSync("userNum").userType
												})
											},1500)
										}else{
											this.isShow = true
										}
									}
								}else{
									uni.showToast({
										title:"暂时没有权限~",
										icon:"none",
										duration:1500
									})
								} */
				// uni.navigateTo({
				// 	url:'../../pages/release/release' 
				// })
				if (this.real_name.status != 2) {
					this.show = true;

				} else {
					this.isShow = true
				}
			},
			goRealname() {
				uni.navigateTo({
					url: '../../pages/my/authentication'
				})
			},
			indexx(type) {
				this.is_indexx = type;
				// console.log(type)
				if (type == 1) {
					uni.navigateTo({
						url: '../../pages/index/index'
					})
				}

				if (type == 2) {
					uni.navigateTo({
						url: '../../pages/index/Favorites',
					})
				}
				if (type == 3) {
					uni.navigateTo({
						url: '../../pages/news/news',
					})
				}
				if (type == 4) {
					uni.navigateTo({
						url: '../../pages/my/my',
					})
				}
			},
			fan() {
				uni.navigateBack({
					delta: 1
				})
			},
			//去分布消息
			Division() {
				uni.navigateTo({
					url: './fenbunews'
				})
			},
			//去新闻列表
			tonews() {
				uni.navigateTo({
					url: './newslist'
				})
			},
			//去项目审核列表
			toxiangmu() {
				uni.navigateTo({
					url: '../my/myprojectlist'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.itembox {
		padding-bottom: 150rpx;
	}

	.xitem {
		width: 700rpx;
		margin-left: 25rpx;
		// border: 2rpx #999 solid;
		box-shadow: 0 0 5px 0 #e1e1e1;
		margin-bottom: 20rpx;
		border-radius: 10rpx;
		padding: 10rpx;
		color: #999;
	}

	.xtitle {
		text-align: center;
		align-items: center;
		display: flex;
		justify-content: space-between;
		color: #333;
	}

	.xtitle>text:nth-of-type(1) {
		font-size: 30rpx;
	}

	.xtitle>text:nth-of-type(2) {
		font-size: 28rpx;
		color: #EC3E60;
	}

	.time {
		text-align: right;
		color: #999;
		font-size: 26rpx;
	}

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

	//头部
	.top1 {
		width: 100%;
/* 		height: 360upx;
		background: url(../../static/image/news5.png) no-repeat left 0 fixed;
		background-size: 100% 230upx;
		margin-bottom: 40rpx; */

		.title {
			text-align: center;
			color: #FFFFFF;
			//padding-top: 30upx;
			font-weight: 700;
			font-size: 16px;
		}

		.co-n {
			width: 100%;
			display: flex;
			//padding-top: 100upx;

			.co-1 {
				position: relative;
				width: 25%;
				height: 60upx;
				display: inline-block;
				text-align: center;

				.img {
					width: 140upx;
					padding-left: 45upx;
					height: 100upx;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.cnn {
					font-size: 30upx;
					margin-top: 5upx;
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
					background: linear-gradient(180deg, rgba(255, 0, 0, 1) 0%, rgba(240, 0, 0, 1) 100%);
					border-radius: 50%;
					margin-top: -15upx;
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
			width: 25%;
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
				right: 40rpx;
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

	//底部
	.conter {
		width: 100%;

		.image {
			margin-top: 20%;
			// margin-left: 8%;
		}

		.xx {
			text-align: center;
			color: #606060;
			font-size: 30upx;
		}
	}

	/* #ifdef APP-PLUS */
	.top {
		padding-top: 60upx;

		.title {
			font-size: 34rpx;
			font-weight: 300;
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

	/* #endif */

	/*  #ifdef H5 || MP-WEIXIN*/
	// .top {
	// 	text-align: center;
	// 	color: #c9161e;
	// 	padding-top: 60upx;
	// 	font-weight: bolder;
	// 	margin-bottom: 50upx;
	// }
	/* #endif */
</style>