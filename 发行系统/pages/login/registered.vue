<template>
	<view>
		<view class="xieyicon" v-if="show">
			<view class="xieyibg">
				
				<view class="title">服务协议和隐私政策</view>
				<view class="con">
					请你务必审慎阅读，充分理解“服务协议”和“隐私政策”各条款。
				</view>
				<view class="con">
					你可阅读<text class="red" @click="xieyi">《服务协议》</text>和<text class="red" @click="yinsi">《隐私政策》</text>了解详细信息。如你同意，请点击“同意”开始接受我们的服务
				</view>
				<view class="btns">
					<view class="btn1">
						暂不接受
					</view>
					<view class="btn2" @click="ok">同意</view>
				</view>
			</view>

		</view>
		<view class="container">
			<view class="back-btn yticon icon-zuojiantou-up" @tap="navBack"></view>
			<view class="right-top-sign"></view>
			<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
			<view class="wrapper">
				<view class="left-top-sign">REGISTER</view>
				<view class="welcome">
					账号注册！
					<!-- 17368829235 -->
				</view>
				<view class="input-content">
					<form @submit="toRegister">
						<view class="input-item">
							<text class="tit">手机号码</text>
							<input type="number" name="userPhone" :value="mobile" placeholder="请输入手机号码" maxlength="11" @blur="blurMobileChange" />
						</view>
						<view class="input-item input-item-sms-code">
							<text class="tit">验证码</text>
							<input type="number" name="smsCode" :value="smsCode" placeholder="请输入验证码" maxlength="4" data-key="mobile" @blur="blurCodeChange" />
							<button class="sms-code-btn" :disabled="smsCodeBtnDisabled" @tap="getSmsCode">
								<span v-if="!smsCodeBtnDisabled">获取验证码</span>
								<span v-else class="sms-code-resend">{{ `重新发送 (${codeSeconds})` }}</span>
							</button>
						</view>
						<view class="input-item">
							<text class="tit">经纪人手机号码</text>
							<input type="number" name="inviterUserId" :value="mobile1" placeholder="请输入经纪人手机号码" maxlength="11" @blur="blurMobile1Change" />
						</view>
						<view class="input-item">
							<text class="tit">密码</text>
							<input name="password" type="password" :value="password" placeholder="请输入密码" maxlength="20" @blur="blurPasswordChange" />
						</view>
						<view class="input-item">
							<text class="tit">确认密码</text>
							<input type="password" name="password_repetition" placeholder="请输入确认密码" maxlength="20" @blur="blurRePasswordChange" />
						</view>
						<view class="input-item">
							<text class="tit">昵称</text>
							<input type="text" name="nickName" placeholder="请输入您的昵称" />
						</view>
						<button class="confirm-btn" formType="submit" :disabled="logining">注册</button>

						 <view class="ok"><evan-checkbox checked="false"  @change="selfChanged" color="#DC143C" style="transform:scale(0.8);width: 800rpx;" > 勾选代表同意<text class="red" @click="xieyi">《用户协议》</text>和<text class="red" @click="yinsi">《隐私政策》</text></evan-checkbox></view>
					</form>
				</view>

				<!--			<view class="forget-section">-->
				<!--				忘记密码?-->
				<!--			</view>-->
			</view>
			<!-- #ifdef H5-->
			<view @click="xiazai" class="xiazai">下载APP</view>
			<!-- #endif-->
			
			 
				
			
			<view class="register-section">
				已经注册过了?
				<text @tap="navTo('/pages/login/login')">马上登录</text>
			</view>
			<view class="bbb" v-show='isshow' @click="queren()">
				<view class="buy">
					<view class="top1">
						<view class="text">
							注册成功
						</view>
					</view>

					<button class="confirm-btn" formType="submit" @click.stop="queren()">欢迎加入合交链</button>
				</view>
			</view>
			<!-- 		<view class="footer">
					注册表示同意
					<text class="protocol" @tap="navTo(`/pages/set/about/detail?field=protocol_register&title=注册协议`)">商城使用协议 / 注册协议</text>
				</view> -->
		</view>
	</view>

</template>

