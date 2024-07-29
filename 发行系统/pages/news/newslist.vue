<template>
	<view>
		<view class="bg" v-if="type==0">
			<view v-for="(item,index) in list" :key="index" class="box" @click="tonewcon(item.id)">
				<image :src="item.title_img_url" mode="aspectFill" class="img"></image>
				<view class="title">{{item.news_title}}</view>
				<view class="title1">{{item.remarks}}</view>
			</view>
		</view>
		<view class="bg" v-if="type==1">
			<view v-for="(item,index) in list" :key="index" class="box" @click="tonewcon(item.id)">
				<image :src="item.title_img_url" mode="aspectFill" class="img"></image>
				<view class="title">{{item.news_title}}</view>
				<view class="title1">{{item.remarks}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {newslist} from"@/api/user.js"
	export default{
		data(){
			return{
				list:[],
				flag:true,//是否加载，
				num:0,//当前加载的页数
				type:0
			}
		},
		onLoad(e){
			if(e.type){
				this.type=e.type
			}
			this.getNewslist()
		},
		//触底加载
		onReachBottom(){
			if(this.flag){
				this.getNewslist()
			}
		},
		methods:{
			async getNewslist(){
				this.num++
				let data={pageNum:this.num}
				if(this.type==1){
					data.userId=uni.getStorageSync("userNum").id
				}
				let res=await this.get(newslist,data);
				if(res.code==0){
					console.log(res)
					if(res.result.list.length<10){
						this.flag=false
					}
					let id=uni.getStorageSync("userNum").id
					res.result.list.forEach(item=>{
						if(item.user_id==id){
							item.flag=true
						}else{
							if(item.present_way==1&&item.enabled==1){
								item.flag=true
							}else{
								item.flag=false
							}
						}
						this.list.push(item)
					})
				}else{
					this.code(res)
				}
			},
			tonewcon(id){
				uni.navigateTo({
					url:"./newscon?id="+id
				})
			}
		}
	}
</script>

<style scoped>
	.bg{
		padding: 20rpx 30rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	.box{
		width: 340rpx;
		height: 300rpx;
		margin-bottom: 20rpx;
	}
	.img{
		width: 340rpx;
		height: 200rpx;
	}
	.title{
		font-size: 32rpx;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.title1{
		font-size: 26rpx;
		color: #333333;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
</style>
