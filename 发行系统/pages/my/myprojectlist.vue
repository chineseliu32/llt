<template>
	<view class="ttttt">
		<!-- <topSearch headNavigationTitle="项目详情" @fan="fan"></topSearch> -->
		<!--顶部搜索导航栏-->
		
	
		<view class="conter">
			<view class="last">
					<!-- <topSearch1 headNavigationTitle="我的项目" @fan="fan"></topSearch1> -->
			<!-- 	<scroll-view scroll-x class="title" >
						<view v-for="(item,index) in CooperateTypeEnum" :key="index" :class="in_lest==index+1?'lt':'lt1' " @click="in_dex(index+1)">{{item}}</view>
				</scroll-view> -->
				<!-- <scroll-view scroll-x class="title1" >
						<view v-for="(item,index) in ProjectStateEnum" :key="index" :class="in_lest1==index+1?'lt2':'lt3' " @click="in_dex1(index+1)">{{item}}</view>
				</scroll-view> -->
			</view>
			<view class="none" v-for="(item,index) in datalist" :key="index" @click="toxiang(item.id)">
				<view class="cone">
					<view class="left">
						<image :src="item.img_url | imgurl" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="tpp">
							
							<view class="one" v-if="type==6">
								{{item.organization_name}}
							</view>
							<view class="one" v-else>
								{{item.project_name}}
							</view>
							
						</view>
						<!-- <view class="label">
							项目
						</view> -->
						<view class="num">
							<text class="o1" v-if="type==1">{{item.financing_limit}}万</text>
							<text class="o1" v-if="type==2">{{item.investment_limit}}万</text>
							<text class="o1" v-if="type==3">{{item.sell_price}}万</text>
							<text class="o1" v-if="type==4">{{item.sale_limit}}万</text>
							<text class="o1" v-if="type==5">{{item.price_sheet}}万</text>
							<text class="o1" v-if="type==6">{{item.purchase_price}}万</text>
							<text class="o2">{{item.city_name}}</text>
							<text class="o3">{{item.time}}</text>
						</view>
						
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import rfSearchBar from '@/components/rf-search-bar/rf-search-bar';
	import   RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import {uploadFiles,categoryList,allUserEnum,getUserInfo,saveOrUpdateUserInfo,allProjectEnum,getUserProjectPageListApi,mydaikuan} from "@/api/user.js";
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import topSearch from "@/components/rf-top/rf-top.vue"
	import topSearch1 from "@/components/rf-top2/rf-top1.vue"
	import moment from '@/utils/moment';
	export default {
		components: {topSearch,topSearch1,uniRate,  RenDropdownFilter},
		data() {
			return {
				in_lst: 1,
				in_lest:'1',
				in_lest1:'1',
				ProjectStateEnum :[], 
				CooperateTypeEnum :[], 
				defaultIndex:[0,0],
				index_list :[],
				index_list1 :[],
				index_list2 :[],
				datalist:[],
				type:2,
				state:1,
				num:0,
				flag:true
			}
		},
		onLoad() {
			this.getlist(this.type,this.state)
			this.initData1()
			this.initData2()
			
		},
		//触底加载
		onReachBottom(){
			if(this.flag){
				this.getlist(this.type,this.state)
			}
		},
		filters: {
				imgurl(val) {
					let arr=val.split(",");
					let url=arr[0]
				    return url
				  }
		},
		methods: {
			toxiang(id){
				uni.navigateTo({
					url:'./xiangmushenghe?cooperateType='+this.type+"&projectId="+id
				})
			},
			async getlist(type,state){
				this.num++;
				let res=await this.get(mydaikuan,{
					// state:state,
					cooperateType:type,
					pageNum:this.num,
					createUser:uni.getStorageSync("userNum").id});
				if(res.code==0){
					let data=res.result.list;
					if(data.length<10){
						this.flag=false;
					}
					data.forEach(item=>{
						item.time=this.getLocalTime(item.create_time);
						this.datalist.push(item)
					})
					
				}else{
					this.code(res)
				}
			},
			getLocalTime(val) {
			  return moment(val ).format('YYYY-MM-DD HH:mm')   
			},
			initData1(){
				this.$get(`${allProjectEnum}`).then(r => {
					// console.log(r)
					this.index_list = r.result;
					this.ProjectStateEnum = Object.values(this.index_list.ProjectStateEnum);
				}).catch((err) => {
					// console.log(err)
				});
			},
			initData2(){
				this.$get(`${allUserEnum}`).then(r => {
					// console.log(r)
					this.index_list2 = r.result;
					this.CooperateTypeEnum = Object.values(this.index_list2.CooperateTypeEnum);
					// console.log(this.CooperateTypeEnum)
				}).catch((err) => {
					console.log(err)
				});
			},
			onSelected(res){
			    console.log(res)
			},
			dateChange(d){
			    uni.showToast({
			        icon:'none',
			        title:d
			    })
			},
						
			in_dex(type) {
				this.in_lest=type;
				this.type = type;
				this.num=0;
				this.flag=true;
				this.datalist=[];
				this.getlist(this.type,this.state)
			},
			in_dex1(type) {
				this.in_lest1=type;
				this.state = type;
				this.num=0;
				this.flag=true;
				this.datalist=[];
				this.getlist(this.type,this.state)
			},
			fan() {
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
	.xuanze {
		width: 100%;
		height: 120upx;
		display: flex;
		background-color: #F5F9FF;
		.one {
			width: 33.333%;
			text-align: center;
			.img {
				image {
					display: inline-block;
					width: 10upx;
					height: 10upx;
				}
			}
		}
	}
	
	//内容
	.conter {
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
						display: flex;
						justify-content: space-between;
						padding: 0 40rpx 0 0;
						align-items: center;
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
							margin-left: 100upx;
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