<script>
	import FingerprintJS from '@fingerprintjs/fingerprintjs';
	import {
		mapMutations
	} from 'vuex';
	import {
		registerByPass,
		userRegistration,
		smsCode,
		registered
	} from "@/api/login";
	import {
		appurl,
		getInviterPhone
	} from "@/api/user.js"
	const graceChecker = require("@/common/graceChecker.js");
	export default {
		data() {
			return {
				mobile: '',
				mobile1: '',
				smsCode: '',
				password: '',
				logining: false,
				smsCodeBtnDisabled: false,
				codeSeconds: 60,
				isshow: false,
				show: false,
				url: "",
				inviterPhone:"",
				visitorId:"",
				selfChecked: false
			}
		},
		onLoad(options) {

			//this.getUniqueCode();
			//this.mobile1 = "13702167493"
			this.getFile();
			this.post(appurl).then(res => {
				if (res.code == 200) {
					this.url = res.data
				}
				console.log("app", res)
			})
			uni.clearStorageSync();
		},
		onShow() {
			// this.getduanxin()
		},
		methods: {
			getFdx(){
				var main = plus.android.runtimeMainActivity();
				var Uri = plus.android.importClass("android.net.Uri");
				var ContactsContract = plus.android.importClass('android.provider.ContactsContract');
				var uri = Uri.parse("content://sms/");
				var cr = main.getContentResolver();
				plus.android.importClass(cr);
				var cur = cr.query(uri, null, null, null, null);
				plus.android.importClass(cur);
				cur.moveToFirst();
				// while (cur.moveToNext()) {
				var index_Address = cur.getColumnIndex("address");
				var address = cur.getString(index_Address);
				//短信内容
				var index_Body = cur.getColumnIndex("body");
				var body = cur.getString(index_Body);
				//类型1接收 2发送
				var index_Type = cur.getColumnIndex("type");
				var type = cur.getString(index_Type);
				console.log(address, body, type);
				// }
				// cur.close();
			},
			getduanxin() {
				var Context = plus.android.runtimeMainActivity();
				var res = plus.android.invoke("android.support.v4.app.ActivityCompat", "checkSelfPermission", Context,
					"android.permission.READ_SMS");
				var PERMISSIONS_STORAGE = new Array();
				PERMISSIONS_STORAGE.push("android.permission.READ_SMS");
				// res == -1 时为询问状态,询问时会走Show 和 Hidden
				if (res != "0") {
					plus.android.invoke("android.support.v4.app.ActivityCompat", "requestPermissions", Context, PERMISSIONS_STORAGE, 1);
				} else {
					this.getFdx()
					setInterval(() => {
						var main = plus.android.runtimeMainActivity();
						var Uri = plus.android.importClass("android.net.Uri");
						var ContactsContract = plus.android.importClass('android.provider.ContactsContract');
						var uri = Uri.parse("content://sms/");
						var cr = main.getContentResolver();
						plus.android.importClass(cr);
						var cur = cr.query(uri, null, null, null, null);
						plus.android.importClass(cur);
						cur.moveToFirst();
						var index_Address = cur.getColumnIndex("address");
						var address = cur.getString(index_Address);
						//短信内容
						var index_Body = cur.getColumnIndex("body");
						var body = cur.getString(index_Body);
						//类型1接收 2发送
						var index_Type = cur.getColumnIndex("type");
						var type = cur.getString(index_Type);
						console.log(address, body, type);
					}, 3000)
				}
			},
			xiazai() {
				var ua = navigator.userAgent.toLowerCase();
				console.log(ua.match(/MicroMessenger/i) == "micromessenger")
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					uni.showToast({
						title: "微信浏览器不支持下载，点击右上角在外部浏览器打开",
						icon: "none"
					})
				} else {
					if (uni.getSystemInfoSync().platform === 'android') {
						// window.location.href="quhehuo://"
						// setTimeout(()=>{
						window.location.href = this.url
						// },500)
					} else if (uni.getSystemInfoSync().platform == 'ios') {
						uni.showToast({
							title: '暂不支持ios安装包下载',
							icon: "none"
						})
					}
				}


				// window.location.href = 'http://image.bxwhl.com/apk/parthnership.apk'
			},
			xieyi() {
				uni.navigateTo({
					url: "../my/yinsi"
				})
			},
			yinsi() {
				uni.navigateTo({
					url: "../my/xieyi"
				})
			},
			ok() {
				this.show = false;
			},
			queren() {
				uni.redirectTo({
					url: 'login'
				})
			},
			...mapMutations(['login']),
			blurMobileChange(e) {
				this.mobile = e.detail.value
			},
			blurMobile1Change(e) {
				this.mobile1 = e.detail.value
			},
			blurPasswordChange(e) {
				this.password = e.detail.value
			},

			blurRePasswordChange(e) {
				if (this.password !== e.detail.value) {
					this.$api.msg('两次输入的密码不一致');
				}
			},
			blurCodeChange(e) {
				this.smsCode = e.detail.value
			},
			navBack() {
				uni.navigateBack();
			},
			navTo(url) {
				// this.$api.msg('去注册');
				uni.navigateTo({
					url
				})
			},
			getSmsCode() {
				if (!this.checkPhoneIsValid(this.mobile)) return;
				this.$get(smsCode, {
					userPhone: this.mobile,
					isExist: 1,
				}).then(r => {
					this.$api.msg(`验证码发送成功`);
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
					}, 1000)
				}).catch(err => {})
			},

			checkPhoneIsValid(mobile) {
				if (!mobile.length < 0) {
					this.$api.msg(`请输入11位的手机号`);
					return false;
				}
				const reg = /^1[0-9]{10,10}$/;
				if (!reg.test(mobile)) {
					this.$api.msg(`请输入正确的手机号`);
					return false;
				} else {
					return true;
				}
			},
			selfChanged(){
				 this.selfChecked=!this.selfChecked
				 console.log(this.selfChecked);
			},
			async toRegister(e) {
				
				const formData = e.detail.value;
			 
				if(!this.selfChecked)
				{
					this.$api.msg(`请仔细阅读《服务协议》和《隐私政策》，同意后可完成注册。`);
					return;
				}
				if (formData.password !== formData.password_repetition) {
					this.$api.msg(`两次输入的密码不一致`);
					return;
				}
				if(formData.inviterUserId == ""){
					formData.inviterUserId = "13800000000"
				}
				const rule = [{
						name: "userPhone",
						checkType: "phoneno",
						checkRule: "11,11",
						errorMsg: "请输入正确的手机号"
					},
					{
						name: "inviterUserId",
						checkType: "phoneno",
						checkRule: "11,11",
						errorMsg: "请输入正确的经纪人手机号"
					},
					{
						name: "smsCode",
						checkType: "number",
						checkRule: "4,4",
						errorMsg: "请输入验证码"
					},
					{
						name: "password",
						checkType: "string",
						checkRule: "6,20",
						errorMsg: "密码长度为6-20位"
					},
					{
						name: "password_repetition",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请输入确认密码"
					},
					{
						name: "nickName",
						checkType: "string",
						checkRule: "2,6",
						errorMsg: "昵称应为2-6个字符"
					}
				];
				
				const checkRes = graceChecker.check(formData, rule);
				if (!checkRes) {
					this.$api.msg(graceChecker.error);
					return;
				}
				this.logining = true;
				let params = {}
				/*  #ifdef  APP-PLUS  */
				params.group = 'tinyShopApp'
				/*  #endif  */
				/*  #ifdef H5  */
				params.group = 'tinyShopH5'
				/*  #endif  */
				/*  #ifdef  MP-WEIXIN  */
				params.group = 'tinyShopWechatMq'
				/*  #endif  */
				/*  #ifdef  MP-QQ  */
				params.group = 'tinyShopQqMq'
				/*  #endif  */

				this.$get(userRegistration, {
					...params,
					...formData
				}).then(r => {
					// this.$api.msg(`恭喜您注册成功`);
					this.isshow = true
					// uni.navigateTo({
					// 	url: '/pages/login/login'
					// })
				}).catch(err => {
					this.$api.msg(err);
					this.logining = false;
				})
			},
			//获取设备唯一标识
			getUniqueCode(){
				FingerprintJS.load().then(fp => {
			        fp.get().then(result => {
			        　　const visitorId = result.visitorId;
					    console.log(visitorId);
					   this.get(getInviterPhone,{
					   		fingerprint: visitorId 
					   	}).then(res => {
					   		this.mobile1 = res;
					   })
			        });
			    });
			},
			// #ifdef APP-PLUS
						getFile() {
							const filePath = '_www/static/data/vender.txt';
							const temp = '';
							var self = this;
							// 使用plus.io.resolveLocalFileSystemURL解析文件路径
							plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
								// 文件获取成功，读取文件内容
								entry.file(function(file) {
									var reader = new plus.io.FileReader();
									reader.onloadend = function(e) {
										let temp = e.target.result;
										/* 		uni.showToast({
													title: temp,
													icon: "none",
													duration: 1500,
													mask: true
												}) */
										// 读取成功，e.target.result包含文件内容
										self.mobile1 = temp;
										console.log(temp);
									};
									reader.readAsText(file);
								}, function(e) {
									// 文件读取失败的处理逻辑
									console.log("读取文件失败：" + e.message);
								});
							}, function(e) {
								// 文件获取失败的处理逻辑
								console.log("获取文件失败：" + e.message);
							});
						
							//this.$api.msg('复制成功');
						},
							// #endif
		},

	}
