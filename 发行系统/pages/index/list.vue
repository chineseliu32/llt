<template>
	<view class="ttttt">
	
		<view class="none">
			<view class="cone" @click="list(item.id)" v-for="(item,index) in index_lists" :key="index">
				<view class="left">
					<image :src="item.title_img_url" mode=""></image>
				</view>
				<view class="right">
					<view class="tpp">
						<view class="one">
							{{item.news_title}}
						</view>
						
					</view>      
					<view class="label">
						{{item.remarks}}
					</view>
					<view class="num">
						<text class="o1">{{item.read_num}}浏览</text>
						<text class="o2">{{item.update_time | time}}</text>
					</view>
					
				</view>
			</view>
		
				
		</view>
	</view>
</template>

<script>
	import {index_lists,index_lists_t} from '../../api/index.js'
	import moment from '@/utils/moment';
	export default {
		components:{
		},
		data() {
			return {
				in_lest:'1',
				banner_list:[],
				id : '',
				index_lists:[],
			}
		},
		filters: {
		// 时间格式化
			time(val) {
				return moment(val).format('YYYY-MM-DD HH:mm')
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
			list(type) {
				this.id = type;
				uni.navigateTo({
					url:'listdetails?id='+this.id
				})
			},
			initData(){
				this.$get(`${index_lists}`,{ newsType:2}).then(r => {
					// this.index_lists = r.result ;
					this.index_lists = r.result.list ;
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
				height: 200upx;
				margin-bottom:20upx;
				border-bottom: 20upx solid #F5F9FF;
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
					float: left;
					width: 62.6%;
					.tpp {
						// font-weight: bolder;
						.one {
							display: inline-block;
							font-size: 36upx;
							font-weight: bolder;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							// background-color: #E4E4E4;
							// color: #919090;
						}
					
					}
					.num {
						font-size: 25upx;
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
							margin-top: 8upx;
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
