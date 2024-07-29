<template>
	<view class="container">
		<!-- 头部 -->
		<!-- <view class="top">
			<view class="title">
				发布投资/贷款项目
				<view class="fan" @click="fan()">
					<image src="../../static/image/fanhuizuo.png" mode=""></image>
				</view>
			</view>
			
		</view> -->
		<form @submit="toRegister">

			<view class="ui-all">

				<!-- step 1-->
				<view class="step" v-show="1==1">
					<view class="ui-list" style="display: none;">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text>
						<easy-upload :dataList="imageListData" :uploadUrl="$uploadUrl" :types="category"
							:deleteUrl="$uploadUrl" :uploadCount="10" @successImage="successImage"
							class="one"></easy-upload>
					</view>
					<view class="ui-list right city">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">提货商品:</text>
						<lb-picker @confirm="ronzi" :list="leixinlist" :mode="selector" :level="level">
							<view class="cityname">{{projectName}}</view>
						</lb-picker>
					</view>
					<!-- 资产列表 -->
					<view class="workslist">
						<view class="workslist" v-if="tokendetal">
							<view class="ui-list right">
								<text class="two"></text>
								<text style="color: #FF0000;">*</text>
								<text class="one">持有资产:</text>
								<text>请勾选</text>
							</view>
							<view class="layouts">
								<view class="layout">
									<view class="van-col" span="24">
										<view class="div-row">
											<view class="div-row" @click="selectAll()">
												<evan-checkbox shape="square" v-model="isAllChecked">选择</evan-checkbox>
											</view>
										</view>
										<view class="div-row">图片</view>
										<view class="div-row">证书编号</view>
										<view class="div-row">数字证书</view>
										<view class="div-row">资产状态</view>
									</view>
									<view class="van-col" span="24" v-for="(token, index) in tokens" :key="index">
										<view class="div-row">
											<view class="div-row" @click="tokenChecked(token, index)">
												<evan-checkbox shape="square" :disabled="token.status==2"
													:use-slot="false" v-model="token.isChecked">
												</evan-checkbox>
											</view>
										</view>
										<view class="div-row" style="margin: 50upx;">
											<p>
												<image :src="token.image_url" style="width: 110upx; height: 110upx"
													mode="">
												</image>
											</p>
										</view>
										<view class="div-row"
											@click="tokendetal && goToProductTokenList(token.asset_id)">
											<span :class="{'blue-text': tokendetal}">
												{{ "..." + token.asset_id.substr(-8) }}
											</span>
										</view>
										<view class="div-row" @click="goToCertificate(token.asset_id)">
											<p>
												<image style=" width: 51upx;;height: 51upx"
													src="../../static/image/numberboook.png" alt="" />
											</p>
										</view>
										<view class="div-row">{{ (token.status==1?"持有中":"挂牌中") }}</view>
										<p>
											<image v-if="token.status==2" style=" width: 51upx;;height: 51upx"
												src="../../static/image/quanyi2.png" alt="" />
											<image v-else style=" width: 51upx;height: 51upx"
												src="../../static/image/quanyi.png" alt="" />
										</p>
										</p>
									</view>
								</view>
							</view>
							<uni-pagination :total="token_count" :current="page" @change="pagechange" pageSize="5"
								class="pagination" />
						</view>
					</view>
					<!-- 选择地址 -->
					<view class="ui-list right city">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">选择地址:</text>
						<lb-picker @confirm="getaddress" :list="addressList" :mode="selector" :level="level">
							<view class="cityname">{{addressName}}</view>
						</lb-picker>
					</view>
					<view class="ui-list">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">收货人姓名:</text>
						<input type="text" placeholder="请填写收件人姓名" name="recipientName" :value="recipientName"
							@input="bindrecipientName" placeholder-class="place" />
					</view>
					<view class="ui-list">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">收货人手机:</text>
						<input type="number" :placeholder="value2" name="recipientPhone" :value="recipientPhone"
							@input="bindrecipientPhone" placeholder-class="place" />
					</view>
				</view>
				<!-- <view class="ui-list right">
				<text class="two"></text>
				<text class="one">主体性质：</text>
				<picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex">
					<view class="picker">{{sex[index].name}}</view>
				</picker> -->
				<!-- <picker @change="bindPickerChange" range-key="name" :data-index="22" :data-id="sex[index].id" :value="index" :range="sex">
					<view class="uni-input">{{sex[index].name}}</view>
					 <input type="text" :value="sex[index].id" hidden/>
				 </picker> -->
				<!-- </view> -->
				<!-- step 2-->
				<view class="step" v-show="2==2">
					<view class="ui-list right city">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">收货城市:</text>
						<view @click="zhoushow">{{cityname}}</view>
						<!-- <picker @change="bindDateChange" mode='selector' :value="indexx" :range="AgeEnum">
						<view class="picker">
							{{AgeEnum[indexx]}}
						</view>
					</picker> -->

					</view>
					<view class="city-box">
						<view v-for="(item,index) in city" class="typebox" :class="{'typeshow':type0show}">
							<view class="type0"><text @click="xzcityid(item)" class="marl">选择</text>{{item.text}}<text
									class="marr" @click="guoshow(item.id)">展开</text></view>
							<view v-for="(itch,inch) in item.ch" class="typebox1"
								:class="{'typeshow':type1show==item.id}">
								<view class="type1"><text @click="xzcityid(itch)"
										class="marl">选择</text>{{itch.text}}<text class="marr"
										@click="shengshow(itch.id)">展开</text></view>
								<view v-for="(iich,ii) in itch.ch" class="typebox2"
									:class="{'typeshow':type2show==itch.id}">
									<view class="type2"><text @click="xzcityid(iich)"
											class="marl">选择</text>{{iich.text}}<text class="marr"
											@click="shishow(iich.id)">展开</text></view>
									<view v-for="(ii,i) in iich.ch" class="typebox3"
										:class="{'typeshow':type3show==iich.id}">
										<view class="type3"><text @click="xzcityid(ii)"
												class="marl">选择</text>{{ii.text}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="ui-list">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">详细地址:</text>
						<input type="text" placeholder="请填写详细收货地址" name="address" :value="address" @input="bindaddress"
							placeholder-class="place" />
					</view>
					<view class="ui-list right city" style="display: ;">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">投资行业：</text>
						<!-- <picker @change="bindCooperateTypeEnumChange" mode='selector' range-key="name" :value="index1" :range="CooperateTypeEnum">
							<view class="picker">
								{{CooperateTypeEnum[index1]}}
							</view>
						</picker> -->
						<lb-picker @confirm="xzhangye" :list="hangyelist" :mode="selector" :level="level">
							<view class="cityname">{{hangyename}}</view>
						</lb-picker>
					</view>

					<!-- 判断是否为特殊商品从而控制提货数量-->
					<view class="ui-list" v-if="!tokendetal">
						<text style="color: #FF0000;">*</text><text class="one">提货数量:</text>
						<image style="margin-bottom: -10px;width: 25px;height: 25px;" src="../../static/image/plus.png"
							mode="" @click="upcount"></image>
						<input
							style="margin-left: 10px; margin-right: 10px;width: 50px; font-size: large; text-align: center; "
							type="number" placeholder="申购数量" name="buyCount" v-model="buyCount" @input="bindbuyCount"
							placeholder-class="place" />
						<image style="margin-bottom: -10px; width: 25px;height: 25px;"
							src="../../static/image/minues.png" mode="" @click="downcount"></image>
						<p style="margin-left: 10upx;margin-top: 10upx;">可提货最大数量:{{this.limitCount}}</p>
					</view>

					<view class="ui-list right city">
						<view class="two"><text class="one">提货时间:</text>
							<picker mode="date" @change="bindDateChange">
								<view class="uni-input">{{date}}</view>
							</picker>
						</view>
					</view>
					<view class="ui-list right" style="display: none;">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">投资币种：</text>
						<picker @change="bindFinancingCurrencyEnumChange" mode='selector' range-key="name"
							:value="index3" :range="FinancingCurrencyEnum">
							<view class="picker">
								{{FinancingCurrencyEnum[index3]}}
							</view>
						</picker>
					</view>
					<view class="ui-list" style="display: none;">
						<text class="two"></text>
						<text class="one">投资期限：</text>
						<input type="text" :placeholder="value2" name="investmentPeriod" placeholder-class="place" />
					</view>
					<view class="ui-list right" style="display: none;">
						<text class="two"></text>
						<text class="one">项目收益率：</text>
						<picker class="picker1" @change="bindInvestableIncomeEnumChange" mode='selector'
							range-key="name" :value="index10" :range="InvestableIncomeEnum">
							<view class="picker">
								{{InvestableIncomeEnum[index10]}}
							</view>
						</picker>
					</view>
					<view class="ui-list right" style="display: none;">
						<text class="two"></text>
						<text class="one">投资风险度：</text>
						<picker class="picker1" @change="bindInvestableRiskEnumChange" mode='selector' range-key="name"
							:value="index9" :range="InvestableRiskEnum">
							<view class="picker">
								{{InvestableRiskEnum[index9]}}
							</view>
						</picker>
					</view>
					<view class="ui-list right" style="display: none;">
						<text class="two"></text>
						<text class="one">项目标签：</text>
						<picker class="picker1" @change="bindInvestableFundsEnumChange" mode='selector' range-key="name"
							:value="index5" :range="InvestableFundsEnum">
							<view class="picker">
								{{InvestableFundsEnum[index5]}}
							</view>
						</picker>
					</view>
					<view class="ui-list">
						<text class="two"></text>
						<text class="one">提货说明<text class="thrr">(50字以内)</text></text>
						<textarea maxlength="50" name='specialDesc' v-model="desc" placeholder="填写特殊说明事项和要求"></textarea>
					</view>
				</view>
				<!-- step 3-->
				<view class="step" v-show="2==3">
					<view>
						<text style="color: #FF0000;">*</text><text class="one">上传委托协议：</text>
						<easy-upload :dataList="imageList" :uploadUrl="$uploadUrl" :types="category"
							:deleteUrl="$uploadUrl" :uploadCount="10" @successImage="successImage1"></easy-upload>
					</view>
					<view class="ui-list right" style="display: none;">
						<text class="two"></text>
						<text class="one">委托分类：</text>
						<picker class="picker1" @change="bindTradeExperienceEnumChange" mode='selector' range-key="name"
							:value="index11" :range="weituo">
							<view class="picker">
								{{weituo[index11].name}}
							</view>
						</picker>
					</view>
					<!-- <view class="ui-list right">
					<text class="two"></text>
					<text class="one">挂牌截止时间：</text>
					<picker class="picker1" @change="bindTradeExperienceEnumChange" mode='selector' range-key="name" :value="index11" :range="TradeExperienceEnum">
						<view class="picker">
							{{TradeExperienceEnum[index11]}}
						</view>
					</picker>
				</view> -->
					<view class="ui-list right" style="display: none;">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">挂牌期限：</text>
						<picker class="picker1" @change="bindListingPeriodEnumChange" mode='selector' range-key="name"
							:value="index11" :range="ListingPeriodEnum">
							<view class="picker">
								{{ListingPeriodEnum[index18]}}
							</view>
						</picker>
					</view>
					<view class="ui-list">
						<text class="two"></text>
						<text class="one">经济人手机号：</text>
						<input type="number" :placeholder="value2" :value="mobile" name="venturePartner"
							@input="bindmobile" placeholder-class="place" />
					</view>
					<view class="ui-list right" style="display: none;">
						<text class="two"></text>
						<text class="one">推荐星级：</text>
						<picker class="picker1" @change="bindRecommendedStarsEnumChange" mode='selector'
							range-key="name" :value="index12" :range="RecommendedStarsEnum">
							<view class="picker">
								{{RecommendedStarsEnum[index12]}}
							</view>
						</picker>
					</view>
				</view>


				<view class="btn-list">
					<button class="stepbutton" @click="previousstep()" v-if="intStep>1 & 1<1">上一步</button>
					<button class="stepbutton" @click="nextstep()" v-if="intStep<totalstep & 1>1">下一步</button>
					<button class="stepbutton" formType="submit">提交</button>
				</view>

			</view>
		</form>

	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker';
	import {
		touzi,
		shailist,
		shaixuan,
		uploadFiles,
		categoryList,
		allUserEnum,
		getUserInfo,
		saveOrUpdateUserInfo,
		allProjectEnum,
		projectFinancingLoan,
		getUserAsset,
		getUserAssetListByProjectIdApi,
		getExpressAmount,
		getUserAddressById,
		getUserAddressList,
		productTokenListByProductId,
		getUserAdapaySettleAccount,
		getAllAssetCertifyListByUserApi,
		getAssetCertifyListApi,
		productTokenListBychanpinProductId,
		getAmountByUserIdProductId,
		publishProject,
		getAssetCertifyListProductApi,
		getPayInfotoken,
	} from "@/api/user.js";
	const graceChecker = require("@/common/graceChecker.js");
	import easy_upload from "@/components/easy-upload/easy-upload"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import topSearch from "@/components/rf-top/rf-top.vue"
	export default {
		components: {
			easy_upload,
			LbPicker
		},
		data() {
			return {
				date: "请选择",
				ronziname: "请选择",
				myid: '',
				paymentUrl: '',
				type: null,
				width: 100,
				height: 300,
				choosed: false,
				value2: '请填写',
				selector: "multiSelector",
				level: 2,
				sex: [{
					id: 1,
					name: '企业'
				}, {
					id: 2,
					name: '个人'
				}],
				weituo: [{
					id: 1,
					name: '独家委托'
				}, {
					id: 2,
					name: '非独家委托'
				}],
				dindex: 0,
				index: 0,
				indexx: 0,
				index1: 0,
				index2: 0,
				index3: 0,
				index4: 0,
				index5: 0,
				index6: 0,
				index7: 0,
				index8: 0,
				index9: 0,
				index10: 0,
				index11: 0,
				index12: 0,
				index18: 0,
				//投资类型
				CooperateTypeEnum: [],
				InvestablePeriodEnum: [],
				TotalAssetsEnum: [],
				FinancingCurrencyEnum: [],
				//金融资产
				FinancialAssetsEnum: [],
				//可投资资金//
				InvestableFundsEnum: [],
				//投资地区
				//投资经验
				TradeExperienceEnum: [],
				//挂牌期限
				ListingPeriodEnum: [],
				//风险
				InvestableRiskEnum: [],
				//收益率
				InvestableIncomeEnum: [],
				//推荐星级
				RecommendedStarsEnum: [],
				avater: '',
				description: '',
				url: '',
				nickName: '',
				address: '',
				recipientPhone: '',
				recipientName: '',
				mobile: '',
				headimg: '',
				index_list: [],
				index_list1: [],
				userlist: [],
				imageList: [],
				imageListData: [],
				AgeEnum: [],
				category: 'image',
				labelData: [],
				leixinlist: [], //持有商品，
				addressList: [],
				city: [],
				financingModeName: "",
				label: 10,
				hangyelist: [], //行业list
				hangyeId: '',
				hangyename: '请选择',
				projectName: '请选择',
				addressName: '请选择',
				buyCount: 0,
				limitCount: 0,
				totalExpress: 0,
				projectId: 0,
				cityname: "可选择洲，国家，省，市",
				cityid: '',
				cityType: "",
				type3show: -1,
				type2show: -1,
				type1show: -1,
				type0show: false,
				num: 0,
				zd: [{
					id: 1,
					name: '否'
				}, {
					id: 2,
					name: '是'
				}],
				logoList: [],
				icon: "icon",
				intStep: 1,
				totalstep: 3,
				tokendetal: false,
				tokenname: '请选择',
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
				tokennum: 0,
				selectedToken: "", // 存储当前选中的商品证书对象
				desc: '',
				selectedTokens: [],
				assetIdtoken: '',
				tokenListVisible: false,
			}
		},
		onLoad() {
			this.initData()
			this.initData1()
			this.initData2()
			this.getShaiXuan()
			this.getShaiXuan1()
			this.getlist()
			this.getAddresslist()
			uni.getStorageSync("userNum")
			this.getSettleAccount();
			// this.getAllAssetListApi();
			// this.getSettleAccount();
			// this.getAllAssetListProductApi();
			// this.getAssetCertifyListProductApi();
			this.getAssetCertifyListApi();
			// this.getProductTokenListByProductId();
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
			//
			initData() {
				this.$get(`${allUserEnum}`).then(r => {
					this.index_list = r.result;
					this.AgeEnum = Object.values(this.index_list.BusinessAreaEnum);
					this.InvestablePeriodEnum = Object.values(this.index_list.InvestablePeriodEnum);
					this.InvestableRiskEnum = Object.values(this.index_list.InvestableRiskEnum);
					this.InvestableIncomeEnum = Object.values(this.index_list.InvestableIncomeEnum);
					this.TradeExperienceEnum = Object.values(this.index_list.TradeExperienceEnum);
					this.TotalAssetsEnum = Object.values(this.index_list.TotalAssetsEnum);
					this.FinancialAssetsEnum = Object.values(this.index_list.FinancialAssetsEnum);
					let data = r.result.labelList.list;
					this.labelData = data;
					data.forEach(item => {
						this.InvestableFundsEnum.push(item.labelName)
					})
					// this.InvestableFundsEnum = Object.values(this.index_list.InvestableFundsEnum);//
					this.CooperateTypeEnum = Object.values(this.index_list.CooperateTypeEnum);
				}).catch((err) => {
					console.log(err)
				});
			},
			//下一步
			nextstep() {
				this.intStep = this.intStep + 1
				if (this.intStep == this.totalstep) {

				}
			},
			//上一步
			previousstep() {
				this.intStep = this.intStep - 1
			},
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
			//选择地区
			xzcityid(item) {
				this.type0show = false;
				this.cityid = item.id;
				this.cityname = item.text;
				this.cityType = item.type;

			},
			//选择行业
			xzhangye(e) {
				this.hangyeId = e.item[0].id + "," + e.item[1].id;
				this.hangyename = e.item[1].text
			},
			//选择融资类型
			ronzi(e) {
				this.projectId = e.item[0].value; // 确保这里正确设置了 projectId
				this.projectName = e.item[0].label;
				// this.limitCount = e.item[0].placeholder; // 根据需要决定是否使用
				this.$get(`${getUserAssetListByProjectIdApi}`, {
					projectId: this.projectId,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					let data = r.result;
					this.limitCount = data;
					// 触发自定义事件，传递 projectId
					this.getProductTokenListByProductId(this.projectId);
					this.getAllAssetListApi(this.projectId);
					this.getAssetCertifyListApi(this.projectId);
					// this.getAssetCertifyListProductApi(this.projectId);
				// 	this.getAllAssetListProductApi(this.projectId);
				}).catch((err) => {
					console.log(err)
				});
			},
			//判断是不是特殊商品
			getProductTokenListByProductId(projectId) {
				// 使用 this.projectId 获取产品ID
				this.$get(`${productTokenListByProductId}`, {
					productId: this.projectId,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					console.log(r.result);
					if (r.result) {
						this.tokendetal = true;
					} else {
						this.tokendetal = false;
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			async getAllAssetListApi(projectId) {
				//this.num++;
				let data = {
					userId: uni.getStorageSync("userNum").id,
					productId: this.projectId
				}
				let res = await this.get(getAllAssetCertifyListByUserApi, data);
				if (res.code == 0) {
					this.alltokens = res.result;
					this.alltokens.forEach(el => el.isChecked = false);
					this.token_count = this.alltokens.length;
					this.listingCount = this.alltokens.filter(el => el.status == 1).length;
				}
			},
			//获取证书列表
			getAssetCertifyListApi(projectId) {
				 // this.tokennum = 2;
				this.$get(`${getAssetCertifyListApi}`, {
					pageNum: this.tokennum,
					userId: uni.getStorageSync("userNum").id,
					productId: this.projectId
				}).then(r => {
					if (r.code == 0) {
						console.log("getAssetCertifyListApi")
						this.tokens = [];
						r.result.list.forEach(item => {
							this.tokens.push(item);
							this.tokens = this.tokens.filter(item => item.status == 1);
						})
						this.tokens.forEach(el => el.isChecked = this.alltokens.find(item => item.asset_id == el
								.asset_id)
							.isChecked)
					}

				}).catch((err) => {
					console.log(err)
				});

			},
			pagechange(page) {
				console.log(page);
				// this.num = page.current;
				this.tokennum = page.current;
				this.getAssetCertifyListApi();
				//this.loadAssetTokens();
			},
			// getAssetCertifyListProductApi(projectId) {
			// 	this.$get(`${productTokenListBychanpinProductId}`, {
			// 		pageNum: this.num,
			// 		userId: uni.getStorageSync("userNum").id,
			// 		productId: this.projectId,
			// 	}).then(r => {
			// 		if (r.code == 0) {
			// 			console.log("productTokenListBychanpinProductId");
			// 			console.log(r);
			// 			this.tokens = []; // 初始化数组
			// 			// 使用 r.result.length 来获取数组长度
			// 			for (let i = 0; i < r.result.length; i++) {
			// 			  if (r.result[i].status == 1) {
			// 			    this.tokens.push(r.result[i]); // 只拿状态为1的数据
			// 			  }
			// 			}

			// 			// 现在遍历 tokens 数组，并设置 isChecked 属性
			// 			this.tokens.forEach(el => {
			// 				el.isChecked = this.alltokens.find(item => item.asset_id == el.asset_id)
			// 					?.isChecked;
			// 			});
						
			// 			this.tokens = this.tokens.slice(0,5)

			// 		}
			// 	}).catch((err) => {
			// 		console.log(err);
			// 	});
			// },
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
			// async getAllAssetListApi(projectId) {

			// 	//this.num++;
			// 	let data = {
			// 		userId: uni.getStorageSync("userNum").id,
			// 		productId: this.projectId,
			// 	}
			// 	let res = await this.get(getAllAssetCertifyListByUserApi, data);

			// 	if (res.code == 0) {

			// 		this.alltokens = res.result;
			// 		this.alltokens.forEach(el => el.isChecked = false);
			// 		this.token_count = this.alltokens.length;
			// 		this.listingCount = this.alltokens.filter(el => el.status == 1).length;
			// 	}
			// },

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

			getaddress(e) {
				this.addressId = e.item[0].value;
				this.address = e.item[0].label;
				//this.limitCount = e.item[0].placeholder;
				if (this.addressId == 0) {
					uni.navigateTo({
						url: '../../pages/userAddress/userAddressInfo'
					});
				}
				this.$get(`${getUserAddressById}`, {
					id: this.addressId,
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					let data = r.result;
					this.recipientName = r.result.recipient;
					this.recipientPhone = r.result.phone;
					this.cityname = r.result.city;
					this.address = r.result.address;
					this.dindex = r.result.is_default;
				}).catch((err) => {
					console.log(err)
				});
			},
			handleAddNewImage() {
				// 从相册选择图片
				const _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						_this.handleUploadFile(res.tempFilePaths);
					}
				});
			},
			// 上传图片
			handleUploadFile(data) {
				const _this = this;
				let filePath = data.path || data[0];
				console.log(filePath)
				uni.uploadFile({
					url: uploadFiles,
					filePath,
					name: 'Filedata',
					success(r) {
						//json转字符串 
						_this.paymentUrl = JSON.parse(r.data).data;
						return
						const data = JSON.parse(r.data);
						if (data.code === 200) {
							_this.profileInfo.head_portrait = data.data;
							_this.handleUpdateInfo(_this.profileInfo)
						} else {
							this.$api.msg('data.message')
						}
					}
				});
			},
			successImage(e) {
				this.imageListData.push(JSON.parse(e.data).data)
				console.log('this.imageListData', this.imageListData)

			},
			successImage1(e) {
				this.imageList.push(JSON.parse(e.data).data)

			},
			successImage2(e) {
				this.logoList.push(JSON.parse(e.data).data)
			},
			initData1() {
				this.$get(`${allProjectEnum}`).then(r => {
					this.index_list1 = r.result;
					this.FinancingCurrencyEnum = Object.values(this.index_list1.FinancingCurrencyEnum);
					this.InvestableIncomeEnum = Object.values(this.index_list1.InvestableIncomeEnum);
					this.RecommendedStarsEnum = Object.values(this.index_list1.RecommendedStarsEnum);
					this.ListingPeriodEnum = Object.values(this.index_list1.ListingPeriodEnum);
				}).catch((err) => {
					console.log(err)
				});
			},
			// 获取筛选的融资和标签和城市
			async getShaiXuan() {
				let res = await this.get(shaixuan, {});
				if (res.code == 0) {

					let arr = res.result.professionalFieldTreeList;
					let arr1 = [];
					arr.forEach(item => {
						item.value = item.id;
						item.label = item.text
						if (item.pid == "c2") {
							arr1.push(item)
						}
					});
					let arr2 = [];
					arr1.forEach(item => {
						item.children = [];
						arr.forEach(it => {
							if (it.pid == item.id) {
								item.children.push(it)
							}
						});
					})
					//this.leixinlist=arr1;

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

			async getlist() {
				this.num++;
				let res = await this.get(getUserAsset, {
					pageNum: this.num,
					userId: uni.getStorageSync("userNum").id
				});

				if (res.code == 0) {
					let data = res.result.list;
					if (data.length < 10) {
						this.flag = false;
					}
					data.forEach(item => {
						item.value = item.project_id;
						item.label = item.project_name;
						item.placeholder = item.amount;
						this.leixinlist.push(item)
					})

				} else {
					this.code(res)
				}
			},
			async getAddresslist() {
				this.num++;
				let res = await this.get(getUserAddressList);
				if (res.code == 0) {
					console.log(res)
					let data = res.result;
					if (data.length < 10) {
						this.flag = false;
					}
					data.forEach(item => {
						item.value = item.id;
						item.label = item.address;
						this.addressList.push(item)

					})

					let temp = [];
					temp.value = 0;
					temp.label = "添加...";
					this.addressList.push(temp)
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
						item.value = item.id;
						item.label = item.text;
						item.children = [];
						arr.forEach(it => {
							it.value = it.id;
							it.label = it.text;
							if (it.pid == item.id) {
								item.children.push(it)
							}
						})
					})
					this.hangyelist = arr1;
				} else {
					this.code(res)
				}
			},
			// 数据初始化
			async initData2() {
				this.userInfo = uni.getStorageSync('userNum') || {};
				this.token = uni.getStorageSync('userNum') || undefined;
				if (this.token) {
					// await this.getMemberInfo();
					if (uni.getStorageSync('cartNum')) {
						if (uni.getStorageSync('cartNum') != 0) {
							uni.setTabBarBadge({
								index: 3,
								text: uni.getStorageSync('cartNum').toString(),
							});

						} else {
							uni.removeTabBarBadge({
								index: 3
							});
						}
					} else {
						uni.removeTabBarBadge({
							index: 3
						});
					}
				} else {
					this.loading = false;
					uni.removeTabBarBadge({
						index: 3
					});
				};
				if (uni.getStorageSync("userNum").id = '') {
					return
				} else {
					this.$get(`${getUserInfo}`, {
						id: uni.getStorageSync("userNum").id
					}).then(r => {
						this.myid = r.result.id
					}).catch((err) => {
						console.log(err)
					});
				}

			},
			fan() {
				uni.navigateBack({
					delta: 1
				})
			},
			zdfn(e) {
				this.dindex = e.detail.value;
			},
			bindPickerChange(e) {
				this.index = e.target.value;
			},
			bindDateChange(e) {
				this.indexx = e.detail.value;
				this.date = e.detail.value;
			},
			bindprojectName(e) {
				this.projectName = e.detail.value;

			},
			bindrecipientName(e) {
				this.recipientName = e.detail.value;

			},
			bindrecipientPhone(e) {
				this.recipientPhone = e.detail.value;
			},
			bindaddress(e) {
				this.address = e.detail.value;
			},
			bindCooperateTypeEnumChange(e) {
				this.index1 = e.detail.value;
			},
			bindTotalAssetsEnumChange(e) {
				this.index2 = e.detail.value;
			},
			bindFinancingCurrencyEnumChange(e) {
				this.index3 = e.detail.value;

			},
			bindListingPeriodEnumChange(e) {
				this.index18 = e.detail.value;

			},
			bindFinancialAssetsEnumChange(e) {
				this.index4 = e.detail.value;

			},
			bindInvestableIncomeEnumChange(e) {
				this.index10 = e.detail.value;

			},
			bindInvestableFundsEnumChange(e) {
				this.index5 = e.detail.value;
				let ss = this.InvestableFundsEnum[this.index5]
				this.labelData.forEach(item => {
					if (item.labelName == ss) {
						this.label = item.id;
					}
				})

			},
			bindInvestablePeriodEnumChange(e) {
				this.index7 = e.detail.value;

			},

			bindInvestableRiskEnumChange(e) {
				this.index9 = e.detail.value;
			},

			bindTradeExperienceEnumChange(e) {
				this.index11 = e.detail.value;
			},
			bindRecommendedStarsEnumChange(e) {
				this.index12 = e.detail.value;
			},
			bindmobile(e) {
				this.mobile = e.detail.value;

			},
			binddescription(e) {
				this.description = e.detail.value;
			},
			avatarChoose() {
				let that = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success(res) {
						// tempFilePath可以作为img标签的src属性显示图片
						that.imgUpload(res.tempFilePaths);
						const tempFilePaths = res.tempFilePaths;
					}
				});
			},
			isPoneAvailable(poneInput) {
				var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
				if (!myreg.test(poneInput)) {
					return false;
				} else {
					return true;
				}
			},
			async toRegister(e) {
				const formData = e.detail.value;
				/* 收货人手机号格式判断 */
				if (formData.recipientPhone != "") {
					if (!(/^[1][3,4,5,7,8][0-9]{9}$/.test(formData.recipientPhone))) {
						uni.showToast({
							title: "收货人手机号格式错误",
							icon: "none",
							duration: 1500
						})
						return;
					}
				}

				//提交勾选资产
				if (this.alltokens.some(el => el.isChecked)) {
					let selectList = null;
					let assetIdList = [];
					selectList = this.alltokens.filter(el => el.isChecked == true);
					selectList.forEach(item => {
						assetIdList.push(item.asset_id);
					});
					var assetIdString = assetIdList.join(',');
				} else {
					uni.showToast({
						title: '请选择商品',
						icon: 'none'
					});
				}
				formData.specialDesc = formData.specialDesc + "(证书编号：" + assetIdString + ")"

				/* 提货数量大于0 */
				if (this.buyCount == 0) {
					uni.showToast({
						title: "请输入提货数量",
						icon: "none",
						duration: 1500
					})
					return;
				}

				const rule = [{
						name: "recipientName",
						checkType: "string",
						checkRule: "2,20",
						errorMsg: "收货人姓名最少为2个字符"
					},
					{
						name: "recipientPhone",
						checkType: "string",
						checkRule: "11,11",
						errorMsg: "收货人手机号未填写"
					},
					{
						name: "address",
						checkType: "string",
						checkRule: "1,500",
						errorMsg: "详细收货地址未填写"
					}
				];
				const checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					this.$api.msg(graceChecker.error);
					return;
				}

				let data = {};
				if (this.cityType == 0) {
					data.continent = this.cityid
				}
				if (this.cityType == 1) {
					data.country = this.cityid
				}
				if (this.cityType == 2) {
					data.province = this.cityid
				}
				if (this.cityType == 3) {
					data.city = this.cityid
				}
				let logourl = ""
				if (this.logoList.length > 0) {
					logourl = this.logoList[0]
				}
				this.get(touzi, {
					...data,
					...formData,
					projectLogoUrl: logourl,
					managingPartner: uni.getStorageSync("userNum").userPhone,
					investmentCurrency: this.index3 + 1, //币种financingCurrency
					id: this.myid,
					projectLabel: this.label, //标签
					tradeTypeId: this.hangyeId, //行业id
					// subjectNature : this.index+1,//企业或个人
					commissionClassification: this.index11 + 1, //委托
					listingPeriod: this.index18 + 1, //挂牌期限
					imgUrl: this.imageListData.toString(),
					entrustmentAgreement: this.imageList.toString(),
					recommendedStars: this.index12 + 1, //推荐星级
					investmentIncome: this.index10 + 1, //项目收益率:this.projectId,
					investmentRisk: this.index9 + 1, //项目风险度
					// financingPeriod:this.index7+1,//融资期限
					investmentMode: this.financingModeName.toString(), //投资方式
					isImportantProject: this.dindex, //是否重点项目
					investmentLimit: this.buyCount,
					investmentPeriod: this.projectId,
					projectName: this.projectName,
					listingStartTime: this.date,
					city: this.cityid
				}).then(r => {
					if (r.code == 0) {
						this.$api.msg(`提交成功`);
						this.isshow = true
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 1000);
					} else {
						this.$api.msg(r.message);
					}
				}).catch(err => {
					console.log(err)
					this.$api.msg(`系统错误,稍后重试`);

				})
			},

			upcount(e) {
				if (this.projectId == 0) {
					this.$api.msg(`请选择提货商品。`);
				} else {
					if (this.buyCount < this.limitCount) {
						this.buyCount = this.buyCount + 1;
					} else {
						this.$api.msg(`提货数量不能超过可提货最大数量:` + this.limitCount);

					}
				}
			},
			downcount(e) {
				if (this.buyCount > 0) {
					this.buyCount = this.buyCount - 1;
				}
			},
			bindbuyCount(e) {

				if (e.detail.value > this.limitCount) {
					this.buyCount = 0;
					this.$api.msg(`提货数量不能超过可提货最大数量:` + this.limitCount);
				}
			},

		},

	}
