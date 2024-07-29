<template>
	<view>
		<view class="box"><text class="red">*</text><text class="title">标题</text><input type="text" v-model="title" placeholder="请输入标题"/></view>
		<view class="box"><text class="red">*</text><text class="title">参与上限人数</text><input type="number" v-model="number" placeholder="请输入人数,至少2人"/></view>
		<view class="box"><text class="red">*</text><text class="title">个人分摊经费</text><text class="title2">(单位:元)</text><input type="number" v-model="price" placeholder="无经费输入0"/></view>
		<view class="box"><text class="red">*</text><text class="title">开始时间</text>
			<picker mode="date"   @change="bindDateChange">
		         <view class="uni-input">{{date}}</view>
		    </picker>
		</view>
		<view class="box" ><text class="red">*</text><text class="title">结束时间</text>
			<picker mode="date"   @change="bindDateChange1">
		         <view class="uni-input">{{date1}}</view>
		    </picker>
		</view>
		<view class="box" ><text class="red">*</text><text class="title">活动城市</text>
			<lb-picker @confirm="makecity" :props="myProps" :list="citylist" :mode="selector" :level="leve2">
				<view class="cityname" style="margin-left: 20rpx;">{{cityName}}</view>
			</lb-picker>
		</view>
		<view class="box">
			<view><text class="red">*</text><text class="title">活动图片</text></view>
		</view>
		<view class="box1">
			<image src="../../static/image/upimg.png" class="imgbtn" mode="aspectFill" v-if="imgurl==''" @click="successImage1"></image>
			<image :src="imgurl" class="img" v-if="imgurl!=''"></image>
		</view>
		<view class="box"><text class="red">*</text><text class="title">活动详情</text></view>
		<jinEdit placeholder="请输入内容" @editOk="editOk" uploadFileUrl="https://test.pvpi.net/backUpload/uploadFiles"></jinEdit>
		<view style="padding-bottom: 60rpx;">
			<view class="btn" @click="ok">提交</view>
		</view>
	</view>
</template>

