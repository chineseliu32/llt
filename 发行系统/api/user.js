import {baseUrl} from "./params";

//个人信息查询
const getUserInfo = "/api/user/getUserInfo";

//个人链上信息查询
const getChainUserInfo = "/api/user/getChainUserInfo";

//图片上传
// const uploadFiles = "http://47.114.174.24:8080/backUpload/uploadFiles";
const uploadFiles = "http://8.140.195.224:8090/backUpload/uploadFiles";
// const uploadFiles = "http://192.168.2.46:8090/backUpload/uploadFiles";
// const uploadFiles = "http://192.168.2.6:8090/backUpload/uploadFiles";

//获取个人信息全部会员下拉框
const allUserEnum = "/api/index/allUserEnum";
//获取行业的分类
const categoryList = "/api/category/categoryList";
//获取行业分类的子分类
const hangyeId="/api/category/getCategory/"
//获取项目全部会员下拉框
const allProjectEnum = "/api/index/allProjectEnum";
//个人信息查询
const saveOrUpdateUserInfo = "/api/user/saveOrUpdateUserInfo";

//发布融资/借款项目
const projectFinancingLoan = "/api/projectFinancingLoan/add";
const projectCreditInvestment = "/api/projectCreditInvestment/add";
const projectPropertySell = "/api/projectPropertySell/add";
// 发布服务采购
const serviceProcurement = "/api/serviceProcurement/add";

//我的项目
const getUserProjectPageListApi = "/api/userProject/getUserProjectPageListApi";

//我的项目
const getCollectPageListApi = "/api/userProject/getCollectPageListApi";

//我的收藏
const pageList = "/api/projectCollectApi/pageList";

//推荐项目
const recommend = "/api/projectCollectApi/recommend";

//收藏项目
const projectCollectApicancel = "/api/projectCollectApi/cancel";

//取消收藏项目
const projectCollectApiadd = "/api/projectCollectApi/add";

//借款项目列表
const projectFinancingLoangetPageListApi = "/api/projectFinancingLoan/getPageListApi";
//借款项目详情
const projectFinancingLoangetById = "/api/projectFinancingLoan/getById";
//产品证书商品token详情
const productTokenListByAssetId = "/api/productTokenList/getTokenByAssetId";
const productTokenListByProductId = "/api/productTokenList/getProjectTokenListByProductId";
const productTokenListBychanpinProductId = "/api/productTokenList/getAllAssetCertifyListByProductIdApi";
const getAssetCertifyListProductApi = "/api/productTokenList/getAssetCertifyListProductApi";
const gettokenlistById = "/api/productTokenList/gettokenlistById";
const getPayInfotoken = "/api/productTokenList/tokenFukuoka";
const getAssetCertifyGuaPaiListApi =  "/api/productTokenList/getAssetCertifyGuaPaiListApi";
const gettokenization = "/api/productTokenList/tokenization";

//订单详情
const tokenOrder = "/api/productTokenList/tokenOrder";
//订单列表
const getAssetCertifyOrderListApi = "/api/productTokenList/getAssetCertifyOrderListApi";
//订单取消状态修改
const getAssetCertifyorderlinessApi = "/api/productTokenList/orderliness";
//订单完成api
const getAssetCertifytokenDingDanApi = "/api/productTokenList/tokenDingDan";
//订单支付成功的列表
const getSuccessListByAssetIdApi = "/api/productTokenList/getSuccessListByAssetIdApi";

//解仓api
const gettokenSuoCanGApi = "/api/productTokenList/tokenSuoCanG";
//特殊用户不做锁仓限制
const getteShuYongHuApi = "/api/productTokenList/teShuYongHu";

//贷款项目详情
const daikuanCon="/api/projectCreditInvestment/getById";
//资产购买详情
const zichanCon="/api/projectAssetPur/getById";
//资产出售详情
const zichanchushouCon="/api/projectPropertySell/getById";

//服务提供详情
const fuwutigongCon="/api/serviceDelivery/getById";
//服务采购详情
const fuwucaigouCon="/api/serviceProcurement/getById"
// 资产出售列表
const saleList = "/api/projectPropertySell/getPageListApi";
// 资产出售列表
const getMyPageListApi = "/api/projectPropertySell/getMyPageListApi";
//发布资产购买
const zichangoumai="/api/projectAssetPur/add"

