<template>
	<view>
		<!-- <lb-picker @confirm="makecity" :props="myProps" :list="citylist" :mode="selector" :level="leve2">
			<view class="cityname" style="margin-left: 20rpx;">{{cityName}}</view>
		</lb-picker> -->
		<view class="view" v-if="banner_list.length>0">
			<view class="vv" v-for="(item,index) in banner_list" :key="index" @click="xiang(item.id)" v-if="type==0">
				<image :src="item.activity_banner" mode=""></image>
				<view class="cnm">
					{{item.activity_title}}
				</view>
				<view class="numbox">
					<text v-if="item.participated_num!=item.team_num">已报名人数：{{item.participated_num}}/{{item.team_num}}</text>
					<text v-if="item.participated_num>=item.team_num">报名人数已满</text>
				</view>
				<view class="zhuangtai">
					<text v-if="item.online_state==0">未开始</text>
					<text v-if="item.online_state==1">报名中</text>
					<text v-if="item.online_state==2">已结束</text>
				</view>
				<view class="cnn">
					<text class="one">{{item.begin_time}}</text>
					<text class="two">-</text>
					<text class="three">{{item.end_time}}</text>
				</view>
			</view>
			<view class="vv" v-for="(item,index) in banner_list" :key="index" @click="xiang(item.id)" v-if="type==1">
				<image :src="item.activity_banner" mode=""></image>
				<view class="cnm">
					{{item.activity_title}}
				</view>
				<view class="numbox">
					<text v-if="item.participated_num!=item.team_num">已报名人数：{{item.participated_num}}/{{item.team_num}}</text>
					<text v-if="item.participated_num>=item.team_num">报名人数已满</text>
				</view>
				<view class="zhuangtai">
					<text v-if="item.online_state==0">未开始</text>
					<text v-if="item.online_state==1">报名中</text>
					<text v-if="item.online_state==2">已结束</text>
				</view>
				<view class="cnn">
					<text class="one">{{item.begin_time}}</text>
					<text class="two">-</text>
					<text class="three">{{item.end_time}}</text>
				</view>
			</view>
		</view>
		<view class="nohd" v-if="banner_list.length==0">
			<image src="../../static/nohuod.png"></image>
			<view>当前城市暂无活动~~</view>
		</view>
	</view>
</template>

