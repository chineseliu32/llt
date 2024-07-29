<template>
	<view>
		<!-- 头部 -->
		<view class="top">
			<view class="title">
				发布融资/借款项目
				<view class="fan" @click="fan()">
					<image src="../../static/image/fanhuizuo.png" mode=""></image>
				</view>
				<view class="save">
					保存
				</view>
			</view>
			
		</view>
		<!-- 上传图片 -->
		<view class="upload">
			<view class="one">
				<text>项目图片、视频</text>
				<text class="one-one">(图片1-5张)</text>
			</view>
			<view class="tow">
				
			</view>
		</view>
		<view class="conter">
			<form @submit="toUpdateInfo">
					<view class="lst">
						<view class="lt"> 
							主体名称:
						</view>
						<view class="lt1">
							<input class="lt11" type="text" value="" placeholder-style="color:#c9161e"  placeholder="请填写"/>
						</view>
						<view class="lt12">
							<image src="../../static/image/upload_jiantou.png" mode=""></image>
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							主体性质：
						</view>
						<view class="lt1">
							<picker @change="bindgenderChange" :value="gender" :range="array1">
								 <view class="uni-input">{{array1[gender] || '请选择性别'}}</view>
							</picker>
						</view>
					</view>
					<view class="lst">
						<view class="lt">
						年龄
						</view>
						<view class="lt1">
							<picker mode="date" :value="date" @change="bindDateChange">
								<view class="date" style="background: none;">{{ date || '请选择日期' }}</view>
							</picker>
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							实名认证:
						</view>
						<view class="lt1">
							已认证
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							所在城市:
						</view>
						<view class="lt1">
								<picker @change="bindPickerChange" :value="index" :range="array">
									 <view class="uni-input">{{array[index] || '请选择城市'}}</view>
								</picker>
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							所在行业:
						</view>
						<view class="lt1">
							XXX
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							行业经验:
						</view>
						<view class="lt1">
							XXX
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							职业经历:
						</view>
						<view class="lt1">
							XXX
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							行业类型:
						</view>
						<view class="lt1">
							XXX
						</view>
					</view>
					<view class="lst">
						<view class="lt">
							个性签名:
						</view>
						<view class="lt1">
							XXX
						</view>
					</view>
					<view class="button" formType="submit">
						保存
					</view>
				</form>
			</view>
			</view>
	
</template>

<script>
	import uniRate from '@/components/rf-foot/rf-foot.vue'
	import moment from '@/utils/moment';
	const graceChecker = require('@/common/graceChecker.js');
	import avatar from '@/components/rf-avatar/rf-avatar';
	export default {
		components: { avatar },
			data() {
				return {
					loadProgress: 0,
					CustomBar: this.CustomBar,
					profileInfo: {},
					avatar: null,
					genders: [
						{
							value: '0',
							name: '隐藏'
						},
						{
							value: '1',
							name: '男'
						},
						{
							value: '2',
							name: '女'
						}],
					date: moment().format('YYYY-MM-DD'),
					token: null,
					loading: true,
					index: 0,
					gender: 0,
					array1: ['男','女','隐藏' ],
					array: ['中国', '美国', '巴西', '日本'],
				};
			},
			methods:{
				fan() {
					console.log("231")
					uni.navigateBack({
						delta:1
					})
				},
				// 监听日期更改
				bindDateChange(e) {
					this.date = e.target.value
				},
				  bindPickerChange: function(e) {
				          console.log('picker发送选择改变，携带值为', e.target.value)
				         this.index = e.target.value
				   },
				   bindgenderChange: function(e) {
				           console.log('gender发送选择改变，携带值为', e.target.value)
				          this.gender = e.target.value
				    },
			}
	}
</script>

<style lang="scss" scoped>
	page {
		width: 100%;
		// background:url(../../static/image/mybg.png) no-repeat left 0 fixed ;
		background-size: contain;
		background-color: rgba(255,255,255,1);
	
	}
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
			font-family:PingFangSC-Regular,PingFang SC;
		}
		.fan {
			position: absolute;
			left: 18upx;
			top: 8upx;
			width: 30upx;
			height: 40upx;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.save {
			position: absolute;
			// float: right;
			right: 18upx;
			top: -0upx;
			width: 100upx;
			height: 60upx;
			font-size: 32upx;
		}
	
	}
	
	//上传图片
	.upload {
		width: 100%;
		height: 240upx;
		padding: 0 30upx 30upx 30upx;
		box-sizing: border-box;
		border-bottom: 10upx solid #F5F9FF;
		text {
			font-size: 34upx;
		}
		.one-one {
			font-size: 28upx;
			color: #878787;
		}
	}
	
	.conter {
		background-color:#FFFFFF;
		.lst {
			width: 100%;
			height: 100upx;
			display: flex;
			border-bottom: 2upx solid #F5F9FF;
			line-height: 100upx;

		.lt {
			display: inline-block;
			color: #333333;
			font-size: 32upx;
			// height: 100%;
			// float: left;
			// line-height: 100upx;
			padding-left: 30upx;
			}
			.ltn {
				margin-top: 6upx;
			}
			.lt12 {
				
				image {
					width: 16upx;
					height: 30upx;
				}
			}
		.lt1 {
			// float: left;
				width: 70%;
				color: #333333;
				font-size: 30upx;
				// height: 100upx;
				// line-height: 100upx;
				box-sizing: border-box;
				padding-left: 30upx;
				display: inline-block;
			
				.lt11 {
					margin-top: 4upx;
					height: 95%;
				}
				.uni-input-placeholder {
					width: 100%;
					// line-height: -50upx;
					height: 50upx;
				}
			}
		
		}
	}
</style>
