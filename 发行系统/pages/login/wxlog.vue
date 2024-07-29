<template>
	<view>
		<view class="container">
				<view class="wrapper">
					<view class="input-content">
						<form @submit="toRegister">
							<view class="input-item">
								<text class="tit">手机号码</text>
								<input
									type="number"
									name="account"
									:value="mobile"
									placeholder="请输入手机号码"
									maxlength="11"
									@blur="blurMobileChange"
								/>
							</view>
							<view class="input-item">
								<text class="tit">经纪人手机号码</text>
								<input
									type="number"
									name="managePhone"
									:value="mobile1"
									placeholder="请输入经纪人手机号码"
									maxlength="11"
									@blur="blurMobileChange"
								/>
							</view>
							<!-- <view class="input-item">
								<text class="tit">昵称</text>
								<input
									type="text"
									name="nickName"
									placeholder="请输入您的昵称"
								/>
							</view> -->
							<button class="confirm-btn" formType="submit" :disabled="logining">注册</button>
						</form>
					</view>
					
		<!--			<view class="forget-section">-->
		<!--				忘记密码?-->
		<!--			</view>-->
				</view>
				<view class="ok"><evan-checkbox  checked="false"  @change="selfChanged" color="#DC143C" style="transform:scale(0.8);width: 800rpx;" > 勾选代表同意<text class="red" @click="to(1)">《用户协议》</text>和<text class="red" @click="to(2)">《隐私政策》</text></evan-checkbox></view>
			</view>
	</view>
	
</template>

