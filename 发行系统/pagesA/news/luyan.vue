<template>
	<view>
		<view class="box"><text class="red">*</text><text class="title">标题</text><input type="text" v-model="title" placeholder="请输入标题"/></view>
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
		<view class="box">
			<view><text class="red">*</text><text class="title">路演推广图片</text></view>
		</view>
		<view class="box1">
			<image src="../../static/image/upimg.png" class="imgbtn" mode="aspectFill" v-if="imgurl==''" @click="successImage1"></image>
			<image :src="imgurl" class="img" v-if="imgurl!=''"></image>
		</view>
		<view class="box">
			<view><text class="red">*</text><text class="title">路演视频</text><text class="title2">(不得超过200M及5分钟)</text></view>
		</view>
		<view class="box1">
			<image src="../../static/image/upimg.png" class="imgbtn" v-if="vidurl==''" @click="successImage2"></image>
			<video :src="vidurl" class="video" v-if="vidurl!=''"></video>
		</view>
		<view class="box"><text></text><text class="title">合作类型</text>
			<picker mode="selector"  :range="list" range-key="title" @change="bindtype">
		         <view class="uni-input">{{type}}</view>
		    </picker>
		</view>
		<view class="box"><text></text><text>排序</text><input type="number" v-model="number" placeholder="请填写数字"/></view>
		<view class="box"><text class="red">*</text><text class="title">内容简介</text></view>
		<jinEdit placeholder="请输入内容" @editOk="editOk" uploadFileUrl="https://test.pvpi.net/backUpload/uploadFiles"></jinEdit>
		<view style="padding-bottom: 60rpx;">
			<view class="btn" @click="ok">提交</view>
		</view>
	</view>
</template>

<script>
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	import {uploadFiles,upshipin} from "@/api/user.js";
    export default {
        data() {
            return {
				title:"",
				date:"请选择",
				date1:"请选择",
				imgurl:"",
				vidurl:"",
				category: 'image',
				number:"",
				type:"请选择",
				typevalue:"",
				list:[
					{value:"1",title:"融资借款"},
					{value:"2",title:"投资贷款"},
					{value:"3",title:"资产出售"},
					{value:"4",title:"资产购买"},
					{value:"5",title:"服务提供"},
					{value:"6",title:"服务采购"},
					],
				fuwenben:""
            }
        },
		components: {
			jinEdit
		},
        methods: {
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
				if(this.vidurl==""){
					uni.showToast({
						title:"未上传视频",
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
				let id=uni.getStorageSync("userNum").id
				let res=await this.get(upshipin,{
					imgUrl:this.imgurl,
					title:this.title,
					cooperateType:this.typevalue,
					videoUrl:this.vidurl,
					sort:this.number,
					contents:this.fuwenben,
					startTime:this.date,
					endTime:this.date1,
					userId:id
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
			},
			// 选择视频
			successImage2() {
				let than=this
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: (res) => {
						console.log(res)
						if((res.duration<300)&&(res.size<=204800000)){
							uni.showLoading({
							    title: '视频上传中',
								mask:true
							});
							uni.uploadFile({
								url:uploadFiles, //仅为示例，非真实的接口地址
								filePath: res.tempFilePath,
								name: 'Filedata',
								//请求参数
								formData: {
									'user': 'test'
								},
								success: (r) => {
									uni.hideLoading();
									console.log("服务器视频地址",JSON.parse(r.data).data)
									than.vidurl=JSON.parse(r.data).data
								}
							});
						}else {
							if(res.duration>300){
								uni.showToast({
									title: '视频时间超过5分钟',
									mask:true,
									icon:"none"
								});
							}
							if(res.duration>204800000){
								uni.showToast({
									title: '视频大小超过200M',
									mask:true,
									icon:"none"
								});
							}
						}
					},
					fail: (err) => {
					}
				});
			},
			// 选择类型
			bindtype(e){
				console.log(e.detail.value)
				this.type=this.list[e.detail.value].title
				this.typevalue=this.list[e.detail.value].value
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
		font-size: 32rpx;
		font-weight: bold;
		color: #666;
	}
	.title2{
		font-size: 28rpx;
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