<script>
	import {shaixuan} from "@/api/user.js";
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	import {uploadFiles,upshipin,fabuhuodong} from "@/api/user.js";
	import LbPicker from '@/components/lb-picker';
    export default {
        data() {
            return {
				myProps: {
				    label: 'text',
				    value: 'id',
				    children: 'ch'
				},
				selector:"multiSelector",
				leve2:4,
				title:"",
				date:"请选择",
				date1:"请选择",
				imgurl:"",
				vidurl:"",
				category: 'image',
				number:"",
				type:"请选择",
				typevalue:"",
				fuwenben:"",
				citylist:[],
				cityName:"请选择",
				price:null,
				activityCity:null
            }
        },
		components: {
			jinEdit,
			LbPicker
		},
		onLoad() {
			this.getShaiXuan()
		},
        methods: {
			async getShaiXuan(){
				let res=await this.get(shaixuan,{});
				if(res.code==0){
					console.log(res)
					let arr=res.result.professionalFieldTreeList["6"];
					let arr1=[];
					arr.forEach(item=>{
						item.value=item.id;
						item.label=item.text
						if(item.pid=="c6"){
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
					this.hangyelist=arr1;
					
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
					console.log("地区",this.citylist)
				}else{
					this.code(res)
				}
			},
			// 选择城市
			makecity(e){
				// if(e.item[e.item.length-1].type==0){
				// 	this.cityType=e.item[e.item.length-1].type
				// 	console.log("周")
				// }
				// if(e.item[e.item.length-1].type==1){
				// 	this.cityType=e.item[e.item.length-1].type;
				// 	this.city=""//城市
				// 	this.province=""//省份
				// 	this.country=e.item[e.item.length-1].id//国家
				// 	this.continent=""//大洲
				// 	this.cityName=e.item[e.item.length-1].text
				// 	console.log("国")
				// }
				// if(e.item[e.item.length-1].type==2){
				// 	this.cityType=e.item[e.item.length-1].type
				// 	this.city=""//城市
				// 	this.province=e.item[e.item.length-1].id//省份
				// 	this.country=""//国家
				// 	this.continent=""//大洲
				// 	this.cityName=e.item[e.item.length-1].text
				// 	console.log("省")
				// }
				// if(e.item[e.item.length-1].type==3){
					// this.cityType=e.item[e.item.length-1].type
					this.activityCity=e.item[e.item.length-1].id//城市
					// this.province=""//省份
					// this.country=""//国家
					// this.continent=""//大洲
					this.cityName=e.item[e.item.length-1].text
					// console.log("市")
				// }
				console.log(e);
			},
			// 点击上传
			async ok(){
				if(this.title.trim()==''){
					uni.showToast({
						title:"标题不能为空",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(this.date=="请选择"){
					uni.showToast({
						title:"未选择开始时间",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(this.date1=="请选择"){
					uni.showToast({
						title:"未选择结束时间",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(this.imgurl==""){
					uni.showToast({
						title:"未上传图片",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(this.fuwenben==""){
					uni.showToast({
						title:"未填写内容",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(this.activityCity==null){
					uni.showToast({
						title:"城市未选择",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(this.price==null){
					uni.showToast({
						title:"经费未填写",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(this.number==''){
					uni.showToast({
						title:"活动人数未填写",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				if(parseInt(this.number)<2){
					uni.showToast({
						title:"活动人数不得少于2人",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				let id=uni.getStorageSync("userNum").id
				// activityContent=活动内容&beginTime=活动开始时间&endTime=活动结束时间&activityTitle=活动标题&activityBanner=活动图标&teamNum=参与人数&activityMoney=活动金额&userId=申请人id&activityCity=城市
				let res=await this.get(fabuhuodong,{
					activityBanner:this.imgurl,
					activityTitle:this.title,
					cooperateType:this.typevalue,
					teamNum:this.number,
					activityContent:this.fuwenben,
					activityMoney:parseInt(this.price)*100,
					beginTime:this.date,
					endTime:this.date1,
					userId:id,
					activityCity:this.activityCity
				})
				if(res.code==0){
					uni.showToast({
						title:"发布成功，等待审核",
						icon:"success",
						duration:1500,
						mask:true
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}
				console.log(res)
			},
           // 点击富文本的发布
			editOk(res) {
				this.fuwenben=res.html
               console.log(res);
			},
			// 开始时间
			bindDateChange(e){
				console.log(e);
				this.date=e.detail.value
			},
			// 结束时间
			bindDateChange1(e){
				console.log(e);
				this.date1=e.detail.value
			},
			// 选择照片
			successImage1() {
				console.log("asdfasdf");
				let than=this
				uni.chooseImage({
					count:1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
					success: (res) => {
						console.log(res)
						var imgFiles = res.tempFilePaths[0]
						var uper = uni.uploadFile({
							url:uploadFiles,
							// filePath  需要上传的文件
							filePath: imgFiles,
							name: 'Filedata',
							formData: {},
							success(r) {
								console.log("服务器图片地址",JSON.parse(r.data).data)
								than.imgurl=JSON.parse(r.data).data
							}
						})
					},
					fail: (err) => {
						console.log(err)
					}
				});
			}
        }
    }
</script>

<style scoped>
	.box{
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		margin-top: 40rpx;
	}
	.red{
		color: #ED1C24;
		font-size: 36rpx;
		margin-right: 10rpx;
	}
	.title{
		font-size: 35rpx;
		font-weight: bold;
		color: #666;
	}
	.title2{
		font-size: 30rpx;
		color: #666;
	}
	input{
		font-size: 30rpx;
		color: #666666;
		margin-left: 20rpx;
	}
	picker{
		padding: 0 !important;
	}
	.uni-input{
		padding: 0 !important;
		margin-left: 20rpx;
	}
	.imgbtn{
		width: 200rpx;
		height: 200rpx;
	}
	.box1{
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.img{
		width:600rpx;
		height: 400rpx;
	}
	.btn{
		width: 400rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		font-weight: bolder;
		margin-left: 175rpx;
		border-radius: 10rpx;
		margin-top: 40rpx;
		background-color: #c9161e;
	}
</style>

