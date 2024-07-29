<template>
	<view class="container">
		<view class="ui-all">
			<form @submit="toRegister">
			<!-- <view class="picture">
				<view class="upload-img"  @tap="handleAddNewImage">
					<image class="cover" :src="paymentUrl" mode="aspectFill"></image>
					<view class="plusicon">
						<slot name="icon">
						</slot>
					</view>
				</view>
			</view> -->
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">姓名：</text>
					<input type="text" placeholder="填写姓名" name="nickName" :value="real_name"  placeholder-class="place" />
				</view>
				<view class="ui-list ui-list1 right" style="display: none;">
					<text class="two">*</text>
					<text class="one">专业领域：</text>
					<picker class="picker1" @change="bindhangyeChange" mode='selector' range-key="name" :value="index6" :range="hangyelist">
						<view class="picker">
							{{hangyelist[index6]}}
						</view>
					</picker>
					<!-- <lb-picker @confirm="xzhangye" :list="hangyelist" :mode="selector" :level="level"><view class="cityname">{{hangyename}}</view></lb-picker> -->
				</view>
				<view class="ui-list ui-list1 right">
					<text class="two">*</text>
					<text class="one">服务区域：</text>
					<lb-picker @confirm="makecity" :props="myProps" :list="citylist" :mode="selector" :level="leve2"><view class="cityname">{{cityName}}</view></lb-picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">从业经历：</text>
					<picker class="picker1" @change="makecongye" mode='selector' range-key="name"  :range="yelist">
						<view class="picker">
							{{yelist[index2]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">潜在投资会员：</text>
					<picker class="picker1" @change="huiyuan" mode='selector' range-key="name"  :range="huiyuanlist">
						<view class="picker">
							{{huiyuanlist[index3]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">潜在挂牌项目：</text>
					<picker class="picker1" @change="xiangmu" mode='selector' range-key="name" :range="xiangmulist">
						<view class="picker">
							{{xiangmulist[index4]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">潜在可投资金：</text>
					<picker class="picker1" @change="price" mode='selector' range-key="name" :range="pricelist">
						<view class="picker">
							{{pricelist[index5]}}
						</view>
					</picker>
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">特殊资源(200字以内)：</text>
					<textarea type="text" :placeholder="value2" name="specialResource"  maxlength="200" placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">个人简历(500字以内)：</text>
					<textarea type="text" :placeholder="value2" name="personalProfile"  maxlength="500" placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="aa">带有<text class="aaa">*</text>为必填项</text>
				</view>
			<button class="save" formType="submit">立即申请</button>
			</form>
		</view>

	</view>
</template>

<script>
	import {uploadFiles,categoryList,allUserEnum,getUserInfo,saveOrUpdateUserInfo,shaixuan} from "@/api/user.js";
	import {shailist,upvip,getRealName} from "@/api/user.js";
	import LbPicker from '@/components/lb-picker';
	const graceChecker = require("@/common/graceChecker.js");
	export default {
		components:{
			LbPicker
		},
		data() {
			return {
				myProps: {
				      label: 'text',
				      value: 'id',
				      children: 'ch'
				    },
				selector:"multiSelector",
				level:2,
				leve2:4,
                paymentUrl:"",//图片地址
				hangyename:"请选择",
				hangyelist:[],//行业
				value2:"请选择",
				citylist:[],
				yelist:["1-2年","3-5年","6-10年","11-20年","21年以上"],
				huiyuanlist:["100人以下","100-500人","500-1000人","1000-5000人","5000人以上"],
				xiangmulist:["50个以下","50-100个","100-500个","500-1000个","1000个以上"],
				pricelist:["1亿以下","1-5亿","5-10亿","10-50亿","50亿以上"],
				hangyeid:0,//行业id
				index1:0,//区域
				index2:0,//从业经历
				index3:0,//潜在会员
				index4:0,//填在项目
				index5:0,//潜在资金
				index6:0,//行业类型
				cityType:"",//城市类型
				cityName:"请选择",
				city:"",//城市
				province:"",//省份
				country:"",//国家
				continent:"",//大洲
				real_name:""
			}

		},
		onLoad() {
			this.getRealName()
			this.getShaiXuan()
		},
		methods: {
			
			async getRealName()
			{
				console.log("getrealname")
				//查询实名信息
				this.$get(`${getRealName}`).then(r => {
					if (r.code == 0) {
				
						this.real_name = r.result.real_name;
						console.log(this.real_name)
					}
				}).catch((err) => {
					console.log(err)
				});
			},
			// 行业
			async getShaiXuan(){
				let res=await this.get(shaixuan,{});
				if(res.code==0){
					console.log(res)
					this.hangyelist=Object.values(res.result.professionalField); 
					 
					//this.log("类型",this.hangyelist);
					
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
					this.citylist=crr;
					
					//console.log("地区",this.citylist)
				}else{
					this.code(res)
				}
			},
			// 选择行业
			xzhangye(e){
				console.log(e)
				//this.hangyeid=e.item.id
				this.hangyename=e.item.value
					console.log(e)
				},
				//选择区域
				makecity(e){
					if(e.item[e.item.length-1].type==0){
						this.cityType=e.item[e.item.length-1].type
						console.log("周")
					}
					if(e.item[e.item.length-1].type==1){
						this.cityType=e.item[e.item.length-1].type;
						this.city=""//城市
						this.province=""//省份
						this.country=e.item[e.item.length-1].id//国家
						this.continent=""//大洲
						this.cityName=e.item[e.item.length-1].text
						console.log("国")
					}
					if(e.item[e.item.length-1].type==2){
						this.cityType=e.item[e.item.length-1].type
						this.city=""//城市
						this.province=e.item[e.item.length-1].id//省份
						this.country=""//国家
						this.continent=""//大洲
						this.cityName=e.item[e.item.length-1].text
						console.log("省")
					}
					if(e.item[e.item.length-1].type==3){
						this.cityType=e.item[e.item.length-1].type
						this.city=e.item[e.item.length-1].id//城市
						this.province=""//省份
						this.country=""//国家
						this.continent=""//大洲
						this.cityName=e.item[e.item.length-1].text
						console.log("市")
					}
					console.log(e);
				},
				bindhangyeChange(e) {
					this.index6 = e.detail.value;
					
				},
				// 选择从业
				makecongye(e){
					this.index2=e.detail.value
				},
				// 选择潜在会员
				huiyuan(e){
					this.index3=e.detail.value
				},
				xiangmu(e){
					this.index4=e.detail.value
				},
				price(e){
					this.index5=e.detail.value
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
		   uni.uploadFile({
		      url : uploadFiles,
		      filePath,
		      name: 'Filedata',
		      success (r) {
				  console.log(JSON.parse(r.data))
				 _this.paymentUrl = JSON.parse(r.data).data;
		      }
		    });
		},
			async toRegister(e){
				const formData = e.detail.value;
				let data={...formData};
				data.backUserId=uni.getStorageSync("userNum").id;
				data.cityType=this.cityType
				if(this.province!=""){data.province=this.province}
				if(this.country!=""){data.country=this.country}
				if(this.continent!=""){data.continent=this.continent}
				if(this.city!=""){data.city=this.city}
				// if(this.paymentUrl==""){
				// 	uni.showToast({
				// 		title:"照片未上传",
				// 		icon:"none",
				// 		duration:1500
				// 	})
				// 	return;
				// }else{
				// 	data.imageUrl=this.paymentUrl
				// }
				if(data.nickName==""){
					uni.showToast({
						title:"姓名未填写",
						icon:"none",
						duration:1500
					})
					return;
					
				}
				if(this.cityName=="请选择"){
					uni.showToast({
						title:"区域未选择",
						icon:"none",
						duration:1500
					})
					return;
				}
				if(data.specialResource==""){
					uni.showToast({
						title:"特殊资源未填写",
						icon:"none",
						duration:1500
					})
					return;
					
				}
				if(data.personalProfile==""){
					uni.showToast({
						title:"个人简历未填写",
						icon:"none",
						duration:1500
					})
					return;
					
				}
			/* 	if(this.hangyeid!=0){
					data.professionalField=parseInt(this.hangyeid)
				}else{
					uni.showToast({
						title:"行业领域未选择",
						icon:"none",
						duration:1500
					})
					return;
				} */
				data.workExperience=parseInt(this.index2+1)
				data.potentialInvestMember=parseInt(this.index3+1)
				data.potentialListingProject=parseInt(this.index4+1)
				data.potentialInvestFund=parseInt(this.index5+1)
				
				let res=await this.get(upvip,data)
				if(res.code==0){
					uni.showToast({
						title:"提交成功",
						icon:"success",
						duration:1500
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}else{
					uni.showToast({
						title:res.result,
						icon:"none",
						duration:1500
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}
			},
		},

	}
</script>

<style lang="less">
	.cityname{
		width: 460rpx;
	}
	.ui-list1{
		display: flex;
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

		.ui-list {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;
			// display: flex;
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