<script>
	import {registerByPass,userRegistration, smsCode,registered} from "@/api/login";
	import {wxbd} from "@/api/user.js"
	const graceChecker = require("@/common/graceChecker.js");
	export default{
		data(){
			return {
				mobile: '',
				mobile1: '',
				smsCode: '' ,
				password: '',
				logining: false,
				smsCodeBtnDisabled: false,
				codeSeconds: 60,
				isshow : false,
				show:false,
				unionId:"",
				openId:"",
				type:"0",
				selfChecked: false,
			}
		},
		onLoad(e){
			console.log("unionId",e)
			this.unionId=e.unionId
			if(e.openId){
				this.openId=e.openId
			}
			if(e.type){
				this.type=e.type
			}
		},
		methods: {
			xieyi(){
				uni.navigateTo({
					url:"../my/yinsi"
				})
			},
			selfChanged(){
				 this.selfChecked=!this.selfChecked
				 console.log(this.selfChecked);
			},
			yinsi(){
				uni.navigateTo({
					url:"../my/xieyi"
				})
			},
			blurMobileChange(mobile) {
				console.log(mobile)
				if (!mobile.detail.value.length < 0) {
			    this.$api.msg(`请输入11位的手机号`);
					return false;
				}
				if(!(/^1(3|4|5|7|8)\d{9}$/.test(mobile.detail.value))){ 
				        this.$api.msg(`请输入正确的手机号`);
				        return false; 
				    } 
			},
			async toRegister(e){
				if(!this.selfChecked)
				{
					this.$api.msg(`请仔细阅读《服务协议》和《隐私政策》，同意后可完成登录。`);
					 
				}
				else
				{
				const formData = e.detail.value;
				const rule = [
					{name:"account", checkType : "phoneno", checkRule:"11,11",  errorMsg:"请输入正确的手机号"},
					{name:"managePhone", checkType : "phoneno", checkRule:"11,11",  errorMsg:"请输入正确的经纪人手机号"}
					// {name:"nickName", checkType : "string", checkRule:"2,6",  errorMsg:"昵称应为2-6个字符"}
				];
				const checkRes = graceChecker.check(formData, rule);
				if(!checkRes){
					uni.showToast({
						title:graceChecker.error,
						duration:1500,
						icon:"none"
						
					})
					return;
				}else{
					formData.unionId=this.unionId
					formData.openId=this.openId
					formData.type=this.type
					this.get(wxbd,formData).then(res=>{
						if(res.code==0){
							uni.setStorageSync("userNum",res.result)
							uni.showToast({
								title:"注册成功",
								duration:1500,
								icon:"success"
							})
							setTimeout(()=>{
								uni.reLaunch({
									url: '/pages/index/index'
								})
							},1500)
						}else{
							uni.showToast({
								title:res.message,
								duration:1500,
								icon:"none"
							})
						}
						
						console.log(res)
					})
				}
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	.ok{
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		margin-top: 20rpx;
		.red{
			color: #ED1C24;
		}
	}
	.xieyicon{
		width: 100%;
		height: 100vh;
		background-color: rgba($color: #000000, $alpha:0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		align-items:center;
		justify-content: center;
		.xieyibg{
			
			background-color: #FFFFFF;
			width: 500rpx;
			padding: 10rpx;
			border-radius: 5px;
			// border: 1px #c9161e solid;
			.title{
				text-align: center;
				font-size: 30rpx;
				color: #333;
			}
			.red{
				color: #c9161e;
			}
			.con{
				line-height: 42rpx;
			}
			.btns{
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-top: 20rpx;
				.btn1{
					width: 200rpx;
					height: 80rpx;
					border-radius: 10px;
					text-align: center;
					line-height: 80rpx;
					border: 2rpx #666666 solid;
					
				}
				.btn2{
					width: 200rpx;
					height: 80rpx;
					background-color: #c9161e;
					color: #FFFFFF;
					border-radius: 10px;
					text-align: center;
					line-height: 80rpx;
				}
			}
		}
	}
	
	.bbb{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background-color:#c0c2c4;
		z-index: 99;
		.buy {
			width: 70%;
			height: 500upx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			border-radius: 10px;
			background: url(../../static/image/zhuce.png) no-repeat;
			background-size: 100%;
			z-index: 99;
			.top1 {
				width: 100%;
				height: 100upx;
				text-align: center;
				box-sizing: border-box;
				margin: 250upx auto;
				color: #c9161e;
				image {
					margin-top: 20upx;
					width: 60upx;
					height: 60upx;
				}
			}
			.text {
				width: 100%;
				margin-top: 40upx;
				box-sizing: border-box;
				text-align: center;
				padding: 0 40upx 0 40upx;
				box-sizing: border-box;
				font-size: 40upx;
				.textc {
					color: #3C87DB;
					font-size: 34upx;
				}
			}
			.confirm-btn{
			  width: 430upx;
			  height: 76upx;
			  line-height: 76upx;
			  border-radius: 50px;
			  background: #c9161e;
			  color: #fff;
			  font-size: $font-lg;
			  position: absolute;
			  bottom: 30upx;
			  left: 50%;
			  transform: translate(-50%,0);
			  &:after{
			    border-radius: 100px;
			  }
			}
		}
	}
.container{
  padding-top: 60px;
  position:relative;
  width: 100vw;
  /*height: 100vh;*/
  overflow: hidden;
  background: #fff;
  .wrapper{
    position:relative;
  	width: 100vw;
    z-index: 90;
    background: #fff;
    padding-bottom: 40upx;
    .welcome{
      position:relative;
      left: 50upx;
      top: -90upx;
      font-size: 46upx;
      color: #555;
      text-shadow: 1px 0px 1px rgba(0,0,0,.3);
    }
    .input-content{
      padding: 0 60upx;
    }
    .input-item{
      display:flex;
      flex-direction: column;
      align-items:flex-start;
      justify-content: center;
      padding: 0 30upx;
      background:$page-color-light;
      height: 120upx;
      border-radius: 4px;
      margin-bottom: 50upx;
      &:last-child{
        margin-bottom: 0;
      }
      .tit{
        height: 50upx;
        line-height: 56upx;
        font-size: $font-sm+2upx;
        color: $font-color-base;
      }
      input{
        height: 60upx;
        font-size: $font-base + 2upx;
        color: $font-color-dark;
        width: 100%;
      }
    }
    .input-item-sms-code {
      position: relative;
      .sms-code-btn {
        position: absolute;
        right: 20upx;
		color: #111;
        bottom: 20upx;
        font-size: 28upx;
		z-index: 100;
      }
      .sms-code-resend {
        color: #999;
      }
    }
    .confirm-btn{
      width: 630upx;
      height: 76upx;
      line-height: 76upx;
      border-radius: 50px;
      margin-top: 70upx;
      background: $uni-color-primary;
      color: #fff;
      font-size: $font-lg;
      &:after{
        border-radius: 100px;
      }
    }
    .forget-section{
      font-size: $font-sm+2upx;
      color: $font-color-spec;
      text-align: center;
      margin-top: 40upx;
    }
  }
  .back-btn{
  position:absolute;
  left: 40upx;
  z-index: 9999;
  padding-top: var(--status-bar-height);
  top: 40upx;
  font-size: 40upx;
  color: $font-color-dark;
}
  .left-top-sign{
    font-size: 120upx;
    color: $page-color-base;
    position:relative;
    left: -16upx;
  }
  .right-top-sign{
    position:absolute;
    top: 80upx;
    right: -30upx;
    z-index: 95;
    &:before, &:after{
      display:block;
      content:"";
      width: 400upx;
      height: 80upx;
      background: #b4f3e2;
    }
    &:before{
      transform: rotate(50deg);
      border-radius: 0 50px 0 0;
    }
    &:after{
      position: absolute;
      right: -198upx;
      top: 0;
      transform: rotate(-50deg);
      border-radius: 50px 0 0 0;
      /* background: pink; */
    }
  }
  .register-section{
    margin: 30upx 0 50upx;
    width: 100%;
    font-size: $font-sm+2upx;
    color: $font-color-base;
    text-align: center;
    text{
      color: $font-color-spec;
      margin-left: 10upx;
    }
  }
}
.footer {
			width: 100%;
			text-align: center;
			margin: 20upx 0 20upx;
			font-size: $font-sm + 2upx;
			.protocol {
				color: $base-color;
				margin: 0 10upx;
			}
	}
</style>