<script>
	import {
		activity,
		activeadd
	} from '../../api/index'
	import {
		shaixuan
	} from "@/api/user.js";
	import LbPicker from '@/components/lb-picker';
	export default {
		components: {
			LbPicker
		},
		data() {
			return {
				myProps: {
					label: 'text',
					value: 'id',
					children: 'ch'
				},
				selector: "multiSelector",
				leve2: 4,
				banner_list: [],
				isshow: false,
				id: '',
				flag: true,
				type: 0,
				num: 0,
				citylist: [],
				activityCity: '',
				cityName: ""
			}
		},
		onLoad(e) {
			if (e.type) {
				this.type = e.type
			}
			// #ifdef H5
			this.initData();
			// #endif
			// this.getShaiXuan()
			// #ifndef H5
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: (res) => {
					this.address(res.latitude, res.longitude)
					console.log(res)
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
				}
			});
			// #endif
		},
		onShow() {

		},
		//触底加载
		onReachBottom() {
			if (this.flag) {
				this.initData()
			}
		},
		methods: {
			//地址解析
			address(lat, lng) {
				uni.request({
					url: "https://apis.map.qq.com/ws/geocoder/v1/",
					method: "GET",
					data: {
						key: "7GDBZ-AXP6U-LMMVP-2WTTQ-N7NT5-64FJS",
						location: lat + "," + lng
					},
					success: (e) => {
						this.cityName = e.data.result.address_component.city
						this.initData();
						console.log(e)
						console.log(this.cityName)
					}
				})
			},
			async getShaiXuan() {
				let res = await this.get(shaixuan, {});
				if (res.code == 0) {
					console.log(res)
					let arr = res.result.professionalFieldTreeList["6"];
					let arr1 = [];
					arr.forEach(item => {
						item.value = item.id;
						item.label = item.text
						if (item.pid == "c6") {
							arr1.push(item)
						}
					});
					let arr2 = [];
					arr1.forEach(item => {
						item.children = [];
						arr.forEach(it => {
							if (it.pid == item.id) {
								item.children.push(it)
							}
						});
					})
					this.hangyelist = arr1;

					let cityarr = res.result.cityTreeList;
					let crr = [];
					cityarr.forEach(item => {
						if (item.type == 0) {
							crr.push(item)
						}
					})
					crr.forEach(item => {
						item.ch = [];
						cityarr.forEach(it => {
							if (it.pid == item.id) {
								item.ch.push(it)
							}
						})
					})
					crr.forEach(item => {
						item.ch.forEach(ich => {
							if (ich.id == 1) {
								ich.ch = [];
								cityarr.forEach(it => {
									if (it.pid == 1) {
										ich.ch.push(it)
									}
								})
							}
						})
					})
					crr.forEach(item => {
						if (item.id == 5000) {
							item.ch.forEach(ich => {
								if (ich.id == 1) {
									ich.ch.forEach(i => {
										i.ch = [];
										cityarr.forEach(it => {
											if (it.pid == i.id) {
												i.ch.push(it)
											}
										})
									})
								}
							})
						}

					})
					this.citylist = crr;
					console.log("地区", this.citylist)
				} else {
					this.code(res)
				}
			},
			// 选择城市
			makecity(e) {
				// if(e.item[e.item.length-1].type==0){
				// 	this.cityType=e.item[e.item.length-1].type
				// 	console.log("周")
				// }
				// if(e.item[e.item.length-1].type==1){
				// 	this.cityType=e.item[e.item.length-1].type;
				// 	this.city=""//城市
				// 	this.province=""//省份
				// 	this.country=e.item[e.item.length-1].id//国家
				// 	this.continent=""//大洲
				// 	this.cityName=e.item[e.item.length-1].text
				// 	console.log("国")
				// }
				// if(e.item[e.item.length-1].type==2){
				// 	this.cityType=e.item[e.item.length-1].type
				// 	this.city=""//城市
				// 	this.province=e.item[e.item.length-1].id//省份
				// 	this.country=""//国家
				// 	this.continent=""//大洲
				// 	this.cityName=e.item[e.item.length-1].text
				// 	console.log("省")
				// }
				// if(e.item[e.item.length-1].type==3){
				// this.cityType=e.item[e.item.length-1].type
				this.activityCity = e.item[e.item.length - 1].id //城市
				// this.province=""//省份
				// this.country=""//国家
				// this.continent=""//大洲
				this.cityName = e.item[e.item.length - 1].text
				// console.log("市")
				// }
				console.log(e);
			},
			xiang(type) {
				this.id = type
				uni.navigateTo({
					url: './activityid?id=' + this.id
				})
			},
			initData() {
				this.num++;
				let data = {}
				data.pageNum = this.num
				if (this.type == 1) {
					data.userId = uni.getStorageSync("userNum").id
				}
				if (this.cityName != "") {
					data.cityName = this.cityName
				}
				this.$get(`${activity}`, data).then(r => {
					console.log(r)
					r.result.list.forEach(item => {
						this.banner_list.push(item)
					})
					if (r.result.list.length < 10) {
						this.flag = false
					}
					console.log(this.banner_list);
				}).catch((err) => {

				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.nohd{
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		image{
			width:400rpx;
			height:400rpx;
		}
		view{
			text-align: center;
		}
	}
	.numbox {
		font-size: 28rpx;
		color: #666666;
		line-height: 60rpx;
	}

	.zhuangtai {
		position: absolute;
		top: -4rpx;
		left: 0;
		padding: 0 !important;

		text {
			background-color: #c9161e;
			color: #fff;
			padding: 4rpx 6rpx;
			font-size: 26rpx;
		}
	}

	.label {
		width: 100upx;
		height: 34upx;
		display: inline-block;
		font-size: 24upx;
		background: rgba(0, 92, 255, 0.2);
		margin-right: 20upx;
		line-height: 34upx;
		text-align: center;
		float: right;
		margin-top: 7upx;
		color: #c9161e;
		border-radius: 5upx;
	}

	.view {
		display: flex;
		white-space: normal;
		flex-wrap: wrap;
		padding: 10upx 30upx 0 10upx;
		margin-bottom: 120upx;

		.vv {
			width: 47%;
			// height: 360upx;
			margin-left: 20upx;
			box-shadow: 0px 2px 4px rgba(181, 181, 181, 0.16);
			margin-bottom: 20upx;
			position: relative;

			image {
				width: 100%;
				height: 240upx;
			}

			.cnn {
				// margin-top: 20upx;
				width: 100%;
				height: 40upx;
				line-height: 40upx;
				float: left;

				.one {
					float: left;
					font-size: 24upx;
					color: #666666;
					height: 40upx;
					line-height: 40upx;
				}

				.two {
					float: left;
					font-size: 24upx;
					color: #666666;
					height: 40upx;
					line-height: 40upx;
				}

				.three {
					font-size: 30upx;
					float: left;
					font-size: 24upx;
					color: #666666;
					height: 40upx;
				}

				.si {
					float: right;
					font-size: 30upx;
					font-size: 24upx;
					color: #666666;
					height: 40upx;
				}
			}

			.cnm {
				color: #333333;
				height: 40upx;
				font-size: 32upx;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
