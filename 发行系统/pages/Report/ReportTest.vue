<template>
	<view class="content">
		<view :prop="current" :change:prop="f2.changeTab"></view>
		<view :nameqqq="name" :change:nameqqq="f2.update" :age="data" :change:age="f2.update"></view>


		<view class="last">
			<v-tabs v-model="current" :tabs="biqoqianlist" @change="f2.changeTab" activeColor="#2F79FF"
				lineColor="#2F79FF"></v-tabs>
		</view>
		<!-- #ifdef APP-PLUS || H5  -->
		<view id="container">0</view>
		<!-- #endif -->
		<!-- #ifndef APP-PLUS || H5 -->
		<view>非 APP、H5 环境不支持</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getSubscriptionByUserId
	} from '../../api/user'
	export default {
		name: "k-eChart",
		data() {
			return {
				biqoqianlist: ["全部", "待申购", "申购中", "停止申购"],
				current: 0,
				name: "张三",
				data:[],
				
			}
		},
		onLaunch() {

		},
		mounted() {
	
	this.$get(`${getSubscriptionByUserId}`, {
				id: 2
			}).then(r => {
				console.log(r)
				r.result.forEach(item => {
					let dataitem=item.totalmoney*100
					this.data.push(dataitem)
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
				canvas2: ''
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
			initF1() {
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
							name: '数据1',
							data:this.data,
							type: 'bar',
							showBackground: true,
							backgroundStyle: {
								color: 'rgba(220, 220, 220, 0.8)'
							}
						},
						{
							name: '数据2',
							data: [140, 230, 120, 120, 90, 110, 160],
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

				} else {
					// 动态引入较大类库避免影响页面展示
					const script = document.createElement('script')
					script.src = 'static/echarts.min.js'
					if (index == 1) {

						script.onload = this.initF1.bind(this)
					}
					if (index == 2) {

						script.onload = this.initF2.bind(this)
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
				if (index == 0) {

					//this.initData1()
				} else {
					console.log(this.data)
					let id = this.index;
					this.generateReport(id);
					//this.getData(id)
				}
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