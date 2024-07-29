// H5地址(前端运行地址)
const hostUrl = "";

// 充值页面地址 用作微信H5获取code
const rechargeUrl = `${hostUrl}/pages/user/account/recharge`;

// 后台接口请求地址
  //const baseUrl = "http://192.168.18.5:8090/partnership_app_api";
// const baseUrl="http://355c6675e0.imdo.co/partnership_app_api"
// const baseUrl = "http://47.114.174.24:8090/partnership_app_api/";//*****
//const baseUrl = "https://api.pvpi.net/partnership_app_api"
 // const baseUrl = "http://8.140.195.224:8090/partnership_app_api"	//合交所--版码商城
//const baseUrl = "http://web.hncaee.com:8080/partnership_app_api"   //海文交
//const baseUrl = "http://52.4.230.180:8090/partnership_app_api"   //纽数所
//const baseUrl =   "http://127.0.0.1:8090/partnership_app_api"
// const baseUrl = "http://192.168.18.9:8090/partnership_app_api"
const baseUrl = "http://192.168.1.4:8090/partnership_app_api"

// websocket服务端地址
const websocketUrl = "";

// 微信公众号appid
const weixinAppId = "";

export {
    rechargeUrl,
    baseUrl,
    hostUrl,
    weixinAppId,
    websocketUrl
}
