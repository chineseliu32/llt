<template>
	<view class="ttttt">
		<view class="topnav"></view>
		<view class="top">
			<view>
				<text
					style="text-align: center; font-family:'Microsoft YaHei';font-weight: bold;color: white; font-size: 40upx;">版马商城</text>
			</view>
		</view>

		<swiper class="imageContainer" next-margin="0" indicator-dots indicator-color="white"
			indicator-active-color="grey" autoplay circular>
			<swiper-item class="swiperitem" v-for="(item,index) in banner_list" :key="index">
				<image class="itemImg" :src="item.url"></image>
			</swiper-item>
		</swiper>
		<view class="conter">
			<view class="news" style="display: none;">
				<view class="suel" v-if="newS.news_title">
					<image src="../../static/image/Sue.png" mode=""></image>
				</view>
				<view class="suec">
					<uni-notice-bar single="true" :text="newS.news_title" :speed="bnum" scrollable="true"
						background-color="#fff" color="#666"></uni-notice-bar>
				</view>
			</view>
			<view class="list">
				<view class="list1">
					<image src="../../static/image/in_list1.png" mode="" @click="rongzi(0)"></image>
					<view class="title">
						商品发行
					</view>
				</view>
				<view class="list1">
					<image src="../../static/image/zichangoumai.png" mode="" @click="assetsSale()"></image>
					<view class="title">
						合交商城
					</view>
				</view>
				<view class="list1" style="display: none">
					<image src="../../static/image/fuwu.png" mode="" @click="testdetail()"></image>
					<view class="title">
						服务提供
					</view>
				</view>

				<view class="list1" @click="promote()" style="display: none">
					<image src="../../static/image/in_list7.png" mode=""></image>
					<view class="title">
						路演视频
					</view>
				</view>
				<view class="list1" style="display: none">
					<image src="../../static/image/in_list5.png" mode="" @click="activity()"></image>
					<view class="title">
						会议活动
					</view>
				</view>
				<view class="list1" style="">
					<image src="../../static/image/tihuo.png" mode="" @click="investment()"></image>
					<view class="title">
						资产提货
					</view>
				</view>
				<view class="list1" style="display: none">
					<image src="../../static/image/zichangoumai.png" mode="" @click="buyAssets()"></image>
					<view class="title">
						资产购买
					</view>
				</view>
				<view class="list1">
					<image src="../../static/image/shiwuzican.png" mode="" @click="rongzi(1)"></image>
					<view class="title">
						实物商品
					</view>
				</view>
				<!-- #ifdef APP-PLUS-->
				<view class="list1" style="display: none;">
					<image src="../../static/image/in_list6.png" mode="" @click="tolive"></image>
					<view class="title">
						在线直播
					</view>
				</view>
				<!--#endif-->
				<view class="list1">
					<image src="../../static/image/quanyizichan.png" mode="" @click="rongzi(2)"></image>
					<view class="title">
						权益商品
					</view>
				</view>
			</view>
		</view>

		<view class="view" style="padding-left: 20upx;">
			<!-- indicator-dots indicator-color="white" indicator-active-color="grey" autoplay interval="1500" circular -->
			<swiper class="imageContainermin" next-margin="0"
				style="background-image: url(../../static/image/certificate.png);background-size: cover;"
				display-multiple-items='2' circular autoplay>
				<swiper-item @click="xiang(item)" class="swiperitemmin" v-for="(item,index) in recommendProjects"
					:key="index">
					<image class="itemImgmin" :src="item.img_url" style="width: 150upx;height: 150upx;"></image>
					<view class="cnn">
						<view class="cnm">
							{{item.project_name}}
						</view>
						<text class="one" style="font-size: smaller;">待售:{{item.amount}}份</text>
						<view class="cnm">
							<text class="one"
								style="font-size: smaller; color: red;">单价:{{item.limit_rmb | formatNumber}}元</text>

						</view>

					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="last">
			<scroll-view id="laaa" scroll-x="true" @scrolltolower="scrolltolower" v-if="zlist.length>0">
				<view class="lnnn" v-for="(item,index) in zlist" :key="index" :id="index" @click="xiang(item)">
					<image :src="item.project_logo_url" mode="aspectFill"></image>
				</view>
			</scroll-view>
			<v-tabs v-model="current" :tabs="biqoqianlist" @change="changeTab" activeColor="#c9161e"
				lineColor="#c9161e"></v-tabs>
		</view>
		<!--分类栏目-->
		<view class="navbar">
			<!--  <view class="nav-item" :class="{current: filterIndex === 0}" @tap="tabClick(0)">
		    综合排序
		  </view> -->
			<view class="nav-item" :class="{current: filterIndex === 1}" @tap="tabClick(1)">
				<text>时间</text>
				<view class="p-box">
					<i :class="{active: salesOrder === 1 && filterIndex === 1}" class="iconfont iconshang"></i>
					<i :class="{active: salesOrder === 2 && filterIndex === 1}" class="iconfont iconshang xia"></i>
				</view>
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @tap="tabClick(2)">
				<text>数量</text>
				<view class="p-box">
					<i :class="{active: amountOrder === 1 && filterIndex === 2}" class="iconfont iconshang"></i>
					<i :class="{active: amountOrder === 2 && filterIndex === 2}" class="iconfont iconshang xia"></i>
				</view>
			</view>
			<view class="nav-item" :class="{current: filterIndex === 3}" @tap="tabClick(3)">
				<text>单价</text>
				<view class="p-box">
					<i :class="{active: priceOrder === 1 && filterIndex === 3}" class="iconfont iconshang"></i>
					<i :class="{active: priceOrder === 2 && filterIndex === 3}" class="iconfont iconshang xia"></i>
				</view>
			</view>
