<template>
	<view class="container">
		<view class="ui-all">
			<form @submit="toRegister">
				<view class="picture">
				<view class="upload-img" :style="{width: width + '%',height: height + 'rpx',}" @tap="handleAddNewImage">
					<!-- <image class="cover" v-if="paymentUrl == ''" src="../../static/image/missing-face.png" mode="aspectFill"></image> -->
					<image class="cover" :src="paymentUrl" mode="aspectFill"></image>
					<view class="plusicon">
						<slot name="icon">
							<text v-if="!choosed" class="iconfont "></text>
						</slot>
					</view>
				</view>
			</view>
			<view class="ui-list">
				<text class="two">*</text>
				<text class="one">昵称：</text>
				<input type="text" :placeholder="value2" name="nickName" :value="nickName" @input="bindnickName" placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text class="two">*</text>
				<text class="one">手机号：</text>
				<input type="text" :placeholder="value2" disabled="disabled" :value="mobile" @input="bindmobile" placeholder-class="place" />
			</view>
			<view class="ui-list">
				<text class="two"></text>
				<text class="one">经纪人手机号：</text>
				<input type="text" :placeholder="value2" disabled="disabled" :value="vipmobile" @input="bindvipmobile" placeholder-class="place" />
			</view>
			<view class="ui-list right">
				<text class="two">*</text>
				<text class="one">性别：</text>
				<picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex">
					<view class="picker">
						{{sex[index]}}
					</view>
				</picker>
			</view>
			<view class="ui-list right">
				<text class="two">*</text>
				<text class="one">年龄：</text>
				<picker @change="bindDateChange" mode='selector' :value="indexx" :range="AgeEnum">
					<view class="picker">
						{{AgeEnum[indexx]}}
					</view>
				</picker>
			</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">投资类型：</text>
					<picker @change="bindCooperateTypeEnumChange" mode='selector' range-key="name" :value="index1" :range="CooperateTypeEnum">
						<view class="picker">
							{{CooperateTypeEnum[index1]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">总资产(万)：</text>
					<picker @change="bindTotalAssetsEnumChange" mode='selector' range-key="name" :value="index2" :range="TotalAssetsEnum">
						<view class="picker">
							{{TotalAssetsEnum[index2]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">净资产(万)：</text>
					<picker @change="bindNetAssetsEnumChange" mode='selector' range-key="name" :value="index3" :range="NetAssetsEnum">
						<view class="picker">
							{{NetAssetsEnum[index3]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">金融资产(万)：</text>
					<picker class="picker1" @change="bindFinancialAssetsEnumChange" mode='selector' range-key="name" :value="index4" :range="FinancialAssetsEnum">
						<view class="picker">
							{{FinancialAssetsEnum[index4]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two">*</text>
					<text class="one">可投资资金(万)：</text>
					<picker class="picker1" @change="bindInvestableFundsEnumChange" mode='selector' range-key="name" :value="index5" :range="InvestableFundsEnum">
						<view class="picker">
							{{InvestableFundsEnum[index5]}}
						</view>
					</picker>
				</view>
				<!-- <view class="ui-list right">
					<text class="two"></text>
					<text class="one">可投资行业：</text>
					<picker class="picker1" @change="bindavailableRangeChange" mode='selector' range-key="name" :value="index6" :range="availableRange">
						<view class="picker">
							{{availableRange[index6].name}}
						</view>
					</picker>
				</view> -->
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">可投资期限：</text>
					<picker class="picker1" @change="bindInvestablePeriodEnumChange" mode='selector' range-key="name" :value="index7" :range="InvestablePeriodEnum">
						<view class="picker">
							{{InvestablePeriodEnum[index7]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">所在地区：</text>
					<picker class="picker1" @change="bindInvestableAreaEnumChange" mode='selector' range-key="name" :value="index8" :range="InvestableAreaEnum">
						<view class="picker">
							{{InvestableAreaEnum[index8]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">可投资风险度：</text>
					<picker class="picker1" @change="bindInvestableRiskEnumChange" mode='selector' range-key="name" :value="index9" :range="InvestableRiskEnum">
						<view class="picker">
							{{InvestableRiskEnum[index9]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">可投资收益率：</text>
					<picker class="picker1" @change="bindInvestableIncomeEnumChange" mode='selector' range-key="name" :value="index10" :range="InvestableIncomeEnum">
						<view class="picker">
							{{InvestableIncomeEnum[index10]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two"></text>
					<text class="one">投资经验：</text>
					<picker class="picker1" @change="bindTradeExperienceEnumChange" mode='selector' range-key="name" :value="index11" :range="TradeExperienceEnum">
						<view class="picker">
							{{TradeExperienceEnum[index11]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: none;">
					<text class="two">*</text>
					<text class="one">兴趣爱好：</text>
					<picker class="picker1" @change="bindHobbyEnumChange" mode='selector' range-key="name" :value="index12" :range="HobbyEnum">
						<view class="picker">
							{{HobbyEnum[index12]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right" style="display: flex; display: none;">
					<text class="two">*</text>
					<text class="one">投资行业：</text>
						<lb-picker @confirm="xzhangye" :list="hangyelist" :mode="selector" :level="level"><view class="cityname">{{hangyename}}</view></lb-picker>
				</view>	
				<view class="ui-list">
					<text class="aa">带有<text class="aaa">*</text>为必填项</text>
				</view>
			<button class="save" formType="submit">保 存 修 改</button>
			</form>
		</view>

	</view>
</template>

<script>
	import {uploadFiles,categoryList,allUserEnum,getUserInfo,saveOrUpdateUserInfo,shailist} from "@/api/user.js";
	const graceChecker = require("@/common/graceChecker.js");
	import LbPicker from '@/components/lb-picker';
	export default {
		components:{
			LbPicker
		},
		data() {
			return {
				myid : '',
				paymentUrl: '',
				type: null,
				width: 100,
				height : 300,
				choosed:false,
				value2: '请填写',
				value1: '未认证',
				
				sex:[ '女' ,'男','保密'],
				index: 1,
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
				//投资类型
				CooperateTypeEnum: [],
				availableRange: [{id: 1,name: '投资/贷款'}, {id: 2,name: '资产购买'}, {id: 3,name: '资产购买'}, {id: 4,name: '全部'}],
				InvestablePeriodEnum: [],
				TotalAssetsEnum: [],
				NetAssetsEnum: [],
				//金融资产
				FinancialAssetsEnum: [],
				//可投资资金
				InvestableFundsEnum: [],
				//投资地区
				InvestableAreaEnum : [],
				//投资经验
				TradeExperienceEnum : [],
				//风险
				InvestableRiskEnum : [],
				//收益率
				InvestableIncomeEnum : [],
				//爱好
				HobbyEnum : [],
				date: '请填写',
				AgeEnum : [],
				avater: '',
				description: '',
				url: '',
				nickName: '',
				mobile: '',
				vipmobile: '',
				headimg: '',
				index_list : [],
				index_list1 : [],
				userlist : [],
				hangyelist:[],
				hangyename:"请选择",
				selector:"multiSelector",
				level:2,
				hangyeId:""

			}

		},
		onLoad() {
			this.initData(),
			this.initData1(),
			this.initData2(),
			this.getShaiXuan1()
			uni.getStorageSync("userNum")
			console.log(uni.getStorageSync("userNum"))
			
		},
		methods: {
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
			//选择行业
			xzhangye(e){
				console.log(e)
				this.hangyeId=e.item[0].id+","+e.item[1].id;
				this.hangyename=e.item[1].text
				console.log(this.hangyeId)
			},
		handleAddNewImage () {
		   // 从相册选择图片
		   const _this = this;
		   uni.chooseImage({
		      count: 1,
		      sizeType: ['original', 'compressed'],
		      sourceType: ['album'],
		      success: function(res) {
				  console.log(res)
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
				  console.log(r);
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
					this.AgeEnum = Object.values(this.index_list.AgeEnum);
					this.InvestablePeriodEnum = Object.values(this.index_list.InvestablePeriodEnum);
					this.InvestableRiskEnum = Object.values(this.index_list.InvestableRiskEnum);
					this.InvestableIncomeEnum = Object.values(this.index_list.InvestableIncomeEnum);
					this.HobbyEnum = Object.values(this.index_list.HobbyEnum);
					this.TradeExperienceEnum = Object.values(this.index_list.TradeExperienceEnum);
					this.TotalAssetsEnum = Object.values(this.index_list.TotalAssetsEnum);
					this.NetAssetsEnum = Object.values(this.index_list.NetAssetsEnum);
					this.FinancialAssetsEnum = Object.values(this.index_list.FinancialAssetsEnum);
					this.InvestableFundsEnum = Object.values(this.index_list.InvestableFundsEnum);
					this.InvestableAreaEnum = Object.values(this.index_list.InvestableAreaEnum);
					this.CooperateTypeEnum = Object.values(this.index_list.CooperateTypeEnum);
					
				}).catch((err) => {
				});
			},
			initData1(){
				this.$get(`${categoryList}`).then(r => {
					this.index_list1 = r.result;
					// console.log(this.index_list1)
				}).catch((err) => {
				});
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
										this.userlist = r.result
										this.paymentUrl = r.result.portrait_img
										this.myid = r.result.id
										this.nickName = r.result.nick_name
										this.mobile = r.result.user_phone
										this.vipmobile = r.result.invite_user_mobile
										if( r.result.user_sex == null) {
											this.index = 1
										}else {
											this.index = r.result.user_sex
										}
										if( r.result.user_age == null) {
											this.indexx = 1
										}else {
											this.indexx = r.result.user_age-1
										}
										if( r.result.cooperate_type == null) {
											this.index1 = 1
										}else {
											this.index1 = r.result.cooperate_type-1
										}
										if( r.result.total_assets == null) {
											this.index2 = 1
										}else {
											this.index2 = r.result.total_assets-1
										}
										if( r.result.net_assets == null) {
											this.index3 = 1
										}else {
											this.index3 = r.result.net_assets-1
										}
										if( r.result.financial_assets == null) {
											this.index4 = 1
										}else {
											this.index4 = r.result.financial_assets-1
										}
										if( r.result.investable_funds == null) {
											this.index5 = 1
										}else {
											this.index5 = r.result.investable_funds-1
										}
										if( r.result.investable_period == null) {
											this.index7 = 1
										}else {
											this.index7 = r.result.investable_period-1
										}
										if( r.result.investable_area == null) {
											this.index8 = 1
										}else {
											this.index8 = r.result.investable_area-1
										}
										if( r.result.investable_risk == null) {
											this.index9 = 1
										}else {
											this.index9 = r.result.investable_risk-1
										}
										if( r.result.investable_income == null) {
											this.index10 = 1
										}else {
											this.index10 = r.result.investable_income-1
										}
										if( r.result.trade_experience == null) {
											this.index11 = 1
										}else {
											this.index11 = r.result.trade_experience-1
										}
										if( r.result.hobby == null) {
											this.index12 = 1
										}else {
											this.index12 = r.result.hobby-1
										}
										// console.log(this.userlist);
								}).catch((err) => {
								});
							}
							
						},
			bindPickerChange(e) {
				this.index = e.detail.value;
				
			},
			bindDateChange(e) {
				this.indexx = e.detail.value;
			},
			bindCooperateTypeEnumChange(e) {
				this.index1 = e.detail.value;
			},
			bindTotalAssetsEnumChange(e) {
				this.index2 = e.detail.value;
				
			},
			bindNetAssetsEnumChange(e) {
				this.index3 = e.detail.value;
				
			},
			bindFinancialAssetsEnumChange(e) {
				this.index4 = e.detail.value;
				
			},
			bindInvestableFundsEnumChange(e) {
				this.index5 = e.detail.value;
				
			},
			bindavailableRangeChange(e) {
				this.index6 = e.detail.value;
				
			},
			bindInvestablePeriodEnumChange(e) {
				this.index7 = e.detail.value;
				
			},
			bindInvestableAreaEnumChange(e) {
				this.index8 = e.detail.value;
				
			},
			bindInvestableRiskEnumChange(e) {
				this.index9 = e.detail.value;
				
			},
			bindInvestableIncomeEnumChange(e) {
				this.index10 = e.detail.value;
			},
			
			bindTradeExperienceEnumChange(e) {
				this.index11 = e.detail.value;
				
			},
			bindHobbyEnumChange(e) {
				this.index12 = e.detail.value;
				
			},
			bindnickName(e) {
				this.nickName = e.detail.value;
				
			},
			bindmobile(e) {
				this.mobile = e.detail.value;
				
			},
			bindvipmobile(e) {
				this.vipmobile = e.detail.value;
				
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
			 getUserInfo (e) {
			      if(e.detail.iv){		
					  console.log(e.detail.iv) //传后台解密换取用户信息
						  uni.showToast({
							   title: '已授权',
							   icon: 'none',
							   duration: 2000
							   }) 
				  }
				 
			    } ,
				 getphonenumber(e){
					if(e.detail.iv){
					  console.log(e.detail.iv) //传后台解密换取手机号
						  uni.showToast({
							   title: '已授权',
							   icon: 'none',
							   duration: 2000
							   }) 
					}
								  },
			savaInfo() {
				let that = this;
				let nickname = that.nickName;
				let headimg = that.headimg;
				let gender = that.index;
				let mobile = that.mobile;
				let birthday = that.date;
				let description = that.description;
				let updata = {};
				if (!nickname) {
					uni.showToast({
						title: '请填写姓名',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				updata.nickname = nickname;
				if (!headimg) {
					headimg = that.avater;
				}
				updata.headimg = headimg;
				updata.gender = gender;
				if (that.isPoneAvailable(mobile)) {
					updata.mobile = mobile;
				} 
				else {
					uni.showToast({
						title: '手机号码有误，请重填',
						icon: 'none',
						duration: 2000
					});
					return;
				}
		
				if (birthday == "0000-00-00") {
					uni.showToast({
						title: '请选择年龄',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				updata.birthday = birthday;
				updata.description = description;
				that.updata(updata);
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
			
				const rule = [
					{name:"nickName", checkType : "string", checkRule:"2,6",  errorMsg:"昵称应为2-6个字符"}
				];
				const checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
			    this.$api.msg(graceChecker.error);
					return;
				}
				/*
				if(this.hangyeId==''){
					uni.showToast({
						title:"投资行业未选择",
						icon:"none",
						duration:1500,
						mask:true
					})
					return
				}
				*/
				let params = {}
				// #ifdef  APP-PLUS 
				params.group = 'tinyShopApp'
				//  #endif  
				//  #ifdef H5
				params.group = 'tinyShopH5'
				// #endif  
				// #ifdef  MP-WEIXIN  
				params.group = 'tinyShopWechatMq'
				// #endif  
				// #ifdef  MP-QQ  
				params.group = 'tinyShopQqMq'
				//  #endif  
			
				this.$get(saveOrUpdateUserInfo, {
					...params,
					...formData,
					id : this.myid,
					portraitImg : this.paymentUrl,
					userSex : this.index,
					userAge : this.indexx +1,
					cooperateType : this.index1 +1,
					totalAssets : this.index2 +1,
					netAssets : this.index3 +1,
					financialAssets : this.index4 +1,
					investableFunds : this.index5 +1,
					investablePeriod : this.index7 +1,
					investableArea : this.index8 +1,
					investableRisk : this.index9 +1,
					investableIncome : this.index10 +1,
					tradeExperience : this.index11 +1	,
					hobby : this.index12 +1,
					tradeTypeId:this.hangyeId
				}).then(r=>{
			    this.$api.msg(`修改成功`);
					 setTimeout(() => {
					    uni.navigateTo({
					    	url: '/pages/my/my'
					    })
				    }, 1 * 1000);
				}).catch(err => {
					console.log(err)
				})
			},
		},

	}
</script>

<style lang="less">
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
				font-size: 28rpx;
				display: inline-block;
				vertical-align: middle;
				min-width: 100rpx;
				margin-right: 40upx;
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
				left: 150rpx;
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
