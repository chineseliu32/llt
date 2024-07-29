<template>
	<view class="ttttt">
		<!-- <topSearch headNavigationTitle="项目详情" @fan="fan"></topSearch> -->
		<!--顶部搜索导航栏-->
		
		
		<view class="conter">
			<view class="last">
				<rf-search-bar
				    @link="toIndex"
				    @search="toSearch"
				    :icon="'iconxiatubiao--copy'"
				    :title="' '"
				    :placeholder="hotSearchDefault"/>
			
			</view>
			<view class="none">
				<view class="cone">
					<view class="left">
						<image src="../../static/image/li.png" mode=""></image>
					</view>
					<view class="right">
						<view class="tpp">
							<view class="one">
								资金需求
							</view>
							-
							<view class="tow">
								智慧城市建设
							</view>
						</view>
						<view class="label">
							餐饮
						</view>
						<view class="label">
							火锅
						</view>
						<view class="num">
							<text class="o1">100万</text>
							<text class="o2">上海</text>
							<text class="o3">2020/10/22</text>
						</view>
						
					</view>
				</view>
		
				<view class="cone">
					<view class="left">
						<image src="../../static/image/li.png" mode=""></image>
					</view>
					<view class="right">
						<view class="tpp">
							<view class="one">
								资金需求
							</view>
							-
							<view class="tow">
								智慧城市建设
							</view>
						</view>
						<view class="label">
							餐饮
						</view>
						<view class="label">
							火锅
						</view>
						<view class="num">
							<text class="o1">100万</text>
							<text class="o2">上海</text>
							<text class="o3">2020/10/22</text>
						</view>
						
					</view>
				</view>
			</view>

		</view>
	<rf-foot is_indexx1="2"></rf-foot>
	</view>
</template>

<script>
	import rfSearchBar from '@/components/rf-search-bar/rf-search-bar';
	import uniRate2 from '@/components/rf-foot/rf-foot.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import topSearch from "@/components/rf-top/rf-top.vue"
	export default {
		components: {topSearch,uniRate,uniRate2},
		data() {
			return {
				in_lst: 1,
				 hotSearchDefault: '请输入关键字', 
			}
		},
		methods: {
		
			// 跳转至搜索详情页
			toSearch() {
				uni.navigateTo({
					url: `../index/search?search=${JSON.stringify(this.search)}`
				})
			},
			// 跳转至分类页
			toIndex() {
				uni.reLaunch({
					url: `/pages/index/index`
				})
			},
			fan() {
				console.log("231")
				uni.navigateBack({
					delta:1
				})
			},
			list1(type) {
				this.in_lst = type
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	//内容
	.conter {
		
		.topp {
			margin-bottom:30upx;
			width: 90%;
			margin-left: 40upx;
			height: 60upx;
			background: url(../../static/image/index13.png) no-repeat;
			background-size: 100%;
			.zhi {
				float: left;
				width: 20upx;
				height: 26upx;
				margin-top: 4upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.toppp {
			margin-bottom:30upx;
			width: 90%;
			margin-left: 40upx;
			height: 60upx;
			background: url(../../static/image/index14.png) no-repeat;
			background-size: 100%;
			.zhi {
				float: left;
				width: 20upx;
				height: 26upx;
				margin-top: 4upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		.none {
			width: 100%;
			margin-top: 30upx;
			.cone {
				position: relative;
				display: flex;
				height: 200upx;
				margin-bottom:20upx;
				border-bottom: 20upx solid #F5F9FF;
				.left {
					width: 180upx;
					height: 180upx;
					margin-right: 20upx;
					margin-left: 20upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.right {
					width: 75%;
					.tpp {
						color: #333333;
						font-size: 38upx;
						.one {
							display: inline-block;
							font-size: 34upx;
						}
						.tow {
							display: inline-block;
							font-size: 34upx;
						}
					}
					.num {
						font-size: 25upx;
						margin-top: 10upx;
						color: #969696;
						margin-top: 20upx;
						.o1 {
							margin-right: 8upx;
							color: #FF1100;
							font-size: 36upx;
						}
						.o2 {
							margin-right: 8upx;
							margin-left: 20upx;
							color: #666666;
						}
						.o3 {
							margin-left: 200upx;
							color: #333333;
						}
					}
					.label {
						margin-top: 20upx;
						width: 100upx;
						height: 34upx;
						display: inline-block;
						font-size: 24upx;
						background:rgba(0,92,255,0.2);
						margin-right: 20upx;
						line-height: 34upx;
						text-align: center;
						color: #c9161e;
						border-radius: 5upx;
					}
				}
			}
		}
	
		.under {
			display: flex;
			width: 100%;
			height: 100upx;
			position: absolute;
			bottom: 0;
			border-top: 8upx solid #F6F6F6;
			.collect {
				width: 30%;
				line-height: 100upx;
				display: inline-block;
				margin-left: 30upx;
				image {
					width: 50upx;
					height: 50upx;
					display: inline-block; 
					vertical-align: middle;
					margin-right: 20upx;
				}
				text {
					font-size: 28upx;
				}
			}
			.right {
				width: 100%;
				color: #FFFFFF;
				line-height: 100upx;
				text-align: center;
				font-size: 32upx;
				border-radius: 10upx;
				background:linear-gradient(180deg,rgba(55,127,255,1) 0%,rgba(0,92,255,1) 100%);
			}
		}
	}

</style>
