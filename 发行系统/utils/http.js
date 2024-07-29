import axios from './uni-axios'
import {refreshToken} from "@/api/login";
import {baseUrl} from "@/api/params";

// 创建自定义接口服务实例
const http = axios.create({
	baseURL: baseUrl, // baseUrl 公共前缀
	timeout: 60 * 1000,  // 不可超过 manifest.json 中配置 networkTimeout的超时时间
	// #ifdef H5
	withCredentials: true,
	// #endif
	headers: {
		'Content-Type': 'application/json'
	},
});

// 拦截器 在请求之前拦截
http.interceptors.request.use(async config => {
	const token = uni.getStorageSync('userNum').token;
	// console.log(token)
	let commonHeader = {};

	config.headers = {...config.headers, ...commonHeader,};
	const config1 = config;
	const header = {
		"token": token||"",
	};
	config.headers = {'Content-Type': 'application/json', ...header};
			
	return config1;

}, (error) => {
	// 对请求错误做些什么
	return Promise.reject(error);
});

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
	// uni.hideLoading();
	let data = response.data;
	// console.log(response)
	switch (data.code) { 
		case '0':
			return response.data;
			break;
		case '401':
			uni.removeTabBarBadge({index: 2});
			uni.clearStorageSync();
			uni.showModal({
				content: '会话已过期，是否跳转登录页面？',
				success: (confirmRes) => {
					if (confirmRes.confirm) {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				}
			});
			throw response.data.message;
			break;
		case 400:
			uni.showToast({title: "错误的请求", icon: 'none'});
			throw response.data.message;
			break;
		case 405:
			uni.showToast({title: "当前操作不被允许", icon: 'none'});
			throw response.data.message;
			break;
		case 404:
			uni.showToast({title: response.data.message, icon: 'none'});
			throw response.data.message;
			break;
		case 429:
			uni.showToast({title: "请求过多，先休息一下吧~", icon: 'none'});
			throw response.data.message;
			break;
		case 500:
			uni.showToast({title: "服务器打瞌睡了~", icon: 'none'});
			throw response.data.message;
			break;
		default:
			uni.showToast({title: response.data.message, icon: "none"});
			throw response.data.message;
			break;
	}
}, error => {
	// uni.hideLoading();
	return Promise.reject(error.message)
});

export default http;

export function get(url, params = {}) {
	return new Promise((resolve, reject) => {
		http
			.get(url, {
				params,
			})
			.then(response => {
				resolve(response);
			})
			.catch(err => {
				reject(err);
			});
	});
}
