<template>
<view class="ttttt">
		
		<view class="conter">
			<view class="ccc">
				<view class="none" v-for="(item,index) in indexlist" :key="index" @click="xiang(item)">
					<view class="cone">
						<view class="left">
							<image :src="item.img_url  | imgurl" mode=""></image>
						</view>
						<view class="right">
						<view class="tpp">
							<view class="one">
								{{item.project_name}}
							</view>
						</view>
						<view class="label" v-for="it in item.label">
							{{it.labelName}}
						</view>
						<text class="one" style="font-size: smaller;">发售:{{item.limit_count}}份</text>
						<view class="cnm">
							<text class="one" style="font-size: smaller; color: red;">单价:{{item.limit_rmb | formatNumber}}元</text>
						</view>
					</view>
				</view>
			</view>
			<view class="conter"   v-if="indexlist.length==0">
				<view class="image" align= "center">
					<image src="../../static/image/newsno.png" mode=""></image>
				</view>
				<view class="xx">
					暂无收藏记录
				</view>
			</view> 
		</view>
	<!-- #ifdef APP-PLUS -->
	<view class="xuanze" v-if="isShow" @touchmove.stop.prevent="moveHandle">
		<view class="one">
			<view class="top">
				请选择申请项目
				<view class="cha" @click="cha()">
					<image src="../../static/image/cha.png" mode=""></image>
				</view>
			</view>
			<view class="conter1">
				<view class="one1" style="display: none;">
					<view :class="in_lest1==1?'one111':'one11'" @click="in_dex_x(1)">
						融资项目
					</view>
				</view>
				<view class="one1">
					<view :class="in_lest1==2?'one111':'one11'" @click="in_dex_x(2)">
						提货出库
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==3?'one111':'one11'" @click="in_dex_x(3)">
						资产出售
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==5?'one111':'one11'" @click="in_dex_x(5)">
						资产购买
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==4?'one111':'one11'" @click="in_dex_x(4)">
						服务采购
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==6?'one111':'one11'" @click="in_dex_x(6)">
						服务提供
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==7?'one111':'one11'" @click="in_dex_x(7)">
						路演视频
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==8?'one111':'one11'" @click="in_dex_x(8)">
						在线直播
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==9?'one111':'one11'" @click="in_dex_x(9)">
						会议活动
					</view>
				</view>
				<view class="one1" style="display: none;">
					<view :class="in_lest1==10?'one111':'one11'" @click="in_dex_x(10)">
						资讯公告
					</view>
				</view>
			</view>
			<view class="foott" @click="queren()">
				确定
			</view>
		</view>
	</view>
	<view class="foot">
			<view class="index" @click="indexx(1)">
				<view class="img">
					<image :src="is_indexx1==1?'../../static/image/index1.png':'../../static/image/index.png'" mode=""></image>
				</view>
				<view :class="is_indexx1==1?'text1':'text'">
					首页
				</view>
			</view>
			<view class="project" @click="indexx(2)">
				<view class="img">
					<image :src="is_indexx1==2?'../../static/image/shoucang2.png':'../../static/image/shoucang1.png'" mode=""></image>
				</view>
				<view :class="is_indexx1==2?'text1':'text'" >
					收藏
				</view>
			</view>
<!-- 			<view class="release" @click="release()">
				<image src="../../static/image/release.png" mode="" ></image>
			</view> -->
			<view class="news active" @click="indexx(3)" >
				<text class="bnum" v-if="newsNum>0">{{newsNum}}</text>
				<view class="img">
					<image :src="is_indexx1==3?'../../static/image/news1.png':'../../static/image/news.png'" mode=""></image>		
								</view>
				<view :class="is_indexx1==3?'text1':'text'">
					消息
				</view>
			</view>
			<view class="my" @click="indexx(4)">
				<view class="img">
					<image :src="is_indexx1==4?'../../static/image/my1.png':'../../static/image/my.png'" mode=""></image>
				</view>
				<view :class="is_indexx1==4?'text1':'text'">
					我的
				</view>
			</view>
		</view> 
		<!-- #endif -->
	</view>
	<view class="bbb" v-show='show' @click="show=false">
		<view class="buy">
			<view class="top1">
				<image src="../../static/image/lingdang.png" mode=""></image>
			</view>
			<view class="text">
				温馨提示
				完成实名认证后可以开启此功能。
			</view>
			<button class="confirm-btn" @click="goRealname">去实名</button>
			<button class="confirm-btn" @click="show=false">关闭</button>
		</view>
	</view>
</view>
	
</template>

