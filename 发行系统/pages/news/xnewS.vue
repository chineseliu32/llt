<template>
	<view>
		<view class="con">
			{{data.content}}
		</view>
	</view>
</template>

<script>
	import {
		//获取分布消息详情
		fenbu,
		//我的分布消息列表
		fenbulist,
		// 我未读分布消息数量
		fenbunum,
		// 我的系统消息详情
		xitong,
		// 我的系统消息列表
		xitonglist,
		// 我的未读系统消息数量
		xitongnum
	} from "@/api/user.js";
	export default {
		data(){
			return{
				data:{}
			}
		},
		onLoad(e) {
			this.getinfo(e.id)
			// 获取系统消息的数量
			
		},
		methods:{
			async getinfo(id){
				let res=await this.get(xitong,{
					userId:uni.getStorageSync("userNum").id,
					id:id
				})
				if(res.code==0){
					this.data=res.result
					this.get(xitongnum,{userId:uni.getStorageSync("userNum").id}).then(res=>{
						console.log(res)
						if(res.code==0){
							uni.setStorageSync("newNum",res.result)
						}
					})
				}
			}
		}
		
	}
</script>

<style scoped>
	.con{
		padding: 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}
</style>
