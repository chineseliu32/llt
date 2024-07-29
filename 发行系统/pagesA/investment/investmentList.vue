<template>
	<view class="ttttt">
		<!-- <topSearch headNavigationTitle="项目详情" @fan="fan"></topSearch> -->
		<!--顶部搜索导航栏-->


		<view class="conter">
			<view class="last">
				<rf-search-bar @link="navToIndex" @search="handleSearchProductList" :icon="'iconxiatubiao--copy'"
					:title="' '" :value="value" :inputDisabled="true" :headerShow="headerShow"
					:placeholder="hotSearchDefault" />
			</view>
			<!--分类栏目-->
			<view v-if="isShowNavBar" class="navbar" :style="{top: navBarTop}">
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
				<view class="nav-item" :class="{current: filterIndex === 4}" @tap="tabClick(4)">
					<text>数量</text>
					<view class="p-box">
						<i :class="{active: priceOrder === 1 && filterIndex === 4}" class="iconfont iconshang"></i>
						<i :class="{active: priceOrder === 2 && filterIndex === 4}" class="iconfont iconshang xia"></i>
					</view>
				</view>
				<!--  <view class="nav-item" :class="{current: filterIndex === 2}" @tap="tabClick(2)">
			    匹配
			  </view>-->
		<!-- 		<i class="cate-item iconfont iconshouhoufuwu-zidongpingjia" hover-class="word-btn--hover"
					:hover-start-time="20" :hover-stay-time="70" @click="createTihuo()" title="新建提货申请"></i> -->
				<i class="cate-item iconfont iconfenlei1" hover-class="word-btn--hover" :hover-start-time="20"
					:hover-stay-time="70" @click="showDrawer('showRight')"></i>

			</view>
			<!-- 筛选内容 -->
			<view class="example-body">
				<uni-drawer ref="showRight" mode="right" @change="change($event,'showRight')">
					<view class="scroll-view">
						<scroll-view class="scroll-view-box" scroll-y="true">
							<view class="shaitop">
								筛选
							</view>
							<view class="one">
								<view class="one1">
									状态
								</view>
								<view class="one2">
									<view class="one22" :class="{'back':state=='1'}" @click="clickstate(1)">
										审核中
									</view>
									<view class="one22" :class="{'back':state=='2'}" @click="clickstate(2)">
										已发货
									</view>
									<view class="one22" :class="{'back':state=='0'}" @click="clickstate(0)">
										全部
									</view>

								</view>
							</view>

							<!-- <view class="info-content" v-for="item in 10" :key="item">
								<text>可滚动内容 {{item}}</text>
							</view> -->
							<view class="close">
								<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20"
									:hover-stay-time="70" @click="closeDrawer('showRight')"><text
										class="word-btn-white">重置</text></view>
								<view class="word-btn" hover-class="word-btn--hover" :hover-start-time="20"
									:hover-stay-time="70" @click="ok('showRight')"><text
										class="word-btn-white">确定</text></view>
							</view>
						</scroll-view>
					</view>
				</uni-drawer>
			</view>
			<!-- 循环列表 -->
			<view class="none" v-for="(item,index) in indexlist" :key="index" @click="xiang(item.id)">
				<view class="cone">
					<view class="left">
						<image :src="item.img_urls[0]" mode=""></image>
					</view>
					<view class="right">
						<view class="tpp">
							<view class="one">
								{{item.project_name}}
							</view>

						</view>
						<view class="label">
							{{item.state==1?"审核中":"已发货"}}
						</view>
						<!-- <view class="label">
							火锅
						</view> -->
						<view class="num">
							<text class="o1">{{item.investment_limit}}份</text>
							<text class="o2">可提数量:{{item.investment_limit}}</text>
							<text class="o3">{{item.listing_start_time | time}}</text>
							<text class="o2"></text>
						</view>

					</view>
				</view>

			</view>
			<view class="conter" v-if="this.indexlist == ''">
				<!-- <view class="conter" v-show="isshow"> -->
				<view class="image" align="center">
					<image src="../../static/image/newsno.png" mode=""></image>
				</view>
				<view class="xx">
					暂无项目
				</view>
			</view>
		</view>
	<view class="foot">
		 
			<button class="confirm-btn" @click="createTihuo()">新建提货申请</button>
 
	</view>
	
	</view>
