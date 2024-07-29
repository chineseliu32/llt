<template>
	<view class="container">
		<view class="ui-all">
			<form @submit="toRegister">
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">申请机构类型：</text>
					<picker class="picker1" @change="jgtype" mode='selector'  :range="typelist">
						<view class="picker">
							{{typelist[index1]}}
						</view>
					</picker>
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">统一社会信用代码：</text>
					<input type="text" placeholder="请填写" name="tydm"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two"></text>
					<text class="one">机构代码：</text>
					<input type="text" placeholder="请填写" name="jgdm"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">机构名称：</text>
					<input type="text" placeholder="请填写" name="jgmc"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">注册地址：</text>
					<input type="text" placeholder="请填写" name="jgdz"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">注册地址行政区划代码：</text>
					<input type="text" placeholder="请填写" name="xzqh"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">注册地址邮政编码：</text>
					<input type="text" placeholder="请填写" name="yzbm"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">实际经营地址：</text>
					<input type="text" placeholder="请填写" name="yjdz"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">实际经营地址行政区划代码：</text>
					<input type="text" placeholder="请填写" name="scjyxzqh"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">法定代表人姓名：</text>
					<input type="text" placeholder="请填写" name="fddbr"  placeholder-class="place" />
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">法人证件类型：</text>
					<picker class="picker1" @change="fzjlx" mode='selector' range-key="name" :range="zjlxlist">
						<view class="picker">
							{{zjlxlist[index9]}}
						</view>
					</picker>
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">法定代表人证件号码：</text>
					<input type="text" placeholder="请填写" name="zjhm"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">法人移动电话：</text>
					<input type="text" placeholder="请填写" name="mobile"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">法人微信号：</text>
					<input type="text" placeholder="请填写" name="frweixin"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">总经理姓名：</text>
					<input type="text" placeholder="请填写" name="zjlxm"  placeholder-class="place" />
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">总经理证件类型：</text>
					<picker class="picker1" @change="zjlx" mode='selector' range-key="name" :range="zjlxlist">
						<view class="picker">
							{{zjlxlist[index8]}}
						</view>
					</picker>
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">总经理证件号码：</text>
					<input type="text" placeholder="请填写" name="zjlzjhm"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">总经理移动电话：</text>
					<input type="text" placeholder="请填写" name="zjlPhone"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">总经理微信号：</text>
					<input type="text" placeholder="请填写" name="zjlweixin"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">经营范围：</text>
					<textarea type="text" placeholder="请填写" name="jyfw"  maxlength="300" placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">登记资本：</text>
					<input type="text" placeholder="请填写" name="zczj"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">实缴资本：</text>
					<input type="text" placeholder="请填写" name="paidInCapital"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">成立日期：</text>
					<input type="text" placeholder="请填写" name="zcrp"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">登记号：</text>
					<input type="text" placeholder="请填写" name="zch"  placeholder-class="place" />
				</view>
				<view class="ui-list">
					<text class="two">*</text>
					<text class="one">单位座机电话：</text>
					<input type="text" placeholder="请填写" name="telephone"  placeholder-class="place" />
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">全职员工人数：</text>
					<picker class="picker1" @change="gnum" mode='selector' range-key="name" :range="gnumlist">
						<view class="picker">
							{{gnumlist[index2]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">办公场所面积：</text>
					<picker class="picker1" @change="mianji" mode='selector' range-key="name" :range="mianjilist">
						<view class="picker">
							{{mianjilist[index3]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">办公场所位置：</text>
					<picker class="picker1" @change="weizhi" mode='selector' range-key="name" :range="weizhilist">
						<view class="picker">
							{{weizhilist[index4]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">办公场所房型：</text>
					<picker class="picker1" @change="ftype" mode='selector' range-key="name" :range="ftypelist">
						<view class="picker">
							{{ftypelist[index5]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">有无法律风险：</text>
					<picker class="picker1" @change="fx" mode='selector' range-key="name" :range="fxlist">
						<view class="picker">
							{{fxlist[index6]}}
						</view>
					</picker>
				</view>
				<view class="ui-list right">
					<text class="two">*</text>
					<text class="one">财务状况：</text>
					<picker class="picker1" @change="price" mode='selector' range-key="name" :range="pricelist">
						<view class="picker">
							{{pricelist[index7]}}
						</view>
					</picker>
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
	import {uploadFiles,categoryList,allUserEnum,getUserInfo,saveOrUpdateUserInfo,shaixuan,jigoutype} from "@/api/user.js";
	import {shailist,upfb} from "@/api/user.js";
	import LbPicker from '@/components/lb-picker';
	const graceChecker = require("@/common/graceChecker.js");
	export default {
		components:{
			LbPicker
		},
		data() {
			return {
				index1:0,//成立机构的类型
				typelist:["营业部代表处"],
				index2:0,//员工人数
				gnumlist:["5人以下","5-10","10-20","20-50","50以上"],
				index3:0,//办公面积
				mianjilist:["100-200米","200-400","400-800","800-1600","1600以上"],
				index4:0,//办公位置
				weizhilist:["CBD","商务中心","商业区","区域中心","全选"],
				index5:0,//房型
				ftypelist:["写字楼","底商","门市房","公寓","独栋"],
				index6:0,//风险
				fxlist:["民事诉讼案件","刑事诉讼案件","政府部分处罚","失信名单","无"],
				index7:0,//财务
				pricelist:["盈利","小幅盈利","持平","小幅亏损","亏损"],
				index8:0,//总经理证件类型
				zjlxlist:["身份证","军人证","护照等"],
				index9:0//法人证件类型
			}

		},
		onLoad() {
			// this.jgtypedata()
		},
		methods: {
			// 获取机构的类型
			async jgtypedata(){
				let res=await this.get(jigoutype,{});
				if(res.code==0){
					this.typelist=res.result
				}
				console.log(res)
			},
			// 机构类型
			jgtype(e){
				this.index1=e.detail.value
			},
			// 办公人数
			gnum(e){
				this.index2=e.detail.value
			},
			//办公面积
			mianji(e){
				this.index3=e.detail.value
			},
			// 办公位置
			weizhi(e){
				this.index4=e.detail.value
			},
			// 房型
			ftype(e){
				this.index5=e.detail.value
			},
			// 风险
			fx(e){
				this.index6=e.detail.value
			},
			// 财务
			price(e){
				this.index7=e.detail.value
			},
			// 总经理证件类型
			zjlx(e){
				this.index8=e.detail.value
			},
			// 法人证件类型
			fzjlx(e){
				this.index9=e.detail.value
			},
			async toRegister(e){
				const formData = e.detail.value;
				let data={...formData}
					// data.typeId=this.typelist[this.index1].id;//成立机构的类型
					console.log(data.typeId)
					data.zjlx=this.index9+1;//法人证件类型
					data.zjlzjlx=this.index8+1;//总经理证件类型
					data.telephone=this.index3+1;//办公面积
					data.officeArea=this.index4+1;//办公位置
					data.officeLocation=this.index5+1;//办公房型
					data.employeesNumber=this.index2+1;//办公人数
					data.officeRoomType=this.index6+1;//财务状况
					data.financialPosition=this.index7+1;//法律风险
					data.adminUserId=uni.getStorageSync("userNum").id
				const rule = [
					{name:"tydm", checkType : "string", checkRule:"0,100",  errorMsg:"统一信用代码未填写"},
					{name:"jgmc", checkType : "string", checkRule:"0,100",  errorMsg:"机构名称未填写"},
					{name:"jgdz", checkType : "string", checkRule:"0,100",  errorMsg:"机构地址未填写"},
					{name:"xzqh", checkType : "string", checkRule:"0,100",  errorMsg:"注册地址未填写"},
					{name:"yzbm", checkType : "string", checkRule:"0,6",  errorMsg:"邮政编码未填写"},
					{name:"yjdz", checkType : "string", checkRule:"0,200",  errorMsg:"经营地址未填写"},
					{name:"scjyxzqh", checkType : "string", checkRule:"0,200",  errorMsg:"经营地址代码未填写"},
					{name:"fddbr", checkType : "string", checkRule:"0,100",  errorMsg:"法人姓名未填写"},
					{name:"zjhm", checkType : "string", checkRule:"18,18",  errorMsg:"法人证件号未填写"},
					{name:"mobile", checkType : "string", checkRule:"11,11",  errorMsg:"法人移动电话未填写"},
					{name:"frweixin", checkType : "string", checkRule:"0,20",  errorMsg:"法人微信未填写"},
					{name:"zjlxm", checkType : "string", checkRule:"0,20",  errorMsg:"总经理姓名未填写"},
					{name:"zjlzjhm", checkType : "string", checkRule:"18,18",  errorMsg:"总经理证件号码未填写"},
					{name:"zjlweixin", checkType : "string", checkRule:"0,100",  errorMsg:"总经理微信未填写"},
					{name:"jyfw", checkType : "string", checkRule:"0,500",  errorMsg:"经营范围未填写"},    
					{name:"zczj", checkType : "string", checkRule:"0,100",  errorMsg:"登记资本未填写"},   
					{name:"paidInCapital", checkType : "string", checkRule:"0,100",  errorMsg:"实缴资本未填写"},
					{name:"zcrp", checkType : "string", checkRule:"0,100",  errorMsg:"成立日期未填写"},
					{name:"zch", checkType : "string", checkRule:"0,100",  errorMsg:"注册登记号未填写"},
					{name:"telephone", checkType : "string", checkRule:"0,100",  errorMsg:"单位座机电话未填写"},
					{name:"zjlPhone", checkType : "string", checkRule:"11,11",  errorMsg:"总经理手机号未填写"}
				];
				const checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
			    this.$api.msg(graceChecker.error);
					return;
				}
				this.get(upfb,data).then(res=>{
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
					console.log(res)
				})
			}
		}

	}
</script>

<style lang="less">
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
				padding-left: 30rpx;
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
			background: #030303;
			border: none;
			color: #ffffff;
			margin-top: 40rpx;
			font-size: 28rpx;
		}
	}
</style>

