<template>
	<div class="g-remove-check-code">
		<view class="container">
			<view class="step" v-show="isSettleAccount == 1 ">
				<div style="text-align: center; margin-bottom: 25px;">
					<view class="banner">
						<image src="../../static/image/authsuc.png" alt="" />
					</view>
					<p>已成功绑定银行卡</p>
				</div>
				<button class="submit-button" @click="delBack">解绑银行卡</button>

			</view>
			<!-- 卡类型选择器 
			<view class="ui-list right city">
				<text class="two">*</text>
				<text class="one">卡 类 型：</text>
				<view class="picker-bank">
					<lb-picker @confirm="getcard" :list="cardList" :mode="selector" :level="level">
						<view class="cardname">{{ cardName }}</view>
					</lb-picker>
				</view>
			</view>-->
			<view v-show="isSettleAccount == 0 ">
				<!-- 所属银行选择器 -->
				<view class="ui-list right city">
					<text class="two">*</text>
					<text class="one">所属银行：</text>
					<view class="picker-bank">
						<lb-picker @confirm="getbank" :list="mybankList" :mode="selector" :level="level">
							<view class="cardname">{{ bankName }}</view>
						</lb-picker>
					</view>
				</view>

				<!-- 持卡人姓名输入框 -->
				<view class="ui-list right city">
					<text class="two">*</text>
					<text class="one">持卡人姓名：</text>
					<view class="picker-bank">
						<input type="text" name="bankcardName" v-model="bankcardName" placeholder="请输入持卡人姓名"
							maxlength="6" @blur="nameChange" class="cardname" />
					</view>
				</view>

				<!-- 地址选择器 -->
				<view class="ui-list right city" style="display: flex; align-items: center;">
					<text class="two">*</text>
					<text class="one">居住地址：</text>
					<view class="picker-bank" style="flex: 1;">
						<UniAddressSelector v-model="txt" @change="change">{{ txt }}</UniAddressSelector>
					</view>
				</view>

				<!-- 身份证号码输入框 -->
				<view class="ui-list right city">
					<text class="two">*</text>
					<text class="one">身份证号码：</text>
					<view class="picker-bank">
						<input type="text" name="idName" v-model="idCard" placeholder="请输入身份证号码" maxlength="18"
							@blur="idCardChange" class="cardname" />
					</view>
				</view>

				<!-- 银行卡卡号输入框 -->
				<view class="ui-list right city">
					<text class="two">*</text>
					<text class="one">银行卡卡号：</text>
					<view class="picker-bank">
						<input type="text" name="bankNo" v-model="bankNo" placeholder="请输入银行卡卡号" maxlength="19"
							@blur="bankNoChange" class="cardname" />
					</view>
				</view>

				<!-- 手机号码输入框 -->
				<view class="ui-list right city">
					<text class="two">*</text>
					<text class="one">手机号码：</text>
					<view class="picker-bank">
						<input type="number" name="userPhone" v-model="mobile" placeholder="请输入预留手机号码" maxlength="11"
							@blur="blurMobileChange" class="cardname" />
					</view>
				</view>

				<!-- 提交按钮 -->
				<div style="margin-top:25px;margin-bottom: 25px;">

					<p>说明：请务必绑定一张 Ⅰ类 银行卡，若绑定了一张 Ⅱ类 银行卡时，当结算金额超过10000元时，银行会提示金额超限导致结算失败。</p>

				</div>
				<button class="submit-button" @click="submitMobile">提交</button>
			</view>

			<view class="bbb" v-show='show' @click="show=false" style="z-index: 999;">
				<view class="buy">
					<view class="top1">
						<image src="../../static/image/lingdang.png" mode=""></image>
					</view>
					<view class="text">
						确认要解除银行卡绑定吗?
					</view>
					<button class="confirm-btn" @click="confirmDel">确定</button>
					<button class="confirm-btn" @click="show=false">取消</button>
				</view>
			</view>
		</view>
		</view>
	</div>
