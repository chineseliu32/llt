<script>
	import {baseUrl} from "@/api/params";
	import {upuserinfo,ydlogin,xitongnum,allowDownloadAPP} from"@/api/user.js";
	export default {
		data(){
			return{
				jiance:null,
				APPSwitch:0,
				warningshow:0
			}
		},
		// 环境
		// 测试git
		onLaunch: function(options) {
			
			//获取APP下载开关
			this.post(allowDownloadAPP).then(res=>{
				console.log("APP 下载")
				console.log(res)
				if(res.code==200){
					this.APPSwitch=res.data;
					console.log("App开关"+this.APPSwitch.toString())
				}
			})
			
			
			console.log(baseUrl + "/api/appVersion/getAppVersion");
			// 获取小程序b码的方法
			// let scene = decodeURIComponent(options.query.scene);
			//     console.log(scene)
			if(uni.getStorageSync("userNum")){
				this.get(upuserinfo,{userId:uni.getStorageSync("userNum").id}).then(res=>{
					if(res.code==0){
						uni.setStorageSync("userNum",res.result)
					}
					console.log("更新的用户信息",res)
				})
				// 获取系统消息的数量
				this.get(xitongnum,{userId:uni.getStorageSync("userNum").id}).then(res=>{
					console.log(res)
					if(res.code==0){
						uni.setStorageSync("newNum",res.result)
					}
				})
				
			}else{
				// uni.reLaunch({
				//    	// #ifndef MP-WEIXIN
				//    	url: '/pages/login/login'
				//    	// #endif
				//    })
			}
			
			
			
			// #ifdef APP-PLUS
				
			var server = baseUrl + "/api/appVersion/getAppVersion"; //检查更新地址
			var req = { //升级检测数据  
				"type": 0
			};
			uni.request({
				url: server,
				data: req,
				method:"GET",
				success: res => {
					console.log(baseUrl + "/api/appVersion/getAppVersion");
						console.log("res",res)
					if (res.statusCode == 200 && res.data.code == 0) {
						let data = res.data.result;
						console.log((plus.runtime.versionCode == data.version))
						if (plus.runtime.versionCode == data.version || this.APPSwitch==0) {
						} else {
							var dtask = plus.downloader.createDownload(data.url,{},function(d, status) {
								uni.showToast({
									title: '下载完成',
									mask: false,
									duration: 1000
								});
								// 下载完成
								if (status == 200) {
									plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, e => e, function(error) {
										uni.showToast({
											title: '安装失败-01',
											mask: false,
											duration: 1500
										});
									})
								} else {
									uni.showToast({
										title: '更新失败-02',
										mask: false,
										duration: 1500
									});
								}
							});
							dtask.start(); // 开启下载的任务
							var prg = 0;
							var showLoading = plus.nativeUI.showWaiting("正在下载");  //创建一个showWaiting对象 
							dtask.addEventListener('statechanged', function(task,status){
										// 给下载任务设置一个监听 并根据状态  做操作
								switch (task.state) {
									case 1:
										showLoading.setTitle("正在下载");
										break;
									case 2:
										showLoading.setTitle("已连接到服务器");
										break;
									case 3:
										prg = parseInt((parseFloat(task.downloadedSize) /parseFloat(task.totalSize)) *100);
										showLoading.setTitle("正在更新下载" + prg + "%  ");
										break;
									case 4:
										plus.nativeUI.closeWaiting();
											//下载完成
									break;
								}
							});
						}
					}
				},
				fail: res =>{
				        console.log(res);
				    }
			})
				
			// #endif
			
		},
		onShow: function() {
				this.jiance=setInterval(()=>{
					if(uni.getStorageSync("userNum")){
						this.get(ydlogin,{userId:uni.getStorageSync("userNum").id}).then(res=>{
							if(res.code==-1 && this.warningshow==0){
								uni.showModal({
									title:"警告",
									content:"账号在另一台设备登录，请检查账号密码是否泄漏",
									showCancel:false,
									success:(res)=> {
										if (res.confirm) {
											clearInterval(this.jiance)
											console.log("点击了")
											this.jiance=null
											uni.removeStorageSync('userNum');
									        uni.reLaunch({
									           	// #ifndef MP-WEIXIN
									           	url: '/pages/login/login'
									           	// #endif
									           	// #ifdef MP-WEIXIN
									           	url: '/pages/login/wxlogin',
									           	// #endif
									           })
									        } else if (res.cancel) {
												clearInterval(this.jiance)
												this.jiance=null
												uni.removeStorageSync('userNum');
												uni.reLaunch({
												   	// #ifndef MP-WEIXIN
												   	url: '/pages/login/login'
												   	// #endif
												   	// #ifdef MP-WEIXIN
												   	url: '/pages/login/wxlogin',
												   	// #endif
												})
									        // console.log('用户点击取消');
									    }
									}
								})
							}
						})
					}
				},3000)
			// console.log('App Show')
		},
		onHide: function() {
			// clearInterval(this.jiance)
			this.jiance=null
			// console.log('App Hide')
		},
		methods:{
			
		}
	}

	
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/common/colorui/main.css";
	@import "@/common/colorui/icon.css";
	@import "@/common/colorui/animation.css";
	@import '@/common/css/iconfont/iconfont.css';
	@import '@/common/css/reset.scss';
	@import '@/common/css/uni.scss';
</style>
