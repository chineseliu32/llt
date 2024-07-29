/**
 *@des 登录注册相关接口
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@param login.js
 */

import {baseUrl} from "./params";

// 密码注册
const registerByPass = "/tiny-shop/v1/site/register";

// 用户注册接口*
const userRegistration = "/api/user/register";

// 验证码校验*
const userCaptcha = "/api/user/verifySmsCode";

// 个人信息更改/更新*
const saveOrUpdateUserInfo = "/api/user/saveOrUpdateUserInfo";
// 找回密码*
const saveOrUpdateUserPassword = "/api/user/saveOrUpdateUserPassword";
// 用户密码登录*
const loginByPass = "/api/user/gotoLogin";

// 微信授权登录
const wechatH5Login = "/tiny-shop/v1/wechat-login/wechat-login";

// 微信小程序授权登录
const mpWechatLogin = "/tiny-shop/v1/third-party/wechat-mp";

// 密码重置
const updatePassword = "/tiny-shop/v1/site/up-pwd";

// 第三方绑定
const authLogin = "/tiny-shop/v1/member/auth/create";

// 查询绑定状态
const isBindingCheck = "/tiny-shop/v1/member/auth/is-binding";

// 手机号验证码登录*
const loginBySmsCode = "/api/user/verificationCodeLogin";

// 获取手机验证码*
const smsCode = "/api/user/sendSmsCode";

//检查用户是否注册用户注册*
const registered = "/api/user/register/check/{userPhone}";

// 退出登录
const logout = "/tiny-shop/v1/site/logout";

// 是否登录
const islog = "/tiny-shop/v1/site/identity-token";

// 退出登录
// const refreshToken = `${baseUrl}/tiny-shop/v1/site/refresh`;

// 退出登录
const refreshToken = "/api/user/signOut";

export {
	userRegistration,
	loginBySmsCode,
	smsCode,
	registered,
	userCaptcha,
	loginByPass,
	saveOrUpdateUserInfo,
	saveOrUpdateUserPassword,
	refreshToken,

    registerByPass,
    isBindingCheck,
    wechatH5Login,
    mpWechatLogin,
    authLogin,
    updatePassword,
    logout,
    islog
};
