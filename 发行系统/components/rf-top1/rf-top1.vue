<template>
	<view class="top">
		<view class="title">
			{{headNavigationTitle}}
			<view class="fan" @click="fan()">
				<image src="../../static/image/fanhuizuo.png" mode="widthFix"></image>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props: {
			// headNavigation:{
			// 	type: String
			// },
			// headNavigationType:{
			// 	type: String
			// },
			headNavigationTitle:{
				type: String
			},
			// headNavigationRight:{
			// 	type: Boolean
			// },
		},
		data () {
			return {
				// mt:0,
				// NavigationHeight:'100upx',
				// NavigationPadding:'0upx',
			}
		},
		created(){
			// // #ifdef APP-PLUS
			
			// switch (uni.getSystemInfoSync().platform) {
			// 	case 'android':
			// 		this.mt = '50upx';
			// 		this.NavigationHeight = '150upx';
			// 		this.NavigationPadding = '50upx';
			// 		break;
			// 	case 'ios':
			// 		this.mt = '70upx';
			// 		break;
			// }
			// // #endif
		},
		methods:{
			fan() {
				this.$emit("fan","")
			},
		
		}
	}
</script>

<style lang="scss" scoped>
	//头部
	.top {
		width: 100%;
		height: 100upx;
		background: url(../../static/image/topbgc.png) no-repeat left 0 fixed;
		background-size: 100% 250upx;
		margin-bottom: 40upx;
		.title {
			position: relative;
			text-align: center;
			color: #FFFFFF;
			line-height: 100upx;
			font-size: 32upx;
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

  /* #ifdef APP-PLUS */
  .top {
    width: 100%;
    height: 160upx;
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
