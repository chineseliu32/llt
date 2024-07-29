<template>
	<view>
		<view class="box"><text class="red">*</text><text class="title">标题</text><text class="title2">(100字以内)</text><input type="text" v-model="title" placeholder="请输入标题"/></view>
		<view class="box"><text class="red"></text><text class="title">内容简介</text><input type="text" v-model="remarks" placeholder="请输入标题"/></view>
		<view class="box">
			<view><text class="red">*</text><text class="title">新闻公告图片</text></view>
		</view>
		<view class="box1">
			<image src="../../static/image/upimg.png" class="imgbtn" mode="aspectFill" v-if="imgurl==''" @click="successImage1"></image>
			<image :src="imgurl" class="img" v-if="imgurl!=''"></image>
		</view>
		<view class="box"><text class="red">*</text><text class="title">新闻类型</text>
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
	import {uploadFiles,fabunews} from "@/api/user.js";
    export default {
        data() {
            return {
				title:"",
				date:"请选择",
				date1:"请选择",
				remarks:"",
				imgurl:"",
				vidurl:"",
				category: 'image',
				number:"",
				type:"请选择",
				typevalue:"",
				list:[
					{value:"1",title:"新闻咨询"},
					{value:"2",title:"新闻公告"}
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
				if(this.type=="请选择"){
					uni.showToast({
						title:"新闻类型未选择",
						icon:"none",
						mask:true,
						duration:1000
					})
					return
				}
				let id=uni.getStorageSync("userNum").id
				// newsType=类型&newsTitle=标题&remarks=内容简介&titleImgUrl=标题图片URL&sort=排序&newsContents=内容&userId=申请人id
				let res=await this.get(fabunews,{
					titleImgUrl:this.imgurl,
					newsTitle:this.title,
					newsType:this.typevalue,
					remarks:this.remarks,
					sort:this.number,
					newsContents:this.fuwenben,
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
