<template>
	<view class="container">
		<!--顶部返回按钮-->
		<!-- <i class="back-btn iconfont iconzuojiantou-up" @tap="navBack"></i> -->
		<!--插画-->

		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">

			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				请登录！
			</view>

			<view class="input-content">
				<!--快速登录（调试用）-->
				<view class="btn-group">
				</view>
				<form @submit="toLogin">
					<view class="input-item">
						<text class="tit">手机号码</text>
						<input type="number" name="mobile" :value="userPhone" placeholder="请输入手机号码" maxlength="11"
							@blur="blurMobileChange" />
					</view>
					<view class="input-item" v-if="loginByPass">
						<text class="tit">密码</text>
						<input name="password" type="password" :value="password" placeholder="请输入密码" maxlength="20" />
					</view>
					<view class="input-item input-item-sms-code" v-if="!loginByPass">
						<text class="tit">验证码</text>
						<input type="number" name="code" :value="code" placeholder="请输入验证码" maxlength="6"
							data-key="mobile" />
						<button class="sms-code-btn" :disabled="smsCodeBtnDisabled" @tap="getSmsCode()">
							<span class="btn" v-if="!smsCodeBtnDisabled">获取验证码</span>
							<span v-else class="sms-code-resend">重新发送 {{ codeSeconds }}</span>
						</button>
					</view>
					<button class="confirm-btn" formType="submit" :disabled="logining">登录</button>


					<view class="ok"><evan-checkbox v-model="isChecked" @change="selfChanged" color="#DC143C"
							style="transform:scale(0.8);width: 800rpx;"> 勾选代表同意<text class="red"
								@click="to(1)">《用户协议》</text>和<text class="red"
								@click="to(2)">《隐私政策》</text></evan-checkbox></view>
				</form>
			</view>

			<view @tap="showLoginBySmsCode" class="forget-section">
				{{ loginByPass ?  "验证码登录" : "密码登录" }}
			</view>
			<view class="forget-section" @tap="navTo('/pages/login/password')">
				忘记密码?
			</view>

		</view>

		<!-- #ifdef APP-PLUS-->
		<view class="wxlogin-box" style="display: none;">
			<image src="../../static/image/wxlogin.png" class="wxlogin" @click="wxLogin"></image>
		</view>
		<!-- #endif-->
		<view class="register-section">
			还没有账号?
			<text @tap="navTo('/pages/login/registered')">马上注册</text>
			<view class="forget-section" @click="backtoHome">
				返回首页 <image src="../../static/image/index1.png" mode="" style="width: 15px;height: 15px;margin-left: 5px;" ></image>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import {
		wxbd,
		appLogin,
		gcode,
		appurl
	} from "@/api/user.js"
	import {
		loginBySmsCode,
		registered,
		loginByPass,
		userCaptcha,
		smsCode
	} from "@/api/login";
	import {
		websocketUrl,
		baseUrl
	} from "../../api/params";
	const graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				mobile: '',
				userPhone: '',
				password: '',
				code: '',
				logining: false,
				loginByPass: true,
				smsCodeBtnDisabled: false,
				codeSeconds: 60,
				userInfo: null,
				selfChecked: false,
				url: "",
				isChecked:false,
			}
		},
		onLoad(options) {
			let yinsi=uni.getStorageSync("yinsi");
			let xieyi=uni.getStorageSync("xieyi");
			console.log("yinsi："+yinsi);
			console.log("xieyi："+xieyi);
			if(yinsi=="true" && xieyi=="true" )
			{
				this.isChecked=true;
				this.selfChecked = this.isChecked;
			}
			console.log("yinsi+"+(yinsi+xieyi));
			this.userInfo = options.userInfo;
			this.bargain = options.id || '';
			// #ifdef H5
			function getUrlParam(name) {
				var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
				let url = window.location.href.split('#')[0]
				let search = url.split('?')[1]
				if (search) {
					var r = search.substr(0).match(reg)
					if (r !== null) return unescape(r[2])
					return null
				} else {
					return null
				}
			}
			// 判断在微信浏览器中调用授权
			var ua = navigator.userAgent.toLowerCase();
			console.log(ua.match(/MicroMessenger/i) == "micromessenger")
			if (ua.match(/MicroMessenger/i) == "micromessenger") {

				// console.log("在微信浏览器打开的")
				let link = window.location.href;
				let params = getUrlParam('code'); // 地址解析  
				console.log(params);
				if (params) {
					console.log("获取到了code");
					this.get(gcode, {
						code: params
					}).then(res => {
						console.log(res)
						if (res.code == 200) {
							if (res.data.id == "") {
								console.log("unionId", res.data.result.union_id)
								uni.reLaunch({
									url: "./wxlog?unionId=" + res.data.result.union_id + "&openId=" + res
										.data.result.openid + "type=2"
								})
							} else {
								uni.setStorageSync("userNum", res.data)
								uni.showToast({
									title: "登录成功",
									duration: 1500,
									icon: "success"
								})
								setTimeout(() => {
									uni.switchTab({
										url: "../index/index"
									})
								}, 1500)

							}
						} else {
							uni.reLaunch({
								url: "./wxlog?unionId=" + res.data.result.unionid
							})
						}
					})
				} else {
					console.log("没有获取到获取到了code")
					let appid = 'wxc5db69410b70f44f';

					let uri = encodeURIComponent(link);
					//snsapi_base   //snsapi_base    scope = snsapi_base（不弹出授权页面，直接跳转，只能获取用户 openid ）。  
					let authURL =
						`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`;
					window.location.href = authURL;
				}


			}
			// #endif
		},
		methods: {
			wxLogin() {
				if (!this.selfChecked) {
					this.$api.msg(`请仔细阅读《服务协议》和《隐私政策》，同意后可完成登录。`);

				} else {
					var that = this
					uni.login({
						provider: 'weixin',
						success: function(e) {
							console.log(e)
							that.get(appLogin, {
								unionId: e.authResult.unionid
							}).then(ee => {
								console.log("个人信息", ee)
								if (ee.code == 0) {
									if (ee.result.id == "") {
										uni.reLaunch({
											url: "./wxlog?unionId=" + e.authResult.unionid
										})
									} else {
										uni.setStorageSync("userNum", ee.result)
										uni.showToast({
											title: "登录成功",
											duration: 1500,
											icon: "success"
										})
										setTimeout(() => {
											uni.reLaunch({
												url: "../index/index"
											})
										}, 1500)
									}
								}
							})
						},
						fail: res => {
							console.log(res);
						}
					});
				}
			},
			to(e) {
				if (e == 1) {
					uni.navigateTo({
						url: "../my/yinsi"
					})
				} else {
					uni.navigateTo({
						url: "../my/xieyi"
					})
				}
			},
			loginTest(mobile, password) {
				this.mobile = mobile;
				this.password = password;
			},
			...mapMutations(['login']),
			// 验证手机号是否有效
			checkPhoneIsValid(mobile) {
				const reg = /^1[0-9]{10,10}$/;
				if (!reg.test(mobile)) {
					this.$api.msg('请输入正确的手机号');
					return false;
				} else {
					return true;
				}
			},
			// 发送验证码并进入倒计时
			getSmsCode() {
				if (!this.checkPhoneIsValid(this.mobile)) return;
				this.$get(smsCode, {
					userPhone: this.mobile,
					isExist: '2'
				}).then(r => {
					this.$api.msg(`验证码发送成功`, 3 * 1000);
					this.smsCodeBtnDisabled = true;
					let time = 59;
					let timer = setInterval(() => {
						if (time === 0) {
							clearInterval(timer);
							this.smsCodeBtnDisabled = false;
						} else {
							this.codeSeconds = time;
							this.smsCodeBtnDisabled = true;
							time--
						}
					}, 1000);
				})
			},
			// 失去焦点的手机号
			blurMobileChange(e) {
				this.mobile = e.detail.value
			},
			// 切换登录方式
			showLoginBySmsCode() {
				this.loginByPass = !this.loginByPass;
			},
			// 返回上一页
			navBack() {
				uni.navigateBack();
			},
			// 统一跳转路由
			navTo(url) {
				uni.navigateTo({
					url
				})
			},
			// 返回主页
			toHome() {
				uni.redirectTo({
					url: '../index/index'
				})
			},
			selfChanged() {
				this.selfChecked = !this.selfChecked
				console.log(this.selfChecked);
			},
			// 登录事件
			async toLogin(e) {
				const formData = e.detail.value;
				if (!this.selfChecked) {
					this.$api.msg(`请仔细阅读《服务协议》和《隐私政策》，同意后可完成登录。`);
					return;
				}
				console.log(formData);
				console.log(baseUrl);
				const params = {};
				params.userPhone = formData.mobile;
				let rule = [{
					name: "mobile",
					checkType: "userPhone",
					checkRule: "11,11",
					errorMsg: "请输入正确的手机号"
				}];
				if (this.loginByPass) {
					params.password = formData.password;
					rule[1] = {
						name: "password",
						checkType: "number",
						checkRule: "6,20",
						errorMsg: "密码长度为6-20位"
					};
				} else {
					params.smsCode = formData.code;
					rule[1] = {
						name: "code",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入验证码"
					};
				}
				const checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					this.$api.msg(graceChecker.error);
					return;
				}


				if (uni.getStorageSync('weixin_openid')) {
					params.openid = uni.getStorageSync('weixin_openid')
				}
				if (this.loginByPass) {
					this.handleLoginByPass(params)
				} else {
					this.handleLoginBySmsCode(params)
				}
			},
			// 密码登录
			handleLoginByPass(params) {


				this.$get(loginByPass, {
					...params
				}).then(r => {
					this.$api.msg('恭喜您，登录成功！');
					// this.login(r.data);
					uni.setStorageSync('userNum', r.result)

					this.initWebsocket();
					if (this.userInfo) {
						const oauthClientParams = {}
						// #ifdef MP-WEIXIN 
						oauthClientParams.oauth_client = 'wechatMp';
						// #endif  
						// #ifndef MP-WEIXIN 
						oauthClientParams.oauth_client = 'wechat';
						//#endif
						const userInfo = JSON.parse(this.userInfo);
						this.$get(authLogin, {
							...userInfo,
							...oauthClientParams,
							gender: userInfo.sex || userInfo.gender,
							oauth_client_user_id: userInfo.openid || userInfo.openId,
							head_portrait: userInfo.headimgurl || userInfo.avatarUrl,
						});
					}
					// #ifdef APP-PLUS
					uni.navigateTo({
						url: '../index/index'
					})
					// #endif
					//  #ifndef APP-PLUS
					uni.switchTab({
						url: '../index/index'
					})
					// #endif
				});
			},
			// 验证码登录
			handleLoginBySmsCode(params) {
				// #ifdef  APP-PLUS  
				params.group = 'tinyShopApp'
				// #endif  
				//  #ifdef H5  
				params.group = 'tinyShopH5'
				// #endif 
				//  #ifdef  MP-WEIXIN 
				params.group = 'tinyShopWechatMq'
				// #endif  
				//  #ifdef  MP-QQ  
				params.group = 'tinyShopQqMq'
				// #endif  
				this.$get(loginBySmsCode, {
					...params
				}).then(r => {
					this.initWebsocket();
					this.$api.msg('恭喜您，登录成功！')
					this.login(r.data);
					uni.setStorageSync('userNum', r.result)
					// #ifdef APP-PLUS
					uni.navigateTo({
						url: '../index/index'
					})
					// #endif
					//  #ifndef APP-PLUS
					uni.switchTab({
						url: '../index/index'
					})
					// #endif
				})
			},
			initWebsocket() {
				let websocketTimer = null;
				uni.connectSocket({
					url: websocketUrl
				});
				uni.onSocketOpen(() => {
					uni.setStorageSync('socketOpen', true);
					this.websocketSend(JSON.stringify({
						"route": "site.login",
						"token": uni.getStorageSync('accessToken')
					}));
					websocketTimer = setInterval(() => {
						this.websocketSend(JSON.stringify({
							"route": "site.ping"
						}));
					}, 60 * 1000);
					console.log('websocket 连接成功')
				});
				uni.onSocketError(function(res) {
					clearInterval(websocketTimer);
					uni.connectSocket({
						url: websocketUrl
					});
					console.log('WebSocket连接打开失败，请检查！', res);
				});
			},
			websocketSend(data) {
				uni.sendSocketMessage({
					data
				});
			},
			backtoHome() {
				console.log("back home")
				uni.reLaunch({
					url: '../index/index'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.wxlogin-box {
		display: flex;
		justify-content: center;
	}

	.wxlogin {
		width: 50px;
		height: 50px;
	}

	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow-y: auto;
		overflow-x: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.ok {
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		margin-top: 20rpx;

		.red {
			color: #ED1C24;
		}
	}

	.input-item-sms-code {
		position: relative;

		.sms-code-btn {
			position: absolute;
			color: #111;
			right: 20upx;
			bottom: 20upx;
			font-size: 28upx;
		}

		.sms-code-resend {
			color: #999;
		}

		.sms-code-btn:after {
			border: none;
			background-color: transparent;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 50upx;
		background: #c9161e;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 30upx;
	}

	.register-section {
		margin: 30upx 0 50upx 0;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}

		text:first-child {
			margin-right: 10upx;
		}
	}

	.btn-group {
		display: flex;
		margin-bottom: 20upx;
	}
</style>