<template>
	<view class="list">
		<view class="www">
			<image :src="index_lists.activity_banner" mode="aspectFill"></image>
			<view class="top">
					{{index_lists.activity_title}}
			</view>    
			<view class="topp">
				<view class="one">
					<!-- {{index_lists.read_num}}浏览 -->
				</view>
				<view class="two">
					{{index_lists.update_time | time}}
				</view>
			</view>
			<view class="conter" v-html="index_lists.activity_content">
			</view>
			<view class="baomin" @click="ok" v-if="index_lists.online_state==1&&index_lists.user_id!=userID">报名</view>
			<view class="baomin1" @click="ok1(index_lists.online_state)" v-if="index_lists.online_state!=1&&index_lists.user_id!=userID">报名</view>
			<view class="baomin" @click="open" v-if="(index_lists.verify_status==9||index_lists.verify_status==10)&&index_lists.user_id==userID&&index_lists.index_lists==0">开启活动</view>
		</view>
	</view>  
</template>

<script>
	import {activityid,activeadd} from '../../api/index.js'
	import {openhuod} from '../../api/user.js'
	import {
		//获取分布消息详情
		fenbu,
		//我的分布消息列表
		fenbulist,
		// 我未读分布消息数量
		fenbunum,
		// 我的系统消息详情
		xitong,
		// 我的系统消息列表
		xitonglist,
		// 我的未读系统消息数量
		xitongnum,
		weixinpay,
		jiaofei,
	} from "@/api/user.js";
	import moment from '@/utils/moment';
	export default {
		components:{
		},
		data() {
			return {
				in_lest:'1',
				id : '',
				index_lists:[],
				flag:true,
				userID:uni.getStorageSync("userNum").id
			}
		},
		filters: {
		// 时间格式化
			time(val) {
				return moment(val ).format('YYYY-MM-DD HH:mm')
			},
		// 计算评论与追评时间
			againDay(val) {
				const day = moment(val.again_addtime * 1000).format('DD') - moment(val.created_at * 1000).format('DD');
				return day ? `${day}天后追加` : '当天追加'
			}
		},
		onLoad(option) {
			if(option.type){
				this.getfenbu(option.id)
			}else{
				this.id = option.id;
				
			}
		},
		onShow() {
			this.initData();
		},
		methods: {
			async open(){
				let res=await this.get(openhuod,{id:this.index_lists.id})
				
			},
			async getfenbu(id){
				let res=await this.get(fenbu,{
					userId:uni.getStorageSync("userNum").id,
					id:id
				});
				
				this.index_lists = res.result;
				console.log(this.index_lists)
				if(this.index_lists.participated_num==this.index_lists.team_num){
					console.log(this.flag)
					this.flag=false
				}
			},
			initData(){
				this.$get(`${activityid}`,{id : this.id} ).then(r => {
					this.index_lists = r.result;
					if(this.index_lists.participated_num==this.index_lists.team_num){
						this.flag=false
					}
				}).catch((err) => {
				});
			},
			ok1(e){
				if(e==0){
					uni.showToast({
						title:"活动未开始",
						icon:"none",
						duration:1500,
						mask:true
					})
				}
				if(e==2){
					uni.showToast({
						title:"活动已结束",
						icon:"none",
						duration:1500,
						mask:true
					})
				}
			},
			async ok(){
				if(this.flag==false){
					console.log(111111)
					uni.showToast({
						title:"人数已满，无法报名",
						icon:"none",
						duration:1500,
						mask:true
					})
					return false
				}
				let data={
					activityId:this.index_lists.id,
					userId:uni.getStorageSync("userNum").id,
					renewType:8
				}
				// let res=await this.get(jiaofei,data)
				// let re=await this.get(weixinpay,data)
				// app支付
				// #ifdef APP-PLUS
				let res=await this.get(activeadd,data)
				console.log(res)
				if(res.code==0){
					let ress=await this.get(jiaofei,data)
					console.log(ress)
					uni.requestPayment({
					    provider: 'wxpay',
					    orderInfo:JSON.stringify(ress.data), //微信、支付宝订单数据
					    success:res=> {
					        console.log('success:',res);
							if(res.channel.serviceReady){
								uni.showToast({
									title:"支付成功，报名成功",
									duration:1500,
									icon:'none',
									mask:true
								})
								setTimeout(()=>{
									uni.navigateBack({
										delta:1
									})
								},1500)
							}
					    },
					    fail:err=> {
							uni.showToast({
								title:"支付失败",
								icon:"none",
								duration:1500
							})
					        console.log('fail:' ,err);
					    }
					});
				}else if(res.code== -1 ){
					uni.showToast({
						title:"您已报名",
						duration:1500,
						mask:true
					})
				}else if(res.code== -2){
					uni.showToast({
						title:"报名成功",
						duration:1500,
						mask:true
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}
				// #endif
				// #ifdef MP-WEIXIN
				let res=await this.get(activeadd,data)
				console.log(res)
				if(res.code==0){
					let re=await this.get(weixinpay,data)
					uni.requestPayment({
					    provider: 'wxpay',
						timeStamp:re.data.timeStamp,
						nonceStr:re.data.nonceStr,
						package:re.data.package,
						signType: 'MD5',
						paySign:re.data.paySign,
					    success: function (res) {
					        uni.showToast({
					        	title:"支付成功，报名成功",
					        	duration:1500,
								icon:'none',
					        	mask:true
					        })
					        setTimeout(()=>{
					        	uni.navigateBack({
					        		delta:1
					        	})
					        },1500)
					    },
					    fail: function (err) {
					        console.log('fail:',err);
							uni.showToast({
								title:"支付失败",
								icon:"none",
								duration:1500
							})
					    }
					});
				}else if(res.code== -1 ){
					uni.showToast({
						title:"您已报名",
						duration:1500,
						mask:true
					})
				}else if(res.code== -2){
					uni.showToast({
						title:"报名成功",
						duration:1500,
						mask:true
					})
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1500)
				}
				// #endif
				// #ifdef H5
					let res=await this.get(activeadd,data)
					console.log(res)
					if(res.code==0){
						uni.showToast({
							title:"请在app支付活动经费",
							icon:'none',
							duration:1500,
							mask:true
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
					}else if(res.code== -1 ){
						uni.showToast({
							title:"您已报名",
							duration:1500,
							mask:true
						})
					}else if(res.code== -2){
						uni.showToast({
							title:"报名成功",
							duration:1500,
							mask:true
						})
						setTimeout(()=>{
							uni.navigateBack({
								delta:1
							})
						},1500)
					}
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	image{
		width: 100%;
		height:300rpx;
	}
	.baomin{
		width: 400rpx;
		height: 80rpx;
		background-color: #c9161e;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 100rpx;
		margin: 40rpx auto;
		text-align: center;
		line-height: 80rpx;
	}
	.baomin1{
		width: 400rpx;
		height: 80rpx;
		background-color: #999;
		color: #FFFFFF;
		font-size: 32rpx;
		border-radius: 100rpx;
		margin: 40rpx auto;
		text-align: center;
		line-height: 80rpx;
	}
	.list {
		padding: 20upx;
		.top {
				margin-top: 2rpx;
				margin-bottom: 10rpx;
				// margin-left: 20upx;
				width: 100%;
				display: inline-block;
				font-size: 36upx;
				text-align: center;
				font-weight: bolder;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				padding: 0;
		}
		.topp {
			width: 100%;
			margin: 20upx 0;
			height: 40upx;
			.one {
				float: left;
				color: #999999;
				font-size: 24upx;
			}
			.two {
				float: right;
				color: #999999;
				font-size: 24upx;
			}
		}
			
	}
	.conter {
		font-size: 32upx;
	}
		
	/*  #ifdef MP-WEIXIN*/
	.top {
		text-align: center;
		color: #c9161e;
		margin-top: 80upx;
		font-weight: bolder;
		margin-bottom: 50upx;
	}
	/* #endif */
</style>
