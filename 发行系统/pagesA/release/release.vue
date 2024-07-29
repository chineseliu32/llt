<template>
	<view class="container">
		<!-- 头部 -->
		<!-- <view class="top">
			<view class="title">
				发布融资/借款项目
				<view class="fan" @click="fan()">
					<image src="../../static/image/fanhuizuo.png" mode=""></image>
				</view>
			</view>
			
		</view> -->
		<form @submit="toRegister">
		<view class="ui-all">
			
		<!-- step 1-->
		<view class="step" v-show="intStep==1">

				<view class="ui-list">
								<text class="two"></text>
								<text style="color: #FF0000;">*</text>
								<easy-upload
								:dataList="imageListData" :uploadUrl="$uploadUrl" :types="category"
								:deleteUrl="$uploadUrl" :uploadCount="10"
								@successImage="successImage" class="one"
								></easy-upload>
							</view>
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">主体名称：</text>
				<input type="text" :placeholder="value2" name="projectName" :value="projectName" @input="bindprojectName" placeholder-class="place" />
			</view>
			<view class="ui-list right">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">重点项目：</text>
				<picker @change="zdfn" mode='selector' range-key="name" :value="dindex" :range="zd">
					<view class="picker">{{zd[dindex].name}}</view>
				</picker>
			</view>
			<view v-if="dindex==1">
				<text class="one">上传重点项目logo：</text>
				<easy-upload
				:dataList="logoList" :uploadUrl="$uploadUrl" :types="category"
				:deleteUrl="$uploadUrl" :uploadCount="1" :type="icon"
				@successImage="successImage2"
				></easy-upload>
			</view>	
	
			<view class="ui-list right">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">主体性质：</text>
				<picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex">
					<view class="picker">{{sex[index].name}}</view>
				</picker>
				<!-- <picker @change="bindPickerChange" range-key="name" :data-index="22" :data-id="sex[index].id" :value="index" :range="sex">
					<view class="uni-input">{{sex[index].name}}</view>
					 <input type="text" :value="sex[index].id" hidden/>
				 </picker> -->
			</view>
			<view class="ui-list right city">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">融资区域：</text>
				<view @click="zhoushow">{{cityname}}</view>
				<!-- <picker @change="bindDateChange" mode='selector' :value="indexx" :range="AgeEnum">
					<view class="picker">
						{{AgeEnum[indexx]}}
					</view>
				</picker> -->
					
			</view>
			<view class="city-box">
				<view v-for="(item,index) in city" class="typebox" :class="{'typeshow':type0show}">
					<view class="type0" ><text @click="xzcityid(item)" class="marl">选择</text>{{item.text}}<text class="marr" @click="guoshow(item.id)">展开</text></view>
					<view v-for="(itch,inch) in item.ch" class="typebox1" :class="{'typeshow':type1show==item.id}">
						<view class="type1" ><text @click="xzcityid(itch)" class="marl" >选择</text>{{itch.text}}<text class="marr" @click="shengshow(itch.id)">展开</text></view>
						<view v-for="(iich,ii) in itch.ch" class="typebox2" :class="{'typeshow':type2show==itch.id}">
							<view class="type2" ><text @click="xzcityid(iich)" class="marl" >选择</text>{{iich.text}}<text class="marr" @click="shishow(iich.id)">展开</text></view>
							<view v-for="(ii,i) in iich.ch" class="typebox3" :class="{'typeshow':type3show==iich.id}">
								<view class="type3" ><text @click="xzcityid(ii)" class="marl">选择</text>{{ii.text}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
				<view class="ui-list right city">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">所处行业：</text>
					<!-- <picker @change="bindCooperateTypeEnumChange" mode='selector' range-key="name" :value="index1" :range="CooperateTypeEnum">
						<view class="picker">
							{{CooperateTypeEnum[index1]}}
						</view>
					</picker> -->
					<lb-picker @confirm="xzhangye" :list="hangyelist" :mode="selector" :level="level"><view class="cityname">{{hangyename}}</view></lb-picker>
				</view>
				<view class="ui-list right city">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">融资方式：</text>
					<!-- <picker @change="bindTotalAssetsEnumChange" mode='selector' range-key="name" :value="index2" :range="TotalAssetsEnum">
						<view class="picker">
							{{TotalAssetsEnum[index2]}}
						</view>
					</picker> -->
					<lb-picker @confirm="ronzi" :list="leixinlist" :mode="selector" :level="level"><view class="cityname">{{ronziname}}</view></lb-picker>
				</view>
				<view class="ui-list right">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">融资币种：</text>
					<picker @change="bindFinancingCurrencyEnumChange" mode='selector' range-key="name" :value="index3" :range="FinancingCurrencyEnum">
						<view class="picker">
							{{FinancingCurrencyEnum[index3]}}
						</view>
					</picker>
				</view>
		</view>
		<!-- step 2-->
		<view class="step" v-show="intStep==2">
				<view class="ui-list ">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">融资额度<text class="thrr">(万元)</text>：</text>
					<input type="number" :placeholder="value2" name="financingLimit"  placeholder-class="place" />
				</view>
				<view class="ui-list right">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">融资期限：</text>
					<picker class="picker1" @change="bindInvestablePeriodEnumChange" mode='selector' range-key="name" :value="index7" :range="InvestablePeriodEnum">
						<view class="picker">
							{{InvestablePeriodEnum[index7]}}
						</view>
					</picker>
				</view>
			 
				<view class="ui-list">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">预计收益<text class="thrr">(%)</text>：</text>
					<input type="number" :placeholder="value2" name="expectedReturn"  placeholder-class="place" />
				</view>
				<view class="ui-list right">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">项目收益率：</text>
					<picker class="picker1" @change="bindInvestableIncomeEnumChange" mode='selector' range-key="name" :value="index10" :range="InvestableIncomeEnum">
						<view class="picker">
							{{InvestableIncomeEnum[index10]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">项目风险度：</text>
					<picker class="picker1" @change="bindInvestableRiskEnumChange" mode='selector' range-key="name" :value="index9" :range="InvestableRiskEnum">
						<view class="picker">
							{{InvestableRiskEnum[index9]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two"></text>
					<text class="one">项目标签：</text>
					<picker class="picker1" @change="bindInvestableFundsEnumChange" mode='selector' range-key="name" :value="index5" :range="InvestableFundsEnum">
						<view class="picker">
							{{InvestableFundsEnum[index5]}}
						</view>
					</picker>
				</view>
				
		</view>
				
		<!-- step 3-->
		<view class="step" v-show="intStep==3">
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">资金用途<text class="thrr">(50字以内)</text></text>
				<textarea :value="nickName" maxlength="50" name='useOfFunds' placeholder="填写本次融资的资金用途" ></textarea>
			</view>
			 
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">资金到账时间<text class="thrr">(50字以内)</text></text>
				<textarea :value="nickName" maxlength="50" name='paymentDate' placeholder="填写希望资金的到账时间" ></textarea>
			</view>
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">退出方式<text class="thrr">(100字以内)</text></text>
				<textarea :value="nickName" maxlength="100" name='exitMode' placeholder="填写投资方资金的未来退出的方式" ></textarea>
			</view>
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">项目简介<text class="thrr">(300字以内)</text></text>
				<textarea :value="nickName" maxlength="300" name='projectIntroduction' placeholder="填写融资主体的简要介绍" ></textarea>
			</view>
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">财务状况<text class="thrr">(500字以内)</text></text>
				<textarea :value="nickName" maxlength="500" name='financialSituation' placeholder="填写融资主体的主要财务指标数据和财务状况" ></textarea>
			</view>
		</view>
			
		<!-- step 4-->
		<view class="step" v-show="intStep==4">
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">股东介绍<text class="thrr">(500字以内)</text></text>
				<textarea :value="nickName" maxlength="500" name='shareholderIntroduce' placeholder="填写融资主体的简要介绍" ></textarea>
			</view>
		
		
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">管理团队<text class="thrr">(500字以内)</text></text>
				<textarea :value="nickName" maxlength="500" name='managementTeam' placeholder="填写融资主体的高管团队主要人员介绍" ></textarea>
			</view>
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">核心技术<text class="thrr">(300字以内)</text></text>
				<textarea :value="nickName" maxlength="300" name='coreTechnology' placeholder="填写融资主体的核心技术、专利、知识产权情况" ></textarea>
			</view>
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">发展规划<text class="thrr">(300字以内)</text></text>
				<textarea :value="nickName" maxlength="300" name='developmentPlanning' placeholder="填写融资主体未来三年发展规划和经营财务预测" ></textarea>
			</view>
			<view class="ui-list">
				<text class="two"></text>
				<text style="color: #FF0000;">*</text><text class="one">担保措施<text class="thrr">(300字以内)</text></text>
				<textarea :value="nickName" maxlength="300" name='guaranteeMeasures' placeholder="填写融资主体的担保措施" ></textarea>
			</view>
			</view>
			<!-- step 5-->
			<view class="step" v-show="intStep==5">
				<view>
					<text style="color: #FF0000;">*</text>
					<text class="one">上传委托协议：</text>
					<easy-upload
					:dataList="imageList" :uploadUrl="$uploadUrl" :types="category"
					:deleteUrl="$uploadUrl" :uploadCount="10"
					@successImage="successImage1"
					></easy-upload>
				</view>	
				<view class="ui-list right">
					<text class="two"></text>
					<text class="one">委托分类：</text>
					<picker class="picker1" @change="bindTradeExperienceEnumChange" mode='selector' range-key="name" :value="index11" :range="weituo">
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
				<view class="ui-list right">
					<text class="two"></text>
					<text style="color: #FF0000;">*</text><text class="one">挂牌期限：</text>
					<picker class="picker1" @change="bindListingPeriodEnumChange" mode='selector' range-key="name" :value="index11" :range="ListingPeriodEnum">
						<view class="picker">
							{{ListingPeriodEnum[index18]}}
						</view>
					</picker>
				</view>
				<view class="ui-list">
					<text class="two"></text>
					<text class="one">投资合伙人手机号：</text>
					<input type="number" :placeholder="value2" :value="mobile" name="venturePartner" @input="bindmobile" placeholder-class="place" />
				</view>
				<view class="ui-list right">
					<text class="two"></text>
					<text class="one">推荐星级：</text>
					<picker class="picker1" @change="bindRecommendedStarsEnumChange" mode='selector' range-key="name" :value="index12" :range="RecommendedStarsEnum">
						<view class="picker">
							{{RecommendedStarsEnum[index12]}}
						</view>
					</picker>
				</view>
		 		</view>
			<view class="btn-list">
			<button class="stepbutton" @click="previousstep()" v-if="intStep>1 & intStep<=totalstep" >上一步</button>
			<button class="stepbutton" @click="nextstep()" v-if="intStep<totalstep & intStep>=1">下一步</button>
			<button class="stepbutton" formType="submit" v-if="intStep==totalstep">发布</button>
			</view>

		</view>
	</form>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker';
	import {shailist,shaixuan,uploadFiles,categoryList,allUserEnum,getUserInfo,saveOrUpdateUserInfo,allProjectEnum,projectFinancingLoan} from "@/api/user.js";
	const graceChecker = require("@/common/graceChecker.js");
	import easy_upload from "@/components/easy-upload/easy-upload"
	export default {
	components:{
		easy_upload,
		LbPicker
	},
		data() {
			return {
				zd:[
				{
					id: 1,
					name: '否'
				},{
					id: 2,
					name: '是'
				}],
				dindex:0,
				ronziname:"请选择",
				myid : '',
				paymentUrl: '',
				type: null,
				width: 100,
				height : 300,
				choosed:false,
				value2: '请填写',
				selector:"multiSelector",
				level:2,
				sex:[
				{
					id: 1,
					name: '企业'
				},{
					id: 2,
					name: '个人'
				}],
				weituo:[{
					id: 1,
					name: '独家委托'
				},{
					id: 2,
					name: '非独家委托'
				}],
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
				//项目标签//
				InvestableFundsEnum: [],
				//投资地区
				//投资经验
				TradeExperienceEnum : [],
				//挂牌期限
				ListingPeriodEnum : [],
				//风险
				InvestableRiskEnum : [],
				//收益率
				InvestableIncomeEnum : [],
				//推荐星级
				RecommendedStarsEnum : [],
				avater: '',
				description: '',
				url: '',
				nickName: '',
				projectName : '',
				mobile: '',
				headimg: '',
				index_list : [],
				index_list1 : [],
				userlist : [],
				imageList: [],
				imageListData:[],
				AgeEnum : [],
				category: 'image',
				labelData:[],
				leixinlist:[],//融资类型，
				city:[],
				financingModeName:"",
				label:10,
				hangyelist:[],//行业list
				hangyeId:'',
				hangyename:'请选择',
				cityname:"可选择洲，国家，省，市",
				cityid:'',
				cityType:"",
				type3show:-1,
				type2show:-1,
				type1show:-1,
				type0show:false,
				logoList:[],
				icon:"icon",
				intStep:1,
				totalstep:5
			}

		},
		onLoad() {
			this.initData()
			this.initData1()
			this.initData2()
			this.getShaiXuan()
			this.getShaiXuan1()
			uni.getStorageSync("userNum")
			console.log(uni.getStorageSync("userNum"))
			
		},
		methods: {
			//下一步
			nextstep(){
				this.intStep=this.intStep+1
				if (this.intStep==this.totalstep)
				{
					
				}
			},
			//上一步
			previousstep(){
				this.intStep=this.intStep-1
			},
			zdfn(e){
				this.dindex=e.detail.value;
			},
			//展开洲
			zhoushow(){
				this.type0show=true
			},
			//展开国家
			guoshow(id){
				if(this.type1show!=id){
					this.type1show=id
				}else{
					this.type1show=-1
				}
			},
			//展开省
			shengshow(id){
				if(this.type2show!=id){
					this.type2show=id
				}else{
					this.type2show=-1
				}
			},
			//点击展开市的选项
			shishow(id){
				if(this.type3show!=id){
					this.type3show=id
				}else{
					this.type3show=-1
				}
			},
			//选择地区
			xzcityid(item){
				this.type0show=false;
				console.log(item);
				this.cityid=item.id;
				this.cityname=item.text;
				this.cityType=item.type;
				console.log(this.cityid,this.cityname,item.type)
			},
			//选择行业
			xzhangye(e){
				console.log(e)
				this.hangyeId=e.item[0].id+","+e.item[1].id;
				this.hangyename=e.item[1].text
				console.log(this.hangyeId)
			},
			//选择融资类型
			
			ronzi(e){
				console.log(e.item[1].text)
				this.ronziname=e.item[1].text;
				this.financingModeName=e.item[1].id;
				console.log(this.financingModeName)
			},
		handleAddNewImage () {
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
		handleUploadFile (data) {
		   const _this = this;
		   let filePath = data.path || data[0];
		console.log(filePath)
		   uni.uploadFile({
		      url : uploadFiles,
		      filePath,
		      name: 'Filedata',
		      success (r) {
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
			initData(){
				this.$get(`${allUserEnum}`).then(r => {
					console.log(r)
					this.index_list = r.result;
					this.AgeEnum = Object.values(this.index_list.BusinessAreaEnum);
					this.InvestablePeriodEnum = Object.values(this.index_list.InvestablePeriodEnum);
					this.InvestableRiskEnum = Object.values(this.index_list.InvestableRiskEnum);
					this.InvestableIncomeEnum = Object.values(this.index_list.InvestableIncomeEnum);
					this.TradeExperienceEnum = Object.values(this.index_list.TradeExperienceEnum);
					this.TotalAssetsEnum = Object.values(this.index_list.TotalAssetsEnum);
					this.FinancialAssetsEnum = Object.values(this.index_list.FinancialAssetsEnum);
					let data=r.result.labelList.list;
					this.labelData=data;
					data.forEach(item=>{
						this.InvestableFundsEnum.push(item.labelName)
					})
					console.log(this.InvestableFundsEnum)
					// this.InvestableFundsEnum = Object.values(this.index_list.InvestableFundsEnum);//
					this.CooperateTypeEnum = Object.values(this.index_list.CooperateTypeEnum);
					
					console.log(this.AgeEnum)
				}).catch((err) => {
					console.log(err)
				});
			},
			successImage(e) {
				this.imageListData.push(JSON.parse(e.data).data)
				console.log('this.imageListData',this.imageListData)

			},
			successImage1(e) {
				this.imageList.push(JSON.parse(e.data).data)
			
			},
			successImage2(e) {
				this.logoList.push(JSON.parse(e.data).data)
			},
			initData1(){
				this.$get(`${allProjectEnum}`).then(r => {
					console.log(r)
					this.index_list1 = r.result;
					this.FinancingCurrencyEnum = Object.values(this.index_list1.FinancingCurrencyEnum);
					this.InvestableIncomeEnum = Object.values(this.index_list1.InvestableIncomeEnum);
					this.RecommendedStarsEnum = Object.values(this.index_list1.RecommendedStarsEnum);
					this.ListingPeriodEnum = Object.values(this.index_list1.ListingPeriodEnum);
					// console.log(this.index_list1)
				}).catch((err) => {
					console.log(err)
				});
			},
			// 获取筛选的融资和标签和城市
			async getShaiXuan(){
				let res=await this.get(shaixuan,{});
				if(res.code==0){
					console.log(res)
					let arr=res.result.professionalFieldTreeList["1"];
					let arr1=[];
					arr.forEach(item=>{
						item.value=item.id;
						item.label=item.text
						if(item.pid=="c1"){
							arr1.push(item)
						}
					});
					let arr2=[];
					arr1.forEach(item=>{
						item.children=[];
						arr.forEach(it=>{
							if(it.pid==item.id){
								item.children.push(it)
							}
						});
					})
					this.leixinlist=arr1;
					this.log("类型",this.leixinlist);
					
					let cityarr=res.result.cityTreeList;
					let crr=[];
					cityarr.forEach(item=>{
						if(item.type==0){
							crr.push(item)
						}
					})
					crr.forEach(item=>{
						item.ch=[];
						cityarr.forEach(it=>{
							if(it.pid==item.id){
								item.ch.push(it)
							}
						})
					})
					crr.forEach(item=>{
						item.ch.forEach(ich=>{
							if(ich.id==1){
								ich.ch=[];
								cityarr.forEach(it=>{
									if(it.pid==1){
										ich.ch.push(it)
									}
								})
							}
						})
					})
					crr.forEach(item=>{
						if(item.id==5000){
							item.ch.forEach(ich=>{
								if(ich.id==1){
									ich.ch.forEach(i=>{
										i.ch=[];
										cityarr.forEach(it=>{
											if(it.pid==i.id){
												i.ch.push(it)
											}
										})
									})
								}
							})
						}
						
					})
					this.city=crr;
					
					console.log("地区",this.city)
				}else{
					this.code(res)
				}
			},
			// 获取筛选的内容的行业
			async getShaiXuan1(){
				let res=await this.get(shailist,{});
				if(res.code==0){
					let arr=res.result;
					let arr1=[];
					for(let i=0;i<20;i++){
						arr1.push(arr[i])
					}
					arr1.forEach(item=>{
						item.value=item.id;
						item.label=item.text;
						item.children=[];
						arr.forEach(it=>{
							it.value=it.id;
							it.label=it.text;
							if(it.pid==item.id){
								item.children.push(it)
							}
						})
					})
					this.hangyelist=arr1;
					console.log("筛选后的行业",arr1);
				}else{
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
				  uni.removeTabBarBadge({index: 3});
			    }
			    } else {
				  uni.removeTabBarBadge({index: 3});
				}
				} else {
				this.loading = false;
				uni.removeTabBarBadge({index: 3});
				};
				if(uni.getStorageSync("userNum").id = '') {
					return
				}else {
					this.$get(`${getUserInfo}`, {id : uni.getStorageSync("userNum").id } ).then(r => {
						console.log(r)
							this.myid = r.result.id
					}).catch((err) => {
						console.log(err)
					});
				}
				
			},
			fan() {
				console.log("231")
				uni.navigateBack({
					delta:1
				})
			},
			bindPickerChange(e) {
				this.index = e.target.value;
			},
			bindDateChange(e) {
				this.indexx = e.detail.value;
			},
			bindprojectName(e) {
				this.projectName = e.detail.value;
				
			},
			bindCooperateTypeEnumChange(e) {
				this.index1 = e.detail.value;
			},
			bindTotalAssetsEnumChange(e) {
				this.index2 = e.detail.value;
			},
			bindFinancingCurrencyEnumChange(e) {
				this.index3 = e.detail.value;
				
			},bindListingPeriodEnumChange(e) {
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
				let ss=this.InvestableFundsEnum[this.index5]
				this.labelData.forEach(item=>{
					if(item.labelName==ss){
						this.label=item.id;
						console.log(this.label)
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
			async toRegister(e){
				const formData = e.detail.value;
			// if(!(/^1[3456789]d{9}$/.test(formData.venturePartner))){
			// 	uni.showToast({
			// 		title:"投资人手机号格式错误",
			// 		icon:"none",
			// 		duration:1500
			// 	})
			//         return;
			//     }
			if(this.dindex==1){
				if(this.logoList.length==0){
					uni.showToast({
						title:"重点项目logo必传",
						icon:"none",
						duration:2000
					})
					return
				}
			}
				const rule = [
					{name:"projectName", checkType : "string", checkRule:"2,20",  errorMsg:"主体名称最少为2个字符"},
					{name:"venturePartner", checkType : "string", checkRule:"11,11",  errorMsg:"投资人手机号未填写"}
				];
				const checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
			    this.$api.msg(graceChecker.error);
					return;
				}
				let data={};
				if(this.cityType==0){
					data.continent=this.cityid
				}
				if(this.cityType==1){
					data.country=this.cityid
				}
				if(this.cityType==2){
					data.province=this.cityid
				}
				if(this.cityType==3){
					data.city=this.cityid
				}
				let logourl=""
				if(this.logoList.length>0){
					logourl=this.logoList[0]
				}
				this.get(projectFinancingLoan, {
					...data,
					...formData,
					projectLogoUrl:logourl,
					managingPartner :uni.getStorageSync("userNum").userPhone,
					financingCurrency:this.index3+1,//币种financingCurrency
					id : this.myid,
					projectLabel:this.label,//标签
					tradeTypeId:this.hangyeId,//行业id
					subjectNature : this.index+1,//企业或个人
					commissionClassification : this.index11+1,//委托
					listingPeriod : this.index18+1,//挂牌期限
					imgUrl : this.imageListData.toString(),
					entrustmentAgreement:this.imageList.toString(),
					recommendedStars:this.index12+1,//推荐星级
					investableIncome:this.index10+1,//项目收益率
					investableRisk:this.index9+1,//项目风险度
					financingPeriod:this.index7+1,//融资期限
					financingMode:this.financingModeName.toString(),//融资方式
					isImportantProject:this.dindex//是否重点项目
					// city:this.cityid
				}).then(r=>{
					console.log(r)
					if(r.code==0){
						this.$api.msg(`发布成功`);
						this.isshow = true
						setTimeout(() => {
						    uni.navigateBack({
						    	delta:1
						    })
						},1000);
					}else{
						this.$api.msg(r.message);
					}
				}).catch(err => {
					console.log(err)
					this.$api.msg(`系统错误,稍后重试`);
				})
			},
		},

	}
</script>

<style lang="less">
	textarea {
		margin-top: 20upx !important;
	}
	.marl{
		margin: 0 20rpx 0 0;
		color: #333333;
		font-weight: bold;
	}
	.marr{
		margin: 0 0 0 20rpx;
		color: #333333;
		font-weight: bold;
	}
	.typebox3 {
		display: none;
	}
	.typebox2{
		display: none;
	}
	.typebox1{
		display: none;
	}
	.typebox{
		display: none;
	}
	.typeshow{
		display: block !important;
	}
	.type3{
		color: #999999;
		font-size: 26rpx;
	}
	.type2{
		color: #666666;
		font-size: 28rpx;
	}
	.type1{
		color: #333333;
		font-size: 30rpx;
	}
	.type0{
		color: #000000;
		font-size: 30rpx;
	}
	.city{
		display: flex;
	}
	.cityname{
		width: 450rpx;
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
			font-family:PingFangSC-Regular,PingFang SC;
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
			width:200upx !important;
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
			.plusicon{
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
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
			 
				button{
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					background: none;
					margin: 0;
					padding: 0;
					&::after{
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
			button{
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				background: none;
				margin: 0;
				padding: 0;
				&::after{
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
