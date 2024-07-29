<template>
	<view class="page">
		<view class="top1" v-if="user_info.length == 0">
			<view class="bianji">
				<!-- <image src="../../static/image/myziliao.png" mode="" @tap="navTo(userInfo ? '../my/setup' : 'login')"></image> -->
				<!-- <image src="../../static/image/myziliao.png" mode="" @tap="navTo(userInfo ? '../my/setup' : 'login')" ></image> -->
				<image src="../../static/image/myziliao.png" mode="widthFix"
					@tap="navTo(userInfo ? '../my/setup' : 'login')"></image>
			</view>
			<!-- #ifndef MP-WEIXIN-->
			<view class="user" @tap="navTo(userInfo ? '../login/login' : 'login')">
			<!-- #endif-->
				<!-- #ifdef MP-WEIXIN-->
				<view class="user" @tap="navTo(userInfo ? '../login/wxlogin' : 'login')">
				<!-- #endif-->
					<view>
						<view class="img">
							<image src="../../static/image/my_login.png" mode=""></image>
						</view>
						<view class="name">
							请登录
						</view>
						<view class="cont">
							欢迎使用合交链
						</view>
					</view>
				</view>
			</view>
			<view class="top1" v-else>
				<view class="bianji">
					<image src="../../static/image/myziliao.png" mode="widthFix"
						@tap="navTo(userInfo ? '../my/setup' : 'login')"></image>
					<!-- <image src="../../static/image/myziliao.png" mode="" @click="ddd()"></image> -->
				</view>
				<view class="user">
					<view class="img" @tap="navTo(userInfo ? '../my/setup' : 'login')">
						<image src="../../static/image/missing-face.png" mode="aspectFill"
							v-if="user_info.portrait_img ==null||user_info.portrait_img ==''"></image>
						<image :src="user_info.portrait_img" mode="aspectFill"></image>
					</view>
					<view class="name">
						{{nameStr}}
					</view>
					<view class="cont">
						手机号:
						{{user_info.user_phone}}
					</view>
					<view style="color: #FFFFFF; margin-left: 150upx; padding-top: 10upx;font-size: 25upx;">
						<image style="width: 13px;height: 13px;margin-right: 5px; " src="../../static/image/copy.png"
							mode="widthFix" @tap="copyPubilcKey(chainAddress)"></image>
						钱包地址:
						{{chainAddress}}
					</view>


				</view>
			</view>
			<view class="conter">
				<!-- <view class="lst" @click="collect()">
				<view class="img">
					<image src="../../static/image/shoucang.png" mode=""></image>
				</view>
				<view class="lt">
					收藏项目
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode=""></image>
				</view>
			</view> -->
				<view class="lst" @click="vip()" style="display: none;">
					<view class="img">
						<image src="../../static/image/vip.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						会员星级
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="jiaofei" style="display: none;">
					<view class="img">
						<image src="../../static/image/jiaofei.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						会员缴费
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @tap="navTo(userInfo ? '../my/myproject' : 'login')">
					<view class="img">
						<image src="../../static/image/zichan.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我的资产中心
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="toshengqing">
					<view class="img">
						<image src="../../static/image/zichangoumai.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我的申购商品
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="todingdan">
					<view class="img">
						<image src="../../static/image/dingdan.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我的订单
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="tofabu">
					<view class="img">
						<image src="../../static/image/jiaofei.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我的发布商品
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="tihuo">
					<view class="img">
						<image src="../../static/image/tihuo.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我的提货申请
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<!-- #ifdef APP-PLUS-->

				<view class="lst" @click="tomyhuodong" v-if="isvip" style="display: none">
					<view class="img">
						<image src="../../static/image/fbhd.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我发布的活动
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="tomynewslist" v-if="isvip" style="display: none">
					<view class="img">
						<image src="../../static/image/fbnews.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我发布的资讯公告
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="lst" @click="tomynewslist1" v-if="isvip" style="display: none">
					<view class="img">
						<image src="../../static/image/live.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我发布的路演推广
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<!-- #endif-->
				<view class="lst" @click="tohuodong" style="display: none">
					<view class="img">
						<image src="../../static/image/canjiahuodong.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						参加的活动
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="vipup()" style="display: none;">
					<view class="img">
						<image src="../../static/image/up.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						会员升级记录
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>

				<view class="lst" @click="getmyqrcode()" v-if="isvip">
					<view class="img">
						<image src="../../static/image/card.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我的名片
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="authentication()">
					<view class="img">
						<image src="../../static/image/auth.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						实名认证
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="tomybank">
					<view class="img">
						<image src="../../static/image/bankcard.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						绑定银行卡
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="tomybag">
					<view class="img">
						<image src="../../static/image/bag.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						我的钱包
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="useraddress()">
					<view class="img">
						<image src="../../static/image/address.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						地址管理
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="reportlist()" v-if="isvip">
					<view class="img">
						<image src="../../static/image/report.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						统计分析
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="vippup()" v-if="!isvip">
					<view class="img">
						<image src="../../static/image/sheng.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						申请成为经纪人
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="buup()" v-if="isvip" style="display: none">
					<view class="img">
						<image src="../../static/image/sheng.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						申请成立代表处
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="guanxi()" style="display: none">
					<view class="img">
						<image src="../../static/image/chaxun.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						查询经纪人
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="lst" @click="member()" v-if="isvip">
					<view class="img">
						<image src="../../static/image/yuyin.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						会员列表
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>

				<!-- #ifdef APP-PLUS-->
				<!-- <view class="lst"  @click="tolive" v-if="isvip">
				<view class="img">
					<image src="../../static/image/live.png" mode="widthFix"></image>
				</view>
				<view class="lt">
					视频直播
				</view>
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
			</view> -->
				<!-- #endif-->
				<view class="lst" @click="aboutUs()">
					<view class="img">
						<image src="../../static/image/gywm.png" mode="widthFix"></image>
					</view>
					<view class="lt">
						关于我们
					</view>
					<view class="img1">
						<image src="../../static/image/jiantou.png" mode="widthFix"></image>
					</view>
				</view>
			</view>
			<!-- <view class="delet" @click="toLogout()">
			退出登录
		</view> -->
			<!-- <rf-foot is_indexx1="4"></rf-foot> -->
			<!-- #ifdef APP-PLUS-->
			<view class="xuanze" v-if="isShow">
				<view class="one">
					<view class="top">
						请选择发布类型
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
						<image :src="is_indexx1==1?'../../static/image/index1.png':'../../static/image/index.png'"
							mode=""></image>
					</view>
					<view :class="is_indexx1==1?'text1':'text'">
						首页
					</view>
				</view>
				<view class="project" @click="indexx(2)">
					<view class="img">
						<image
							:src="is_indexx1==2?'../../static/image/shoucang2.png':'../../static/image/shoucang1.png'"
							mode=""></image>
					</view>
					<view :class="is_indexx1==2?'text1':'text'">
						收藏
					</view>
				</view>
				<!-- 				<view class="release" @click="release()">
					<image src="../../static/image/release.png" mode=""></image>
				</view> -->
				<view class="news active" @click="indexx(3)">
					<text class="bnum" v-if="newsNum>0">{{newsNum}}</text>
					<view class="img">
						<image :src="is_indexx1==3?'../../static/image/news1.png':'../../static/image/news.png'"
							mode=""></image>
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
			<!-- #endif-->

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
	import {
		mapMutations,
		mapState
	} from 'vuex';
	// import uniRate from '@/components/rf-foot/rf-foot.vue'
	import {
		saveOrUpdateUserInfo,
		refreshToken
	} from '@/api/login.js'
	import {
		getUserInfo,
		getChainUserInfo,
		liveqx,
		xitongnum,
		fenbunum,
		getRealName,
		huiMoneyBag
	} from '@/api/user.js'
	import {
		fail
	} from 'assert';
	export default {
		data() {
			return {
				id: '',
				userInfo: {
					promoter: null,
				},
				token: null,
				user_info: [],
				userlist: {},
				in_lest1: '',
				is_indexx1: 4,
				isShow: false,
				is_indexx: '',
				isvip: true,
				newsNum: 0,
				chainAddress: '',
				real_name: {},
				show: false,
				nameStr: ''
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
		onLoad(options) {


		},
		onShow() {
			this.get(xitongnum, {
				userId: uni.getStorageSync("userNum").id
			}).then(res => {
				console.log(res)
				if (res.code == 0) {
					uni.setStorageSync("newNum", res.result)
					this.newsNum = res.result
				}
			})
			this.get(fenbunum, {
				userId: uni.getStorageSync("userNum").id
			}).then(r => {
				if (r.code == 0) {
					console.log("分布未读消息", r)
					this.newsNum = this.newsNum + r.result
				}
			})
			if (uni.getStorageSync("userNum").userType == 1) {
				this.isvip = false
			}
			if (!uni.getStorageSync("userNum")) {
				uni.reLaunch({
					// #ifndef MP-WEIXIN
					url: '../login/login'
					// #endif
					// #ifdef MP-WEIXIN
					url: "../login/wxlogin"
					// #endif
				})
			} else {
				this.initData()
			}
		},
		computed: {
			// newsNum(){
			// 	console.log()
			// 	return uni.getStorageSync("newNum")
			// }
		},
		methods: {
			guanxi() {
				uni.navigateTo({
					url: "./guanxi"
				})
			},
			member() {
				uni.navigateTo({
					url: "./huiyuan"
				})
			},
			authentication() {
				uni.navigateTo({
					url: "./authentication"
				})
			},
			useraddress() {
				uni.navigateTo({
					url: "../userAddress/userAddressList"
				})
			},
			tomyhuodong() {
				uni.navigateTo({
					url: "/pages/index/activity?type=1"
				})
			},
			tomynewslist() {
				uni.navigateTo({
					url: "/pages/news/newslist?type=1"
				})
			},
			tomynewslist1() {
				uni.navigateTo({
					url: "/pages/index/promote?type=1"
				})
			},
			// 会员缴费
			jiaofei() {
				uni.navigateTo({
					url: './pay?type=' + uni.getStorageSync("userNum").userType
				})
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
			// #ifdef APP-PLUS
			cha() {
				this.isShow = false
			},
			xuanze() {
				// this.isshow != this.show
			},
			release() {
				/* if (uni.getStorageSync("userNum").userType == 2) {
					if (uni.getStorageSync("userNum").memberFeeIsOpen == 0) {
						this.isShow = true
					} else if (uni.getStorageSync("userNum").memberFeeIsOpen == 1) {
						if (uni.getStorageSync("userNum").isFeeMember == "" || uni.getStorageSync("userNum").isFeeMember ==
							0) {
							uni.showToast({
								title: "缴费会员才可发布项目",
								icon: "none",
								duration: 1500,
								mask: true
							})
							setTimeout(() => {
								uni.navigateTo({
									url: "../my/pay?type=" + uni.getStorageSync("userNum").userType
								})
							}, 1500)
						} else {
							this.isShow = true
						}
					}
				} else {
					uni.showToast({
						title: "暂时没有权限~",
						icon: "none",
						duration: 1500
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
			// #endif
			//退出登录
			...mapMutations(['login', 'logout']),
			toLogout() {
				uni.showModal({
					content: '确定要退出登录么',
					success: (e) => {
						if (e.confirm) {
							this.$get(`${refreshToken}`).then(r => {
								this.logout();
								uni.reLaunch({
									url: '/pages/my/my'
								})
							})
						}
					}
				});
			},
			// 数据初始化
			async initData() {
				this.userInfo = uni.getStorageSync('userNum') || {};
				this.token = uni.getStorageSync('userNum') || undefined;
				if (this.token) {
					// await this.getMemberInfo();
				} else {
					this.loading = false;
				};
				if (uni.getStorageSync("userNum").id = '') {
					return
				} else {
					this.$get(`${getUserInfo}`, {
						id: uni.getStorageSync("userNum").id
					}).then(r => {
						this.userlist = r.result
						this.user_info = r.result
						this.displayname()
						console.log(this.userlist);
					}).catch((err) => {});

					this.$get(`${getChainUserInfo}`, {
						id: uni.getStorageSync("userNum").id
					}).then(r => {
						console.log("get chain user infor");
						console.log(r.result);
						this.chainAddress = r.result.address;
					}).catch((err) => {});
				}

			},
			collect() {
				uni.navigateTo({
					url: './collect'
				})
			},
			ddd() {
				uni.navigateTo({
					url: './setup'
				})
			},
			aboutUs() {
				uni.navigateTo({
					url: './about-us'
				})
			},
			tihuo() {
				uni.navigateTo({
					url: '../../pagesA/investment/myinvestmentList'
				})
			},
			fan() {
				uni.navigateBack({
					delta: 1
				})
			},
			vip() {
				uni.navigateTo({
					url: '../member-Star/member-Star'
				})
			},
			vipup() {
				uni.navigateTo({
					url: '../my/vipup'
				})
			},
			//投资会员升级为管理员
			vippup() {
				uni.navigateTo({
					url: '../my/tvipup'
				})

			},
			//投资会员升级为管理员
			buup() {
				uni.navigateTo({
					url: '../my/newbu'
				})
			},
			tohuodong() {
				uni.navigateTo({
					url: "../my/huodong"
				})
			},
			getmyqrcode() {
				uni.navigateTo({
					url: "../my/myqrcode"
				})
			},
			goRealname() {
				uni.navigateTo({
					url: '../../pages/my/authentication'
				})
			},
			login() {
				uni.navigateTo({
					url: '../login/login'
				})
			},
			data1() {
				uni.navigateTo({
					url: '../data/data'
				})
			},
			setup() {
				uni.navigateTo({
					url: 'setup'
				})
			},
			toshengqing() {
				uni.navigateTo({
					url: "./shengqing"
				})
			},
			todingdan() {
				uni.navigateTo({
					url: "./dingdan"
				})
			},
			tomybank() {
				uni.navigateTo({
					url: "./mybank"
				})
			},
			 tomybag(){
					uni.navigateTo({
						url: "./tixian"
					})
			},
			tofabu() {
				uni.navigateTo({
					url: "./mySaleList"
				})
			},
			// 获取用户信息
			// async getMemberInfo() {
			// 		   this.loading = true;
			// 		   if (uni.getStorageSync('cartNum') != 0) {
			// 		   			this.$get(memberInfo).then(r => {
			// 		   									  this.loading = false;
			// 		   									this.userInfo = r.data || undefined;
			// 		   									  const orderSynthesizeNumArr = [];
			// 		   										for (let item in r.data.order_synthesize_num) {
			// 		   											orderSynthesizeNumArr.push(r.data.order_synthesize_num[item])
			// 		   										}
			// 		   										for (let i = 0; i < this.orderSectionList.length; i++) {
			// 		   											this.orderSectionList[i].num = orderSynthesizeNumArr[i].toString();
			// 		   										}
			// 		   										this.getFootPrintList();
			// 		   			    this.$get(`${cartItemCount}`).then(r => {
			// 		   									      if (r.data == 0) {
			// 		   									        uni.removeTabBarBadge({index: 3});
			// 		   										    } else {
			// 		   											    uni.setStorageSync('cartNum', r.data);
			// 		   											    uni.setTabBarBadge({
			// 		   												    index: 3,
			// 		   												    text: r.data,
			// 		   											    });
			// 		   									      }
			// 		   									    });
			// 		   			  uni.setStorage({
			// 		   			      key: 'userInfo',
			// 		   			      data: r.data
			// 		   			  })
			// 		   			}).catch(() => {
			// 		   									  this.loading = false;
			// 		   								 });

			// 		   		  }else {return}

			// },
			// 统一跳转接口,拦截未登录路由
			navTo(url) {
				if (!url) {
					return;
				}
				if (!this.token) {
					url = '/pages/login/login';
					uni.showModal({
						content: '你暂未登陆，是否跳转登录页面？',
						success: (confirmRes) => {
							if (confirmRes.confirm) {
								uni.navigateTo({
									url
								});
							}
						}
					});
				} else {
					uni.navigateTo({
						url
					})
				}
			},
			displayname() {
				console.log("this.nameStr")
				if (uni.getStorageSync("userNum").userType == 2) {
					this.nameStr = this.userlist.nick_name + " [经纪人] ";
				} else {
					this.nameStr = this.userlist.nick_name;
				}

				console.log(this.nameStr)
			},
			copyPubilcKey(val) {

				if (!val) {
					this.$api.msg('key为空，不复制');
				} else {
					// #ifdef  MP-WEIXIN || H5
					const input = document.createElement('input');
					input.value = val;

					document.body.appendChild(input);
					console.log(input.value);
					input.select();
					document.execCommand('Copy');
					document.body.removeChild(input);
					this.$api.msg('复制成功');
					// #endif
					// #ifdef APP-PLUS
					uni.setClipboardData({
						data: val,
						success: () => {
							this.$api.msg('复制成功');
						}
					});
					// #endif



				}
			},
			test() {
				uni.navigateTo({
					url: '../Report/ReportTest'
				})
			},
			reportlist() {
				console.log("reportlist")
				uni.navigateTo({
					url: '../Report/reportlist'
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
		height: 130vh;
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