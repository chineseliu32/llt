<template>
	<view class="ttttt">
	
		<view class="none">
			<view class="cone" @click="list(item.id)" v-for="(item,index) in about_list" :key="index">
				<!-- <view class="left">
					<image :src="item.title_img_url" mode=""></image>
				</view> -->
				<view class="right">
					<view class="tpp">
						<view class="one">
							{{item.service_title}}
						</view>
						
					</view>      
				</view>
			</view>
			<!-- <view class="cone">
				<view class="right">
					<view class="tpp">
						<view class="one">
							版本信息
						</view>
						
					</view>
				</view>
			</view> -->
			<view class="cone" style="display: none;">
				<view class="right">
					<view class="tpp" @click="tofenbu">
						<view class="one">
							节点简介
						</view>
						
					</view>
				</view>
			</view>
			<view class="cone">
				<view class="right">
					<view class="tpp">
						<view class="one" @click="toyinsi">
							隐私条款
						</view>
						
					</view>
				</view>
			</view>
			<view class="cone">
				<view class="right">
					<view class="tpp">
						<view class="one" @click="toxieyi">
							用户协议
						</view>
						
					</view>
				</view>
			</view>
		
			<view style="text-align: center;">当前版本：V 2.3.9</view>
		</view>
	</view>
</template>

<script>
	import {aboutUS} from '../../api/index.js'
	import moment from '@/utils/moment';
	export default {
		components:{
		},
		data() {
			return {
				in_lest:'1',
				about_list:[],
				id : ''
				
			}
		},
		filters: {
		// 时间格式化
			time(val) {
				return moment(val / 1000).format('YYYY-MM-DD HH:mm')
			},
		// 计算评论与追评时间
			againDay(val) {
				const day = moment(val.again_addtime * 1000).format('DD') - moment(val.created_at * 1000).format('DD');
				return day ? `${day}天后追加` : '当天追加'
			}
		},
		onLoad() {
			this.initData();
			
		},
		onShow() {

		},
		methods: {
			toyinsi(){
				uni.navigateTo({
					url:'./xieyi'
				})
			},
			toxieyi(){
				uni.navigateTo({
					url:'./yinsi'
				})
			},
			tofenbu(){
				uni.navigateTo({
					url:'./fenbujjie'
				})
			},
			list(type) {
				this.id = type;
				uni.navigateTo({
					url:'about?id='+this.id
				})
			},
			initData(){
				this.$get(`${aboutUS}`, ).then(r => {
					this.about_list = r.result.list
					console.log(this.about_list)
				}).catch((err) => {
				});
			}
		
		}
	}
</script>

<style lang="scss" scoped>
.none {
			width: 100%;
			// margin-left: 40upx;
			// padding-left: 40upx;
			margin-top: 20upx;
			.cone {
				position: relative;
				// display: flex;
				// height: 200upx;
				margin-bottom:20upx;
				height: 80upx;
				line-height: 80upx;
				box-sizing: border-box;
				border-bottom: 1px solid #F5F9FF;
				.left {
					float: left;
					width: 240upx;
					height: 180upx;
					margin-right: 20upx;
					margin-left: 20upx;
					image {
						width: 100%;
						height: 100%;
					}
				}
				.right {
          padding: 0 4%;
					width: 100%;
					.tpp {
						.one {
							display: inline-block;
							font-size: 32upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					
					}
					.num {
						font-size: 25upx;
						margin-top: 10upx;
						color: #969696;
						margin-top: 20upx;
						text {
							color: #969696;
						}
						.o1 {
							margin-right: 8upx;
						}
						.o2 {
							float: right;
							margin-right: 40upx;
							margin-left: 8upx;
						}
						
					}
					.label {
						// margin-top: 20upx;
						display: inline-block;
						font-size: 26upx;
						height: 70upx;
						margin-right: 20upx;
						line-height: 34upx;
						// text-align: center;
						border-radius: 5upx;
						     word-break: break-all;
						   
						       text-overflow: ellipsis;
						   
						       display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
						   
						       -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
						   
						       -webkit-line-clamp: 2; /** 显示的行数 **/
						   
						       overflow: hidden;  /** 隐藏超出的内容 **/
					}
				}
			}
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
