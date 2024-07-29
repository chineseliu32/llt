<template>
	<view>
		<view class="none" v-for="(item,index) in list" :key="index" @click="xiang(item)">
			<view class="cone">
				<view class="left">
					<image :src="item.img_url | imgurl" mode="aspectFill"></image>
				</view>
				<view class="right">
					<view class="tpp">
						<!-- <view class="one" v-if="type==6">
							{{item.organization_name}}
						</view> -->
						<view class="one">
							{{item.projectName}}
						</view>
					</view>
				
					<view class="num">
						<text class="o2">订单编号:{{item.order_no}}</text>
					</view>
					<view class="num">
						<text class="o2">付款时间:{{item.create_time |formatTimestamp}}</text>
						<view class="label"  style="background-color:orange; color: dimgray;"  v-if="item.status==1">
							{{getstatus(item.status)}}
						</view>
						<view class="label"  style="background-color:green; color: white;" v-else-if="item.status==2">
							{{getstatus(2)}}
						</view>
						<view class="label"  style="background-color:red; color: black;" v-else-if="item.status==3">
							{{getstatus(3)}}
						</view>
						<view class="label"  style="background-color:lightskyblue; color: white;" v-else>
							{{getstatus(4)}}
						</view>
					</view>
					<view class="num">
						<text class="o2">单价:{{item.financingLimitRmb}}元</text>
						<text class="o2">申购数量:{{item.amount}}份</text>
						<text class="o2">总价:{{item.amount*item.financingLimitRmb}}元</text>
					</view>

				</view>
			</view>
		</view>
		<view class="conter" v-if="this.list == ''">
			<!-- <view class="conter" v-show="isshow"> -->
			<view class="image" align= "center">
				<image src="../../static/image/newsno.png" mode=""></image>
			</view>
			<view class="xx">
				暂无项目
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shengqing,
		getUserSubscriptionListApi
	} from "@/api/user.js"
	export default {
		data() {
			return {
				num: 0,
				flag: true,
				list: []
			}
		},
		onLoad() {
			this.getlist()
		},
		onReachBottom() {
			if (this.flag) {
				this.getlist();
			}
		},
		filters: {
			imgurl(val) {
				let arr = val.split(",");
				let url = arr[0]
				return url
			},
			num(e) {
				return parseInt(e)
			},

			formatTimestamp(timestamp) {
				const date = new Date(timestamp); // 注意要乘以1000，因为时间戳单位是秒而不是毫秒
				return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
			}

		},
		methods: {
			async getlist() {
				this.num++;
				let data = {
					pageNum: this.num,
					userId: uni.getStorageSync("userNum").id
				}
				let res = await this.get(getUserSubscriptionListApi, data);
				if (res.code == 0) {
					if (res.result.list.length < 10) {
						this.flag = false
					}
					res.result.list.forEach(item => {
						this.list.push(item)
					})
				}
			},
			// 点击跳转项目详情
			xiang(type) {
				console.log(type)
				let url = "";
				if (type.cooperateType == 1) {
					url = "../../pagesA/details/details"
				}
				if (type.cooperateType == 2) {
					url = "../../pagesA/details/details6"
				}
				if (type.cooperateType == 3) {
					url = "../../pagesA/details/details5"
				}
				if (type.cooperateType == 4) {
					url = "../../pagesA/details/details4"
				}
				if (type.cooperateType == 5) {
					url = "../../pagesA/details/details3"
				}
				if (type.cooperateType == 6) {
					url = "../../pagesA/details/details2"
				}
				uni.navigateTo({
					url: `${url}?id=${type.id}`
				})
			},
			getstatus(status)
			{
				let result = "";
				if(status==1)
				{
				result = "待确认";	
				}else if(status==2)
				{
					result = "申购成功";
				}
				else if(status==3)
				{
					result = "申购失败";
				}else if(status==4)
				{
					result = "部分申购";
				}
				return result;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.none {
		width: 100%;
		margin-top: 30upx;

		.cone {
			position: relative;
			display: flex;
			height: 240upx;
			margin-bottom: 20upx;
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
					height: 60upx;
					ext-overflow: -o-ellipsis-lastline;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;

					.one {
						display: inline-block;
						font-size: 30upx;
					}

					.tow {
						display: inline-block;
						font-size: 34upx;
					}
				}

				.num {
					font-size: 25upx;
					color: #969696;
					margin-top: 10upx;

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
					margin-top: 5upx;
					width: 100upx;
					height: 34upx;
					display: inline-block;
					font-size: 24upx;
					background: rgba(0, 92, 255, 0.2);
					margin-right: 20upx;
					margin-left: 20upx;
					line-height: 34upx;
					text-align: center;
					color: #c9161e;
					border-radius: 5upx;
				}
			}
		}
	}
	//内容
	.conter {
		.image {
			margin-top: 20%;
			// margin-left: 8%;
		}
		.xx {
			text-align: center;
			color: #606060;
			font-size: 30upx;
		}
		.last {
			.title1 {
				height: 100upx;
				white-space: nowrap;
				overflow:hidden;
				background:#fff;
				border-bottom: 3upx solid #f3f3f3;
				.uni-scroll-view::-webkit-scrollbar{
				   display:none;
				}
				.lt3 {
					position: relative;
					display: inline-block;
					color: #000;
					line-height: 100upx;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
				}
					
				.lt2 {
					position: relative;
					display: inline-block;
					line-height: 100upx;
					color: #c9161e;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
					background-size: 50% 10%;
				}
			}
			.title {
				height: 100upx;
				white-space: nowrap;
				overflow:hidden;
				background:#1066FF;
				.uni-scroll-view::-webkit-scrollbar{
				   display:none;
				}
				.lt1 {
					position: relative;
					display: inline-block;
					color: #FFFFFF;
					line-height: 100upx;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
				}
		
				.lt {
					position: relative;
					display: inline-block;
					line-height: 100upx;
					color: #FFFFFF;
					font-size: 30upx;
					margin-right: 30upx;
					margin-left: 20upx;
					background: url(../../static/image/project_1.png) no-repeat center bottom;
					background-size: 50% 10%;
				}
			}
		}
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
				height: 240upx;
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
						height: 100upx;
						ext-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						.one {
							display: inline-block;
							font-size: 30upx;
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