</template>
<script>
	//卡类型
	import LbPicker from '@/components/lb-picker';
	//个人信息
	import {
		mapMutations
	} from 'vuex';
	import {
		loginByPass,
		loginBySmsCode,
		smsCode,
		updatePassword,
		saveOrUpdateUserInfo,
		saveOrUpdateUserPassword
	} from "@/api/login.js";
	const graceChecker = require("@/common/graceChecker.js");
	//居住地址
	import UniAddressSelector from '@/pages/my/UniAddressSelector.vue';

	//省市
	import cityData from '@/utils/cityData.js';
	//银行
	import {
		getBankNames,
		bankList
	} from '@/utils/bankCard.js';
	import {
		CreateSettleAccount,
		getUserAdapaySettleAccount
	} from "@/api/user.js";
 
 

 
	export default {
		name: 'pickAddress',
		components: {
			LbPicker,
			UniAddressSelector
		},
		data() {
			return {
				//验证码
				aCheckCodeInput: ['', '', '', '', '', ''], // 存储输入验证码内容
				aCheckCodePasteResult: [], // 粘贴的验证码
				isVisible: false,
				correctCode: '', // 正确的验证码
				mobile: '',
				showVerification: false, // 控制验证码输入框和按钮的显示
				smsCodeBtnDisabled: false,
				codeSeconds: 60,
				//个人信息
				bankcardName: '',
				idCard: '',
				bankNo: '',
				code: '',
				//居住地址
				txt: '请选择地址',
				provCode: '',
				areaCode: '',

				//卡类型
				/*cardList: [
					"请选择类型",
					"信用卡",
					"储蓄卡",
					"借记卡"
				],*/
				//cardName: '请选择类型', // 默认显示的地址文本
				selectedType: '', // 存储选中的值
				selector: "multiSelector", // 选择器模式
				level: 2, // 选择器层级
				//银行
				mybankList: [], // 使用银行名称数组初始化 
				bankName: '请选择银行', // 默认显示的文本
				bankCode: '',
				selectedBankName: '', // 存储选中的银行名称
				show: false,
				isSettleAccount: 0
			}
		},
		computed: {
			// 验证码计算属性
			aCheckCodeInputComputed() {
				if (this.aCheckCodePasteResult.length === 6) {
					return this.aCheckCodePasteResult;
				} else if (this.aCheckCodeInput && Array.isArray(this.aCheckCodeInput) && this.aCheckCodeInput.length ===
					6) {
					return this.aCheckCodeInput;
				} else if (/^\d{6}$/.test(this.aCheckCodeInput.toString())) {
					return this.aCheckCodeInput.toString().split("");
				} else {
					return new Array(6);
				}
			},
		},
		mounted() {
			this.getCorrectCode(); // 在 mounted 生命周期钩子中获取验证码
			bankList.forEach(item => {
				item.value = item.bankCode;
				item.label = item.bankName;
				this.mybankList.push(item)
			})
		},
		onLoad() {
			this.initData()
		},
		methods: {
			initData() {
				this.$get(`${getUserAdapaySettleAccount}`, {
					userId: uni.getStorageSync("userNum").id
				}).then(r => {
					if (r.code == 0) {
						if (r.result.length > 0) {
							this.isSettleAccount = 1
						}
					}
				}).catch((err) => {
					console.log(err)
				});
			},

			//银行
			getbank(event) {
				// 假设 event 包含所选银行名称的索引
				const selectedIndex = event.index;
				// 使用 selectedIndex 从 bankList 获取选中的银行名称
				this.bankName = this.mybankList[selectedIndex].label;
				this.bankCode = this.mybankList[selectedIndex].value;
			},
			//个人信息
			navBack() {
				uni.navigateBack();
			},
			nameChange() {
				if (!this.bankcardName) {
					return '输入的姓名不能为空';
				} else if (!/^[\u4e00-\u9fa5]{2,6}$/.test(this.bankcardName)) {
					return '您输入的姓名有误';
				} else {
					return '';
				}
			},
			idCardChange() {

				if (!this.idCard) {
					return '输入的身份证号不能为空';
				} else if (this.idCard.length === 15) {
					if (!this.isValidityBrithBy15IdCard(this.idCard)) {
						return '您输入的身份证有误';
					} else {
						return '';
					}
				} else if (this.idCard.length === 18) {
					var a_idCard = this.idCard.split(""); // 得到身份证数组
					if (!this.isValidityBrithBy18IdCard(this.idCard) || !this.isTrueValidateCodeBy18IdCard(
							a_idCard)) {
						return '您输入的身份证有误';
					} else {
						return '';
					}
				} else {
					return '您输入的身份证长度有误';
				}
			},
			bankNoChange() {
				if (!this.bankNo) {
					return '输入的银行卡号不能为空';
				} else if (!/^\d*$/.test(this.bankNo)) {
					return '您输入的银行卡号有误';
				} else if (this.bankNo.length < 16) {
					return '您输入的银行卡号长度有误';
				} else {
					return '';
				}
			},
			submitMobile() {

				if (!this.checkPhoneIsValid(this.mobile)) {
					this.$api.msg('请输入正确的手机号');
					return;
				}
				/* 				this.showVerification = true;
								this.isVisible = true; */
				//Call API to bind bank card
				this.$get(`${CreateSettleAccount}`, {
					userId: uni.getStorageSync("userNum").id,
					cardId: this.bankNo,
					cardName: this.bankcardName,
					certId: this.idCard,
					telNo: this.mobile,
					bankCode: this.bankCode,
					bankName: this.bankName,
					provCode: this.provCode,
					areaCode: this.areaCode

				}).then(r => {
					console.log(r);
					if (r.code == 0) {
						this.isSettleAccount = 1
						 
					}
				}).catch((err) => {
					console.log(err)
				});

				//this.getSmsCode();
			},
			blurMobileChange(e) {
				this.mobile = e.detail.value;
			},

			checkPhoneIsValid(mobile) {
				const reg = /^1[0-9]{10}$/;
				return reg.test(mobile);
			},
			getSmsCode() {
				clearInterval(this.timer); // clear the old timer
				this.smsCodeBtnDisabled = true;
				this.codeSeconds = 60; // reset the timer
				this.timer = setInterval(() => {
					this.codeSeconds--;
					if (this.codeSeconds <= 0) {
						this.smsCodeBtnDisabled = false;
						clearInterval(this.timer);
						// automatically exit the verification process
						this.showVerification = false;
						this.isVisible = false;
					}
				}, 1000);
			},
			//居住地
			change(json) {
				if (json) {
					this.txt = json.data[0] + "  " + json.data[1];
					this.provCode = json.index[0];
					this.areaCode = json.index[1];
				} else {
					this.txt = '选择地址';
				}
			},
			//卡类型
			/*getcard(e) {
				// 处理选择器确认事件
				this.cardName = e.item[0];
				this.selectedType = e.item[0];
			},*/
			closeModal() {
				this.isVisible = false;
				// 清空验证码输入状态
				this.aCheckCodeInput = ['', '', '', '', '', ''];
			},
			// 输入验证码，更新验证码数据
			fnCheckCodeKeyup(e) {
				let index = e.target.dataset.index * 1;
				let el = e.target;
				// 解决输入e的问题
				el.value = el.value
					.replace(/Digit|Numpad/i, "")
					.slice(0, 1);
				if (/Digit|Numpad/i.test(e.code)) {
					// 必须在这里赋值，否则输入框会是空值
					this.aCheckCodeInput.splice(index, 1, e.code.replace(/Digit|Numpad/i, ""));
					el.nextElementSibling && el.nextElementSibling.focus();
					if (index === 5) {
						if (this.aCheckCodeInput.join("").length === 6) document.activeElement.blur();
					}
				}
			},
			// 输入验证码，检测位置变化
			fnCheckCodeKeydown(e) {
				let index = e.target.dataset.index * 1;
				let el = e.target;
				if (e.key === "Backspace") {
					if (this.aCheckCodeInput[index].length > 0) {
						this.aCheckCodeInput.splice(index, 1, '');
					} else {
						if (el.previousElementSibling) {
							el.previousElementSibling.focus();
							this.aCheckCodeInput[index - 1] = '';
						}
					}
				} else if (e.key === 'Delete') {
					if (this.aCheckCodeInput[index].length > 0) {
						this.aCheckCodeInput.splice(index, 1, '');
					} else {
						if (el.nextElementSibling) {
							el.nextElementSibling.focus();
							this.aCheckCodeInput[++index] = '';
						}
					}
				} else if (e.key === "Home") {
					el.parentElement.children[0] && el.parentElement.children[0].focus();
				} else if (e.key === "End") {
					el.parentElement.children[this.aCheckCodeInput.length - 1] &&
						el.parentElement.children[this.aCheckCodeInput.length - 1].focus();
				} else if (e.key === "ArrowLeft") {
					if (el.previousElementSibling) el.previousElementSibling.focus();
				} else if (e.key === "ArrowRight") {
					if (el.nextElementSibling) el.nextElementSibling.focus();
				}
			},
			// 输入验证码，解决一个输入框输入多个字符的问题
			fnCheckCodeInputEvent(e) {
				let index = e.target.dataset.index * 1;
				let el = e.target;
				el.value = el.value
					.replace(/Digit|Numpad/i, "")
					.slice(0, 1);
				this.aCheckCodeInput[index] = el.value;
			},
			// 验证码粘贴
			fnCheckCodeKeyPaste(e) {
				e.clipboardData.items[0].getAsString((str) => {
					if (str.toString().length === 6) {
						this.aCheckCodePasteResult = str.split("");
						document.activeElement.blur();
						this.aCheckCodeInput = this.aCheckCodeInputComputed;
						this.aCheckCodePasteResult = [];
					} else {
						// 如果粘贴内容不合规，清除所有内容
						this.aCheckCodeInput = ['', '', '', '', '', ''];
					}
				});
			},
			computed: {
				// 检测验证码是否输入完整
				bCheckCodeInputComplete() {
					return this.aCheckCodeInput.some(item => item === '');
				}
			},
			// 若输入Enter 返回；取消最后一个输入框的判断
			fnCheckCodeKeyup(e) {
				if (e.key === 'Enter') return;
				let index = e.target.dataset.index * 1;
				let el = e.target;
				// 解决输入e的问题
				el.value = el.value
					.replace(/Digit|Numpad/i, "")
					.slice(0, 1);
				if (/Digit|Numpad/i.test(e.code)) {
					// 必须在这里赋值，否则输入框会是空值
					this.aCheckCodeInput.splice(index, 1, e.code.replace(/Digit|Numpad/i, ""));
					el.nextElementSibling && el.nextElementSibling.focus();
				}
			},
			// 增加回车键判断
			fnCheckCodeKeydown(e) {
				let index = e.target.dataset.index * 1;
				let el = e.target;
				// 按 Enter 回车键，提交表单
				if (e.key === 'Enter') {
					if (this.bCheckCodeInputComplete) {
						this.$message.warning('请输入六位数验证码~');
						return;
					}
					// 执行请求接口方法
					return;
				}
			},
			submitCode() {
				const userCode = this.aCheckCodeInputComputed.join('');
				if (userCode === this.correctCode) {
					// 验证码正确，执行绑定操作
					this.closeModal(); // 关闭验证码输入框
					this.$toast('绑定成功！');
					// 执行其他绑定成功的操作...
				} else {
					// 验证码错误，提示用户重新输入
					this.$toast('验证码错误，请重新输入！');
					// 清空验证码输入状态，让用户重新输入
					this.aCheckCodeInput = ['', '', '', '', '', ''];
					// 可选：关闭模态框并返回上一级，如果需要
					this.goBack();
				}
			},
			getCorrectCode() {
				// 在这里获取正确的验证码，例如从服务器获取或从本地存储中获取
				this.correctCode = '获取到的验证码';
			},
			// 身份证验证位值.10代表X  
			/**  
			 * 判断身份证号码为18位时最后的验证位是否正确  
			 * @param a_idCard 身份证号码数组  
			 * @return  
			 */
			isTrueValidateCodeBy18IdCard(a_idCard) {
				var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
				var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
				var sum = 0; // 声明加权求和变量   
				if (a_idCard[17].toLowerCase() == 'x') {
					a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
				}
				for (var i = 0; i < 17; i++) {
					sum += Wi[i] * a_idCard[i]; // 加权求和   
				}
				var valCodePosition = sum % 11; // 得到验证码所位置   
				if (a_idCard[17] == ValideCode[valCodePosition]) {
					return true;
				} else {
					return false;
				}
			},
			/**  
			 * 验证18位数身份证号码中的生日是否是有效生日  
			 * @param idCard 18位书身份证字符串  
			 * @return  
			 */
			isValidityBrithBy18IdCard(idCard18) {

				var year = idCard18.substring(6, 10);
				var month = idCard18.substring(10, 12);
				var day = idCard18.substring(12, 14);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 这里用getFullYear()获取年份，避免千年虫问题   
				if (temp_date.getFullYear() != parseFloat(year) ||
					temp_date.getMonth() != parseFloat(month) - 1 ||
					temp_date.getDate() != parseFloat(day)) {
					return false;
				} else {
					return true;
				}
			},
			/**  
			 * 验证15位数身份证号码中的生日是否是有效生日  
			 * @param idCard15 15位书身份证字符串  
			 * @return  
			 */
			isValidityBrithBy15IdCard(idCard15) {
				var year = idCard15.substring(6, 8);
				var month = idCard15.substring(8, 10);
				var day = idCard15.substring(10, 12);
				var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
				// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
				if (temp_date.getYear() != parseFloat(year) ||
					temp_date.getMonth() != parseFloat(month) - 1 ||
					temp_date.getDate() != parseFloat(day)) {
					return false;
				} else {
					return true;
				}
			},
			//去掉字符串头尾空格   
			trim(str) {
				return str.replace(/(^\s*)|(\s*$)/g, "");
			},
			delBack() {
				this.show = true;
			},
			confirmDel() {
				this.show = false;
				//Call API to delete bank card
				this.$get(`${DeleteUserAdapaySettleAccount}`, {
					userId: uni.getStorageSync("userNum").id,
				}).then(r => {
					if (r.code == 0) {
						this.$toast('银行卡绑定解除成功！');
					}
				}).catch((err) => {
					console.log(err)
				});
			}
		}
	};
