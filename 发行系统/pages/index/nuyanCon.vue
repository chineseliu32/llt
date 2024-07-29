<template>
	<view>
	    <video :src="data.video_url" autoplay="true"></video>
		<view class="btn" v-if="data.verify_status==9||data.verify_status==10" @click="jiaofei">缴费</view>
		<view class="btn" v-if="data.verify_status==4&data.present_way==0" @click="open">展示</view>
		<view class="title">{{data.title}}</view>
		<view class="time">起止时间：{{data.start_time}}/{{data.end_time}}</view>
		<view class="time">项目介绍</view>
		<view v-html="data.contents" class="content"></view>
	</view>
</template>

<script>
	import {nuyancon,opennews,isjiaofei,zhuangtai} from '../../api/user'
	export default {
		components:{
		},
		data() {
			return {
				data:{},
				id:"",
				isflag:""
			}
		},
		onLoad(e) {
			this.isjf()
			this.id=parseInt(e.id)
		},
		onShow() {
			this.initData(this.id);
		},
		methods: {
			xiang(id) {
				uni.navigateTo({
					
				})
			},
			async isjf(){
				let res=await this.get(isjiaofei,{type:4})
				this.isflag=res.success
				console.log(res)
			},
			async open(){
				let res=await this.get(opennews,{id:this.data.id,type:2})
				if(res.code==200){
					uni.showToast({
						title:"开启成功"
					})
					this.initData(this.id);
				}else{
					uni.showToast({
						icon:"none",
						title:res.message
					})
				}
			},
			jiaofei(){
				if(this.isflag){
					uni.navigateTo({
						url:"/pages/my/pay?type=4&id="+this.data.id
					})
				}else{
					this.get(zhuangtai,{type:4,id:this.id}).then(res=>{
						this.initData(this.id)
						console.log(res)
					})
				}
			},
			async initData(id){
				let res= await this.get(nuyancon,{id:id});
				if(res.message=="成功"){
					this.data=res.result;
				}else{
					this.code(res)
				}
			}
		
		}
	}
</script>

<style scoped>
	video{
		width: 100%;
	}
	.btn{
		width: 400rpx;
		height: 80rpx;
		margin-left: 175rpx;
		background-color: #c9161e;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}
	.title{
		/* text-align: center; */
		padding-left:30rpx ;
		font-size: 34rpx;
		color: #333333;
		margin: 20rpx 0;
	}
	.time{
		padding-left:30rpx ;
		font-size: 30rpx;
		color: #333333;
		margin: 20rpx 0;
	}
	.content{
		padding: 0 30rpx;
	}
</style>
