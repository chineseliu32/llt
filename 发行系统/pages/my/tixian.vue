<template>
	<div id="app">
		<div class="balance-container" v-if="realNameStatus === 0 && isVisible==false">
			<div class="title">账户余额</div>
			<div class="balance">￥{{ balance }}</div>
		</div>
		<button class="withdraw-button" @click="handleWithdraw" v-if="realNameStatus === 0">提现</button>
		<!-- 使用v-if代替v-show以根据状态渲染视图 -->
		<view class="step" v-show="realNameStatus === 2  && isVisible==false">
			<div class="content-wrapper">
				<view class="banner">
					<image src="../../static/image/authsuc.png" alt="提现申请提交成功" style="width: 100%; height: 100%;" />
				</view>
				<p>提现申请提交成功</p>
				<button class="withdraw-button" @click="goBackToWallet">返回钱包</button>
			</div>
		</view>
		<!-- 使用v-if代替v-show以根据状态渲染视图 -->
		<view class="step" v-show="realNameStatus === 3">
			<div class="content-wrapper">
				<view class="banner">
					<image src="../../static/image/autherr.png" alt="提现失败" style="width: 100%; height: 100%;" />
				</view>
				<p>提现失败</p>
				<button class="withdraw-button" @click="goBackToWallet">返回钱包</button>
			</div>
		</view>
		<view class="code" v-if="isVisible">
			<view class="code-tip-one">请输入验证码
				<view class="code-tip">向<text>+86
						{{mobile.substring(0, 3)}}****{{mobile.substr(mobile.length-4)}}</text>发送验证码</view>
				<view class="code-errow" v-if="codeclolor == '#ff0000'">验证码输入错误</view>
			</view>
			<input class="cinput" adjust-position="false" auto-blur="true" @blur="blur" @input="codenum" :focus="focus"
				value="code" v-model="code" type="number" maxlength="6" />
			<view class="code-input">
				<view v-for="(item,index) in 4" :key="index" @click="codefocus(index)"
					:style='(index == code.length? "border: 5rpx solid #1195db;width: 80rpx;height: 80rpx;line-height: 80rpx;":"color: " + codeclolor + ";" +"border: 2rpx solid" + codeclolor)'>
					{{code[index] && code[index] || ''}}
				</view>
			</view>
			<block v-if="sec!=20">
				<view class="recode">重新发送({{sec}}s)</view>
			</block>

			<button @click="getCode()" type="primary" :disabled="verifyShow"
				style="margin-top: 200rpx;background-color:#c9161e ;">发送短信</button>
		</view>
	</div>
</template>

