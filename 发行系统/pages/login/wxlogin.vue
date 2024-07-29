<template >
	<view class="box">
		<button type="default" open-type="getUserInfo" @getuserinfo="getuserinfo">微信一键登录</button>
	</view >
</template>

<script>
	import {wx} from "@/api/user.js"
	export default{
		data(){
			return{
				
			}
		},    
		onLoad() {
		
		},
		methods:{
			getuserinfo(e){
				console.log(e)
				let _this=this
				if(e.detail.errMsg=="getUserInfo:ok"){
					uni.login({
						success(res) {
							console.log(res)
							_this.get(wx,{onlyCode:res.code,
							encryptedData:e.detail.encryptedData,
							iv:e.detail.iv
							}).then(ee=>{
								console.log(ee)
								if(ee.code==0){
									if(ee.result.id==""){
										uni.reLaunch({
											url:"./wxlog?unionId="+ee.result.unionId+"&openId="+ee.result.openId+"&type=1"
										})
									}else{
										uni.setStorageSync("userNum",ee.result)
										uni.showToast({
											title:"登录成功",
											duration:1500,
											icon:"success"
										})
										setTimeout(()=>{
											uni.switchTab({
												url:"../index/index"
											})
										},1500)
										
									}
								}
							})
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.box{
		width: 100vw;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	button{
		background-color: #39B54A;
		color: #FFFFFF;
		border: none;
	}
</style>
