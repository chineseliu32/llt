<template>
	<view>
		<view class="box">
			<view class="title">缴费配置</view>
			<picker  :range="listData" @change="peizhiFn">
				<view class="title1">{{peizhi}}</view>
			</picker>
		</view>
		<view class="box">
			<view class="title">缴费周期</view>
			<picker  :range="numData" @change="numFn">
				<view class="title1">{{num}}</view>
			</picker>
		</view>
		<!-- <editor placeholder="请输入"></editor>/ -->
		<view class="btn" @click="pay">微信支付</view>
	</view>
</template>
<script>
	import {userPriceType,jiaofei,weixinpay,gzhpay} from"@/api/user.js"
	export default{
		data(){
			return{
				checked:false,
				renewType:"",
				listData:[],
				listDataInfo:{},
				peizhi:"请选择",
				numData:["1","2","3","4"],
				num:"默认周期为1",
				allocationId:"",//续费配置id
				number:"1",
				newid:''
			}
		},
		onLoad(e) {
			this.renewType=e.type;
			if(e.id){
				this.newid=e.id
			}
			console.log(e)
			this.getPrice()
		},
		methods:{
			async getPrice(){
				let data={};
				if(this.renewType==1){data.renewType=6}
				if(this.renewType==2){data.renewType=7}
				if(this.renewType==3){data.renewType=3}
				if(this.renewType==4){data.renewType=4}
				let res=await this.get(userPriceType,data)
				if(res.code==0){
					this.listDataInfo=res.result;
					res.result.forEach(item=>{
						this.listData.push(item.name)
					})
				}
				console.log(this.listData)
			},
			// 选择配置
			peizhiFn(e){
				this.peizhi=this.listData[e.detail.value]
				this.listDataInfo.forEach(item=>{
					if(item.name==this.peizhi){
						this.allocationId=item.id;
					}
				})
			},
			// 选择周期
			numFn(e){
				console.log(e)
				this.num=this.numData[e.detail.value];
				this.number=parseInt(this.num);
			},
			// 立即支付
			async pay(){
				let data={};
				if(this.allocationId==""){
					uni.showToast({
						title:"未选择配置",
						icon:"none",
						duration:1500,
						mask:true
					})
					console.log(123)
					return
				}
				if(this.renewType==1){data.renewType=6}
				if(this.renewType==2){data.renewType=7}
				if(this.renewType>2){
					data.renewType=this.renewType
					data.relationId=this.newid
				}
				data.userId=uni.getStorageSync("userNum").id;
				data.allocationId=this.allocationId;
				data.number=this.number
				// app内支付
				// #ifdef APP-PLUS
				let res=await this.get(jiaofei,data)
				console.log(res)
				uni.requestPayment({
				    provider: 'wxpay',
				    orderInfo:JSON.stringify(res.data), //微信、支付宝订单数据
				    success:res=> {
				        console.log('success:',res);
						if(res.channel.serviceReady){
							if(this.renewType==1||this.renewType==2){
								let dataInfo=uni.getStorageSync("userNum");
								dataInfo.isFeeMember="1";
								uni.setStorageSync("userNum",dataInfo)
							}
							uni.showToast({
								title:"支付成功",
								duration:1500,
								mask:true
							})
							setTimeout(()=>{
								uni.navigateBack({
									delta:1
								})
							},1500)
						}
				    },
				    fail:err=> {
						uni.showToast({
							title:"支付失败",
							icon:"none",
							duration:1500
						})
				        console.log('fail:' ,err);
				    }
				});
				// #endif
				// 小程序内支付
				// #ifdef MP-WEIXIN
					let res=await this.get(weixinpay,data);
					console.log(res)
					uni.requestPayment({
					    provider: 'wxpay',
						timeStamp:res.data.timeStamp,
						nonceStr:res.data.nonceStr,
						package:res.data.package,
						signType: 'MD5',
						paySign:res.data.paySign,
					    success: function (res) {
					        let dataInfo=uni.getStorageSync("userNum");
					        dataInfo.isFeeMember="1";
					        uni.setStorageSync("userNum",dataInfo)
					        uni.showToast({
					        	title:"支付成功",
					        	duration:1500,
					        	mask:true
					        })
					        setTimeout(()=>{
					        	uni.navigateBack({
					        		delta:1
					        	})
					        },1500)
					    },
					    fail: function (err) {
					        console.log('fail:',err);
							uni.showToast({
								title:"支付失败",
								icon:"none",
								duration:1500
							})
					    }
					});
				// #endif
				// 公众号h5支付
				// #ifdef H5
				
					if(this.is_weixn()){
						let res=await this.get(gzhpay,data);
						console.log("公众号支付",res)
						WeixinJSBridge.invoke(
						      'getBrandWCPayRequest', {
								  ...res.data
						         // "appId":"wxc5db69410b70f44f",     //公众号名称，由商户传入     
						         // "timeStamp":"1395712654",         //时间戳，自1970年以来的秒数     
						         // "nonceStr":"e61463f8efa94090b1f366cccfbbb444", //随机串     
						         // "package":"prepay_id=u802345jgfjsdfgsdg888",     
						         // "signType":"MD5",         //微信签名方式：     
						         // "paySign":"70EA570631E4BB79628FBCA90534C63FF7FADD89" //微信签名 
						      },
						      function(res){
						      if(res.err_msg == "get_brand_wcpay_request:ok" ){
								  console.log("支付成功")
						      // 使用以上方式判断前端返回,微信团队郑重提示：
						            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
									let dataInfo=uni.getStorageSync("userNum");
									dataInfo.isFeeMember="1";
									uni.setStorageSync("userNum",dataInfo)
									uni.showToast({
										title:"支付成功",
										duration:1500,
										mask:true
									})
									setTimeout(()=>{
										uni.navigateBack({
											delta:1
										})
									},1500)
						      }else{
								  console.log('fail:',err);
								  uni.showToast({
								  	title:"支付失败",
								  	icon:"none",
								  	duration:1500
								  })
							  } 
							  
						   });
					}else{
						uni.showToast({
							title:"暂不支持H5支付，请在APP内支付",
							icon:"none",
							duration:1500,
							mask:true
						})
					}
				// #endif
			},
			// 判断是否在微信浏览器打开
			is_weixn(){
			    var ua = navigator.userAgent.toLowerCase();
			    if(ua.match(/MicroMessenger/i)=="micromessenger") {
			        return true;
			    } else {
			        return false;
			    }
			}
		}
	}
</script>

<style scoped>
	.pay{
		width: 360rpx;
		height: 97rpx;
	}
	.box{
		width:400rpx;
		margin-left: 175rpx;
		display: flex;
		align-items: center;
		
	}
	.title{
		text-align: center;
		font-size: 32rpx;
		color: #333333;
		margin-top: 100rpx;
	}
	.title1{
		text-align: center;
		font-size: 30rpx;
		color: #666666;
		margin-top: 100rpx;
		margin-left: 40rpx;
	}
	.price{
		text-align: center;
		font-size: 50rpx;
		font-weight: bold;
		color: #333333;
		margin-top: 40rpx;
	}
	
	.item{
		padding: 0 100rpx;
		display: flex;
		align-items: center;
		margin-top: 60rpx;
		justify-content: space-between;
	}
	.btn{
		width: 500rpx;
		height: 100rpx;
		position: fixed;
		bottom: 80rpx;
		margin-left: 125rpx;
		background-color:#2AA245;
		color: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
	}
</style>
