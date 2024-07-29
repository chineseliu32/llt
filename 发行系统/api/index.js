


// 轮播图
const index_banner = "/api/banner/getBannerList";

//分类列表
const index_list = "/api/category/categoryList";

//新闻分类
const index_lists = "/api/news/pageList"
//新闻详情
const index_lists_t = "/api/news/getById"
//获取公告
const gongao="/api/news/getLastNews"

//关于我们
const aboutUS = "/api/servicemanagement/pageList"

//活动列表GET 
const activity = "/api/activity/pageList"
//活动详情
const activityid = "/api/activity/selectById"
//参加活动
// const activeadd="/api/activityTeam/add"
const activeadd="/api/pay/selectActivity"
//规则
const about = "/api/servicemanagement/getById"
//获取首页推荐的项目
const tuijian="/api/projectCollectApi/projectTag"

export {
	tuijian,
	activeadd,
    index_banner,
	index_list,
	index_lists,
	index_lists_t,
	aboutUS,
	about,
	activity,
	activityid,
	gongao
};
