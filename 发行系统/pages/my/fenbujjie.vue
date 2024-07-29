<template>
	<view>
		<rich-text :nodes="data">
			
		</rich-text>
	</view>
	
</template>

<script>
	import {fenbujjie} from "@/api/user.js"
	export default{
		data(){
			return{
				data:""
			}
			
		},
		onLoad() {
			this.getdatainfo()
		},
		methods:{
			async getdatainfo(){
				let res=await this.get(fenbujjie,{userId:uni.getStorageSync("userNum").id});
				if(res.code==0){
					this.data=res.result
				}
				
			}
		}
	}
</script>

<style scoped>
	view{
		padding: 20rpx;
	}
</style>