<!-- 			<view class="nav-item" :class="{current: filterIndex === 4}" @tap="tabClick(4)">
				<text>销量</text>
				<view class="p-box">
					<i :class="{active: priceOrder === 1 && filterIndex === 4}" class="iconfont iconshang"></i>
					<i :class="{active: priceOrder === 2 && filterIndex === 4}" class="iconfont iconshang xia"></i>
				</view>
			</view> -->
			<!--  <view class="nav-item" :class="{current: filterIndex === 2}" @tap="tabClick(2)">
		    匹配
		  </view>-->

		</view>
		<view style="padding-bottom: 100upx;">
			<view class="view" v-if="index_list.length>0">
				<!-- <view class="vv" @click="xiang()" v-for="(item,index) in index_list" :key="index" > -->
				<view class="vv" v-for="(item,index) in index_list" :key="index" @click="xiang(item)">
					<view class="" v-if="index_list.length !=0">
						<image :src="item.img_url | tttt" mode="" style="width: 260upx;height: 260upx;"></image>
					</view>
					<view class="cnn">
						<text class="one">待售:{{item.amount}}份</text>
						<text class="three">单价:{{item.limit_rmb | formatNumber}}元</text>
						<text class="two" v-for="(item1,index) in labelList" :key="index"
							v-if="item1.id == item.project_label">{{item1.label_name}}</text>
						<!-- 	<view class="label" v-for="(item1,index) in labelList" :key="index" v-if="item1.id == item.project_label">
						{{item1.label_name}}
					</view> -->
					</view>
					<view class="cnm">
						{{item.project_name}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="index_list.length==0" class="elsebox">
			<image src="../../static/image/newsno.png"></image>
			<!-- <view>暂无项目</view> -->
		</view>
		<!-- #ifdef APP-PLUS -->
		<view class="xuanze" v-if="isShow" @touchmove.stop.prevent="moveHandle">
			<view class="one">
				<view class="top">
					请选择申请项目
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
						<view :class="in_lest1==6?'one111':'one11'" @click="in_dex_x(6)">
							服务提供
						</view>
					</view>
					<view class="one1" style="display: none;">
						<view :class="in_lest1==4?'one111':'one11'" @click="in_dex_x(4)">
							服务采购
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
			<!-- 	<view class="release" @click="release()">
				<image src="../../static/image/release.png" mode=""></image>
			</view> -->
			<view class="news active" @click="indexx(3)">
				<text class="bnum" v-if="newsNum>0">{{newsNum}}</text>
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
		<!-- #endif-->
		<view class="bbb" v-show='show' @click="show=false" style="z-index: 999;">
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
		index_banner,
		gongao,
		tuijian
	} from '../../api/index'
	import {
		recommend,
		allUserEnum,
		categoryList,
		labelList,
		getZindex,
		liveqx,
		xitongnum,
		fenbunum,
		getRealName,
		getRecommendProject,
		getGoldenProject
	} from '../../api/user'
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				current: 0,
				in_lest: '1',
				in_lest1: '',
				banner_list: [],
				index_list: [],
				index_list1: [],
				labelList: [],
				id: '',
				is_indexx: '',
				isShow: false,
				is_indexx1: 1,
				newS: {},
				biqoqiandata: [],
				biqoqianlist: ["推荐"],
				cityname: "",
				tableId: "", //标签id
				num: 0,
				index: 0,
				dnum: 0,
				zlist: [],
				number: 0,
				ceshi: "这是第一个页面的值",
				bnum: 20,
				newsNum: 0,
				real_name: {},
				show: false,
				recommendProjects: [],
				goldenProjects: [],
				filterIndex: 0,
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				salesOrder: 0, //1 时间从低到高 2价格从高到低
				amountOrder: 0 //1 数量从低到高 2价格从高到低
			}
		},
		components: {
			uniNoticeBar
		},
		// 转发按钮
		onShareAppMessage(res) {
			return {
				title: '合交链',
				path: '/page/index/index'
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

			// #ifndef H5
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					this.address(res.latitude, res.longitude)
					console.log(res)
				}
			});
			// #endif

			this.getBiaoiqna()

			this.initData();

			// #ifdef H5
			this.getlocation()
			// #endif 
			this.initData2();

			this.getNews();
			uni.getStorageSync("userNum");
			if (!uni.getStorageSync("userNum")) {
				uni.reLaunch({
					// #ifndef MP-WEIXIN
					// url:'../login/login'
					// #endif
					// #ifdef MP-WEIXIN
					// url:"../login/wxlogin"
					// #endif
				})
			}
			this.initData1();
			this.getRecommandAndGoldenProject();
		},
		onShow() {
			this.get(xitongnum, {
				userId: uni.getStorageSync("userNum").id
			}).then(res => {
				if (res.code == 0) {
					uni.setStorageSync("newNum", res.result)
					this.newsNum = res.result
				}
			})
			this.get(fenbunum, {
				userId: uni.getStorageSync("userNum").id
			}).then(r => {
				if (r.code == 0) {
					this.newsNum = this.newsNum + r.result
				}
			})
		},
		filters: {
			// 截取字符串
			subStringText(value, index) {
				const str = String(value);
				if (!value) return 0;
				return str.length > index ? str.substring(0, index) + '...' : str;
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
			ttt(val) {
				// return moment(val).Math.ceil(val)
				return Math.ceil(val)
			},
			tttt(val) {

				return val.split(",")[0]
			},
			name(val) {
				if (val[0] == "【") {
					return val
				} else {
					return "重点项目"
				}

			}
		},
		computed: {
			// newsNum(){
			// 	console.log()
			// 	return uni.getStorageSync("newNum")
			// }
		},
		onReachBottom() {
			if (this.index == 0) {
				this.initData1()
			} else {
				let id = this.biqoqiandata[this.index - 1].id;
				this.getData(id)
			}
		},
		methods: {
			moveHandle() {

			},
			scrolltolower() {
				this.getzd()
			},
			// 获取重点项目
			async getzd() {
				this.dnum++;
				let res = await this.get(getZindex, {
					pageNum: this.dnum
				})
				if (res.code == 0) {
					res.result.list.forEach(item => {
						this.biqoqiandata.forEach(it => {
							if (it.id == item.project_label) {
								item.labelName = it.labelName
							}
						})
						this.zlist.push(item)
					})
				}
			},
			getlocation() {
				var geolocation = new BMap.Geolocation();
				var address = '';
				geolocation.getCurrentPosition((r) => {
					address = r.address;
					console.log(address.city)
					console.log(r)
					// this.cityname=address.city
					// this.initData1()
				}, {
					enableHighAccuracy: true
				});
			},
			//地址解析7GDBZ-AXP6U-LMMVP-2WTTQ-N7NT5-64FJS
			address(lat, lng) {

				uni.request({
					url: "https://apis.map.qq.com/ws/geocoder/v1/",
					method: "GET",
					data: {
						key: "IIABZ-4S465-5DBIT-QIJBP-6HEOF-Y7BQW",
						location: lat + "," + lng
					},
					success: (e) => {
						console.log(e)
					}
				})
			},
			getLocalTime(nS) {
				return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ').substring(0, 10);
			},
			// 获取标签{
			async getBiaoiqna() {

				let res = await this.get(allUserEnum);

				let labellist = res.result.labelList.list;
				this.biqoqiandata = labellist;
				this.getzd()
				this.biqoqiandata.forEach(item => {
					this.biqoqianlist.push(item.labelName)
				})
			},
			// 根据标签获取数据
			// 根据标签获取数据
			async getData(id) {
				this.tableId = id
				this.num++;
				let res = await this.get(labelList, {
					projectTag: this.tableId,
					cityName: this.cityname,
					pageNum: this.num
				});
				if (res.code == 0) {
					res.result.list.forEach(item => {
						this.index_list.push(item)
					})
				}
			},
			//点击tab
			changeTab(index) {
				this.index = index;
				this.num = 0;
				this.index_list = [];
				if (index == 0) {
					this.initData1()
				} else {
					let id = this.biqoqiandata[index - 1].id;
					this.getData(id)
				}
			},
			//点击直播列表
			tolive() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../live/livelist'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			//获取公告
			async getNews() {
				let res = await this.get(gongao, {});
				if (res.code == 0) {
					if (res.result) {
						this.newS = res.result;
					}
				}
			},
			// 融资/借款
			rongzi(type) {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../project/project?type=' + type
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 资产出售
			assetsSale() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../../pagesA/assetsSale/assetsSaleList'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 服务提供
			servDelivery() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../../pagesA/servDelivery/servDeliveryList'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 投资贷款
			investment() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../../pagesA/investment/investmentList'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 资产购买
			buyAssets() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../../pagesA/buyAssets/buyAssetsList'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 服务采购
			procurement() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../../pagesA/procurement/procurementList'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			//点击打开发布
			// #ifdef APP-PLUS 
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
			// 点击底部taBber
			indexx(type) {
				this.is_indexx = type;
				// console.log(type)
				if (type == 1) {
					uni.redirectTo({
						url: '../../pages/index/index'
					})
				}

				if (type == 2) {
					uni.redirectTo({
						url: '../../pages/index/Favorites',
					})
				}
				if (type == 3) {
					uni.redirectTo({
						url: '../../pages/news/news',
					})
				}
				if (type == 4) {
					uni.redirectTo({
						url: '../../pages/my/my',
					})
				}
			},
			release() {
				if (uni.getStorageSync("userNum")) {
					/* 					if(uni.getStorageSync("userNum").userType==2){
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
					if (this.real_name.status != 2) {
						this.show = true;

					} else {
						this.isShow = true
					}
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			cha() {
				this.isShow = false
			},
			// #endif

			togg() {

				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: "../news/newslist"
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			banner(type) {

				if (uni.getStorageSync("userNum")) {
					this.id = type,
						uni.navigateTo({
							url: './bannerdetails?id=' + this.id,
						})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 路演推广
			promote() {

				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../index/promote'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 会议活动
			activity() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../index/activity'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			notice() {
				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../index/list'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 新闻列表
			news() {

				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../news/news'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			in_dex(type) {
				this.in_lest = type
			},
			in_dex_x(type) {
				this.in_lest1 = type
			},
			search() {

				if (uni.getStorageSync("userNum")) {
					uni.navigateTo({
						url: '../index/search'
					})
				} else {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				}
			},
			// 点击跳转项目详情
			xiang(type) {
				console.log(type)
				let url = "";
				if (type.cooperate_type == 1) {
					url = "../../pagesA/details/details"
				}
				if (type.cooperate_type == 2) {
					url = "../../pagesA/details/details6"
				}
				if (type.cooperate_type == 3) {
					url = "../../pagesA/details/details5"
				}
				if (type.cooperate_type == 4) {
					url = "../../pagesA/details/details4"
				}
				if (type.cooperate_type == 5) {
					url = "../../pagesA/details/details3"
				}
				if (type.cooperate_type == 6) {
					url = "../../pagesA/details/details2"
				}
				if (!uni.getStorageSync("userNum")) {
					uni.navigateTo({
						// #ifndef MP-WEIXIN
						url: '../login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "../login/wxlogin"
						// #endif
					})
				} else {
					if (uni.getStorageSync("userNum").memberFeeIsOpen == 0) {
						uni.navigateTo({
							url: `${url}?id=${type.id}`
						})
					} else if (uni.getStorageSync("userNum").memberFeeIsOpen == 1) {
						if (uni.getStorageSync("userNum").isFeeMember == "" || uni.getStorageSync("userNum").isFeeMember ==
							0) {
							uni.showToast({
								title: "缴费会员才查看详情",
								icon: "none",
								duration: 1500
							})
							setTimeout(() => {
								uni.navigateTo({
									url: "../my/pay?type=" + uni.getStorageSync("userNum").userType
								})
							}, 1500)
						} else {
							uni.navigateTo({
								url: `${url}?id=${type.id}`
							})
						}
					}
				}
			},

			initData() {
				this.$get(`${index_banner}`, ).then(r => {
					this.banner_list = r.result,
						console.log(this.banner_list);
				}).catch((err) => {});
			},
			initData1(name) {

				this.num++
				this.$get(`${getRecommendProject}`, {
					cityName: this.cityname,
					pageNum: this.num
				}).then(r => {
					r.result.list.forEach(item => {
						this.index_list.push(item)
					})

				}).catch((err) => {});
			},
			// 获取推荐的数据
			async getTuijian(id) {
				let res = await this.get(tuijian, {
					projectTag: id
				});
			},
			// 获取标签
			initData2() {
				this.$get(`${allUserEnum}`).then(r => {
					this.indexlist1 = r.result
					this.labelList = r.result.labelList.list;
				}).catch((err) => {});
			},
			xuanze() {},
			goRealname() {
				uni.navigateTo({
					url: '../../pages/my/authentication'
				})
			},
			getRecommandAndGoldenProject() {
				this.$get(`${getRecommendProject}`, {
					pageNum: this.num
				}).then(r => {
					r.result.list.forEach(item => {
						let array = item.img_url.split(',');
						if (array.length > 0) {
							item.img_url = array[0];
						}
						this.recommendProjects.push(item)
					})
				}).catch((err) => {});
				this.$get(`${getGoldenProject}`, {
					pageNum: this.num
				}).then(r => {
					r.result.list.forEach(item => {
						let array = item.img_url.split(',');
						if (array.length > 0) {
							item.img_url = array[0];
						}
						this.goldenProjects.push(item)
					})
				}).catch((err) => {});
			},
			//排序点击
			tabClick(index) {
				this.filterParams = {}
				if (this.filterIndex === index && index !== 2 && index !== 3 && index !== 1) {
					return;
				}
				this.filterIndex = index;
				if (index === 0) {
					this.filterParams = {}
				} else if (index === 1) {
					if (this.salesOrder === 1) {
						this.filterParams = 'timeDESC'
						this.salesOrder = 2;
					} else {
						this.filterParams = 'timeASC'
						this.salesOrder = 1;
					}
				} else if (index === 2) {
					if (this.amountOrder === 1) {
						this.filterParams = 'financingDESC'
						this.amountOrder = 2;
					} else {
						this.filterParams = 'financingASC'
						this.amountOrder = 1;
					}
				} else if (index === 3) {
					if (this.priceOrder === 1) {
						this.filterParams = 'priceDESC'
						this.priceOrder = 2;
					} else {
						this.filterParams = 'priceASC'
						this.priceOrder = 1;
					}
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				console.log(this.index_list)
				this.num = 0;
				this.jiazaiFlag = true;
				this.index_list = [];
				this.initData1();
			},
			testdetail() {
				alert("asdf");
				uni.navigateTo({
					url: '../../pagesA/investment/investmentList'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.elsebox {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 100rpx;
	}

	/* #ifdef APP-PLUS */

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

	/*#endif*/
	//轮播图
	#laaa {
		width: 750rpx;
		height: 150rpx;
		white-space: nowrap;
		padding-left: 8px;
	}

	.lnnn {
		width: 150rpx;
		height: 150rpx;
		display: inline-block;
		position: relative;

	}

	.name {
		position: absolute;
		top: 10rpx;
		text-align: center;
		width: 150rpx;
		z-index: 99;
		overflow: hidden;
		font-size: 28rpx;
		font-weight: bold;
	}

	.labelname {
		position: absolute;
		top: 60rpx;
		text-align: center;
		width: 150rpx;
		z-index: 99;
		overflow: hidden;
		font-size: 24rpx;
	}

	.lnnn>image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 150rpx;
	}

	.imageContainer {
		width: 710upx;
		height: 300upx;
		margin: 100upx auto 0;
	}

	.itemImg {
		width: 680upx;
		height: 260upx;
		// border-radius: 20upx;

	}

	.swiperitem {
		width: 660upx;
		height: 350upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.imageContainermin {
		width: 720upx;
		height: 320upx;
		margin-top: 30upx;
		margin-left: 10upx;
		padding: 20upx;


	}

	.itemImgmin {
		width: 200upx;
		height: 200upx;
		margin: 15upx 5upx 0;
		border-radius: 20upx;

		.cnn {
			width: 100%;
			height: 40upx;

			.one {
				float: left;
				font-size: 26upx;
				color: #666666;
				height: 40upx;
				line-height: 40upx;
			}

			.two {
				font-size: 26upx;
				float: right;
				color: #666666;
				height: 40upx;
				margin-right: 10upx;
				line-height: 40upx;
			}

			.three {
				font-size: 26upx;
				float: right;
				color: #FF5A4E;
				height: 40upx;
			}

			.label {
				margin-top: 5upx;
				width: 100upx;
				height: 34upx;
				float: right;
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

	.swiperitemmin {
		width: 200upx;
		height: 200upx;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.top {
		width: 100%;
		height: 100upx;
		position: fixed;
		width: 100%;
		background: #fff;
		z-index: 99999999;
		top: 0;
		left: 0;
		border-bottom: 1px solid #f6faff;
		display: flex;
		justify-content: center;

		.left {
			margin-top: 30upx;
			margin-left: 30upx;
			width: 20%;
			height: 70upx;
			display: inline-block;

			image {
				width: 40upx;
				height: 40upx;
			}
		}

		.center {
			margin-top: 20upx;
			width: 50%;
			height: 66upx;
			padding-left: 130upx;
			box-sizing: border-box;
			display: inline-block;

			image {
				width: 150upx;
				height: 100%;
			}
		}

		.right {
			float: right;
			margin-top: 30upx;
			width: 20%;
			height: 70upx;
			display: inline-block;

			image {
				float: right;
				width: 40upx;
				height: 40upx;
			}
		}
	}

	.banner {
		width: 90%;
		height: 300upx;
		margin: auto;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.conter {
		width: 100%;
		// height: 420upx;
		background-color: #F6FAFF;
		padding-top: 20upx;
		padding-bottom: 20rpx;

		.news {
			width: 100%;
			height: 60upx;
			display: flex;
			background-color: #FFFFFF;
			margin-bottom: 20upx;

			.suel {
				line-height: 60upx;
				float: left;
				margin-left: 30upx;
				display: flex;
				align-items: center;

				image {
					width: 40upx;
					height: 30upx;
				}
			}

			.suec {
				white-space: nowrap;
				float: left;
				width: 100%;
				height: 60upx;
				margin-left: 20upx;
				line-height: 60upx;
				display: inline-block;
				font-size: 28upx;
				color: #333333;

				.text {
					margin-right: 40upx;
					font-size: 28upx;
					color: #666666;
				}
			}
		}

		.list {
			padding: 20rpx 0 0 0;
			width: 95%;
			height: 150upx;
			margin-left: 2.5%;
			// margin-bottom: 20upx;
			background-color: #FFFFFF;
			display: flex;
			white-space: normal;
			flex-wrap: wrap;

			.list1 {
				width: 20%;
				height: 50%;

				image {
					margin-left: 30%;
					width: 70upx;
					height: 70upx;
				}

				view {
					text-align: center;
					font-size: 26upx;
					color: #666666;
				}
			}
		}
	}

	.last {
		margin-top: 20rpx;

		.laaa {
			display: flex;
			width: 750rpx;

			// flex-direction: ;
			.nn {
				width: 150rpx;
				height: 150upx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
			}
		}

		.title {
			height: 100upx;
			white-space: nowrap;
			overflow: hidden;

			.uni-scroll-view::-webkit-scrollbar {
				display: none;
			}

			.lt1 {
				position: relative;
				display: inline-block;
				line-height: 100upx;
				font-size: 30upx;
				margin-right: 30upx;
				margin-left: 20upx;
			}

			.lt {
				position: relative;
				display: inline-block;
				line-height: 100upx;
				font-size: 30upx;
				margin-right: 30upx;
				margin-left: 20upx;
				background: url(../../static/image/in_title.png) no-repeat center bottom;
			}
		}
	}

	.view {
		display: flex;
		white-space: normal;
		flex-wrap: wrap;
		padding: 10upx 30upx 0 10upx;
		/* #ifdef APP-PLUS */
		margin-bottom: 50upx;

		/* #endif */
		.vv {
			width: 47%;
			height: 360upx;
			margin-left: 20upx;

			image {
				width: 100%;
				height: 240upx;
			}

			.cnn {
				width: 100%;
				height: 40upx;

				.one {
					float: left;
					font-size: 26upx;
					color: #666666;
					height: 40upx;
					line-height: 40upx;
				}

				.two {
					font-size: 26upx;
					float: right;
					color: #666666;
					height: 40upx;
					margin-right: 10upx;
					line-height: 40upx;
				}

				.three {
					font-size: 26upx;
					float: right;
					color: #FF5A4E;
					height: 40upx;
				}

				.label {
					margin-top: 5upx;
					width: 100upx;
					height: 34upx;
					float: right;
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

			.cnm {
				color: #333333;
				height: 40upx;
				font-size: 32upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
			position: relative;

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


	//筛选
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

	//头部
	/* #ifdef APP-PLUS || MP-WEIXIN*/
	.top {
		width: 100%;
		height: 160upx;
		top: 0;
		left: 0;
		position: fixed;
		width: 100%;
		background: #c9161e;
		z-index: 999999;
		display: flex;
		padding-top: 60upx;

		.left {
			margin-top: 30upx;
			margin-left: 30upx;
			width: 20%;
			height: 70upx;
			display: inline-block;

			image {
				width: 40upx;
				height: 40upx;
			}
		}

		.center {
			margin-top: 10upx;
			width: 100%;
			height: 66upx;
			padding-left: 130upx;
			box-sizing: border-box;
			display: inline-block;

			image {
				width: 200upx;
				height: 50upx;
			}
		}

		.right {
			float: right;
			margin-top: 30upx;
			width: 20%;
			height: 70upx;
			display: inline-block;

			image {
				float: right;
				width: 40upx;
				height: 40upx;
			}
		}
	}

	.imageContainer {
		width: 710upx;
		height: 300upx;
		margin: 160upx auto 0;
	}

	/* #endif */
</style>