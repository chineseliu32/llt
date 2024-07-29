<template>
	<view>
		<view class="inputbox">
			<input type="text" v-model="phone"  placeholder="请输入管理员手机号"/>
			<view @click="chaxun">查询</view>
		</view>
		<view class="box">
			<view class="item">
				<text>关系序号</text>
				<view>姓名(昵称)</view>
				<view>手机号</view>
				<view>所属机构</view>
			</view>
			<view class="item" v-for="item in list">
				<text>{{item.relationNum}}</text>
				<view>{{item.userName}}</view>
				<view>{{item.userPhone}}</view>
				<view>{{item.orgName}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {guanxi} from"@/api/user.js"
	export default{
		data(){
			return{
				phone:"",
				list:[]
			}
		},
		methods:{
			async chaxun(){
				if(this.phone==""){
					uni.showToast({
						title:"请输入手机号",
						icon:"none",
						mask:true
					})
				}else{
					if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
					   uni.showToast({
					   	title:"请输入正确的手机号",
					   	icon:"none",
					   	mask:true
					   }) 
					    return false; 
					}else{
						let res=await this.get(guanxi,{
							userPhone:this.phone,
							userId:uni.getStorageSync("userNum").id
						})
						if(res.code==0){
							this.list=res.result
						}else{
							uni.showToast({
								title:res.message
							})
						}
						console.log(res)
					}
				}
			}
		}
	}
</script>

<style scoped>
	.box{
		padding: 40rpx 10rpx;
		box-sizing: border-box;
	}
	.item{
		width: 100%;
		display: flex;
	}
	.item>view{
		width: 28%;
		height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.item>text{
		width: 16%;
		height: 80rpx;
		text-align: center;
		font-size: 28rpx;
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.inputbox{
		display: flex;
		justify-content: space-between;
		padding:10rpx 80rpx;
		align-items: center;
	}
	.inputbox>view{
		padding: 10rpx 20rpx;
		border-radius: 4rpx;
		background-color: #c9161e;
		color: #FFFFFF;
		font-size: 30rpx;
	}
	.inputbox>input{
		border:2rpx #999999 solid;
		border-radius:5px;
		/* padding:10rpx; */
		height: 60rpx;
		padding-left: 10rpx;
		font-size: 30rpx;
	}
</style>
