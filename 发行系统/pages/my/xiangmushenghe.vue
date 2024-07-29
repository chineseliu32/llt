<template>
	<view>
		<view v-for="i in info" class="box" v-if="info.length>0">
			<view class="text">{{i.verify_opinion}}</view>
			<view class="text">{{i.verify_state | grtStatus}}</view>
			<view class="text">{{i.create_time | getLocalTime}}</view>
		</view>
		<view v-if="info.length==0" class="no">暂无信息~</view>
	</view>
</template>

<script>
	import {myxiangmu} from "@/api/user.js";
	import moment from '@/utils/moment';
	export default{
		data(){
			return{
				info:{}
			}
		},
		onLoad(e){
			console.log(e)
			this.getcon(e)
		},
		filters:{
			getLocalTime(nS) {
			  return moment(nS).format('YYYY-MM-DD HH:mm')
			},
			grtStatus(num){
				if(num==1){return "草稿 "}
				if(num==2){return "本部审核员审核中"}
				if(num==3){return "本部管理员审核中"}
				if(num==4){return "平台审核员审核中"}
				if(num==5){return "平台管理员审核中"}
				if(num==6){return "同意挂牌"}
				if(num==7){return "本部审核员驳回"}
				if(num==8){return "本部管理员驳回"}
				if(num==9){return "平台审核员驳回"}
				if(num==10){return "平台管理员驳回"}
				if(num==11){return "废弃流程"}
			}
		},
		methods:{
			async getcon(data){
				let res=await this.get(myxiangmu,data);
				if(res.code==0){
					this.info=res.result
				}
				console.log(res)
			},
			getLocalTime(nS) {
			   return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ').substring(0,10);     
			},
		},
		
	}
	
</script>

<style scoped>
	.text{
		font-size: 30rpx;
		padding-left: 30rpx;
		box-sizing: border-box;
		/* margin-top: 30rpx; */
	}
	.box{
		padding: 30rpx;
	}
	.no{
		text-align: center;
		margin-top: 40rpx;
	}
	
</style>
