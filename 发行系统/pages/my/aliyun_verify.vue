<template>
	<view class="button-sp-area">
		<button type="primary" plain="true" @click="getMetaInfo">getMetaInfo</button>
		<button type="primary" plain="true" @click="verify">verify</button>
	</view>
</template>

<script>
	const aliyunVerify = uni.requireNativePlugin('AP-FaceDetectModule');
	import {
	 getAuthenticationDescribeFaceVerify,
	 getAuthenticationInitFaceVerify
	} from "@/api/user.js";
	export default {
		data() {
			return {
				title: '',
				certifyId:''
			}
		},
		onLoad() {

		},
		methods: {
			getMetaInfo() {
				//console.log(aliyunVerify);
				 
				var t = aliyunVerify.getMetaInfo();
				
				let p = uni.getSystemInfoSync().platform;
				if (p === "ios") {
					t = JSON.stringify(t);
				}
				this.get(getAuthenticationInitFaceVerify, {
					certName: "",
					certNo: "",
					metaInfo:t,
					UserId: uni.getStorageSync("userNum").userId
				
				}).then(r => {
					if (r.code == 0) {
						this.certifyId = r.result;
						console.log("certifyId:"+ this.certifyId)
						this.$api.msg(`提交成功！`+`certifyId:`+ this.certifyId);
						this.isshow = true
						 
					} else {
						this.$api.msg(r.message);
					}
				}).catch(err => {
					console.log(err)
					this.$api.msg(`系统错误,稍后重试`);
				
				})
 
			},
			
			verify(){
				aliyunVerify.verify({
				    "certifyId":this.certifyId,		// 填写从服务端获取的certifyId
				  }, 
				  function(response){
					  console.log(response);
					  if(response.code=="1000")
					  {
					  uni.navigateTo({
					  	url: "./authentication?verfiy=1"
					  })
					  }
			/* 		  this.$api.msg(response.code);
					  this.$api.msg(response.message); */
						//this.callback();
				  }
				);	
					
			},
	
		}
	}
</script>

<style>
	button {
		margin-top: 30upx;
		margin-bottom: 30upx;
	}

	.button-sp-area {
		margin: 0 auto;
		width: 60%;
	}

	.content {
		text-align: center;
		height: 400upx;
	}

	.wrapper {
		flex-direction: column;
		justify-content: center;
	}

	.button {
		width: 200px;
		margin-top: 30px;
		margin-left: 20px;
		padding-top: 20px;
		padding-bottom: 20px;
		border-width: 2px;
		border-style: solid;
		border-color: #458B00;
		background-color: #458B00;
	}

	.text {
		font-size: 30px;
		color: #666666;
		text-align: center;
	}
</style>

