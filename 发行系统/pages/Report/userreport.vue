<template>
	<view class="content">
		<view :prop="current" :change:prop="f2.changeTab"></view>
		<view :nameqqq="name" :change:nameqqq="f2.update" :sumAmountOne="sumAmountOne" :change:sumAmountOne="f2.update"
			:data="data" :change:data="f2.update" :data2="data2" :change:data2="f2.update" :sumAmountTwo="sumAmountTwo"
			:change:sumAmountTwo="f2.update" :category2="category2" :change:category2="f2.update" :data3="data3"
			:change:data3="f2.update" :sumAmountThree="sumAmountThree" :change:sumAmountThree="f2.update"
			:category3="category3" :change:category3="f2.update"></view>


		<view class="last">
			<v-tabs v-model="current" :tabs="biqoqianlist" @change="f2.changeTab" activeColor="#2F79FF"
				lineColor="#2F79FF"></v-tabs>
		</view>
		<!-- #ifdef APP-PLUS || H5  -->
		<view id="container"></view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getSubscriptionByUserId,
		getTotalUserCount_Week,
		getRealNameUserCount_Week,
		getNewUserCount_Week,
		getNewUserCount_Month,
		getRealUserCount_Month,
		getTotalUserCount_Month,
		getNewUserCount_Year
	} from '../../api/user'
	export default {
		name: "k-eChart",
		data() {
			return {
				biqoqianlist: ["本周", "本月", "本年"],
				current: 0,
				name: "张三",
				sumAmountOne: 0,
				sumAmountTwo: 0,
				sumAmountThree: 0,
				data: [],
				data1: [],
				data2: [],
				category2: [],
				category3: [],
				data3: [],

			}
		},
		created() {
			this.getNewUser_Week();
			//this.getNewUser_Month();  
		},
		mounted() {

			/* this.$get(`${getSubscriptionByUserId}`, {
				id:  uni.getStorageSync("userNum").id
			}).then(r => {
				console.log(r)
				r.result.forEach(item => {
					let dataitem = item.totalmoney * 100
					this.data3.push(dataitem)
				})
				console.log(this.data)
			}).catch((err) => {});
			
			this.$get(`${getTotalUserCount_Week}`, {
				id:  uni.getStorageSync("userNum").id
			}).then(r => {
				console.log(r)
				r.result.forEach(item => {
					 
					this.data1.push(item)
				})
				console.log(this.data)
			}).catch((err) => {});
			
			this.$get(`${getRealNameUserCount_Week}`, {
				id:  uni.getStorageSync("userNum").id
			}).then(r => {
				console.log(r)
				r.result.forEach(item => {
					 
					this.data2.push(item)
				})
				console.log(this.data)
			}).catch((err) => {}); */

			this.$get(`${getNewUserCount_Week}`, {
				id: uni.getStorageSync("userNum").id
			}).then(r => {
				this.data = [];
				r.result.data.forEach(item => {
					this.data.push(item.fact)
				})
				this.sumAmountOne = r.result.sumAomunt;

			}).catch((err) => {});

			this.$get(`${getNewUserCount_Month}`, {
				id: uni.getStorageSync("userNum").id
			}).then(r => {
				this.data2 = [];
				this.category2 = [];
				r.result.data.forEach(item => {

					this.data2.push(item.fact)
					this.category2.push(item.category)

				})
				this.sumAmountTwo = r.result.sumAmount;
			}).catch((err) => {});

			this.$get(`${getNewUserCount_Year}`, {
				id: uni.getStorageSync("userNum").id
			}).then(r => {
				this.data3 = [];
				this.category3 = [];
				r.result.data.forEach(item => {

					this.data3.push(item.fact)
					this.category3.push(item.Month)

				})
				this.sumAmountThree = r.result.sumAmount;
			}).catch((err) => {});


		},
		methods: {
			getNewUser_Week() {
				this.data = [];
				this.$get(`${getNewUserCount_Week}`, {
					id: uni.getStorageSync("userNum").id
				}).then(r => {
					r.result.data.forEach(item => {
						this.data.push(item.fact)
					})
					this.sumAmountOne = r.result.sumAmount;
				}).catch((err) => {});
			},
			getNewUser_Month() {
				this.data2 = [];
				this.$get(`${getNewUserCount_Month}`, {
					id: uni.getStorageSync("userNum").id
				}).then(r => {
					r.result.data.forEach(item => {
						this.data2.push(item.fact)
					})
				}).catch((err) => {});
			},
		}
	}
