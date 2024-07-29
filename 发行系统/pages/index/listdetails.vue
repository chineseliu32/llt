<template>
	<view class="list">
		<view class="www">
			<view class="top">
					{{index_lists.news_title}}
			</view>    
			<view class="topp">
				<view class="one">
					{{index_lists.read_num}}浏览
				</view>
				<view class="two">
					{{index_lists.update_time | time}}
				</view>
			</view>
			<view class="conter" v-html="index_lists.news_contents">
			</view>
		</view>
	</view>  
</template>

<script>
	import {index_lists_t} from '../../api/index.js'
	import moment from '@/utils/moment';
	export default {
		components:{
		},
		data() {
			return {
				in_lest:'1',
				id : '',
				index_lists:[],
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
			this.id = option.id;
			this.initData();
		},
		onShow() {

		},
		methods: {
			initData(){
				this.$get(`${index_lists_t}`,{id : this.id} ).then(r => {
					this.index_lists = r.result;
				}).catch((err) => {
				});
			}
		
		}
	}
</script>

<style lang="scss" scoped>

	.list {
		padding: 20upx;
		.top {
				// margin-top: 20upx;
				// margin-left: 20upx;
				width: 100%;
				display: inline-block;
				font-size: 36upx;
				// text-align: center;
				font-weight: bolder;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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
