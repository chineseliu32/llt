import Vue from 'vue'
import App from './App'
import http, {get} from '@/utils/http';
import store from './store';
import request from"./utils/request.js";//
import VueClipboard from 'vue-clipboard2'

Vue.prototype.$uploadUrl = 'http://image.udaexblockchain.com:8080/backUpload/uploadFiles';

Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$get = get;
Vue.prototype.$post = http.post;
Vue.prototype.$put = http.put;
Vue.prototype.$del = http.delete;
Vue.prototype.post=request.post;
Vue.prototype.get=request.get;
Vue.prototype.code=request.code;

Vue.use(VueClipboard);

// import TIM from 'tim-js-sdk';
// // import COS from "cos-js-sdk-v5";
// let options = {
//   SDKAppID: 1400440187 // 接入时需要将0替换为您的即时通信应用的 SDKAppID
// };
// // // 创建 SDK 实例，TIM.create() 方法对于同一个 SDKAppID 只会返回同一份实例
// let tim = TIM.create(options); // SDK 实例通常用 tim 表示
// Vue.prototype.tim = tim;
// // 注册 COS SDK 插件
// // tim.registerPlugin({'cos-js-sdk': COS})


App.mpType = 'app';
//封装console.log统一调用
const log=(title,data)=>{
	console.log(title,data)
}
Vue.prototype.log=log;

// 封装msg方法
const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
};

const prePage = (index) => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - (index || 2)];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
};

 Vue.prototype.$api = {msg, prePage};
const app = new Vue({
    ...App
})
app.$mount()