</script>

<script module="f2" lang="renderjs">
	import * as echarts from 'echarts'
	import mpvueEcharts from 'mpvue-echarts'

	let myChart
	export default {
		data: function() {
			return {
				canvas: '',
				canvas2: '',
				num: 800
			}
		},
		mounted() {
			this.changeTab(this.current);
		},
		methods: {
			init5: function() {
				console.log(234);
			},
			initF() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "新增用户总计:" + this.sumAmountOne,
						textStyle: {
							color: '#55aaff', // 文字的颜色
							fontStyle: 'normal', // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
							fontWeight: 'normal', // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
							fontSize: '15', // 文字字体大小
						},
					},
					legend: {
						show: true,
						top: '25upx',
						data: ["新增用户"],
					},
					xAxis: {
						type: 'category',
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '新增用户',
							data: this.data,
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						/* {
							name: '有效用户',
							data:  [50, 60, 80, 90, 60, 50, 90],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						{
							name: '累计用户',
							data: [140, 160, 180, 220, 240, 265, 300],
							type: 'bar',
							showBackground: true,
							itemStyle: {
								color: 'rgba(255, 255, 0, 0.8)'
							},
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						}, */

					]
				};



				myChart.setOption(option);
			},
			initF1() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "新增用户总计:" + this.sumAmountTwo,
						textStyle: {
							color: '#55aaff', // 文字的颜色
							fontStyle: 'normal', // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
							fontWeight: 'normal', // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
							fontSize: '15', // 文字字体大小
						},
					},
					legend: {
						show: true,
						top: '25upx',
						data: ["新增用户"],
					},
					xAxis: {
						type: 'category',
						data: this.category2,
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '新增用户',
							data: this.data2,
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						/* {
							name: '有效用户',
							data: [50, 60, 80, 90, 60],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						{
							name: '累计用户',
							data: [140, 160, 180, 220, 240],
							type: 'bar',
							showBackground: true,
							itemStyle: {
								color: 'rgba(255, 255, 0, 0.8)'
							},
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						}, */

					]
				};
				myChart.setOption(option);
			},

			initF2() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "新增用户总计:" + this.sumAmountThree,
						textStyle: {
							color: '#55aaff', // 文字的颜色
							fontStyle: 'normal', // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
							fontWeight: 'normal', // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
							fontSize: '15', // 文字字体大小
						},
					},
					legend: {
						show: true,
						top: '25upx',
						data: ["新增用户"],
					},
					xAxis: {
						type: 'category',
						data: this.category3,
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '新增用户',
							data: this.data3,
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						/* {
							name: '有效用户',
							data: [220, 230, 260],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						{
							name: '累计用户',
							data: [340, 360, 420],
							type: 'bar',
							showBackground: true,
							itemStyle: {
								color: 'rgba(255, 255, 0, 0.8)'
							},
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						}, */

					]
				};
				myChart.setOption(option);
			},
			initF3() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "新增用户总计:1890",
						textStyle: {
							color: '#55aaff', // 文字的颜色
							fontStyle: 'normal', // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
							fontWeight: 'normal', // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
							fontSize: '15', // 文字字体大小
						},
					},
					legend: {
						show: true,
						top: '25upx',
						data: ["新增用户"],
					},
					xAxis: {
						type: 'category',
						data: ['一月', '二月', '三月', '四月', '五月', '六月']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '新增用户',
							data: [70, 80, 120, 120, 90, 110],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						/* {
							name: '有效用户',
							data: [45, 40, 60, 80, 75, 110],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						{
							name: '累计用户',
							data: [140, 160, 180, 220, 240, 265],
							type: 'bar',
							showBackground: true,
							itemStyle: {
								color: 'rgba(255, 255, 0, 0.8)'
							},
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						}, */

					]
				};
				myChart.setOption(option);
			},
			initF4() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "新增用户总计:1890",
						textStyle: {
							color: '#55aaff', // 文字的颜色
							fontStyle: 'normal', // 文字字体的风格（'normal'，无样式；'italic'，斜体；'oblique'，倾斜字体） 
							fontWeight: 'normal', // 文字字体的粗细（'normal'，无样式；'bold'，加粗；'bolder'，加粗的基础上再加粗；'lighter'，变细；数字定义粗细也可以，取值范围100至700）
							fontSize: '15', // 文字字体大小
						},
					},
					legend: {
						show: true,
						top: '25upx',
						data: ["新增用户"],
					},
					xAxis: {
						type: 'category',
						data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '新增用户',
							data: [70, 80, 120, 120, 90, 110, 70, 80, 120, 120, 90, 110],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						/* 	{
								name: '有效用户',
								data: [45, 40, 60, 80, 75, 110,45, 40, 60, 80, 75, 110],
								type: 'bar',
								showBackground: true,
								backgroundStyle: {
									color: 'rgba(220, 220, 220, 0.8)'
								}
							},
							{
								name: '累计用户',
								data: [140, 160, 180, 220, 240, 265,140, 160, 180, 220, 240, 265],
								type: 'bar',
								showBackground: true,
								itemStyle: {
									color: 'rgba(255, 255, 0, 0.8)'
								},
								backgroundStyle: {
									color: 'rgba(220, 220, 220, 0.8)'
								}
							}, */

					]
				};
				myChart.setOption(option);
			},



			initF5() {
				var myChart = echarts.init(this.canvas);
				var option = {
					xAxis: {
						type: 'category',
						data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [820, 932, 901, 934, 1290, 1330, 1320],
						type: 'line'
					}]
				};



				myChart.setOption(option);
			},
			//report1
			generateReport(index) {
				//console.log(this.sdata);
				// renderjs 里可以自由操作 window 、dom等浏览器环境属性
				const container = document.getElementById('container')
				if (this.canvas != '') {
					container.removeChild(this.canvas);
				}
				// 创建 html5 canvas DOM
				const canvas = document.createElement('canvas')
				// id 不可重复
				canvas.id = 'f1'
				canvas.width = uni.upx2px(750)
				canvas.height = uni.upx2px(750)

				container.appendChild(canvas)

				this.canvas = canvas;


				if (typeof window.F2 === 'function') {
					if (index == 1) {

						this.initF1();
					}
					if (index == 2) {

						this.initF2()
					}
					if (index == 3) {

						this.initF3()
					}
					if (index == 4) {

						this.initF4()
					}

				} else {
					// 动态引入较大类库避免影响页面展示
					const script = document.createElement('script')
					script.src = 'static/echarts.min.js'
					if (index == 0) {

						script.onload = this.initF.bind(this)
					}
					if (index == 1) {

						script.onload = this.initF1.bind(this)
					}
					if (index == 2) {

						script.onload = this.initF2.bind(this)
					}
					if (index == 3) {

						script.onload = this.initF3.bind(this)
					}
					if (index == 4) {

						script.onload = this.initF4.bind(this)
					}

					document.head.appendChild(script)

				}
			},
			update() {
				console.log("update")
			},


			//点击tab
			changeTab(index) {
				console.log(index)
				this.index = index;
				this.num = 0;
				this.index_list = [];

				console.log(this.data)
				let id = this.index;
				this.generateReport(id);


			},
		},

	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 20px;
		background-color: #fff;
	}

	.fitness-ring {
		background-color: #151515;
		box-shadow: 0px 0px 1px 0px #06060d;
	}
</style>