// 资产购买列表
const projectAssetPurList = "/api/projectAssetPur/getPageListApi";
// 投资贷款列表
const investList = "/api/projectCreditInvestment/getPageListApi";
// 服务采购列表
const procureList = "/api/serviceProcurement/getPageListApi";

// 服务提供列表
const deliveryList = "/api/serviceDelivery/getPageListApi";
//路演推广
const nuyanTuiguang="/api/roadshowPromotion/pageList";
//路演详情
const nuyancon="/api/roadshowPromotion/getById";
//测试获取筛选内容
const shaixuan="/api/index/allProjectEnum";
//获取筛选分类
const shailist="/api/category/categoryList";
// 发布服务提供
const fuwutigong="/api/serviceDelivery/add";
//发布投资贷款
const touzi='/api/projectCreditInvestment/add';
// 发布资产出售
const zichanchushou='/api/projectPropertySell/add';
//获取新闻列表
const newslist="/api/news/pageList";
//获取公告列表
const gglist="/api/news/getLastNews";
//获取新闻详情POST /api/activityTeam/add
const newscon="/api/news/getById";
//我的项目
const mydaikuan="/api/userProject/getUserProjectFinancingLoanPageListApi";
//我的资产
const getUserAsset="/api/userProject/getUserAssetListApi";
//我的申购
const getUserSubscriptionListApi="/api/userProject/getUserSubscriptionListApi";
// 我的项目审核
const myxiangmu="/api/userProject/getProjectAuditList"
//申请项目合作
const hezuo="/api/projectCooperationApi/add"
//我申请的合作
const shengqing="/api/projectCooperationApi/myCooprateList"
//首页根据标签获取项目
const labelList="/api/projectCollectApi/projectTag"
//参加的活动列表
const huodonglist="/api/userActivity/myActivityList"
//获取分布消息详情
const fenbu="/api/msg/myBranchMsgById"
//我的分布消息列表
const fenbulist="/api/msg/myBranchMsgList"
// 我未读分布消息数量
const fenbunum="/api/msg/myBranchMsgUnRead"
// 我的系统消息详情
const xitong="/api/msg/mySysMsgById"
// 我的系统消息列表
const xitonglist="/api/msg/mySysMsgList"
// 我的未读系统消息数量
const xitongnum="/api/msg/mySysMsgUnRead"
// 获取会员会不信息
const fenbujjie="/api/user/myOrgInfo" 
  //直播上线
  const live="/api/liveVideo/liveVideoOnLine"
  //直播下线
  const backlive="/api/liveVideo/liveVideoUpLine"
  //直播列表
  const livelist="/api/liveVideo/pageListApi"
  //微信第一次登录
  const wx="/api/user/gotoWxAppLogin"
  // app微信第一次登录
  const appLogin="/api/user/appLogin"
  //微信绑定
  const wxbd="/api/user/wxAppLoginVerify"
  // 投资会员升级管理员
  const upvip="/api/memberUpgrade/add"
  //成立分布
  const upfb="/api/memberUpgrade/apply"
  //启动应用更新用户信息
  const upuserinfo="/api/user/openAppUpdate"
  // 重点项目
  const getZindex="/api/projectCollectApi/getPageImportantProject"
  // 获取会员缴费的选项
  const userPriceType="/api/renew/costAllocationList"
  // app会员缴费
  const jiaofei="/api/pay/wxAppPay"
  // 小程序会员缴费
  const weixinpay="/api/pay/wxAppletsPay"
  // 投资会员升级记录
  const tupjl="/api/memberUpgrade/investUpgradeRecord"
  // 成立机构记录
  const jigou="/api/memberUpgrade/adminUpgradeRecord"
  // 降级记录
  const jiangji="/api/memberUpgrade/adminDowngradeRecord"
  // 获取成立机构的类型
  const jigoutype="/api/index/allOrgType"
  // 公众号发送code
  const gcode="/api/weChatController/analysisUserInfo"
  // 公众号pay
  const gzhpay="/api/pay/wxpublicPay"
  // 申请直播的权限
  const liveqx="/api/liveVideo/liveVideoToExamine"
  // 验证异地登录
  const ydlogin="/api/user/verificationToken"
  // 查看会员关系
  const guanxi="/api/user/searchAdminMemberRelation"
  // 查看所属会员
  const huiyuan="/api/userProject/getMemberAssetListApi";
  // 获取app的下载地址
  const appurl="/api/sysSet/selectAppLink"
  // 发布视频推广
  const upshipin="/api/roadshowPromotion/apiAddRoadshowPromotion"
  // 发布活动
  const fabuhuodong="/api/activity/apiAddActivityConfigure"
  // 发布新闻
  const fabunews="/api/news/apiAddNews"
  // 开启活动
  const openhuod="/api/activity/apiOpenActivityConfigure"
  //开启新闻
  const opennews="/api/news/apiAppExhibition"
  // 获取未读的消息
  const wnews="/api/msg/mySysMsgUnReadInfo"
  // 获取无直播默认视频
  const mvideo="/api/roadshowPromotion/apiDefaultVideo"
  // 判断是否需要交费
  const isjiaofei="/api/pay/selectPaySwitch?type"
  // 不要交费更改状态
  const zhuangtai="/api/pay/payFalse"
  // 汇付支付
  const huifupay="/api/huifu/huifupay"
  // 特殊商品汇付支付
  const huifutokenpay="/api/huifu/huifutokenpay"
  // 汇付关单
  const huifuclose="/api/huifu/huifuClose"
  // 获取推荐码
  const getInviterPhone="/api/appVersion/getInviterPhone"
  // 提交实名认证
  const addRealName="/api/user/addRealName"
  // 获取实名认证
  const getRealName="/api/user/getRealName"
  //InitFaceVerify
  const getAuthenticationInitFaceVerify = "/api/userProject/getAuthenticationInitFaceVerify"
  //DescribeFaceVerify
  const getAuthenticationDescribeFaceVerify = "/api/userProject/getAuthenticationDescribeFaceVerify"
  //更新用户实人认证状态
  const updateRealName = "/api/user/updateRealName"
  //获取持有资产信息
  const getUserAssetListByProjectIdApi = "/api/userProject/getUserAssetListByProjectIdApi"
  //获取提货资产信息
  const getExpressAmount = "/api/projectCreditInvestment/getExpressAmount"
  //获取自动下载APP开关
  const allowDownloadAPP = "/api/sysSet/allowDownloadAPP"
  //获取自动下载APP开关
  const getRecommendProject = "/api/projectCollectApi/getRecommendProject"
  //获取自动下载APP开关
  const getGoldenProject = "/api/projectCollectApi/getGoldenProject"
  //获取用户地址列表
  const getUserAddressList = "/api/userAddress/getUserAddressList"
  //添加用户地址
  const addUserAddressList = "/api/userAddress/add"
  //添加用户地址详细信息
  const getUserAddressById = "/api/userAddress/getUserAddressById"
  //删除
  const delUserAddressById = "/api/userAddress/del"
  //获取用户统计
  const getMemberCountApi = "/api/userProject/getMemberCountApi"
  //获取用户资产证书列表
  const getAssetCertifyListApi = "/api/userProject/getAssetCertifyListApi"
  const getSubscriptionByUserId = "/api/projectFinancingLoan/getSubscriptionByUserId"
  const getNewUserCount_Week = "/api/projectFinancingLoan/getNewUserCount_Week"
  const getRealNameUserCount_Week = "/api/projectFinancingLoan/getRealNameUserCount_Week"
  const getTotalUserCount_Week = "/api/projectFinancingLoan/getTotalUserCount_Week"     
  const getNewUserCount_Month = "/api/projectFinancingLoan/getNewUserCount_Month"
  const getNewUserCount_Year = "/api/projectFinancingLoan/getNewUserCount_Year"
  const getRealUserCount_Month = "/api/projectFinancingLoan/getRealUserCount_Month"
  const getTotalUserCount_Month = "/api/projectFinancingLoan/getTotalUserCount_Month"
  const getAmountByUserIdProductId = "/api/projectFinancingLoan/getAmountByUserIdProductId"
  const getAllAssetCertifyListByUserApi = "/api/userProject/getAllAssetCertifyListByUserApi"
  const publishProject = "/api/projectPropertySell/publishProject"
  const removePublishProject = "/api/projectPropertySell/removePublishProject"
  const getTotalMoney_Week = "/api/projectFinancingLoan/getTotalMoney_Week"
  const getTotalMoney_Month = "/api/projectFinancingLoan/getTotalMoney_Month"
  const getTotalMoney_Year = "/api/projectFinancingLoan/getTotalMoney_Year"
  const getUserAdapaySettleAccount = "/api/projectFinancingLoan/getUserAdapaySettleAccount"
  const DeleteUserAdapaySettleAccount = "/api/huifu/deleteSettleAccount"
  const huiMoneyBag = "/api/huifu/huiMoneyBag"
  const CreateSettleAccount = "/api/huifu/createSettleAccountAPI"
  const getBalance = "/api/huifu/getBalance"
  const drawCash = "/api/huifu/drawCash"
