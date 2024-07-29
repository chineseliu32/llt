<template>
	<view class="content">
		<view :prop="current" :change:prop="f2.changeTab"></view>
		<view :nameqqq="name" :change:nameqqq="f2.update" :age="data" :change:age="f2.update"></view>


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
		getUserCount_Week,
		getNewlUserCount_Month,
		getRealUserCount_Month,
		getTotalUserCount_Month
	} from '../../api/user'
	export default {
		name: "k-eChart",
		data() {
			return {
				biqoqianlist: ["上周", "上月", "上季", "上半年", "上年"],
				current: 0,
				name: "张三",
				data: [],
				data1: [],
				data2: [],
				data3: [],

			}
		},
		onLaunch() {

		},
		mounted() {

			this.$get(`${getSubscriptionByUserId}`, {
				id:  uni.getStorageSync("userNum").id
			}).then(r => {
				console.log(r)
				r.result.forEach(item => {
					let dataitem = item.totalmoney * 100
					this.data.push(dataitem)
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
			}).catch((err) => {});
			
			this.$get(`${getUserCount_Week}`, {
				id:  uni.getStorageSync("userNum").id
			}).then(r => {
				console.log(r)
				r.result.forEach(item => {
					 
					this.data3.push(item)
				})
				console.log(this.data)
			}).catch((err) => {});
			
			
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
				num:800
			}
		},
		mounted() {
			console.log("getadateasdf")
			console.log(this.data)
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
						text: "机构总计:750",
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
						data: ["机构"],
					},
					xAxis: {
						type: 'category',
						data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '机构',
							data:[70, 80, 120, 120, 90, 110, 160],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						} 
			
					]
				};
			
			
			
				myChart.setOption(option);
			},
			initF1() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "机构总计:￥890",
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
						data: ["机构"],
					},
					xAxis: {
						type: 'category',
						data: ['5', '10', '15','20','25']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '机构',
							data: [70, 80, 120, 120, 90],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						
					]
				};
				myChart.setOption(option);
			},
			
			initF2() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "机构总计:890",
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
						data: ["机构"],
					},
					xAxis: {
						type: 'category',
						data: ['一月', '二月', '三月']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '机构',
							data: [240, 260, 280],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						

					]
				};
				myChart.setOption(option);
			},
			initF3() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "机构总计:1890",
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
						data: ["机构"],
					},
					xAxis: {
						type: 'category',
						data: ['一月', '二月', '三月','四月','五月','六月']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '机构',
							data: [70, 80, 120, 120, 90, 110],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						
					]
				};
				myChart.setOption(option);
			},
			initF4() {
				var myChart = echarts.init(this.canvas);
				var option = {
					title: {
						text: "机构总计:1890",
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
						data: ["机构"],
					},
					xAxis: {
						type: 'category',
						data: ['1', '2', '3','4','5','6','7','8','9','10','11','12']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '机构',
							data: [70, 80, 120, 120, 90, 110,70, 80, 120, 120, 90, 110],
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						
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