</template>

<script>
	import rfSearchBar from '@/components/rf-search-bar/rf-search-bar';
	import uniRate2 from '@/components/rf-foot/rf-foot.vue'
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import topSearch from "@/components/rf-top/rf-top.vue"
	import {
		projectFinancingLoangetPageListApi,
		allUserEnum,
		shaixuan,
		shailist,
		hangyeId,
		investList
	} from "@/api/user.js";
	import moment from '@/utils/moment';
	export default {
		components: {
			topSearch,
			uniRate,
			RenDropdownFilter
		},
		data() {
			return {
				value: '',
				showRight: false,
				navBarTop: "100upx",
				filterIndex: 0,
				isShowNavBar: true,
				cateMaskState: 0, //分类面板展开状态
				headerShow: true,
				cateList: [],
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				salesOrder: 0, //1 时间从低到高 2价格从高到低
				in_lst: 1,
				in_lest: '1',
				keyword: "",
				filterParams: '',
				goodsList: [], // 商品列表
				hotSearchDefault: '请输入关键字',
				filterData: [
					[{
						text: '排序',
						value: ''
					}, {
						text: '时间降序',
						value: 1
					}, {
						text: '时间升序',
						value: 2
					}, {
						text: '金额升序',
						value: 3
					}, {
						text: '金额降序',
						value: 4
					}],
					[{
						text: '全部类型',
						value: ''
					}, {
						text: '类型1',
						value: 1
					}, {
						text: '类型2',
						value: 2
					}, {
						text: '类型3',
						value: 3
					}]
				],
				defaultIndex: [0, 0],
				indexlist: [],
				indexlist1: [],
				labelList: [],
				leixinlist: [], //类型
				biaoqianlist: [], //标签
				leixinflag: "", //融资类型类型选中的标记
				leixin: "",
				biaoqianflag: "", //标签选中的标记
				biaoqian: "", //标签
				priceflag: "", //金额选中的标记
				minprice: "", //
				maxprice: "", //
				hangyelist: [], //行业分类
				hangye: "请选择",
				tradeTypeId: "", //行业id
				height: false,
				hid: -1,
				city: [], //地区数据
				cityid: "", //城市id
				cityname: "请选择",
				type3show: -1,
				type2show: -1,
				type1show: -1,
				type0show: false,
				num: 0,
				jiazaiFlag: true,
				state: 0
			}
		},
		filters: {
			// 时间格式化
			time(val) {
				// return moment(val).format('YYYY-MM-DD HH:mm')
				return moment(val).format('YYYY-MM-DD')
			},
			ttt(val) {
				// return moment(val).Math.ceil(val)
				return Math.ceil(val)
			},
			tttt(val) {
				// return val.slice(0,val.length-1)
				return val.split(",").join("")
			},
			// 计算评论与追评时间
			againDay(val) {
				const day = moment(val.again_addtime * 1000).format('DD') - moment(val.created_at * 1000).format('DD');
				return day ? `${day}天后追加` : '当天追加'
			}
		},
		onLoad(options) {
			this.initData(options);
			// this.initData1();
			this.getinfo()
			this.initData3();
			this.getShaiXuan()
			this.getShaiXuan1();
		},
		//触底加载
		onReachBottom() {
			if (this.jiazaiFlag) {
				this.getinfo()
			}
		},
		onShow() {
			if (navigator) {
				this.headerTop = document.getElementsByTagName('uni-page-head')[0] && document.getElementsByTagName(
					'uni-page-head')[0].offsetHeight + 'px';
			}
		},
		onNavigationBarButtonTap(e) {
			if (this.showLeft) {
				this.$refs.showLeft.close()
			} else {
				this.$refs.showLeft.open()
			}
		},
		// app端拦截返回事件 ，仅app端生效
		onBackPress() {
			if (this.showRight || this.showLeft) {
				this.$refs.showLeft.close()
				this.$refs.showRight.close()
				return true
			}
		},
		methods: {
			//展开洲
			zhoushow() {
				this.type0show = true
			},
			//展开国家
			guoshow(id) {
				if (this.type1show != id) {
					this.type1show = id
				} else {
					this.type1show = -1
				}
			},
			//展开省
			shengshow(id) {
				if (this.type2show != id) {
					this.type2show = id
				} else {
					this.type2show = -1
				}
			},
			//点击展开市的选项
			shishow(id) {
				if (this.type3show != id) {
					this.type3show = id
				} else {
					this.type3show = -1
				}
			},
			hyShow() {
				if (this.height == true) {
					this.height = false
				} else {
					this.height = true
				}

			},
			hyidshow(id) {
				this.hid = id
			},

			// 搜索项目列表
			handleSearchProductList(e) {
				this.jiazaiFlag = true;
				this.num = 0;
				this.indexlist = [];
				this.leixin = "";
				this.leixinflag = ""
				this.minprice = "";
				this.maxprice = "";
				this.biaoqianflag = "";
				this.tradeTypeId = "";
				this.cityid = "";
				this.hangye = "请选择";
				this.cityname = "请选择";
				this.cityid = "";
				this.filterIndex = "";
				this.keyword = e.searchValue;
				this.getinfo();
			},
			xiang(type) {
				if (!uni.getStorageSync("userNum")) {
					uni.reLaunch({
						// #ifndef MP-WEIXIN
						url: '/pages/login/login'
						// #endif
						// #ifdef MP-WEIXIN
						url: "/pages/login/wxlogin"
						// #endif
					})
				} else {
					if (uni.getStorageSync("userNum").memberFeeIsOpen == 0) {
						uni.navigateTo({
							url: '../details/details6?id=' + type
						})
					} else if (uni.getStorageSync("userNum").memberFeeIsOpen == 1) {
						if (uni.getStorageSync("userNum").isFeeMember == "" || uni.getStorageSync("userNum").isFeeMember ==
							0) {
							uni.showToast({
								title: "缴费会员才查看详情",
								icon: "none",
								duration: 1500,
								mask: true
							})
							setTimeout(() => {
								uni.navigateTo({
									url: "../../pages/my/pay?type=" + uni.getStorageSync("userNum")
										.userType
								})
							}, 1500)
						} else {
							uni.navigateTo({
								url: '../details/details6?id=' + type
							})
						}
					}
				}

			},
			confirm() {},
			// 打开窗口
			showDrawer(e) {
				this.$refs[e].open()
			},

			// 抽屉状态发生变化触发
			change(e, type) {
				console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
				this[type] = e
			},
			getProductList() {
				this.$get(`${projectFinancingLoangetPageListApi}`, {
					projectName: this.keyword
				}).then(r => {
					// console.log(r)
					this.indexlist = r.result.list
					// console.log(this.indexlist)
				}).catch((err) => {
					console.log(err)
				});
			},
			// 初始化数据
			initData(options) {
				if (navigator) {
					this.headerTop = document.getElementsByTagName('uni-page-head')[0] && document.getElementsByTagName(
						'uni-page-head')[0].offsetHeight + 'px';
				}

				// #ifdef APP-PLUS || MP-WEIXIN
				const res = uni.getSystemInfoSync();

				this.navBarTop = 2 * (res.statusBarHeight) + 100 + "rpx"
				// #endif


				this.cateId = options.cate_id;
				if (options.params) {
					this.cateParams = JSON.parse(options.params);
					if (this.cateParams.guessYouLike === 1) {
						this.isShowNavBar = false;
						this.contentTop = '18upx';
						this.getGuessYouLikeList();
						return;
					}
				}
				this.keyword = options.keyword;
				this.hotSearchDefault = options.keyword;
				if (!this.keyword) {
					this.hotSearchDefault = uni.getStorageSync('hotSearchDefault')
				}
			},
			initData1() {
				this.$get(`${projectFinancingLoangetPageListApi}`).then(r => {
					// console.log(r)
					this.indexlist = r.result.list
					console.log(this.indexlist)
				}).catch((err) => {
					console.log(err)
				});
			},
			initData2() {
				this.$get(`${projectFinancingLoangetPageListApi}`, {
					orderType: this.filterParams
				}).then(r => {
					// console.log(r)
					this.indexlist = r.result.list
					// console.log(this.indexlist)
				}).catch((err) => {
					console.log(err)
				});
			},
			//获取列表数据
			async getinfo() {
				this.num++;
				let data = {};
				data.pageNum = this.num
				data.userId = uni.getStorageSync("userNum").id
				if (this.leixin != "") {
					data.financingMode = this.leixinflag
				}
				if (this.minprice != "") {
					data.financingStart = this.minprice
				}
				if (this.maxprice != "") {
					data.financingEnd = this.maxprice
				}
				if (this.biaoqianflag != "") {
					data.projectLabel = this.biaoqianflag
				}
				if (this.tradeTypeId != "") {
					data.tradeTypeId = this.tradeTypeId
				}
				if (this.filterIndex != "") {
					data.orderType = this.filterParams
				}
				if (this.keyword != "" && this.keyword != undefined) {
					data.projectName = this.keyword
				}
				if (this.cityid != "") {
					data.city = this.cityid
				}
				if (this.state != 0) {
					data.state = this.state
				}

				let r = await this.get(allUserEnum);
				let labellist = r.result.labelList.list;
				let res = await this.get(investList, data);
				console.log(res);
				if (res.code == 0) {
					let data = res.result.list;
					if (data.length < 10) {
						this.jiazaiFlag = false;
					}
					data.forEach(item => {
						item.label = [];
						if (item.project_label) {
							item.project_label.split(",").forEach(it => {

								labellist.forEach(i => {
									if (i.id == it) {
										item.label.push(i)
									};
								})
							})
						}
						this.indexlist.push(item)
					})
				} else {
					this.code(res)
				}

				console.log(res)
			},
			initData3() {
				this.$get(`${allUserEnum}`).then(r => {
					// console.log(r)
					this.indexlist1 = r.result
					this.labelList = r.result.labelList.list;
					// console.log(this.indexlist1)
					// console.log(this.labelList)
				}).catch((err) => {
					// console.log(err)
				});
			},
			// 获取商品分类
			async getProductCate() {
				await this.$get(`${productCate}`).then(r => {
					this.cateList = r.data
					this.cateList.unshift({
						title: '全部商品',
						id: ''
					})
				})
			},
			// 获取筛选的融资和标签和城市
			async getShaiXuan() {
				let res = await this.get(shaixuan, {});
				if (res.code == 0) {
					let arr = res.result.professionalFieldTreeList["2"];
					let arr1 = [];
					arr.forEach(item => {
						if (item.pid == "c2") {
							arr1.push(item)
						}
					});
					let arr2 = [];
					arr1.forEach(item => {
						item.ch = [];
						arr.forEach(it => {
							if (it.pid == item.id) {
								arr2.push(it)
							}
						});
					})
					this.leixinlist = arr2;
					// this.log("类型",this.leixinlist);
					this.biaoqianlist = res.result.labelList.list;

					let cityarr = res.result.cityTreeList;
					let crr = [];
					cityarr.forEach(item => {
						if (item.type == 0) {
							crr.push(item)
						}
					})
					crr.forEach(item => {
						item.ch = [];
						cityarr.forEach(it => {
							if (it.pid == item.id) {
								item.ch.push(it)
							}
						})
					})
					crr.forEach(item => {
						item.ch.forEach(ich => {
							if (ich.id == 1) {
								ich.ch = [];
								cityarr.forEach(it => {
									if (it.pid == 1) {
										ich.ch.push(it)
									}
								})
							}
						})
					})
					crr.forEach(item => {
						if (item.id == 5000) {
							item.ch.forEach(ich => {
								if (ich.id == 1) {
									ich.ch.forEach(i => {
										i.ch = [];
										cityarr.forEach(it => {
											if (it.pid == i.id) {
												i.ch.push(it)
											}
										})
									})
								}
							})
						}

					})
					this.city = crr;

				} else {
					this.code(res)
				}
			},
			// 获取筛选的内容的行业
			async getShaiXuan1() {
				let res = await this.get(shailist, {});
				if (res.code == 0) {
					let arr = res.result;
					let arr1 = [];
					for (let i = 0; i < 20; i++) {
						arr1.push(arr[i])
					}

					arr1.forEach(item => {
						item.ch = [];
						arr.forEach(it => {
							if (it.pid == item.id) {
								item.ch.push(it)
							}
						})
					})
					this.hangyelist = arr1;
				} else {
					this.code(res)
				}
			},
			//排序点击
			tabClick(index) {
				this.filterParams = {}
				if (this.filterIndex === index && index !== 4 && index !== 1) {
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
					this.filterParams = '';
				} else if (index === 3) {
					this.filterParams = '';
				} else if (index === 4) {
					if (this.priceOrder === 1) {
						this.filterParams = 'financingDESC'
						this.priceOrder = 2;
					} else {
						this.filterParams = 'financingASC'
						this.priceOrder = 1;
					}
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.num = 0;
				this.jiazaiFlag = true;
				this.indexlist = [];
				this.getinfo();
			},
			onSelected(res) {
				console.log(res)
			},
			dateChange(d) {
				uni.showToast({
					icon: 'none',
					title: d
				})
			},
			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},
			in_dex(type) {
				this.in_lest = type
			},
			// 跳转至搜索详情页
			toSearch() {
				uni.navigateTo({
					url: `../index/search?search=${JSON.stringify(this.search)}`
				})
			},
			// 跳转至主页
			navToIndex() {
				uni.reLaunch({
					url: `/pages/index/index`
				})
			},
			// 跳转至分类页
			toIndex() {
				uni.reLaunch({
					url: `/pages/index/index`
				})
			},
			fan() {
				uni.navigateBack({
					delta: 1
				})
			},
			list1(type) {
				this.in_lst = type
			},
			//点击筛选的类型
			zxleixing(item) {
				console.log(item)
				if (item.id == this.leixinflag) {
					this.leixinflag = "";
					this.leixin = ""
				} else {
					this.leixinflag = item.id
					this.leixin = item.text
				}
			},
			//选择行业
			xzhyid(id, name) {
				console.log(id, name)
				this.height = false;
				this.hid = -1;
				this.hangye = name;
				this.tradeTypeId = id;
			},
			//点击筛选的标签
			biaoqin(item) {
				if (item.id == this.biaoqianflag) {
					this.biaoqianflag = ""
				} else {
					this.biaoqianflag = item.id
				}
			},
			//点击价格
			price(min, max) {
				if (min == this.priceflag) {
					this.priceflag = "";
					this.maxprice = "";
					this.minprice = "";
				} else {
					if (max == "") {
						max = 1000000000000000000000000000
					}
					this.priceflag = min;
					this.maxprice = max;
					this.minprice = min;
				}
			},
			//点击状态
			clickstate(item) {
				this.state = item;
			},
			//选择地区
			xzcityid(item) {
				this.type0show = false;
				console.log(item);
				this.cityid = item.id;
				this.cityname = item.text;
			},
			ok(e) {
				this.num = 0;
				this.$refs[e].close()
				let data = {};
				if (this.leixin != "") {
					data.financingMode = this.leixinflag
				}
				data.state = this.state;

				if (this.keyword != "") {
					data.projectName = this.keyword
				}

				console.log(data);
				this.indexlist = [];
				this.getinfo()
			},
			//点击重置
			closeDrawer(e) {
				this.leixin = "";
				this.leixinflag = ""
				this.minprice = "";
				this.maxprice = "";
				this.biaoqianflag = "";
				this.tradeTypeId = "";
				this.cityid = "";
				this.hangye = "请选择";
				this.cityname = "请选择";
			},

			createTihuo() {
				uni.navigateTo({
					url: '../../pagesA/investment/investment'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	element.style {
		top: 0 !important;
	}

	.marl {
		margin: 0 20rpx 0 0;
		color: #333333;
		font-weight: bold;
	}

	.marr {
		margin: 0 0 0 20rpx;
		color: #333333;
		font-weight: bold;
	}

	.typebox3 {
		display: none;
	}

	.typebox2 {
		display: none;
	}

	.typebox1 {
		display: none;
	}

	.typebox {
		display: none;
	}

	.typeshow {
		display: block !important;
	}

	.type3 {
		color: #999999;
		font-size: 26rpx;
	}

	.type2 {
		color: #666666;
		font-size: 28rpx;
	}

	.type1 {
		color: #333333;
		font-size: 30rpx;
	}

	.type0 {
		color: #000000;
		font-size: 30rpx;
	}

	.height {
		display: block !important;
	}

	.back {
		background-color: #c9161e !important;
		color: #FFFFFF;

	}

	//筛选
	.navbar {
		position: fixed;
		left: 0;
		display: flex;
		width: 100%;
		height: 80upx;
		top: 150rpx;
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

	.root {
		margin-bottom: 120upx;
	}

	.xuanze {
		width: 100%;
		height: 120upx;
		display: flex;
		background-color: #F5F9FF;

		.one {
			width: 33.333%;
			text-align: center;


			.img {
				image {
					display: inline-block;
					width: 10upx;
					height: 10upx;
				}
			}
		}
	}

	//内容
	.conter {
		.last {
			margin-bottom: 110upx;

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
				background: linear-gradient(180deg, rgba(230,106,69,1) 0%,rgba(234,106,69,1) 100%);
			}
		}
	}

	/* 头条小程序组件内不能引入字体 */
	/* #ifdef MP-TOUTIAO */
	@font-face {
		font-family: uniicons;
		font-weight: normal;
		font-style: normal;
		src: url('~@/static/uni.ttf') format('truetype');
	}

	/* #endif */

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		min-height: 100%;
		height: auto;
	}

	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		overflow: hidden;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #c9161e;
	}

	.word-btn--hover {
		background-color: #e96922;
	}


	.header {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 10px 15px;
		align-items: center;
		border-top-width: 1px;
		border-top-color: #f5f5f5;
		border-top-style: solid;
		background-color: #ffffff;
	}

	.input-view {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		align-items: center;
		flex-direction: row;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 10px;
		flex: 1;
		background-color: #f5f5f5;
	}

	.uni-drawer-info {
		background-color: #ffffff;
		padding: 15px;
		padding-top: 5px;
		color: #3b4144;
	}

	.uni-padding-wrap {
		padding: 0 15px;
		line-height: 1.8;
	}

	.input {
		flex: 1;
		padding: 0 5px;
		height: 24px;
		line-height: 24px;
		font-size: 14px;
		background-color: transparent;
	}

	.close {
		padding: 15px;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 0;
	}

	.draw-cotrol-btn {
		flex: 1;
	}

	.info {
		padding: 15px;
		color: #666;
	}

	.info-text {
		font-size: 14px;
		color: #666;
	}

	.scroll-view {
		flex: 1;
	}

	/* 处理抽屉内容滚动 */
	.scroll-view-box {
		flex: 1;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;

		.shaitop {
			height: 80upx;
			line-height: 80upx;
			padding-left: 30upx;
			font-size: 32upx;
			background-color: #efeff4;
		}

		.one {
			line-height: 80upx;
			padding-left: 30upx;
			border-bottom: 10upx solid #efeff4;

			.one1 {
				.h-name {
					display: inline;
					margin-left: 20rpx;
				}
			}

			.h-box {
				display: none;

				.h-title {
					border-bottom: 2rpx #D9D9D9 solid;
					font-size: 26rpx;
				}

				.hid-box {
					display: none;

					.hcon {
						font-size: 24rpx;
						color: #666666;
						line-height: 42rpx;
					}
				}

				.show {
					display: block !important;
				}
			}

			.one2 {
				display: flex;
				text-align: center;
				flex-wrap: wrap;
				justify-content: space-between;
				padding-right: 30upx;

				.one22 {
					background-color: #efeff4;
					margin-bottom: 20upx;
					width: 30.33%;
					text-align: center;
					border-radius: 10upx;
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
	.confirm-btn{
	   width: 630upx;
	   height: 76upx;
	   line-height: 76upx;
	   border-radius: 50px;
	   margin-top: 10upx;
	   background: #c9161e;
	   color: #fff;
	   font-size: $font-lg;
	   &:after{
	     border-radius: 100px;
	   }
	 }

	.info-content {
		padding: 5px 15px;
	}
</style>