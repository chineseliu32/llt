<template>
	<view class="container">
		<form @submit="aliyunverifyFun">

			<view class="ui-all">
				<view class="step" v-show="real_name.status == 2 ">
					<div style="text-align: center;">
						<view class="banner">
							<image src="../../static/image/authsuc.png" alt="" />
						</view>
						<p>实名认证成功</p>
					</div>

				</view>
				<!-- step 1-->
				<view class="step" v-show="real_name.status != 2 ">
					<view class="ui-list">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">真实姓名：</text>
						<input type="text" placeholder="请填写真实姓名" name="realName" :value="realName" @input="bindrealName"
							placeholder-class="place" />
					</view>
					<view class="ui-list">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">证件类型：</text>
						<input type="text" placeholder="请填写真实姓名" name="IDTypeEnum" :value="IDTypeEnum" input="身份证"
							placeholder-class="place" disabled="true" />
					</view>
					<view class="ui-list">
						<text class="two"></text>
						<text style="color: #FF0000;">*</text><text class="one">证件号码：</text>
						<input type="text" :placeholder="value2" name="idNumber" :value="idNumber"
							@input="bindidNumber" placeholder-class="place" maxlength="18"/>
					</view>
					<view class="ui-list" style="display: none;">
						<text class="two"></text>
						<text class="one">{{this.index18==0?"上传身份证正面图片":"上传证件照片"}}：</text>
						<easy-upload :dataList="logoList" :uploadUrl="$uploadUrl" :types="category"
							:deleteUrl="$uploadUrl" :uploadCount="1" :type="icon"
							@successImage="successImage1"></easy-upload>
					</view>
					<view class="ui-list" v-if="this.index18==0" style="display: none;">
						<text class="two"></text>
						<text class="one">上传身份证正背图片：</text>
						<easy-upload :dataList="logoList2" :uploadUrl="$uploadUrl" :types="category"
							:deleteUrl="$uploadUrl" :uploadCount="1" :type="icon"
							@successImage="successImage2"></easy-upload>
					</view>
					<p class="tost">*实名认证信息成功设置后不能修改</p>
				</view>

				<view class="btn-list" v-show="real_name.status != 2 ">
					<button class="stepbutton" formType="submit">提交</button>

				</view>
				<view class="btn-list" v-show="real_name.status == 2 ">
					<button class="stepbutton" @click="backtohome">返回首页</button>
				</view>
			</view>
		</form>
	</view>
</template>

