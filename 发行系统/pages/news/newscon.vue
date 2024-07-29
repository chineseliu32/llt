<template>
	<view>
		<view class="title">{{datainfo.news_title}}</view>
		<view class="box">
			<view>{{datainfo.update_time | time}}</view>
			<view>观看：{{datainfo.read_num}}</view>
		</view>
		
		<image :src="datainfo.title_img_url" mode="aspectFill"></image>
		<view class="btn" v-if="datainfo.verify_status==9||datainfo.verify_status==10" @click="jiaofei">缴费</view>
		<view class="btn" v-if="datainfo.verify_status==4&&datainfo.present_way==0" @click="open">开启</view>
		<view v-html="datainfo.news_contents" class="con"></view>
	</view>
</template>

<script>
	import {newscon,opennews,isjiaofei,zhuangtai} from"@/api/user.js"
	import moment from '@/utils/moment';
	export default{
		data(){
			return{
				datainfo:{},
				id:"",
				isflag:""
				
			}
		},
		onLoad(e){
			this.id=e.id
			this.isjf()
		},
		onShow() {
			this.getNews(this.id)
		},
		filters: {
		// 时间格式化
			time(val) {
				return moment(val).format('YYYY-MM-DD HH:mm')
			}
		},
		methods:{
			async isjf(){
				let res=await this.get(isjiaofei,{type:3})
				this.isflag=res.success
				console.log(res)
			},
			jiaofei(){
				if(this.isflag){
					uni.navigateTo({
						url:'/pages/my/pay?type=3&id='+this.datainfo.id
					})
				}else{
					this.get(zhuangtai,{type:3,id:this.id}).then(res=>{
						this.getNews(this.id)
						console.log(res)
					})
				}
				
			},
			async open(){
				let res=await this.get(opennews,{id:this.datainfo.id,type:1})
				if(res.code==200){
					uni.showToast({
						title:"开启成功"
					})
					this.getNews(this.id)
				}else{
					uni.showToast({
						title:res.message,
						icon:"none"
					})
				}
			},
			async getNews(id){
				let res=await this.get(newscon,{id:id});
				if(res.code==0){
					console.log(res)
					this.datainfo=res.result;
					console.log(this.datainfo)
					
				}else{
					this.code(res)
				}
			}
		}
	}
</script>

<style scoped>
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
			font-size: 32rpx;
			color: #333333;
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
			padding: 10rpx 30rpx ;
	}
	.box{
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 26rpx;
		color: #666666;
		padding: 10rpx 30rpx;
	}
	image{
		width: 700rpx;
		height: 350rpx;
		margin-left: 25rpx;
	}
	.con{
		padding: 0 30rpx;
	}
</style>