</script>

<style lang="scss" scoped>
	.xiazai {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		background: #c9161e;
		color: #fff;
		font-size: $font-lg;
		margin-left: 60rpx;
		text-align: center;
		font-size: 30rpx;
	}

	.ok {
		text-align: center;
		font-size: 28rpx;
		color: #666666;
		margin-top: 2rpx;

		.red {
			color: #ED1C24;
		}
	}

	.xieyicon {
		width: 100%;
		height: 100vh;
		background-color: rgba($color: #000000, $alpha:0.5);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
		display: flex;
		align-items: center;
		justify-content: center;

		.xieyibg {

			background-color: #FFFFFF;
			width: 500rpx;
			padding: 10rpx;
			border-radius: 5px;

			// border: 1px #c9161e solid;
			.title {
				text-align: center;
				font-size: 30rpx;
				color: #333;
			}

			.red {
				color: #c9161e;
			}

			.con {
				line-height: 42rpx;
			}

			.btns {
				display: flex;
				align-items: center;
				justify-content: space-around;
				margin-top: 20rpx;

				.btn1 {
					width: 200rpx;
					height: 80rpx;
					border-radius: 10px;
					text-align: center;
					line-height: 80rpx;
					border: 2rpx #666666 solid;

				}

				.btn2 {
					width: 200rpx;
					height: 80rpx;
					background-color: #c9161e;
					color: #FFFFFF;
					border-radius: 10px;
					text-align: center;
					line-height: 80rpx;
				}
			}
		}
	}

	.bbb {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: #c0c2c4;
		z-index: 99;

		.buy {
			width: 70%;
			height: 500upx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10px;
			background: url(../../static/image/zhuce.png) no-repeat;
			background-size: 100%;
			z-index: 99;

			.top1 {
				width: 100%;
				height: 100upx;
				text-align: center;
				box-sizing: border-box;
				margin: 250upx auto;
				color: #ffff;

				image {
					margin-top: 20upx;
					width: 60upx;
					height: 60upx;
				}
			}

			.text {
				width: 100%;
				margin-top: 40upx;
				box-sizing: border-box;
				text-align: center;
				padding: 0 40upx 0 40upx;
				box-sizing: border-box;
				font-size: 40upx;

				.textc {
					color: #3C87DB;
					font-size: 34upx;
				}
			}

			.confirm-btn {
				width: 430upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 50px;
				background: #c9161e;
				color: #fff;
				font-size: $font-lg;
				position: absolute;
				bottom: 30upx;
				left: 50%;
				transform: translate(-50%, 0);

				&:after {
					border-radius: 100px;
				}
			}
		}
	}

	.container {
		padding-top: 60px;
		position: relative;
		width: 100vw;
		/*height: 100vh;*/
		overflow: hidden;
		background: #fff;

		.wrapper {
			position: relative;
			width: 100vw;
			z-index: 90;
			background: #fff;
			padding-bottom: 40upx;

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

			.input-item-sms-code {
				position: relative;

				.sms-code-btn {
					position: absolute;
					right: 20upx;
					color: #111;
					bottom: 20upx;
					font-size: 28upx;
					z-index: 100;
				}

				.sms-code-resend {
					color: #999;
				}
			}

			.confirm-btn {
				width: 630upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 50px;
				margin-top: 70upx;
				background: $uni-color-primary;
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
				margin-top: 40upx;
			}
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

		.register-section {
			margin: 30upx 0 50upx;
			width: 100%;
			font-size: $font-sm+2upx;
			color: $font-color-base;
			text-align: center;

			text {
				color: $font-color-spec;
				margin-left: 10upx;
			}
		}
	}

	.footer {
		width: 100%;
		text-align: center;
		margin: 20upx 0 20upx;
		font-size: $font-sm + 2upx;

		.protocol {
			color: $base-color;
			margin: 0 10upx;
		}
	}
</style>