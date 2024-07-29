<template>
	<view class="container">
		<view class="list-cell b-b m-t" @tap="navTo('/pages/user/userinfo/userinfo')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">个人资料</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
		<view class="list-cell b-b" @tap="navTo('/pages/public/password?type=1')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">修改密码</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
<!--		<view class="list-cell b-b" @tap="navTo('/pages/set/authorization/list')" hover-class="cell-hover" :hover-stay-time="50">-->
<!--			<text class="cell-tit">授权管理</text>-->
<!--			<text class="cell-more iconfont iconyou"></text>-->
<!--		</view>-->
<!--		<view class="list-cell b-b m-t" @tap="navTo('/pages/set/invoice/invoice')" hover-class="cell-hover" :hover-stay-time="50">-->
<!--			<text class="cell-tit">发票管理</text>-->
<!--			<text class="cell-more iconfont iconyou"></text>-->
<!--		</view>-->
<!--		<view class="list-cell b-b" @tap="navTo('/pages/set/invoice/list')" hover-class="cell-hover" :hover-stay-time="50">-->
<!--			<text class="cell-tit">开票历史</text>-->
<!--			<text class="cell-more iconfont iconyou"></text>-->
<!--		</view>-->
<!--		<view class="list-cell m-t">-->
<!--			<text class="cell-tit">消息推送</text>-->
<!--			<switch checked color="#fa436a" @change="switchChange" />-->
<!--		</view>-->
		<view class="list-cell m-t b-b" @tap="navTo('清除缓存')" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text class="cell-tip">{{ currentStorageSize }} kb</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>
<!--		<view class="list-cell b-b" @tap="navTo('/pages/set/about/about')" hover-class="cell-hover" :hover-stay-time="50">-->
<!--			<text class="cell-tit">关于RF商城</text>-->
<!--			<text class="cell-more iconfont iconyou"></text>-->
<!--		</view>-->

		<view class="list-cell b-b"  v-if="isApp" @tap="appUpdate">
			<text class="cell-tit">当前版本</text>
			<text class="cell-tip">{{appCurrentVer }}</text>
			<text class="cell-more iconfont iconyou"></text>
		</view>

		<!--		<view class="list-cell m-t" @tap="navTo('/pages/set/feedback/list')">-->
<!--			<text class="cell-tit">意见反馈</text>-->
<!--			<text class="cell-more iconfont iconyou"></text>-->
<!--		</view>-->
		<view class="list-cell log-out-btn" @tap="toLogout">
			<text class="cell-tit">退出登录</text>
		</view>
    <!--进度条加载-->
		<rf-load-progress :height="CustomBars" :progress="loadProgress"></rf-load-progress>
	</view>
</template>

<script>
	import {
		mapMutations, mapState
	} from 'vuex';
	// import {appUpdate} from "@/api/basic";
	import {logout} from "@/api/login";
	export default {
		data() {
			return {
				loadProgress: 0,
				CustomBars: this.CustomBar,
				currentStorageSize: 0,
				user: {},
				appCurrentVer:'0.9',
				isApp:false,
				downloadUrl:'',
				updateCount : 0,
			};
		},
		onLoad () {
			this.initData();
		},
		computed: {
			...mapState(['userInfo']),
		},
		methods:{
			...mapMutations(['login', 'logout']),
			initData () {
				/*  #ifdef APP-PLUS  */
				// this.isApp = true;

				// plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {  
				// 	this.appCurrentVer = widgetInfo.version;
				// });  
				// this.$post(`${appUpdate}`,{
				// 	appCurrentVer:this.appCurrentVer
				// }).then(r=>{
				// 	if(r.code == 200){
				// 		this.appCurrentVer = '有新版本';
				// 		this.downloadUrl = r.data.download;
				// 	}
				// });
				
				switch (uni.getSystemInfoSync().platform) {
					case 'android':
						this.CustomBars = this.CustomBar - 80;
						break;
					case 'ios':
						this.CustomBars = this.CustomBar - 50;
						break;
				}
				/*  #endif  */

				this.user = uni.getStorageSync('user');
					const _this = this;
					uni.getStorageInfo({
						success (res) {
							_this.currentStorageSize = res.currentSize;
						}
					})
			},
			navTo(url){
				if (url === '清除缓存') {
					uni.showModal({
				    content: '确定要清除缓存吗',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.currentStorageSize = 0;
				    		uni.clearStorageSync();
				    		this.LoadProgress();
				    	}
				    }
					});
				} else if (!url) {

				} else {
					uni.navigateTo({
						url,
					})
				}
			},
			LoadProgress() {
				this.loadProgress = this.loadProgress + 6;
				if (this.loadProgress < 100) {
					setTimeout(() => {
						this.LoadProgress();
					}, 100)
				} else {
					this.loadProgress = 0;
					this.login(this.user);
					this.$api.msg('清除缓存成功')
				}
			},
			appUpdate(){
				if(this.updateCount == 0){
					this.updateCount++;
					// console.log('this.downloadUrl' + this.downloadUrl);
					const downloadTask = uni.downloadFile({
						url: this.downloadUrl,
						success: (downloadResult) => {
							if (downloadResult.statusCode === 200) {
								plus.runtime.install(downloadResult.tempFilePath, {
									force: false
								}, function() {
									console.log('install success...');
									plus.runtime.restart();
								}, function(e) {
									// 这里的错误很重要，最好能记录的服务器日志中，方便调试或以后维护了解更新错误情况，及时解决
									// 如何更新到服务器？
									// 调用一个接口，将e返回咯
									console.error('install fail...');
								});
							}
						}
					});
					downloadTask.onProgressUpdate((res) => {
						this.loadProgress = res.progress ;
						if(this.loadProgress >= 100 || this.loadProgress <= 1) {
							this.loadProgress = 0;
							this.updateCount = 0;
							this.$api.msg('下载最新版APP成功');
						}
					});
				}else{
					this.$api.msg('正在下载中');
				}

			},
			//退出登录
			toLogout(){
				uni.showModal({
				    content: '确定要退出登录么',
				    success: (e)=>{
				    	if(e.confirm){
				    		this.$post(`${logout}`).then(r => {
									this.logout();
									uni.reLaunch({
										url: '/pages/user/user'
									})
								})
				    	}
				    }
				});
			},
			//switch
			switchChange(e){
				let statusTip = e.detail.value ? '打开': '关闭';
				this.$api.msg(`${statusTip}消息推送`);
			},

		}
	}
</script>

<style lang='scss' scoped>
	page{
		background: $page-color-base;
	}
</style>
