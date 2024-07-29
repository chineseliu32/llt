<template>
  <view>
	  v.10.1
  <div>
	 <uv-qrcode ref="qrcode" size="300px" value="https://h5.uvui.cn"></uv-qrcode>
	 <canvas></canvas>
  </div>
  </view>
</template>
 
<script>
 
 export default {
 	name: "qrcode",
 	appname: "QrCodeComponent",
 
 	data() {
 		return {
 			qrCodeData: ''
 		};
 	},
	mounted: function () {
	      
	       const qrCodeData = 'your-data'; // 替换为你需要生成二维码的数据
		   
		   qrcode.toDataURL('your text', function (err, url) {
		     console.log(url)
		   })
	  
	    

	    },
	methods: {
	      bindQRCode: function () { 
		 
	
	      },
		  
	shareQrCode() {
	
	 
		},
			
		 
 
	 
	  }
	}
</script>