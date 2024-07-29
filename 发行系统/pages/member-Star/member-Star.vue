<template>
	<view class="body">
		<view class="top">
			<view class="title">
				会员星级
				<view class="fan" @click="fan()">
					<image src="../../static/image/fanhuizuo.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	
		<view class="conter">
		<view class="first">
			<view class="one">
				<image src="../../static/image/vip11.png" mode=""></image>
			</view>
			<view class="two">
				项目投资额:
			</view>
			<view class="three">
				{{qian}}
			</view>
		</view>
		<view class="first">
			<view class="one">
				<image src="../../static/image/vip12.png" mode=""></image>
			</view>
			<view class="two">
				项目风险度:
			</view>
			<view class="three">
				<uniRate disabled="true" :value="feng" size="20" activeColor="#c9161e" v-if="feng!=''"></uniRate>
			</view>
		</view>
		<view class="first">
			<view class="one">
				<image src="../../static/image/vip13.png" mode=""></image>
			</view>
			<view class="two">
				项目收益率:
			</view>
			<view class="three">
				<uniRate disabled="true" :value="shou" size="20" activeColor="#c9161e" v-if="shou!=''"></uniRate>
			</view>
		</view>
		<view class="first">
			<view class="one">
				<image src="../../static/image/vip14.png" mode=""></image>
			</view>
			<view class="two">
				综合评价星级:
			</view>
			<view class="three">
				<uniRate disabled="true" :value="xin" size="20" activeColor="#c9161e" v-if="xin!=''"></uniRate>
			</view>
		</view>
					
		</view>
	</view>
	
</template>

<script>
	import uniRate from '@/components/uni-rate/uni-rate1.vue'
	import {uploadFiles,categoryList,allUserEnum,getUserInfo,saveOrUpdateUserInfo} from "@/api/user.js";
	export default {
		components: {uniRate},
		data() {
			return {
				index10:"",
				index5:"",
				index9:"",
				index11:""
			}
		},
		onLoad() {
			this.initData2();
		},
		computed:{
			qian(){
				if(this.index5==1){
					return "10-100万"
				}
				if(this.index5==2){
					return "100-500万"
				}
				if(this.index5==3){
					return "500-1000万"
				}
				if(this.index5==4){
					return "1000-5000万"
				}
				if(this.index5==5){
					return "5000万以上"
				}
				
			},
			feng(){
					return this.index9
			},
			shou(){
				return this.index10
			},
			xin(){
				return this.index11
			}
			
		},
		watch:{
			index10(n,o){
				return n;
			}
		},
		methods: {
			fan() {
				console.log("231")
				uni.navigateBack({
					delta:1
				})
			},
			async initData2() {
				this.userInfo = uni.getStorageSync('userNum') || {};
				this.token = uni.getStorageSync('userNum') || undefined;
				if (this.token) {
			if (uni.getStorageSync('cartNum')) {
				if (uni.getStorageSync('cartNum') != 0) {
								uni.setTabBarBadge({
									index: 3,
									text: uni.getStorageSync('cartNum').toString(),
								});
								
						  } else {
							uni.removeTabBarBadge({index: 3});
						  }
						} else {
			  uni.removeTabBarBadge({index: 3});
			}
				} else {
			    this.loading = false;
			    uni.removeTabBarBadge({index: 3});
				};
				if(uni.getStorageSync("userNum").id = '') {
					return
				}else {
					this.$get(`${getUserInfo}`, {id : uni.getStorageSync("userNum").id } ).then(r => {
						console.log(r)
							if( r.result.investable_funds == null) {
								this.index5 = 1
							}else {
								this.index5 = r.result.investable_funds//可投资金额
							}
							if( r.result.investable_risk == null) {
								this.index9 = 1//项目风险度
							}else {
								this.index9 = r.result.investable_risk
							}
							if( r.result.investable_income == null) {
								this.index10 = 1
							}else {
								this.index10 = r.result.investable_income//收益率
							}
							this.index11=(this.index9+this.index10+this.index5)/3
					}).catch((err) => {
					});
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
  .body{
		background: url(../../static/image/vipnumber.png);
    height: 100vh;
    width: 100%;
    background-size: 100% 100%;
	}
	
	//头部
	.top {
		width: 100%;
		height: 100upx;
		margin-bottom: 60upx;
		/*#ifndef h5*/
		padding-top: 40rpx;
		/*#endif*/
		// background: url(../../static/image/topbgc.png) no-repeat left 0 fixed;
		// background-size: 100% 250upx;
		// margin-bottom: 40upx;
		.title {
			position: relative;
			text-align: center;
			color: #FFFFFF;
      font-size: 34rpx;
      font-weight: 400;
			line-height: 100upx;
		}
		.fan {
			position: absolute;
			left: 8upx;
			top: 8upx;
			width: 80upx;
			height: 80upx;
			image {
        width: 20upx;
        height: 20upx;
			}
		}
	
	}
	.conter {
		// display: flex;
		.first {
			float: left;
			background: url(../../static/image/vipnum1.png) no-repeat;
			margin-left: 40upx;
			margin-bottom: 30upx;
			width: 40%;
      background-size: 100% 100%;
			height: 255upx;
			.one {
				width: 42upx;
				height: 42upx;
				line-height: 40upx;
				margin: 0 auto;
				margin-top: 40upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
			.two {
				text-align: center;
				color: #FFFFFF;
				font-size: 30upx;
				margin-top: 20upx;
			}
			.three {
				display: flex;
				justify-content: center;
				margin: 0 auto;
				text-align: center;
				color: #FFFFFF;
				font-size: 36upx;
				margin-top: 20upx;
				.uni-rate {
					margin: 0 auto;
					margin-left: 50%;
					transform: translate(-50%);
					margin-top: 30upx;
				}
			}
		}
	}
  /* #ifdef APP-PLUS */
  .top {
    width: 100%;
    height: 160upx;
    margin-bottom: 60upx;
    padding-top: 60upx;
    .title {
      position: relative;
      text-align: center;
      color: #FFFFFF;
      line-height: 100upx;
      font-size: 34rpx;
      font-weight: 400;
    }
    .fan {
      position: absolute;
      left: 8upx;
      top: 8upx;
      width: 80upx;
      height: 80upx;
      image {
        width: 20upx;
        height: 20upx;
      }
    }

  }
  /* #endif */
</style>
