import {baseUrl} from"@/api/params.js"

const get=function(url,data){
	return new Promise((ok,err)=>{
		uni.request({
			url: baseUrl + url,
			data: data,
			method:"GET",
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json', //自定义请求头信息
				'token':uni.getStorageSync("userNum").token
			},
			timeout:7000,
			success: (res) => {
				ok(res.data)
			},
			fail: (res) => {
				uni.showToast({
					title: '网络错误',
					icon: 'none',
					duration: 1000
				})
			},
			complete: (res) => {
				uni.hideLoading()
			},
		})
  })
}
const post=function(url, data){
	return new Promise((ok,err)=>{
		uni.request({
			url: baseUrl + url,
			data: data,
			method:"POST",
			header: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'token':uni.getStorageSync("userNum").token
			},
			timeout:7000,
			success: (err) => {
				ok(err.data)
			},
			fail: (res) => {
				uni.showToast({
					title: '网络错误',
					icon: 'none',
					duration: 1000
				})
			},
			complete: (res) => {
				uni.hideLoading()
			},
		})
  })
}
const code=(response)=>{
	let data = response;
	switch (data.code) {
		case '401':
			// uni.removeTabBarBadge({index: 2});
			// uni.clearStorageSync();
			uni.showModal({
				content: '会话已过期，是否跳转登录页面？',
				success: (confirmRes) => {
					if (confirmRes.confirm) {
						uni.reLaunch({
							// #ifndef MP-WEIXIN
							url: '/pages/login/login'
							// #endif
							// #ifdef MP-WEIXIN
							url: '/pages/login/wxlogin'
							// #endif
						});
					}
				}
			});
			break;
		case 400:
			uni.showToast({title: "错误的请求", icon: 'none'});
			break;
		case 405:
			uni.showToast({title: "当前操作不被允许", icon: 'none'});
			break;
		case 404:
			uni.showToast({title: data.message, icon: 'none'});
			break;
		case 429:
			uni.showToast({title: "请求过多，先休息一下吧~", icon: 'none'});
			break;
		case 500:
			uni.showToast({title: "服务器打瞌睡了~", icon: 'none'});
			break;
		default:
			uni.showToast({title:data.message, icon: "none"});
			break;
	}
}
export default {  
    get,  
    post,
	code
}

