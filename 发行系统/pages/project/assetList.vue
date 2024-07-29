<template>
	<view class="ttttt">
		<!-- <topSearch headNavigationTitle="项目详情" @fan="fan"></topSearch> -->
		<view style="text-align: center;" v-if="index.length !=0">
			<image :src="index.img_url | tttt" style="width: 500upx;height: 500upx;margin: 50upx;" mode=""></image>
		</view>
		<view class="namedetail">
			<dl>
				<dt>
					<span>{{ index.project_name }}</span>
				</dt>
				<dd>
					<view class="dd_child">
						<span>持有数量：{{ amount }}<span></span></span>
					</view>
				</dd>
			</dl>
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
		<!--发布部分-->
		<!-- 发布部分 -->
		<view class="zuopin" v-if="!tokendetal">
			<p class="zuopinName">
				发布数量:
				<image style="width: 62upx; height: 8upx; position: absolute; left: 0; bottom: 0;"
					src="../../static/image/textbj.png" alt="" />
			</p>
			<input style="margin-left: 10px; width: 200px; border-bottom: solid; border-width: 1upx;" type="number"
				placeholder="请输入发布数量" name="assetCount" v-model="assetCount" @input="bindAssetCount"
				placeholder-class="place" />
		</view>
		<view class="zuopin" v-if="!tokendetal">
			<p class="zuopinName">
				发布价格:
				<image style="width: 62upx; height: 8upx; position: absolute; left: 0; bottom: 0;"
					src="../../static/image/textbj.png" alt="" />
			</p>
			<input style="margin-left: 10px; width: 200px; border-bottom: solid; border-width: 1upx;" type="number"
				placeholder="请输入发布价格" name="assetPrice" v-model="assetPrice" placeholder-class="place" />
		</view>
		<view class="zuopin" v-if="!tokendetal">
			<p class="zuopinName">
				发布说明:
				<image style="width: 62upx; height: 8upx; position: absolute; left: 0; bottom: 0;"
					src="../../static/image/textbj.png" alt="" />
			</p>
			<textarea style="margin-left: 10px;" v-model="message" rows="5" placeholder="请输入内容..."></textarea>
		</view>
		<!--发布部分end-->
		<view class="workslist">
			<p class="zuopinName">
				证书列表
				<image style="width: 62upx;
		height: 8upx;
		position: absolute;
		left: 0;
		bottom: 0;" src="../../static/image/textbj.png" alt="" />

			</p>
			<view class="layouts">
				<view class="layout">
					<view class="van-col" span="24">
						<view class="div-row" v-if="!tokendetal">
							<view class="div-row" @click="selectAll()">
								<evan-checkbox shape="square" v-model="isAllChecked">选择</evan-checkbox>
							</view>
						</view>
						<view class="div-row" v-if="tokendetal">图片</view>
						<view class="div-row">证书编号</view>
						<view class="div-row">数字证书</view>
						<view class="div-row">资产状态</view>
					</view>
					<view class="van-col" span="24" v-for="(token, index) in tokens" :key="index">
						<view class="div-row" v-if="!tokendetal">
							<view class="div-row" @click="tokenChecked(token, index)">
								<!-- || token.status==5 -->
								<evan-checkbox shape="square" :disabled="token.status==2 || token.status==5"
									:use-slot="false" v-model="token.isChecked">
								</evan-checkbox>
							</view>
						</view>
						<view class="div-row" v-if="tokendetal" style="margin: 50upx;">
							<p>
								<image :src="token.image_url" style="width: 110upx; height: 110upx" mode="">
								</image>
							</p>
						</view>

						<view class="div-row" @click="tokendetal && goToProductTokenList(token.asset_id)">
							<span :class="{'blue-text': tokendetal}">
								{{ "..." + token.asset_id.substr(-8) }}
							</span>
						</view>
						<view class="div-row" @click="goToCertificate(token.asset_id)">
							<p>
								<image style=" width: 51upx;;height: 51upx" src="../../static/image/numberboook.png"
									alt="" />
							</p>
						</view>
						<view class="div-row">{{ tokenStatusMap[token.status] || '状态未知' }}</view>
						<p>
							<image v-if="token.status == 5" style="width: 51upx; height: 51upx"
								src="../../static/image/quanyi5.png" alt="Locked" />