<script>
	import LbPicker from '@/components/lb-picker';
	import {
		getBalance,
		drawCash,
		getUserInfo
	} from '@/api/user.js'
	import {
		smsCode
	} from "@/api/login";
	export default {
		name: 'WalletApp',
		components: {
			LbPicker
		},
		data() {
			return {
				balance: "0.00", // 修改初始余额
				realNameStatus: 0, // 初始状态，0表示未操作，1表示提现中，2表示提现成功，3表示提现失败
				isVisible: false,
				aCheckCodeInput: ['', '', '', ''], // 存储输入验证码内容
				aCheckCodePasteResult: [], // 粘贴的验证码
				buttonTxt: "发送验证码",
				codeSeconds: 60,
				mobile: "",
				smsCodeBtnDisabled: false,
				ct: ['', '', '', ''],
				loading: false,
				msg: '',
				// 验证码输入聚焦
				focus: true, //input焦点，用于键盘隐藏后重新唤起
				// 验证码框颜色
				codeclolor: "#313131", //自定义光标的颜色
				// 验证码获取秒数
				sec: '20', //这是重新获取验证码的倒计时(可根据需求修改)
				code: '', //这是用户输入的验证码
				codeCorrect: '', //正确的验证码
				verifyShow: false, //是否禁用按钮
			};
		},
		onLoad() {
			this.getBalance();
			this.initData();
		},
		computed: {
			ctSize() {
				return this.ct.length;
			},
			cIndex() {
				let i = this.ct.findIndex(item => item === '');
				i = (i + this.ctSize) % this.ctSize;
				return i;
			},
			lastCode() {
				return this.ct[this.ctSize - 1];
			}
		},
		watch: {
			cIndex() {
				this.resetCaret();
			},
			lastCode(val) {
				if (val) {
					console.log('this.ctSize', this.ctSize)
					this.$refs.input[this.ctSize - 1].blur();
					this.sendCaptcha();
				}
			}
		},
		mounted() {
			this.resetCaret();
		},
		methods: {
			handleWithdraw() {
				this.drawCash()
				this.realNameStatus = 1; // 提现中
				setTimeout(() => {
					// 模拟提现成功
					this.realNameStatus = 2;
				}, 20); // 模拟网络延迟
			},
			goBackToWallet() {
				this.realNameStatus = 0; // 重置状态，返回钱包页面
			},
			async getBalance() {
				let data = {
					userId: uni.getStorageSync("userNum").id,
				}
				let res = await this.get(getBalance, data);
				if (res.data.status = "success") {
					this.balance = res.data.acct_balance;
				}
				console.log(res);

			},
			// 数据初始化
			async initData() {
				this.userInfo = uni.getStorageSync('userNum') || {};
				this.token = uni.getStorageSync('userNum') || undefined;
				if (this.token) {
					// await this.getMemberInfo();
				} else {
					this.loading = false;
				};
				if (uni.getStorageSync("userNum").id = '') {
					return
				} else {
					this.$get(`${getUserInfo}`, {
						id: uni.getStorageSync("userNum").id
					}).then(r => {
						this.userlist = r.result
						this.user_info = r.result
						this.mobile = this.user_info.user_phone
						console.log(this.mobile);
					}).catch((err) => {});

				}

			},
			drawCash() {

				this.isVisible = true


			},
			// 输入验证码
			codenum: async function(event) {
				// console.log('输入的值',event.target.value)
				var that = this
				var code = event.target.value
				that.code = code
				if (code.length == 4) {
					let data = {
						userId: uni.getStorageSync("userNum").id,
						price: this.balance,
						phone: this.mobile,
						smsCode: code
					}
					let res = await this.get(drawCash, data);
					console.log("短信验证码");
					console.log(res);
					if (res.code == "200") {
						 
						this.isVisible=false;
						if (res.data.error_code = "") {
							this.realNameStatus = 2;
							this.isVisible=false;
						} else {
							this.realNameStatus = 3;
							this.isVisible=false;
						}
					} else {
						that.codeclolor = "#ff0000"
						setTimeout(function() {
							that.code = []
							event.target.value = ""
							that.codeclolor = "#313131"
						}, 1500)
					}

				}
			},
			// 键盘隐藏后设置失去焦点
			blur: function() {
				var that = this
				that.focus = false
			},
			// 点击自定义光标显示键盘
			codefocus: function(e) {
				var that = this
				if (e == that.code.length) {
					that.focus = true
				}
			},
			getCode() { //获取验证码
				const that = this
				that.codeCorrect = that.getVerificationCode(6) //可以不传值，默认为4位随机码
				this.$get(smsCode, {
					userPhone: this.mobile,
					isExist: '2'
				}).then(r => {
					this.$api.msg(`验证码发送成功`, 3 * 1000);

				})
				console.log('生成的随机码为：' + that.codeCorrect)
				that.timedown(that.sec) // 倒计时
			},
			//随机生成几位数
			getVerificationCode(codeLength) { //传入需要的字符串长度，不传默认为4
				// 准备一个用来抽取码的字符串，或者字典
				// let verification_code_str = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";  //数字和字母
				let verification_code_str = "0123456789"; //纯数字
				// 获取某个范围的随机整数，封装的函数，在上面抽取字典的时候进行了调用
				function getRandom(min, max) { //意思是获取min-max数字之间的某个随机数，直接调用即可
					return Math.round(Math.random() * (max - min) + min);
				}
				let newStr = ''; //创建一个空字符串，用来拼接四位随机码
				for (var i = 0; i < codeLength; i++) { //for循环四次，则拼接四次随机码
					newStr += verification_code_str[getRandom(0, verification_code_str.length -
						1)]; //从字典中随机选一个下标，并拼接到空字符串中
				}
				return newStr
			},
			//倒计时
			timedown: function(num) {
				let that = this;
				if (num == 0) {
					that.verifyShow = false; // 不禁用获取验证码按钮
					that.sec = 20
					return clearTimeout();
				} else {
					that.verifyShow = true; // 禁用获取验证码按钮
					setTimeout(function() {
						that.sec = num - 1
						that.timedown(num - 1);
					}, 1000); //定时每秒减一  
				}
			},



		}
	};