</script>
<style lang="less">
	/* 银行 */
	.picker-container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		width: 36%;
		margin-left: 20rpx;
	}

	.cardname {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		font-size: 28rpx;
		color: #999998;
		/* 修改文字颜色 */
	}

	.ui-list.right.city {
		display: flex;
		align-items: center;
		padding: 30rpx 40rpx;
		border-bottom: 1px solid #f5f5f5;

		.two {
			color: #ff9900;
			margin-right: 10rpx;
		}

		.one {
			font-size: 30rpx;
			color: #333;
			/* 修改文字颜色 */
		}
	}

	/* 居住地 */
	.city {
		display: flex;
	}

	.cityname {
		width: 450rpx;
	}

	.uni-input {
		padding: 0 !important;
		margin-left: 20rpx;
	}

	.marl {
		margin: 0 20rpx 0 0;
		color: #333333;
		font-weight: bold;
	}

	.marr {
		margin: 0 0 0 20rpx;
		color: #333333;
		font-weight: bold;
	}

	.check-code-modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		background: white;
		padding: 20px;
		border-radius: 5px;
	}

	.modal-actions {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.submit-button {
		background-color: #c9161e;
		color: white;
		border: none;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 18px;
		line-height: 1;
		/* 调整行高以适应按钮高度 */
		cursor: pointer;
		text-align: center;
		/* 确保文本水平居中 */
	}

	.g-remove-check-code {
		width: 100%;
		padding: 4px 0 8px 0;
	}

	.g-remove-check-code .g-remove-check-code_title {
		font-size: 14px;
		color: #666;
	}

	.g-remove-check-code .g-remove-check-code_content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 400px;
		padding: 28px 0 28px 0;
		margin: 0 auto;
	}

	.g-remove-check-code .g-remove-check-code_content input {
		width: 50px;
		height: 50px;
		font-size: 36px;
		text-align: center;
		border: none;
		outline: none;
		border: solid 1px rgba(187, 187, 187, 100);
		border-radius: 4px;
		-moz-appearance: textfield;
	}

	.g-remove-check-code .g-remove-check-code_content input.g-code-input_color {
		border-color: #5290FF;
	}

	.g-remove-check-code .g-remove-check-code_content input::-webkit-outer-spin-button,
	.g-remove-check-code .g-remove-check-code_content input::-webkit-inner-spin-button {
		appearance: none;
		margin: 0;
	}

	.g-remove-check-code .g-remove-check-code_tip {
		font-size: 14px;
		color: #999;
		text-align: center;
	}

	.banner {
		width: 100px;
		height: 100px;
		margin: auto;

		image {
			width: 100%;
			height: 100%;
		}
	}
</style>
<style lang="scss" scoped>
	.bbb {
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		background-color: rgba(0, 0, 0, 0.5);

		.buy {
			width: 70%;
			height: 500upx;
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10px;
			background-color: #FFFFFF;
			z-index: 99;

			.top1 {
				width: 100%;
				height: 100upx;
				text-align: center;
				box-sizing: border-box;
				margin: 0 auto;
				background: url(../../static/image/success1.png)no-repeat;
				background-size: 100% 100%;

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

				.textc {
					color: #c9161e;
					font-size: 34upx;
				}
			}

			.confirm-btn {
				width: 230upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 50px;
				background: #c9161e;
				color: #fff;
				font-size: $font-lg;
				float: left;
				top: 80upx;
				bottom: 10upx;
				left: 25%;
				margin: 10upx;
				transform: translate(-50%, 0);

				&:after {
					border-radius: 100px;
				}
			}
		}
	}
</style>