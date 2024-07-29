<template>
	<view class="container">
		<view class="none">
			<view id="mini_poster">
				<uv-qrcode ref="qrcode" size="300px" :value="qrdata" :options="options2"></uv-qrcode>
			</view>
			<view @click="my_js.onclicks" class="xiazai">保存图片到相册</view>
		</view>
		<view class="conter" style="display: none;">
			<div class="overshou">
				<p>
					距离开售
					<span>{{hr}}</span>:
					<span>{{min}}</span>:
					<span>{{sec}}</span>
				</p>
			</div>
		</view>
	</view>
</template>

<script>
	import html2canvas from 'html2canvas';
	import {
		baseUrl
	} from "@/api/params";
	import FingerprintJS from '@fingerprintjs/fingerprintjs';
	import {
		huifupay,
		huifuclose
	} from "@/api/user.js"
	export default {
		data() {
			return {
				qrdata: '',
				vender: '',
				projectId: 25,
				day: 0,
				hr: 0,
				min: 0,
				sec: 0,
				time_data: {},
				options2: {
					data: 'https://www.uvui.cn',
					size: 300,
					useDynamicSize: false,
					errorCorrectLevel: 'Q',
					margin: 10,
					//areaColor: "#F95F6B",
					//backgroundColor: "#3c9cff",
					// 指定二维码前景，一般可在中间放logo
					//foregroundImageSrc: "https://www.uvui.cn/common/logo.png"
				}
			};
		},
		mounted: function() {
			this.countdown();
			// #ifdef APP-PLUS 
			this.getFile();
			// #endif
			this.$nextTick(function() {
				this.bindQRCode();
			});

		},
		methods: {
			bindQRCode: function() {
				var url = "";
				var server = baseUrl + "/api/appVersion/getDownloadUrl"; //检查更新地址
				var req = { //升级检测数据  
					"type": 0
				};
				url = server + "?phone=" + uni.getStorageSync("userNum").userPhone + "&type=0&fingerprint=" + this
					.generateUniqueId();
				this.qrdata = url;
				console.log(url);



			},

			shareQrCode() {
				let that = this;
				let imgHeight = that.$refs.canvasImg.offsetHeight; // 获取DOM高度
				let imgWidth = that.$refs.canvasImg.offsetWidth; // 获取DOM宽度
				console.log(imgHeight);
				console.log(imgWidth);
				// 截取海报
				html2canvas(that.$refs.canvasImg, {
					useCORS: true, //允许跨域
					backgroundColor: '#ececec', //画布背景色，设置null为透明
					width: imgWidth, //画布宽
					height: imgHeight, //画布高
					scale: 2, // 处理模糊问题
					dpi: 300, // 处理模糊问题
				}).then((canvas) => {
					// 返回一个 canvas 对象，在dom中渲染 canvas 对象
					// 转化成 dataurL
					let url = canvas.toDataURL("image/png");
					that.imgUrl = url;
					//调用下载方法
					let a = document.createElement("a"); //创建一个a标签
					let event = new MouseEvent("click"); // 创建一个单击事件
					a.download = "海报"; // 设置图片名称
					a.href = that.imgUrl; //指定下载文件名称
					a.dispatchEvent(event); // 触发a的单击事件
					// 这里可以获得截取到的base64格式的图片-url,可进行后续操作，比如传入接口等
				});

			},

			async xiazai() {


				var deviceId = uni.getSystemInfoSync().deviceId;
				//this.$api.msg(deviceId);
				this.qrdata = deviceId;
				var server = baseUrl + "/api/appVersion/getDownloadUrl"; //检查更新地址

				var req = { //升级检测数据
					"type": 0
				};
				uni.request({
					url: server,
					data: req,
					method: "GET",
					success: res => {

						if (res.statusCode == 200) {
							console.log(res);
						}
					},
					fail: res => {
						console.log(res);
					}
				});


				//this.getUniqueCode();
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
			async guandan() {
				let res = await this.get(huifuclose, "data");
				console.log(res)
			},

			huanqi() {
				uni.showModal({
					title: '提示',
					content: '是否已完成支付？',
					cancelText: "支付未完成",
					confirmText: "支付成功",
					success: (res) => {
						if (res.confirm) {

							let url = "";
							url = "../../pagesA/details/details"
							uni.navigateTo({
								url: `${url}?id=${this.projectId}`
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
							let url = "";
							url = "../../pagesA/details/details"
							uni.navigateTo({
								url: `${url}?id=${this.projectId}`
							})
						}
					}
				});

				/* void plus.runtime.openURL( "alipays://platformapi/startapp?saId=10000007&qrcode=https://qr.alipay.com/bax02911brluc2xieoph6001" ); */
			},
			async zhifu() {
				let data = {
					userId: uni.getStorageSync("userNum").id,
					number: 1,
					price: 0.1,
					projectId: 25,
					projectName: '江苏某土地整体转让3000万元'
				}

				console.log("zhifu");
				let res = await this.get(huifupay, data);
				/* var topic = "alipays://platformapi/startapp?saId=10000007&qrcode=";
				var code = res.data.expend.pay_info;
				
				//console.log(code);
				
				// 从汇付正扫接口获取的参数（以下值仅为示例）
				var qrcodeUrl = "https://qr.alipay.com"+code
				// 字符串拼接
				var jumpUrl = topic + code;
				// 按以上示例拼接得出结果
				// jumpUrl 为 alipays://platformapi/startapp?saId=10000007&qrcode=https://qr.alipay.com/bax02911brluc2xieoph6001
				console.log(jumpUrl);
				void plus.runtime.openURL( jumpUrl ); */

			},
			generateUniqueId() {
				const timestamp = new Date().getTime().toString(36);
				const randomNum = Math.random().toString(36).substring(2, 15);
				return `${timestamp}-${randomNum}`;
			},
			// #ifdef APP-PLUS 
			getFile() {
				const filePath = '_www/static/data/vender.txt';
				const temp = ';'
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

			// 倒计时方法
			countdown() {
				// 目标日期时间戳
				const end = Date.parse(new Date('2024-02-28 03:59:23'))
				// 当前时间戳
				const now = Date.parse(new Date())
				// 相差的毫秒数
				const msec = end - now

				//   console.log(msec)
				if (msec < 0) return

				// 计算时分秒数
				let day = parseInt(msec / 1000 / 60 / 60 / 24)
				let hr = parseInt((msec / 1000 / 60 / 60))
				let min = parseInt((msec / 1000 / 60) % 60)
				let sec = parseInt((msec / 1000) % 60)
				// 个位数前补零
				this.day = day
				this.hr = hr > 9 ? hr : '0' + hr
				this.min = min > 9 ? min : '0' + min
				this.sec = sec > 9 ? sec : '0' + sec
				// 赋值
				const that = this
				if (min >= 0 && sec >= 0) {
					//倒计时结束关闭订单
					if (min == 0 && sec == 0) {
						return
					}
					// 一秒后递归
					setTimeout(function() {
						that.countdown()
					}, 1000)
				}
			},

			saveBase64(imageStr) {
				uni.showLoading({
					title: "保存中"
				})
				let bitmap = new plus.nativeObj.Bitmap();
				bitmap.loadBase64Data(imageStr, function() {
					console.log('加载base64图片数据成功');
					//图片名称命名
					bitmap.save('_doc/' + new Date().getTime() + '.png', {
						quality: 100
					}, function(i) {
						// 将图片保存到相册
						uni.saveImageToPhotosAlbum({
							filePath: i.target,
							success: function() {
								bitmap.clear(); //销毁Bitmap图片
								// uni.$u.toast('保存图片成功')

								uni.showToast({
									title: '保存图片成功',
									duration: 2000
								});
								// that.noPhoto = true;
							}
						});
					}, function(e) {
						console.log('保存图片失败：' + JSON.stringify(e));
					});
				}, function(e) {
					console.log('截屏绘制图片失败：' + JSON.stringify(e));
				});
			},


		}
	}
</script>
<script module="my_js" lang="renderjs">
	import html2canvas from 'html2canvas';
	export default {
		data() {
			return {}
		},
		methods: {
			onclicks(event, ownerInstance) {
				html2canvas(document.getElementById('mini_poster'), {
					backgroundColor: '#fff',
					useCORS: true,
					taintTest: true,
					timeout: 2000
				}).then(canvas => {
					let imgurl = canvas.toDataURL('image/jpg');
					ownerInstance.callMethod('saveBase64', imgurl)
				})
			}
		}
	}
</script>
<style lang="scss">
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.title {
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		color: #000000;
	}

	.title1 {
		font-size: 32rpx;
		font-weight: bold;
		color: #000000;
	}

	.xiazai {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		background: #c9161e;
		color: #fff;
		font-size: $font-lg;
		text-align: center;
		font-size: 30rpx;
	}

	.overshou {
		width: 690upx;
		margin: 0 auto;
		font-size: 24upx;
		font-weight: 400;
		color: #989898;
		padding: 48upx 0 24upx 0;

		p {
			display: flex;
			justify-content: right;
			align-items: center;

			span {
				display: flex;
				display: block;
				width: 40upx;
				height: 40upx;
				background: #FF5640;
				border-radius: 4upx;
				color: white;
				text-align: center;
				line-height: 40upx;
				margin: 0upx 10upx;
			}
		}
	}

	.ttttt {
		padding-bottom: 200rpx;
	}

	.textcon {
		padding: 0 20rpx;
	}

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
					color: #3C87DB;
					font-size: 34upx;
				}
			}

			.confirm-btn {
				width: 430upx;
				height: 76upx;
				line-height: 76upx;
				border-radius: 50px;
				background: #3C87DB;
				color: #fff;
				font-size: $font-lg;
				position: absolute;
				bottom: 10upx;
				left: 50%;
				transform: translate(-50%, 0);

				&:after {
					border-radius: 100px;
				}
			}
		}
	}

	.phone {
		margin-bottom: 120upx;

		.oone {
			margin: 10upx 20upx 0 20upx;
			color: #333333;
			font-size: 28upx;
		}
	}

	.fttt {
		margin-top: 40upx;

		.list {
			margin-bottom: 40upx;

			.one {
				color: #333;
				font-size: 30upx;
				margin-left: 20upx;
			}

			.two {
				margin: 20upx 20upx 0 20upx;
				font-size: 30upx;

				.tt {
					margin-top: 20upx;

					.tt1 {
						.ee {
							color: #928F92;
							font-size: 28upx;
							margin-left: 20upx;
						}
					}

					.tt2 {
						color: #928F92;
						font-size: 26upx;
					}
				}
			}
		}
	}

	.banner {
		width: 100%;
		height: 300upx;
		margin: auto;

		image {
			width: 100%;
			height: 100%;
		}
	}

	//内容
	.conter {
		margin-top: 20upx;

		.topp {
			margin-bottom: 30upx;
			width: 90%;
			margin-left: 40upx;
			height: 60upx;
			background: url(../../static/image/index13.png) no-repeat;
			background-size: 100%;

			.zhi {
				float: left;
				width: 20upx;
				height: 26upx;
				margin-top: 4upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.toppp {
			margin-bottom: 30upx;
			width: 90%;
			margin-left: 40upx;
			height: 60upx;
			background: url(../../static/image/index14.png) no-repeat;
			background-size: 100%;

			.zhi {
				float: left;
				width: 20upx;
				height: 26upx;
				margin-top: 4upx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.none {
			width: 90%;
			margin-left: 40upx;

			.cone {
				position: relative;
				display: flex;
				margin-bottom: 20upx;

				.right {
					width: 100%;

					.tpp {
						font-weight: bolder;
						font-size: 34upx;

						.one {
							display: inline-block;
							// background-color: #E4E4E4;
							// color: #919090;
						}
					}

					.label {
						width: 100upx;
						height: 34upx;
						display: inline-block;
						font-size: 24upx;
						background: rgba(0, 92, 255, 0.2);
						margin-right: 20upx;
						line-height: 34upx;
						text-align: center;
						color: #c9161e;
						border-radius: 5upx;
					}
				}

			}
		}

		.introduction {
			width: 100%;
			margin-bottom: 30upx;

			.quota {
				width: 100%;
				margin-top: 25upx;
				margin-left: 20upx;
				line-height: 50upx;
				// height: 50upx;

				.q1 {
					display: inline-block;
					opacity: 1;
					color: #333333;
					font-size: 28upx;
					font-weight: bold;
				}

				.q2 {
					margin-left: 20upx;
					display: inline-block;
					color: #000000;
					font-size: 28upx;
				}

				.qq2 {
					float: right;
					margin-top: 15upx;
				}
			}
		}

		.foot {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.quota {
				width: 47%;
				margin-top: 25upx;
				margin-left: 20upx;
				line-height: 50upx;
				height: 50upx;

				.q1 {
					display: inline-block;
					opacity: 1;
					color: #333;
					font-size: 28upx;
					font-weight: bold;
				}

				.q2 {
					margin-left: 20upx;
					display: inline-block;
					color: #000000;
					font-size: 28upx;
				}

				.qq2 {
					float: right;
					margin-top: 15upx;
				}
			}
		}

		.under {
			display: flex;
			width: 100%;
			height: 100upx;
			position: fixed;
			bottom: 0;
			background-color: #FFFFFF;

			// border-top: 8upx solid #F6F6F6;
			.collect {
				width: 40%;
				line-height: 100upx;
				text-align: center;
				display: inline-block;
				margin-left: 30upx;

				image {
					width: 50upx;
					height: 50upx;
					display: inline-block;
					vertical-align: middle;
					margin-right: 20upx;
				}

				text {
					font-size: 28upx;
				}
			}

			.right {
				width: 100%;
				color: #FFFFFF;
				line-height: 100upx;
				text-align: center;
				font-size: 32upx;
				border-radius: 10upx;
				background: linear-gradient(180deg, rgba(230,106,69,1) 0%,rgba(234,106,69,1) 100%);
			}

			.rightDone {
				width: 100%;
				color: #FFFFFF;
				line-height: 100upx;
				text-align: center;
				font-size: 32upx;
				border-radius: 10upx;
				background: #8e8e93
			}
		}

		.ui-all {
			padding: 20rpx 40rpx;

			.avatar {
				width: 100%;
				text-align: left;
				padding: 20rpx 0;
				border-bottom: solid 1px #f2f2f2;
				position: relative;

				.imgAvatar {
					width: 140rpx;
					height: 140rpx;
					border-radius: 50%;
					display: inline-block;
					vertical-align: middle;
					overflow: hidden;

					.iavatar {
						width: 100%;
						height: 100%;
						display: block;
					}
				}

				text {
					display: inline-block;
					vertical-align: middle;
					color: #8e8e93;
					font-size: 28rpx;
					margin-left: 40rpx;
				}

				&:after {
					content: ' ';
					width: 20rpx;
					height: 20rpx;
					border-top: solid 1px #030303;
					border-right: solid 1px #030303;
					transform: rotate(45deg);
					-ms-transform: rotate(45deg);
					/* IE 9 */
					-moz-transform: rotate(45deg);
					/* Firefox */
					-webkit-transform: rotate(45deg);
					/* Safari 和 Chrome */
					-o-transform: rotate(45deg);
					position: absolute;
					top: 85rpx;
					right: 0;
				}
			}

			.btn-list {
				width: 100%;
				text-align: center;
				padding: 20rpx 0;
				border-bottom: solid 1px #f2f2f2;
				position: relative;

				.stepbutton {
					background: #c9161e;
					border: none;
					color: #ffffff;
					margin-top: 40rpx;
					margin-left: 20rpx;
					font-size: 28rpx;
					vertical-align: middle;
					width: 40%;
				}

				button {
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					background: none;
					margin: 0;
					padding: 0;

					&::after {
						display: none;
					}
				}

			}

			.ui-list {
				width: 100%;
				text-align: left;
				padding: 20rpx 0;
				border-bottom: solid 1px #f2f2f2;
				position: relative;

				.aa {
					color: #74A6FE;

					.aaa {
						color: #FE0202;
					}
				}

				.one {
					color: #4a4a4a;
					font-size: 35rpx;
					font-weight: bold;
					display: inline-block;
					vertical-align: middle;
					min-width: 100rpx;
					margin-right: 40upx;
				}

				.thrr {
					color: #878787;
				}

				.two {
					color: #FF0000;
					font-size: 28rpx;
					display: inline-block;
					vertical-align: middle;
				}

				input {
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
				}

				button {
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					background: none;
					margin: 0;
					padding: 0;

					&::after {
						display: none;
					}
				}

				picker {
					width: 80%;
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					position: absolute;
					top: 20rpx;
					left: 200rpx;

				}

				.picker1 {
					width: 80%;
					color: #030303;
					font-size: 30rpx;
					display: inline-block;
					vertical-align: middle;
					position: absolute;
					top: 20rpx;
					left: 200rpx;
				}

				textarea {
					color: #030303;
					font-size: 30rpx;
					vertical-align: middle;
					height: 150rpx;
					width: 100%;
					margin-top: 50rpx;
				}

				.place {
					color: #999999;
					font-size: 28rpx;
				}
			}

			.right:after {
				content: ' ';
				width: 20rpx;
				height: 20rpx;
				border-top: solid 1px #030303;
				border-right: solid 1px #030303;
				transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				/* IE 9 */
				-moz-transform: rotate(45deg);
				/* Firefox */
				-webkit-transform: rotate(45deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(45deg);
				position: absolute;
				top: 30rpx;
				right: 0;
			}

			.save {
				background: #c9161e;
				border: none;
				color: #ffffff;
				margin-top: 40rpx;
				font-size: 28rpx;
			}

		}

		.overshou {
			width: 690upx;
			margin: 0 auto;
			font-size: 24upx;
			font-weight: 400;
			color: #989898;
			padding: 48upx 0 24upx 0;

			p {
				display: flex;
				justify-content: right;
				align-items: center;

				span {
					display: flex;
					display: block;
					width: 40upx;
					height: 40upx;
					background: #FF5640;
					border-radius: 4upx;
					color: white;
					text-align: center;
					line-height: 40upx;
					margin: 0upx 10upx;
				}
			}
		}

	}
</style>