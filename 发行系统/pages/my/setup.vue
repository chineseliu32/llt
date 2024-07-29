<template>
	<view>
		<view class="conter">
			<!-- <view class="lst" @click="ziliao()">
				<view class="img">
				</view>
				<view class="lt">
					用户名称
				</view>
				
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
				<view class="name">
					{{userlist.nick_name}}
				</view>
			</view> -->
			<view class="lst" @click="ziliao()">
				<view class="img">
				</view>
				<view class="lt">
					个人资料
				</view>
				
				<view class="img1">
					<image src="../../static/image/jiantou.png" mode="widthFix"></image>
				</view>
				<view class="name">
					
				</view>
			</view>
		</view>
		<button class="confirm-btn" @click="toLogout()">安全退出</button>
	</view>

</template>

<script>
	import {
		mapMutations, mapState
	} from 'vuex';
	import {refreshToken} from '@/api/login.js'
	import {getUserInfo} from '@/api/user.js'
	export default {
		data() {
			return {
				user_info: {},
				userlist : {}
			}
		},
		onLoad(options) {
			this.initData()
			uni.getStorageSync("userNum")
			
		},
		methods: {
			ziliao() {
				uni.navigateTo({
					url:'../my/c-userinfo'
				})
			},
			//退出登录
			...mapMutations(['login', 'logout']),
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.get(refreshToken).then(r => {
									this.logout();
									uni.reLaunch({
										// #ifndef MP-WEIXIN
										url: '/pages/login/login'
										// #endif
										// #ifdef MP-WEIXIN
										url: '/pages/login/wxlogin',
										// #endif
								})
							})
				    	}
				    }
				});
			},
			async initData() {
					this.$get(`${getUserInfo}`, {id : uni.getStorageSync("userNum").id } ).then(r => {
						console.log(r)
							this.userlist = r.result
							this.user_info = r.result
					}).catch((err) => {
						console.log(err)
					});
				},
			password() {
				uni.navigateTo({
					url:'username'
				})
			},
			pay() {
				uni.navigateTo({
					url:'pay'
				})
			},
			fan() {
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
   .confirm-btn{
      width: 630upx;
      height: 76upx;
      line-height: 76upx;
      border-radius: 50px;
      margin-top: 70upx;
      background: #c9161e;
      color: #fff;
      font-size: $font-lg;
      &:after{
        border-radius: 100px;
      }
    }
	page {
		width: 100%;
		// background:url(../../static/image/mybg.png) no-repeat left 0 fixed ;
		background-size: contain;
		// background-color: rgba(245,249,255,1);
	}

	.conter {
		background-color:#FFFFFF;
		.lst {
			width: 100%;
			height: 100upx;
			line-height: 100upx;
			border-bottom: 1px solid #f3f3f3;
			// background-color: pink;
			.name{
				float: right;
				margin-right: 40upx;
				font-size: 30upx;
			}
			.phone {
				float: right;
				margin-right: 40upx;
				font-size: 30upx;
			}
			.lt {
				display: inline-block;
				color: #333333;
				font-size: 30upx;
				line-height: 100upx;
				margin-left: 30upx;
			}
			.img1 {
				width: 20upx;
				height: 20upx;
				float: right;
				margin-right: 40upx;
				margin-top: 5upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
