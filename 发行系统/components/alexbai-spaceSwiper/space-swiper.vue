<!-- 
	有前后间距的轮播图
	不支持nvue，
	实现方式：uni-app previous-margin，next-margin属性控制
		默认外层宽度750upx 需要显示的图片尺寸为630upx,需要显示两边轮播图漏出的间距为30upx
		计算方式:1.计算两边间距和750-630=120
				2.计算两个图片之间的间距，两边间距一半减去漏出尺寸120/2-30=30
				3.图片间距两部分，拆成两部分，为图片外边距：30/2=15
				4.最后的previous-margin和next-margin为30+15=45
 -->
<template>
	<!-- <swiper class="imageContainer" previous-margin="45upx" next-margin="45upx" circular autoplay> -->
	<swiper class="imageContainer" next-margin="25upx" circular autoplay>
		<swiper-item class="swiperitem" v-for="(item,index) in imgList" :key="index">
			<image class="itemImg" :src="item.url" lazy-load></image>
		</swiper-item>
	</swiper>
</template>
<script>
	import {index_banner} from '../../api/index'
	export default {
		data() {
			return {
				imgList: [
					
				]
			}
		},
		onLoad() {
			this.initData();
		},
		methods:{
			initData(){
				this.$get(`${index_banner}`, ).then(r => {
					console.log(r)
						this.imgList = r.result,
						console.log(this.imgList);
					// this.bargainData = r.data.bargain;
					// this.bargainingData = r.data.bargaining;
				}).catch((err) => {
					console.log(err)
				});
			}
		}
	}
</script>
<style scoped>
	.imageContainer {
		width: 710upx;
		height: 300upx;
		margin: 0 auto;
	}

	.itemImg {
		width: 650upx;
		height: 240upx;
		/* border-radius: 20upx; */
	}

	.swiperitem {
		width: 600upx;
		height: 340upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