<script>
	import LbPicker from '@/components/lb-picker';
	import {
		addRealName,
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
		getRealName,
		updateRealName,
		getAuthenticationDescribeFaceVerify,
		getAuthenticationInitFaceVerify
	} from "@/api/user.js";
	const graceChecker = require("@/common/graceChecker.js");
	import easy_upload from "@/components/easy-upload/easy-upload"
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import topSearch from "@/components/rf-top/rf-top.vue"
	const aliyunVerify = uni.requireNativePlugin('AP-FaceDetectModule');
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
				//证件类型
				IDTypeEnum: ["身份证"],
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
				idNumber: '',
				realName: '',
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
				city: [],
				financingModeName: "",
				label: 10,
				hangyelist: [], //行业list
				hangyeId: '',
				hangyename: '请选择',
				projectName: '请选择',
				buyCount: 0,
				limitCount: 0,
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
				logoList2: [],
				icon: "icon",
				intStep: 1,
				totalstep: 3,
				real_name: {},
				verifyStr: "",
				certifyId: ""
			}

		},

		onLoad(e) {
			this.verifyStr = e.verifyStr;
			if (this.verifyStr != "" && this.verifyStr != null && this.verifyStr != "undefined") {
				if (this.verifyStr == 1) {
					this.updateRealName();
				} else if (this.verifyStr == 0) {
					this.$api.msg('实名认证未通过，请重新认证')
				}
			} else {
				//查询实名信息
				this.$get(`${getRealName}`).then(r => {
					if (r.code == 0) {
						if (r.result != null) {
							this.real_name = r.result;
							if (this.real_name.status == 2) {

								this.$mp.page.$getAppWebview().setStyle({
									titleNView: {
										autoBackButton: false
									}
								})
							}
						}
					}
				}).catch((err) => {
					console.log(err)
				});
			}

		},
		methods: {
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
				console.log(data);
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
				this.logoList.push(JSON.parse(e.data).data)

			},
			successImage2(e) {
				this.logoList2.push(JSON.parse(e.data).data)
			},


			bindrealName(e) {
				this.realName = e.detail.value;

			},
			bindidNumber(e) {
				this.idNumber = e.detail.value;
			},


			avatarChoose() {
				console.log("avatarChoose")
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
			toRegister() {
				this.get(addRealName, {
					realName: this.realName,
					idType: 0,
					idNumber: this.idNumber,
					imageUrl1: "",
					imageUrl2: "",
					UserId: uni.getStorageSync("userNum").userId,
					certifyId: this.certifyId

				}).then(r => {
					if (r.code == 0) {
						this.verify();
					} else {
						this.$api.msg(r.message);
					}
				}).catch(err => {
					console.log(err)
					this.$api.msg(`系统错误,稍后重试`);

				})
			},
			updateRealName() {

				this.$get(`${updateRealName}`).then(r => {
					if (r.code == 0) {
						//查询实名信息
						this.$get(`${getRealName}`).then(r => {
							if (r.code == 0) {

								this.real_name = r.result;
								if (this.real_name.status == 2) {

									this.$mp.page.$getAppWebview().setStyle({
										titleNView: {
											autoBackButton: false
										}
									})
								}
							}
						}).catch((err) => {
							console.log(err)
						});
					}

				}).catch((err) => {
					console.log(err)
				});
			},
			aliyunverifyFun(e) {
				const formData = e.detail.value;

				/* 身份证号码格式判断 */
				if (formData.idNumber != "" && this.index18 == 0) {

					if (!(/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}[0-9Xx]$/.test(formData.idNumber))) {
						uni.showToast({
							title: "身份证号码格式错误",
							icon: "none",
							duration: 1500
						})
						return;
					}
				}
				const rule = [{
						name: "realName",
						checkType: "string",
						checkRule: "2,20",
						errorMsg: "真实人姓名最少为2个字符"
					},
					{
						name: "idNumber",
						checkType: "string",
						checkRule: "1,20",
						errorMsg: "身份证号码未填写"
					}
				];
				const checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					this.$api.msg(graceChecker.error);
					return;
				}

				this.getMetaInfo();
			},
			getMetaInfo() {
				console.log("===begin getmetaInfo====");

				var t = aliyunVerify.getMetaInfo();

				let p = uni.getSystemInfoSync().platform;
				if (p === "ios") {
					t = JSON.stringify(t);
				}
				this.get(getAuthenticationInitFaceVerify, {
					certName: this.realName,
					certNo: this.idNumber,
					metaInfo: t,
					UserId: uni.getStorageSync("userNum").userId

				}).then(r => {
					if (r.code == 0) {
						this.certifyId = r.result;
						this.toRegister();

					} else {
						this.$api.msg(r.message);
					}
				}).catch(err => {
					console.log(err)
					this.$api.msg(`系统错误,稍后重试`);

				})
				console.log("===End getmetaInfo certifyId:" + this.certifyId + "====");
			},
			verify() {
				console.log("===begin verify====");
				aliyunVerify.verify({
						"certifyId": this.certifyId, // 填写从服务端获取的certifyId
					},
					function(response) {
						console.log(response);
						if (response.code == "1000") {

							uni.navigateTo({
								url: "./authentication?verifyStr=1"
							})
						} else {
							uni.navigateTo({
								url: "./authentication?verifyStr=0"
							})
						}
					}

				);

				console.log("===End verify====");

			},
			backtohome() {
				uni.navigateTo({
					url: "../index/index"
				})
			}

			//end of method
		},


	}
</script>

<style lang="less">
	textarea {
		margin-top: 20upx !important;
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

		.banner {
			width: 100px;
			height: 100px;
			margin: auto;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}
</style>