<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="item">
			<image :src="item.activity_banner" mode="aspectFill"></image>
			<view class="itemR">
				<view class="title">活动主题：{{item.activity_title}}</view>
				<!-- <view class="title2">活动人数：{{item.teamNum}}人</view> -->
				<view class="title1">开始时间：{{item.activity_begin_time}}</view>
				<view class="title1">结束时间：{{item.activity_end_time}}</view>
				<view class="title1">活动状态：{{item.activity_end_time | istime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {huodonglist }from"@/api/user.js"
	export default{
		data(){
			return{
				num:0,
				flag:true,
				list:[]
			}
		},
		onLoad(){
			this.getlist()
		},
		onReachBottom(){
			if(this.flag){
				this.getlist();
			}
		},
		filters: {
				imgurl(val) {
					let arr=val.split(",");
					let url=arr[0]
				    return url
				},
				num(e){
					return parseInt(e)
				},
				istime(time){
					let date = new Date();
					let nian=date .getFullYear(); //获取完整的年份(4位)
					let yue=date .getMonth()+1; //获取当前月份(0-11,0代表1月)
					let ri=date .getDate(); //获取当前日(1-31)
					let times=time.split("-");
					if((nian>times[0])){
						return "活动已结束"
					}
					if((nian<times[0])){
						return "活动进行中"
					}
					if(nian==times[0]){
						if(yue==times[1]){
							if(ri>times[2]){
								return "活动已结束"
							}else{
								return "活动进行中"
							}
						}else if(yue<times[1]){
							return "活动进行中"
						}else{
							return "活动已结束"
						}
					}
				}
		},
		methods:{
			async getlist(){
				this.num++;
				let data={pageNum:this.num,userId:uni.getStorageSync("userNum").id}
				let res=await this.get(huodonglist,data);
				if(res.code==0){
					if(res.result.list.length<10){
						this.flag=false
					}
					res.result.list.forEach(item=>{
						this.list.push(item)
					})
				}
			},
			// 点击跳转活动详情
			xiang(type) {
				uni.navigateTo({
					url:`${url}?id=${type.id}`
				})
			},
		}
	}
	
	
</script>

<style scoped>
	page{
		background-color: #EEEEEE;
	}
	.item{
		width: 100%;
		height:240rpx;
		padding: 20rpx;
		box-sizing: border-box;
		margin-bottom: 20rpx;
		display: flex;
		background-color: #FFFFFF;
	}
	image{
		width: 200rpx;
		height: 200rpx;
	}
	.itemR{
		padding-left: 20rpx;
		box-sizing: border-box;
	}
	.title{
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.title2{
		font-size: 30rpx;
		margin-bottom: 10rpx;
	}
	.title1{
		font-size: 28rpx;
		/* font-weight: bold; */
	}
</style>