export {
	zhuangtai,
	isjiaofei,
	mvideo,
	wnews,
	opennews,
	openhuod,
	fabunews,
	fabuhuodong,
	upshipin,
	appurl,
	guanxi,
	ydlogin,
	liveqx,
	gzhpay,
	gcode,
	jigoutype,
	jiangji,
	jigou,
	tupjl,
	weixinpay,
	jiaofei,
	userPriceType,
	getZindex,
	upuserinfo,
	upfb, 
	appLogin,
	upvip,
	wxbd,
	wx,
	live,
	backlive,
	livelist,
	fenbujjie,
	gglist,
	fenbu,
	fenbulist,
	fenbunum,
	xitong,
	xitonglist,
	xitongnum,
	huodonglist,
	shengqing,
	myxiangmu,
	labelList,
	hezuo,
	hangyeId,
	daikuanCon,
	//资产购买详情
	zichanCon,
	//资产出售详情
	zichanchushouCon,
	//服务提供详情
	fuwutigongCon,
	//服务采购详情
	fuwucaigouCon,
	mydaikuan,
	newscon,
	newslist,
	zichanchushou,
	touzi,
	fuwutigong,
	zichangoumai,
	getUserInfo,
	getChainUserInfo,
	uploadFiles,
	allUserEnum,
	categoryList,
	saveOrUpdateUserInfo,
	allProjectEnum,
	projectFinancingLoan,
	projectCreditInvestment,
	projectPropertySell,
	serviceProcurement,
	getUserProjectPageListApi,
	getCollectPageListApi,
	projectFinancingLoangetPageListApi,
	projectFinancingLoangetById,
	projectCollectApiadd,
	projectCollectApicancel,
	pageList,
	recommend,
	saleList,
	projectAssetPurList,
	investList,
	procureList,
	deliveryList,
	nuyanTuiguang,
	nuyancon,
	shaixuan,
	shailist,
	huifupay,
	huifuclose,
	getInviterPhone,
	getUserAsset,
	getUserSubscriptionListApi,
	huiyuan,
	addRealName,
	getRealName,
	getAuthenticationDescribeFaceVerify,
	getAuthenticationInitFaceVerify,
	updateRealName,
	getUserAssetListByProjectIdApi,
	getExpressAmount,
	allowDownloadAPP,
	getRecommendProject,
	getGoldenProject,
	getUserAddressList,
	addUserAddressList,
	getUserAddressById,
	delUserAddressById,
	getMemberCountApi,
	getAssetCertifyListApi,
	getSubscriptionByUserId,
	getTotalUserCount_Week,
	getRealNameUserCount_Week,
	getNewUserCount_Week,
	getNewUserCount_Month,
	getNewUserCount_Year,
	getRealUserCount_Month,
	getTotalUserCount_Month,
	getAmountByUserIdProductId,
	getAllAssetCertifyListByUserApi,
	publishProject,
	removePublishProject,
	getTotalMoney_Week,
	getTotalMoney_Month,
	getTotalMoney_Year,
	getUserAdapaySettleAccount,
	DeleteUserAdapaySettleAccount,
	CreateSettleAccount,
	getMyPageListApi,
	huiMoneyBag,
	productTokenListByAssetId,
	productTokenListByProductId,
	productTokenListBychanpinProductId,
	getAssetCertifyListProductApi,
	gettokenlistById,
	getPayInfotoken,
	getAssetCertifyGuaPaiListApi,
	gettokenization,
	huifutokenpay,
	tokenOrder,
	getAssetCertifyOrderListApi,
	getAssetCertifyorderlinessApi,
	getAssetCertifytokenDingDanApi,
	gettokenSuoCanGApi,
	getteShuYongHuApi,
	getSuccessListByAssetIdApi
};
