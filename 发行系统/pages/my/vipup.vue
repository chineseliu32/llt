<template>
	<view>
		<view class="last">
			<view :class="in_lest==1?'lt':'lt1' " @click="in_dex(1)">升级</view>
			<view :class="in_lest==2?'lt':'lt1' " @click="in_dex(2)">降级</view>
		</view>
		<view v-if="in_lest==1&&uplist.length>0" class="box">
			<view class="title">升级经纪人</view>
			<view  v-for="(item,index) in uplist" :key="index" class="index">
				<view>{{item.verify_opinion}}</view>
				<view>状态：{{item.verify_result | ztai}}</view>
				<view class="index1">
					<text v-if="item.verify_result!=1">审批人：{{item.create_user}}</text>
					<text v-if="item.verify_result==1">申请人：本人</text>
					<text>{{item.create_time | time}}</text>
				</view>
				
			</view>
		</view>
		<view v-if="in_lest==1&&jglist.length>0" class="box">
			<view class="title">成立机构</view>
			<view  v-for="(item,index) in jglist" :key="index" class="index">
				<view>{{item.verify_opinion}}</view>
				<view>状态：{{item.verify_result | ztai}}</view>
				<view class="index1">
					<text v-if="item.verify_result!=1">审批人：{{item.create_user}}</text>
					<text v-if="item.verify_result==1">申请人：本人</text>
					<text>{{item.create_time | time}}</text>
				</view>
				
			</view>
		</view>
		<view v-if="in_lest==2&&jjlist.length>0"class="box">
			<view  v-for="(item,index) in jjlist" :key="index" class="index">
				<view>{{item.verify_opinion}}</view>
				<view>状态：{{item.verify_result | ztai}}</view>
				<view class="index1">
					<text v-if="item.verify_result!=1">审批人：{{item.create_user}}</text>
					<text v-if="item.verify_result==1">申请人：{{item.create_user}}</text>
					<text>{{item.create_time | time}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import topSearch from "@/components/rf-top1/rf-top1.vue"
	import {tupjl,jigou,jiangji} from "@/api/user.js"
	import moment from '@/utils/moment';
	export default {
		components: {topSearch},
		data() {
			return {
				in_lest:'1',
				uplist:[],
				jglist:[],
				jjlist:[]
			}
		},
		onLoad() {
			this.getT();
			this.jiangji();
			// if(uni.getStorageSync("userNum").userType==2){
				this.jigou()
			// }
		},
		filters: {
		// 时间格式化
			time(val) {
				return moment(val).format('YYYY-MM-DD HH:mm')
			},
			ztai(val){
				if(val==1){
					return "申请"
				}
				if(val==2){
					return "同意"
				}
				if(val==3){
					return "驳回"
				}
			}
		},
		methods: {
			// 会员获取升级记录
			async getT(){
				let res=await this.get(tupjl,{userId:uni.getStorageSync("userNum").id})
				if(res.code==0){
					if(res.result){
						this.uplist=res.result
					}
				}
				console.log(res)
			},
			// 成立机构记录
			async jigou(){
				let res=await this.get(jigou,{userId:uni.getStorageSync("userNum").id})
				if(res.code==0){
					if(res.result){
						this.jglist=res.result
					}
				}
				console.log(res)
			},
			// 降级记录
			async jiangji(){
				let res=await this.get(jiangji,{userId:uni.getStorageSync("userNum").id});
				if(res.code==0){
					if(res.result){
						this.jjlist=res.result
					}
				}
				console.log(res)
			},
			fan() {
				console.log("231")
				uni.navigateBack({
					delta:1
				})
			},
			in_dex(type) {
				this.in_lest = type
			}
		}
	}
</script>

<style  scoped>
		.box{
			width: 686rpx;
			margin-left: 32rpx;
			padding: 20rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			box-shadow: 0 0  10rpx 0 #999999;
			margin-top: 40rpx;
		}
		.title {
			text-align: center;
			font-size: 32rpx;
			color: #666666;
		}
		.lt1 {
			width: 50%;
			position: relative;
			display: inline-block;
			line-height: 100upx;
			text-align: center;
			font-size: 30upx;
		}
		
		.lt {
			width:50%;
			position: relative;
			text-align: center;
			display: inline-block;
			line-height: 100upx;
			font-size: 30upx;
			background: url(../../static/image/in_title.png) no-repeat center bottom;
		}
		.index{
			padding:20rpx 40rpx;
			box-sizing: border-box;
			color: #666666;
			font-size: 30rpx;
		}
		.index1{
			display: flex;
			justify-content: space-between;
		}
</style>