<script>
	import rfSearchBar from '@/components/rf-search-bar/rf-search-bar';
	import {getUserInfo,pageList,allUserEnum,xitongnum,fenbunum,getRealName} from "@/api/user.js";
	import moment from '@/utils/moment';
	export default {
		components: {rfSearchBar},
		data() {
			return {
				is_indexx1 : 2	,
				headerShow: true,
				isShow: false,
				in_lst: 1,
				in_lest1:'',
				myid : '',
				hotSearchDefault: '请输入关键字', 
				filterData:[
							 [{ text: '排序', value: '' }, { text: '时间降序', value: 1 }, { text: '时间升序', value: 2 }, { text: '金额升序', value: 3 }, { text: '金额降序', value: 4 }],
							 [{ text: '全部类型', value: '' }, { text: '类型1', value: 1 }, { text: '类型2', value: 2 }, { text: '类型3', value: 3 }]
						 ],
				defaultIndex:[0,0],
				indexlist:[],
				num:0,
				flag:true,
				newsNum:0,
				real_name: {},
				show: false,
			}
		},
		mounted() {
		
			//查询实名信息
			this.$get(`${getRealName}`).then(r => {
				if (r.code == 0) {
		
					this.real_name = r.result;
					console.log(this.real_name)
				}
			}).catch((err) => {
				console.log(err)
			});
		
		},
		onLoad(options) {
			if(!uni.getStorageSync("userNum")) {
				uni.reLaunch({
					// #ifndef MP-WEIXIN
					url:'../login/login'
					// #endif
					// #ifdef MP-WEIXIN
					url:"../login/wxlogin"
					// #endif
				})
			}else{
				this.initData(options);
				this.initData1();
			}
			
		},
		filters: {
			// 格式化数字
			formatNumber(num, decimals) {
				num = parseFloat(num).toFixed(2);
				num += '';
				const x = num.split('.');
				let x1 = x[0];
				const x2 = x.length > 1 ? '.' + x[1] : '';
				const rgx = /(\d+)(\d{3})/;
				if (',' && isNaN(parseFloat(','))) {
					while (rgx.test(x1)) {
						x1 = x1.replace(rgx, '$1' + ',' + '$2');
					}
				}
				return x1 + x2;
			},
		// 时间格式化
				time(val) {
					return moment(val).format('YYYY-MM-DD')
				},
				ttt(val) {
					return Math.ceil(val)
				},
				imgurl(val) {
					let arr=val.split(",");
					let url=arr[0]
				    return url
				  }
			},
		onShow() {
			// this.newsNum=uni.getStorageSync("newNum")
			this.get(xitongnum,{userId:uni.getStorageSync("userNum").id}).then(res=>{
				console.log(res)
				if(res.code==0){
					uni.setStorageSync("newNum",res.result)
					this.newsNum=res.result
				}
			})
			this.get(fenbunum,{userId:uni.getStorageSync("userNum").id}).then(r=>{
				if(r.code==0){
					console.log("分布未读消息",r)
					this.newsNum=this.newsNum+r.result
				}
			})
			this.indexlist=[];
			this.num=0;
			this.initData2();
			if (navigator) {
				this.headerTop = document.getElementsByTagName('uni-page-head')[0] && document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
			}
		},
		onReachBottom(){
			if(this.flag){
				this.initData2()
			}
		},
		computed:{
			// newsNum(){
			// 	console.log()
			// 	return uni.getStorageSync("newNum")
			// }
		},
		methods: {
			moveHandle(){},
			xiang(type) {
				let url="";
				if(type.cooperateType==1){
					url="../../pagesA/details/details"
				}
				if(type.cooperateType==2){
					url="../../pagesA/details/details6"
				}
				if(type.cooperateType==3){
					url="../../pagesA/details/details5"
				}
				if(type.cooperateType==4){
					url="../../pagesA/details/details4"
				}
				if(type.cooperateType==5){
					url="../../pagesA/details/details3"
				}
				if(type.cooperateType==6){
					url="../../pagesA/details/details2"
				}
				if(uni.getStorageSync("userNum").memberFeeIsOpen==0){
					uni.navigateTo({
						url:`${url}?id=${type.id}`
					})
				}else if(uni.getStorageSync("userNum").memberFeeIsOpen==1){
					if(uni.getStorageSync("userNum").isFeeMember==""||uni.getStorageSync("userNum").isFeeMember==0){
						uni.showToast({
							title:"缴费会员才查看详情",
							icon:"none",
							duration:1500,
							mask:true
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:"../my/pay?type="+uni.getStorageSync("userNum").userType
							})
						},1500)
					}else{
						uni.navigateTo({
							url:`${url}?id=${type.id}`
						})
					}
				}
			},
			in_dex_x(type) {
				this.in_lest1 = type
			},
			// #ifdef APP-PLUS
			queren(){
				if(this.in_lest1==1){
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/release/release'
					})
				}else if(this.in_lest1==2){
					// 投资/贷款
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/investment/investment'
					})
				}else if (this.in_lest1==3) {
					// 资产出售
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/assetsSale/assetsSale'
					})
				}else if (this.in_lest1==4) {
					// 服务采购
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/procurement/procurement'
					})
				}else if (this.in_lest1==5) {
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/buyAssets/buyAssets'
					})
				}else if (this.in_lest1==6) {
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/servDelivery/servDelivery'
					})
				}else if(this.in_lest1==7){
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/news/luyan'
					})
				}
				else if(this.in_lest1==8){
					this.isShow = false
					if(uni.getStorageSync("userNum").isLiveVideoAuth==0||uni.getStorageSync("userNum").isLiveVideoAuth==null){
						uni.showModal({
						    title: '提示',
						    content: '是否开通直播权限',
						    success: (res)=>{
						        if (res.confirm) {
									this.get(liveqx,{userId:uni.getStorageSync("userNum").id}).then(res=>{
										console.log(res)
										if(res.code==0){
											uni.showToast({
												title:"申请成功",
												mask:true
											})
										}else{
											uni.showToast({
												title:res.message,
												icon:"none",
												mask:true
											})
										}
									})
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}else if(uni.getStorageSync("userNum").isLiveVideoAuth==1){
						uni.navigateTo({
							url:'/pages/live/livecon'
						})
					}
				}
				else if(this.in_lest1==9){
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/news/huodong'
					})
				}
				else if(this.in_lest1==10){
					this.isShow = false
					uni.navigateTo({
						url:'../../pagesA/news/gonggao'
					})
				}
			},
			release() {
	/* 			console.log("点击发布")
				if(uni.getStorageSync("userNum").userType==2){
					if(uni.getStorageSync("userNum").memberFeeIsOpen==0){
						this.isShow = true
					}else if(uni.getStorageSync("userNum").memberFeeIsOpen==1){
						if(uni.getStorageSync("userNum").isFeeMember==""||uni.getStorageSync("userNum").isFeeMember==0){
							uni.showToast({
								title:"缴费会员才可发布项目",
								icon:"none",
								duration:1500
							})
							setTimeout(()=>{
								uni.navigateTo({
									url:"../my/pay?type="+uni.getStorageSync("userNum").userType
								})
							},1500)
						}else{
							this.isShow = true
						}
					}
				}else{
					uni.showToast({
						title:"暂时没有权限~",
						icon:"none",
						duration:1500
					})
				} */
				if (this.real_name.status != 2) {
					this.show = true;
				
				} else {
					this.isShow = true
				}
			},
			// #endif
			// 初始化数据
			initData(options) {
				if (navigator) {
					this.headerTop = document.getElementsByTagName('uni-page-head')[0] && document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
				}
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.navBarTop = '160upx';
						break;
					case 'ios':
						this.navBarTop = '188upx';
						break;
				}
			
				this.cateId = options.cate_id;
				if (options.params) {
					this.cateParams = JSON.parse(options.params);
					if (this.cateParams.guessYouLike === 1) {
						this.isShowNavBar = false;
						this.contentTop = '18upx';
						this.getGuessYouLikeList();
						return;
					}
				}
				this.keyword = options.keyword;
				this.hotSearchDefault = options.keyword;
				if (!this.keyword) {
					this.hotSearchDefault = uni.getStorageSync('hotSearchDefault')
				}
			},
			initData1(){
				this.$get(`${getUserInfo}`, {id : uni.getStorageSync("userNum").id } ).then(r => {
						this.myid = r.result.id
				}).catch((err) => {
				});
			},
			async initData2(){
				this.num++;
				let res=await this.get(allUserEnum);
				let labellist=res.result.labelList.list;
				let r=await this.get(pageList,{createUser : uni.getStorageSync("userNum").id,pageNum:this.num});
				if(r.code==0){
					if(r.result.list.length<10){
						this.flag=false;
					}
					r.result.list.forEach(item=>{
						item.label=[];
						item.project_label.split(",").forEach(it=>{
							labellist.forEach(i=>{
								if(i.id==it){
									item.label.push(i)
								};
							})
						})
						this.indexlist.push(item)
					})
				}
				
			},
			// #ifdef APP-PLUS
			indexx(type) {
			this.is_indexx = type;
			if(type==1) {
				uni.navigateTo({
					url:'../../pages/index/index'
				})
			}
			
			if(type==2) {
				uni.navigateTo({
					url:'../../pages/index/Favorites',
				})
			}
			if(type==3) {
				uni.navigateTo({
					url:'../../pages/news/news',
				})
			}
			if(type==4) {
				uni.navigateTo({
					url:'../../pages/my/my',
				})
			}
			},
			// #endif
			    onSelected(res){
			            },
			            dateChange(d){
			               uni.showToast({
			                   icon:'none',
			                   title:d
			               })
			            },
			// 跳转至主页
			navToIndex() {
				uni.reLaunch({
					url: `/pages/index/index`
				})
			},
			cha() {
				this.isShow = false
			},
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
				uni.navigateBack({
					delta:1
				})
			},
			xuanze() {
				// this.isshow != this.show
			},
			list1(type) {
				this.in_lst = type
			},
			goRealname() {
				uni.navigateTo({
					url: '../../pages/my/authentication'
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/*#ifdef APP-PLUS*/
	.xuanze {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: rgba(0,0,0,0.5);
		z-index: 9999999999;
		.one {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 600upx;
			height: 820upx;
			background-color: #FFFFFF;
			border-radius: 20upx;
			.conter1 {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.one1 {
					width: 40%;
					height: 80upx;
					margin-top: 30upx;
					
					.one11 {
						height: 80upx;
						text-align: center;
						font-size: 28upx;
						line-height: 80upx;
						border:2rpx solid #7FA2FF ;
						border-radius: 8rpx;
						font-weight: bold;
					}
					.one111 {
						height: 80upx;
						color: #FFFFFF;
						text-align: center;
						font-size: 28upx;
						line-height: 80upx;
						background:linear-gradient(180deg,rgba(68,135,255,1) 0%,rgba(0,92,255,1) 100%);
						border-radius: 8rpx;
						font-weight: bold;
					}
				}
			}
			.top {
				width: 100%;
				height: 100upx;
				display: inline-block;
				color: #333333;
				font-size: 34upx;
				line-height: 100upx;
				text-align: center;
				padding: 0;
				position: relative;
				font-weight: bolder;
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
			.foott {
				width: 90%;
				height: 100upx;
				margin: 0 auto;
				background:linear-gradient(180deg,rgba(68,135,255,1) 0%,rgba(0,92,255,1) 100%);
				border-radius:8upx;
				line-height: 100upx;
				color: #FFFFFF;
				margin-top: 30upx;
				text-align: center;
				font-size: 36rpx;
			}
		}
	}
	/* #endif */
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
		.cone {
			position: relative;
			display: flex;
			margin-bottom:20upx;
			align-items: center;
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
        padding: 10px 0;
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
						padding-right: 10upx;
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
						font-size: 28upx;
					}
					.o3 {
						float: right;
						margin-top: 10upx;
						margin-right: 20upx;
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
	.ccc {
		margin-bottom: 120upx;
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
			width: 25%;
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
			width: 25%;
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
			width: 25%;
			height: 100%;
			margin-top: 20upx;
			position: relative;
			.bnum{
				position: absolute;
				top: -15rpx;
				right:20rpx;
				background-color: #F43F3B;
				color: #FFFFFF;
				line-height: 24rpx;
				font-size: 24rpx;
				padding: 6rpx 10rpx;
				border-radius: 20rpx;
			}
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
			width: 25%;
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
			text-align: center;
			// margin-left: 8%;
		}
		.xx {
			text-align: center;
			color: #606060;
			font-size: 30upx;
		}
	}
	.bbb {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);
	
		.buy {
			width: 70%;
			height: 500upx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10px;
			background-color: #FFFFFF;
			z-index: 99;
	
			.top1 {
				width: 100%;
				height: 100upx;
				text-align: center;
				box-sizing: border-box;
				margin: 0 auto;
				background: url(../../static/image/success1.png)no-repeat;
				background-size: 100% 100%;
	
				image {
					margin-top: 20upx;
					width: 60upx;
					height: 60upx;
				}
			}
	
			.text {
				width: 100%;
				margin-top: 40upx;
				box-sizing: border-box;
				text-align: center;
				padding: 0 40upx 0 40upx;
				box-sizing: border-box;
	
				.textc {
					color: #3C87DB;
					font-size: 34upx;
				}
			}
	
			.confirm-btn {
				width: 230upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 50px;
				background: #3C87DB;
				color: #fff;
				font-size: $font-lg;
				float: left;
				top: 80upx;
				bottom: 10upx;
				left: 25%;
				margin: 10upx;
				transform: translate(-50%, 0);
	
				&:after {
					border-radius: 100px;
				}
			}
		}
	}
</style>