</script>

<style scoped>
	/* 简单的CSS样式 */
	#app {
		font-family: 'Arial', sans-serif;
		padding: 0;
		/* 移除内边距 */
		border: 0;
		/* 移除边框 */
		border-radius: 0;
		/* 移除圆角 */
		display: flex;
		flex-direction: column;
		align-items: center;
		/* 水平居中 */
		justify-content: center;
		/* 垂直居中 */
		background-color: #f5f5f5;
		width: 100%;
		/* 宽度撑满屏幕 */
		height: 25vh;
		/* 修改高度为视口高度 */
		margin: 0;
		/* 移除外边距 */
		box-sizing: border-box;
	}

	.balance-container {
		text-align: center;
		margin-bottom: 10px;
		/* 减少间距 */
		font-size: 12px;
		/* 减小字体大小 */
		font-weight: bold;
		color: #c9161e;
		height: 50px;
	}

	.title {
		font-size: 12px;
		/* 减小字体大小 */
		font-weight: bold;
		color: #c9161e;
		margin-top: 5px;
		padding-left: 10px;
		/* 减少间距 */
	}

	.balance {
		font-size: 24px;
		/* 减小字体大小 */
		font-weight: bold;
		color: #c9161e;
		margin-top: 5px;
		/* 减少间距 */
	}

	.withdraw-button {
		background: #c9161e;
		color: #ffffff;
		border: none;
		padding: 4px 8px;
		/* 减少内边距 */
		border-radius: 3px;
		/* 减小圆角 */
		font-size: 14px;
		/* 减小字体大小 */
		line-height: 20px;
		/* 设置行高与按钮高度相同，使字体垂直居中 */
		cursor: pointer;
		margin-bottom: 10px;
		text-align: center;
		/* 文本居中 */
		vertical-align: middle;
		margin-top: 40rpx;
		/* 减少间距 */
		width: 100px;
		/* 设置按钮宽度 */
		height: 30px;
		/* 设置按钮高度 */
	}

	.step {
		padding: 10px;
		/* 减少内边距 */
		border: 1px solid #fff;
		border-radius: 5px;
		background-color: #f5f5f5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		/* 宽度撑满屏幕 */
		height: 100vh;
		/* 修改高度为视口高度 */
	}

	/* 调整图片大小 */



	.content-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding-top: 10vh;
		/* 增加顶部间距 */
	}

	.banner {
		width: 100px;
		height: 100px;
		margin-bottom: 10px;
	}

	.banner image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}



	.code {
		margin: auto;
		margin-top: 50rpx;
		width: 650rpx;
		height: auto;
	}

	.code-tip-one {
		width: 650rpx;
		height: 250rpx;
		line-height: 100rpx;
		font-size: 60rpx;
		font-weight: bold;
		color: #313131;
	}

	.code-tip {
		width: 650rpx;
		height: 100rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		font-weight: normal;
		color: #8a8a8a;
	}

	.code-errow {
		width: 650rpx;
		height: 50rpx;
		line-height: 25rpx;
		font-size: 28rpx;
		font-weight: normal;
		color: #ff0000;
	}

	.code-tip>text {
		padding: 0 20rpx;
		width: 650rpx;
		font-size: 30rpx;
		font-weight: normal;
		color: #ff5500;
	}

	.code-input {
		margin: auto;
		width: 650rpx;
		height: 100rpx;
		display: flex;
	}

	.code-input>view {
		margin-top: 5rpx;
		margin-left: 100rpx;
		width: 86rpx;
		height: 86rpx;
		line-height: 86rpx;
		font-size: 60rpx;
		font-weight: bold;
		color: #313131;
		text-align: center;
		border-radius: 10rpx;
	}

	.code-input>view:nth-child(1) {
		margin-left: 0rpx;
	}

	.cinput {
		position: fixed;
		left: -100rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.recode {
		margin-top: 20rpx;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #707070;
		font-size: 28rpx;
	}
</style>