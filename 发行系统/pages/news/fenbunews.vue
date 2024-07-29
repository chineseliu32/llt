<template>
	<view>
		<view v-if="xilist.length>0" class="itembox" >
			<view v-for="(item,index) in xilist" :key="index" class="xitem" @click="tox(item)" >
				<view class="xtitle">
					<text>{{item.type | getstatus}}</text>
					<text>{{item.is_read | gettype}}</text>
				</view>
				<view>{{item.content}}</view>
				<view class="time">{{item.create_time | getLocalTime}}</view>
			</view>
		</view>
		<view class="conter" v-else>
			<view class="image" align= "center">
				<image src="../../static/image/newsno.png" mode=""></image>
			</view>
			<view class="xx">
				暂无信息
			</view>
		</view>
	</view>
</template>

<script>
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
		xitongnum
	} from "@/api/user.js";
	import moment from '@/utils/moment';
	export default{
		data(){
			return{
				num:0,
				flag:true,
				xilist:[]
			}
		},
		filters:{
			getLocalTime(ns) {
			  return moment(ns).format('YYYY-MM-DD HH:mm')
			},
			gettype(data){
				if(data==0){
					return "未读"
				}
				if(data==1){
					return "已读"
				}
			},
			getstatus(data){
				if(data==1){
					return "新的系统消息"
				}
				if(data==2){
					return "新的项目匹配"
				}
			}
		},
		onLoad() {
			this.getxilist()
		},
		onReachBottom() {
			if(this.flag){
				this.getxilist()
			}
		},
		methods:{
			tox(type){
				uni.navigateTo({
					url:"./xnewS?id="+type.id
				})
			},
			async getxilist(){
				this.num++;
				let res=await this.get(fenbulist,{userId:uni.getStorageSync("userNum").id,pageNum:this.num});
				console.log("分布消息",res)
				if(res.code==0){
					if(res.result.list.length<10){this.flag==false}
					res.result.list.forEach(item=>{
						this.xilist.push(item)
					})
				}
			},
			xiang(type) {
				console.log(type)
				uni.navigateTo({
					url:'../index/activityid?id='+type+"&type="+"type"
				})
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.itembox{
			padding-bottom: 150rpx;
		}
		.xitem{
			width: 700rpx;
			margin-left: 25rpx;
			// border: 2rpx #999 solid;
			box-shadow: 0 0  5px 0 #e1e1e1;
			margin-bottom: 20rpx;
			border-radius: 10rpx;
			padding: 10rpx;
			color: #999; 
		}
		.xtitle{
			text-align: center;
			align-items: center;
			display: flex;
			justify-content: space-between;
			color: #333;
		}
		.xtitle>text:nth-of-type(1){
			font-size: 30rpx;
		}
		.xtitle>text:nth-of-type(2){
			font-size: 28rpx;
			color: #EC3E60;
		}
		.time{
			text-align: right;
			color: #999;
			font-size: 26rpx;
		}
		.xuanze {
			position: fixed;
			width: 100%;
			height: 100%;
			top: 0;
			background-color: rgba(0,0,0,0.5);
			z-index: 19;
			.conter1 {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.one1 {
					width: 40%;
					height: 80upx;
					margin-right: 2.5%;
					margin-left: 6%;
					margin-top: 40upx;
					
					.one11 {
						width: 90%;
						height: 80upx;
						text-align: center;
						font-size: 30upx;
						line-height: 80upx;
						border:1px solid #CCCCCC ;
					}
					.one111 {
						width: 90%;
						height: 80upx;
						color: #FFFFFF;
						text-align: center;
						font-size: 30upx;
						line-height: 80upx;
						background:linear-gradient(180deg,rgba(68,135,255,1) 0%,rgba(0,92,255,1) 100%);
						border:1px solid #CCCCCC ;
					}
				}
			}
			.foott {
				width: 84%;
				height: 100upx;
				margin: 0 auto;
				background:linear-gradient(180deg,rgba(68,135,255,1) 0%,rgba(0,92,255,1) 100%);
				border-radius:8upx;
				line-height: 100upx;
				color: #FFFFFF;
				margin-top: 60upx;
				margin-left: 55upx;
				text-align: center;
			}
			.one {
				position: fixed;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				width: 600upx;
				height: 700upx;
				background-color: #FFFFFF;
				border-radius: 20upx;
				.top {
					position: relative;
					width: 100%;
					height: 100upx;
					display: inline-block;
					color: #333333;
					font-size: 34upx;
					border-bottom: 1px solid #F6F6F6;
					line-height: 100upx;
					text-align: center;
					padding: 0;
					.cha {
						position: absolute;
						top: 0;
						right: 30upx;
						width: 30upx;
						height: 30upx;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
		//头部
		.top {
			width: 100%;
			height: 360upx;
			background: url(../../static/image/news5.png) no-repeat left 0 fixed;
			background-size: 100% 230upx;
			margin-bottom: 40rpx;
			.title {
				text-align: center;
				color: #FFFFFF;
				padding-top: 30upx;
	    font-weight: 700;
	    font-size: 16px;
			}
			.co-n {
				width: 100%;
				display: flex;
				padding-top: 100upx;
				.co-1 {
					position: relative;
					width: 25%;
					height: 160upx;
					display: inline-block;
					text-align: center;
					.img {
						width: 140upx;
						padding-left: 45upx;
						height: 100upx;
						image {
							width: 100%;
							height: 100%;
						}
					}
					.cnn {
						font-size: 30upx;
					margin-top: 10upx;
					}
					.youyou {
						width: 35upx;
						height: 35upx;
						line-height: 35upx;
						color: #FFFFFF;
						position: absolute;
						right: 40upx;
						top: 0;
						font-size: 30upx;
						background:linear-gradient(180deg,rgba(255,0,0,1) 0%,rgba(240,0,0,1) 100%);
						border-radius: 50%;
					}
				}
			}
		}
		//底部
		.foot {
			z-index: 9;
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 120upx;
			display: flex;
			background-color: #FFFFFF;
			.index {
				width: 20%;
				height: 100%;
				margin-top: 20upx;
				// margin-left: 30upx;
				.img {
					image {
						display: block;
						margin: 0 auto;
						width: 50upx;
						height: 50upx;
					}
				}
				.text {
					margin-top: 10upx;
					font-size: 20upx;
					text-align: center;
				}
				.text1 {
					color: #c9161e;
					margin-top: 10upx;
					text-align: center;
					font-size: 20upx;
				}
			}
			.project {
				width: 20%;
				height: 100%;
				margin-top: 20upx;
				// margin-left: 30upx;
				.img {
					image {
						display: block;
						margin: 0 auto;
						width: 50upx;
						height: 50upx;
					}
				}
				.text {
					margin-top: 10upx;
					text-align: center;
					font-size: 20upx;
				}
				.text1 {
					color: #c9161e;
					margin-top: 10upx;
					text-align: center;
					font-size: 20upx;
				}
			}
			.release {
				width: 20%;
				height: 100%;
				image {
					display: block;
					margin: 0 auto;
					width: 100upx;
					height: 100upx;
					margin-top: 50%;
					transform: translate(0,-60%);
				}
			}
			.news {
				width: 20%;
				height: 100%;
				margin-top: 20upx;
				// margin-left: 30upx;
				.img {
					image {
						display: block;
						margin: 0 auto;
						width: 50upx;
						height: 50upx;
					}
				}
				.text {
					margin-top: 10upx;
					font-size: 20upx;
					text-align: center;
				}
				.text1 {
					color: #c9161e;
					margin-top: 10upx;
					text-align: center;
					font-size: 20upx;
				}
			}
			.my {
				width: 20%;
				height: 100%;
				margin-top: 20upx;
				// margin-left: 30upx;
				.img {
					image {
						display: block;
						margin: 0 auto;
						width: 50upx;
						height: 50upx;
					}
				}
				.text {
					margin-top: 10upx;
					font-size: 20upx;
					text-align: center;
				}
				.text1 {
					color: #c9161e;
					margin-top: 10upx;
					text-align: center;
					font-size: 20upx;
				}
			}
		}
		//底部
		.conter {
			width: 100%;
			.image {
				margin-top: 20%;
				// margin-left: 8%;
			}
			.xx {
				text-align: center;
				color: #606060;
				font-size: 30upx;
			}
		}
	/* #ifdef APP-PLUS */
	.top {
	  padding-top: 60upx;
	  .title{
	    font-size: 34rpx;
	    font-weight: 300;
	  }
	}
	
	/* #endif */
	
		/*  #ifdef H5 || MP-WEIXIN*/
		// .top {
		// 	text-align: center;
		// 	color: #c9161e;
		// 	padding-top: 60upx;
		// 	font-weight: bolder;
		// 	margin-bottom: 50upx;
		// }
		/* #endif */
</style>