</script>

<style lang="less">
	textarea {
		margin-top: 20upx !important;
	}

	.workslist {
		width: 690upx;
		margin: 0 auto;
		margin-top: 30upx;

		.layout {
			position: sticky;
			top: 0;
			/* 当元素滚动到视口顶部时，它会固定在顶部 */
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

	.city {
		display: flex;
	}

	.cityname {
		width: 450rpx;
	}

	.uni-input {
		padding: 0 !important;
		margin-left: 20rpx;
	}

	//头部
	.top {
		width: 100%;
		height: 100upx;
		background: url(../../static/image/topbgc.png) no-repeat left 0 fixed;
		background-size: 100% 250upx;
		margin-bottom: 40upx;

		.title {
			position: relative;
			text-align: center;
			color: #FFFFFF;
			line-height: 100upx;
			font-family: PingFangSC-Regular, PingFang SC;
		}

		.fan {
			position: absolute;
			left: 18upx;
			top: 10upx;
			width: 25upx;
			height: 35upx;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	.picture {
		.upload-img {
			// background: url(../../static/image/shangchuan.png);
			background-color: #f3f3f3;
			width: 200upx !important;
			height: 200upx !important;
			margin: 0 auto;
			border-radius: 50%;
			position: relative;
			background-size: 100% 100%;
			-webkit-background-size: 100% 100%;

			.cover {
				display: inline-block;
				width: 100%;
				height: 100%;
				margin: 0 auto;
				border-radius: 50% !important;
				position: relative;
				z-index: 1;
			}

			.plusicon {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}

	.container {
		display: block;
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
</style>