<!-- 							<image v-if="token.status == 3" style="width: 51upx; height: 51upx"
								src="../../static/image/quanyi5.png" alt="Locked" /> -->
							<image v-else-if="token.status == 2" style="width: 51upx; height: 51upx"
								src="../../static/image/quanyi2.png" alt="For Sale" />
							<image v-else style="width: 51upx; height: 51upx" src="../../static/image/quanyi.png"
								alt="Held" />
						</p>
					</view>
				</view>
			</view><!-- 分页 -->
			<uni-pagination :total="token_count" :current="page" @change="pagechange" pageSize="5" class="pagination" />
		</view>

		<view class="conter" v-if="index!=null">
			<view class="under">
				<view class="collect" @tap="toRegister()" style="width: 100%;">
					<image src="../../static/image/collect.png" mode=""></image>
					<text>返回列表</text>
				</view>

				<view class="right" v-if="!tokendetal && checkeditem" @click="shenqing()">
					发布
				</view>
				<view class="rightDone" v-else-if="tokendetal">
					特殊商品，无法发布
				</view>
				<view class="rightDone" v-else-if="!tokendetal">
					未选中资产，无法发布
				</view>
			</view>

		</view>
		<view class="bbb" v-show='show' @click="show=false">
			<view class="buy">
				<view class="top1">
					<image src="../../static/image/lingdang.png" mode=""></image>
				</view>
				<view class="text">
					温馨提示:
					尚未绑定银行卡，请先绑定银行卡再发布商品。
				</view>
				<button class="confirm-btn" @click="gobankcard">去绑定</button>
				<button class="confirm-btn" @click="show=false">关闭</button>
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
		productTokenListByProductId,
		gettokenSuoCanGApi,
		getteShuYongHuApi
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
				isSettleAccount: 0,
				tokendetal: false,
				tokenStatusMap: {
					1: '持有中',
					2: '挂牌中',
					5: '冻结中'
				},
				teshu: null,
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
		onLoad(option) {
			if (option.type) {
				this.flag = false
			}
			this.id = option.id;
			this.amount = option.amount;
			this.initData();
			this.getSettleAccount();
			this.getAllAssetListApi();
			this.getProductTokenListByProductId();
			this.getAssetCertifyListApi();
			uni.getStorageSync("userNum")
			if (uni.getStorageSync("userNum").userType == 1) {
				this.isguan = false
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
		methods: {
			initData() {
				console.log("初始化")
				this.$get(`${projectFinancingLoangetById}`, {
					id: this.id,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					console.log(r)
					this.index = r.result
					// if (r.result.recommended_stars == null) {
					// 	//this.$refs.rateStar.valueSync = 0
					// } else {
					// 	//this.$refs.rateStar.valueSync = r.result.recommended_stars
					// }
					this.getlist();
					this.zhidingyonghu();
				// 	this.countdown2();
				}).catch((err) => {
					console.log(err)
				});
			},
			refresh() {
			  this.$router.go(0);
			},
		    zhidingyonghu() {
			  this.$get(`${getteShuYongHuApi}`, {
			    id: this.id,
			    userId: uni.getStorageSync("userNum").id,
			    userType: uni.getStorageSync("userNum").userType === 1 || uni.getStorageSync("userNum").userType === 2 ? uni.getStorageSync("userNum").userType : null
			  }).then(r => {
			    this.teshu = r.result
			    console.log(this.teshu)
			    if(this.teshu != uni.getStorageSync("userNum").id){
			      this.countdown2();
			    }else{
			      console.log("这是特殊用户")
			      let selectList = null;
			      let assetIdList = [];
			      selectList = this.alltokens.filter(el => el.isChecked == false);
			      selectList.forEach(item => {
			        assetIdList.push(item.asset_id);
			      });
			      
			      const assetIdString = assetIdList.join(',');
			      
			      const teshupostData = {
			        project_name: this.index.project_name,
			        financing_limit_rmb: this.index.financing_limit_rmb,
			        project_id: this.id,
			        asset_id: assetIdString,
			        user_id: uni.getStorageSync("userNum").id
			      };
			      console.log(teshupostData)
			      let res = this.post(gettokenSuoCanGApi, teshupostData);
			      if (res.code == 0) {
			        console.log(teshures)
			        console.log("已解仓");
			        this.refresh();
			      }
			    }
			  }).catch((err) => {
			    console.log(err)
			  });
			},
			async toRegister(e) {
				uni.navigateBack({
					delta: 1
				})
			},

			fan() {
				uni.navigateBack({
					delta: 1
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
						if (res.code == 200) {
							this.$api.msg("商品发布成功。");
							uni.navigateTo({
								url: "../my/mySaleList"
							})
						}
					})
				}
			},
			queren() {
				this.isshow = false
			},
			selectAll() {
				//this.isAllChecked=!this.isAllChecked
				var list = this.tokens
				list.filter(el => el.status == 1).forEach(el => el.isChecked = this.isAllChecked)
				this.tokens = []
				this.tokens = list;
				this.alltokens.filter(el => el.status == 1).forEach(el => el.isChecked = this.isAllChecked)
				this.assetCount = this.alltokens.filter(item => item.isChecked == true).length;
				this.buyCount = this.assetCount;
				let selectList = null;
				selectList = this.tokens.find(item => item.isChecked == true);
				if (selectList != null) {
					this.checkeditem = true;
				} else {
					this.checkeditem = false;
				}
			},
			tokenChecked(token, index) {
				if (token.on_resale) {
					this.$toast("该资产正在转售");
					return;
				}
				let selectList = null;
				selectList = this.tokens.find(item => item.isChecked == true);
				const foundToken = this.alltokens.find(item => item.asset_id == token.asset_id);
				if (foundToken) {
					foundToken.isChecked = token.isChecked;
				}
				this.assetCount = this.alltokens.filter(item => item.isChecked == true).length;
				this.buyCount = this.assetCount;

				if (this.assetCount == this.listingCount) {
					this.isAllChecked = true;
				} else {
					this.isAllChecked = false;
				}

				if (selectList != null) {
					this.checkeditem = true;
				} else {
					this.checkeditem = false;
				}
				this.selected_asset_id = token.asset_id;
				this.selected_asset_index = index;
			},
			pagechange(page) {
				this.num = page.current;
				this.getAssetCertifyListApi();
			},
			async getlist() {
				this.num++;
				let data = {
					pageNum: this.num,
					applyUserId: uni.getStorageSync("userNum").id
				}
				let res = await this.get(shengqing, data);
				if (res.code == 0) {
					res.result.list.forEach(item => {
						if (item.id == this.index.id)
							this.list.push(item)
					})
				}
			},

			async getAllAssetListApi() {
				//this.num++;
				let data = {
					userId: uni.getStorageSync("userNum").id,
					productId: this.id
				}
				let res = await this.get(getAllAssetCertifyListByUserApi, data);

				if (res.code == 0) {
					this.alltokens = res.result;
					this.alltokens.forEach(el => el.isChecked = false);
					this.token_count = this.alltokens.length;
					this.listingCount = this.alltokens.filter(el => el.status == 1).length;
				}
			},
			//判断是不是特殊商品
			getProductTokenListByProductId() {
				console.log("getProductTokenListByProductId")
				this.$get(`${productTokenListByProductId}`, {
					productId: this.id,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					console.log(r.result);
					if (r.result) {
						this.tokendetal = true
					}
				}).catch((err) => {
					console.log(err)
				});

			},
			//取证书列表
			getAssetCertifyListApi() {
				this.$get(`${getAssetCertifyListApi}`, {
					pageNum: this.num,
					userId: uni.getStorageSync("userNum").id,
					productId: this.id
				}).then(r => {
					if (r.code == 0) {
						console.log("getAssetCertifyListApi")
						this.tokens = [];
						r.result.list.forEach(item => {
							this.tokens.push(item)
						})
						this.tokens.forEach(el => el.isChecked = this.alltokens.find(item => item.asset_id == el
								.asset_id)
							.isChecked)
					}

				}).catch((err) => {
					console.log(err)
				});

			},

			// 倒计时方法
			countdown() {
				// 目标日期时间戳
				const end = Date.parse(new Date(this.index.listing_start_time))
				// 当前时间戳
				const now = Date.parse(new Date())
				// 相差的毫秒数
				const msec = end - now

				//   console.log(msec)
				if (msec < 0) return

				// 计算时分秒数
				let day = parseInt(msec / 1000 / 60 / 60 / 24)
				let hr = parseInt((msec / 1000 / 60 / 60))
				let min = parseInt((msec / 1000 / 60) % 60)
				let sec = parseInt((msec / 1000) % 60)
				// 个位数前补零
				this.day = day
				this.hr = hr > 9 ? hr : '0' + hr
				this.min = min > 9 ? min : '0' + min
				this.sec = sec > 9 ? sec : '0' + sec
				// 赋值
				const that = this
				if (min >= 0 && sec >= 0) {
					//倒计时结束关闭订单
					if (min == 0 && sec == 0) {
						this.begin = true;
						return
					}
					// 一秒后递归
					setTimeout(function() {
						that.countdown()
					}, 1000)
				}
			},
			// 倒计时方法
			countdown2() {
				//停售时间
				const deadline = Date.parse(new Date(this.index.deadline_for_listing))
				//发售时间
				const start = Date.parse(new Date(this.index.listing_start_time))
				// 当前时间戳
				const current = Date.parse(new Date())

				if (current >= start && current <= deadline) {
					this.salestatus = 1;
				} else if (current < start) {
					this.salestatus = 0;
				} else if (current > deadline) {
					this.salestatus = 2;
				}

				// 目标日期时间戳
				const end = Date.parse(new Date(this.index.deadline_for_listing))
				// 当前时间戳
				const now = Date.parse(new Date())
				// 相差的毫秒数
				const msec = end - now

				//   console.log(msec)
				if (msec < 0) return

				// 计算时分秒数
				let day = parseInt(msec / 1000 / 60 / 60 / 24)
				let hr = parseInt((msec / 1000 / 60 / 60))
				let min = parseInt((msec / 1000 / 60) % 60)
				let sec = parseInt((msec / 1000) % 60)
				// 个位数前补零
				this.day2 = day
				this.hr2 = hr > 9 ? hr : '0' + hr
				this.min2 = min > 9 ? min : '0' + min
				this.sec2 = sec > 9 ? sec : '0' + sec
				// 赋值
				const that = this
				if (min >= 0 && sec >= 0) {
					//倒计时结束关闭订单
					if (min == 0 && sec == 0) {
						this.begin = true;
						return
					}
					// 一秒后递归
					setTimeout(function() {
						that.countdown2()
					}, 1000)
				}
			},
			gobankcard() {
				uni.navigateTo({
					url: '../../pages/my/mybank'
				})
			},
			getSettleAccount() {
				this.$get(`${getUserAdapaySettleAccount}`, {
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					if (r.code == 0) {
						if (r.result.length > 0) {
							this.isSettleAccount = 1
						}
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			bindAssetCount(e) {
				let selectList = null;
				selectList = this.tokens;
				this.tokens = [];
				let count = parseInt(e.detail.value);
				if (count > this.listingCount) {
					this.assetCount = 0;
					this.$api.msg("发布数量不能超过可挂牌数量:" + this.listingCount);
					this.alltokens.filter(el => el.isChecked == true).forEach(el => el.isChecked = false);
					selectList.forEach(el => el.isChecked = this.alltokens.find(item => item.asset_id == el.asset_id)
						.isChecked);
					this.tokens = selectList;
				} else {
					for (var i = 0; i < this.assetCount; i++) {
						this.alltokens.filter(el => el.status == 1)[i].isChecked = true;
					}
					selectList.forEach(el => el.isChecked = this.alltokens.find(item => item.asset_id == el.asset_id)
						.isChecked);
					this.tokens = selectList;
				}
				if (this.assetCount == this.listingCount) {
					this.isAllChecked = true;
				}
				selectList = this.tokens.find(item => item.isChecked == true);
				if (selectList != null) {
					this.checkeditem = true;
				} else {
					this.checkeditem = false;
				}
			},
			goToProductTokenList(asset_id) {
				uni.navigateTo({
					url: './producttokenlist?asset_id=' +
						asset_id
				});
			},
			goToCertificate(asset_id) {
				uni.navigateTo({
					url: './certificate?asset_id=' +
						asset_id +
						"&product_id=" +
						this.id
				});

			},
			// 下载文件
			oneClickDownload(url) {
				console.log(url + ",")
				// 下载文件资源到本地
				uni.downloadFile({
					url: url, // 后端返回的线上文件路径
					success: function(res) {
						if (res.statusCode === 200) {
							// 文件到本地
							uni.saveFile({
								tempFilePath: res.tempFilePath, //临时路径
								success: function(data) {
									var savedFilePath = data.savedFilePath
									console.log(data);
									// 在app端执行
									// #ifdef APP-PLUS
									let osname = plus.os.name
									// 如果是安卓的话弹出提示
									if (osname == 'Android') {
										uni.showToast({
											icon: 'none',
											mask: true,
											title: '保存成功',
											duration: 1000
										})
									}
									// #endif
									//ios手机直接打开文件，手动存储文件到手机，Android手机从根目录创建文件夹，保存文件并改名
									setTimeout(() => {
										//打开文档查看
										uni.openDocument({
											filePath: data.savedFilePath,
											success: function(ress) {
												console.log("成功打开文件")
											},
											fail() {
												console.log("打开文件失败")
											}
										})
									}, 1000)
								}
							})
							console.log('下载成功');
						}
					},
					fail: function(res) {
						console.log(res.errMsg);
					},
					complete: function(res) {
						console.log(res.statusCode);
					},
					progress: function(res) {
						console.log('下载进度' + res.progress);
					}
				});
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

	.blue-text {
		color: blue;
		/* 蓝色字体 */
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
		box-shadow: 0upx 0upx 12upx 0upx #efeff6;
		border-radius: 2upx;

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