// #ifdef H5
// var wx = require('jweixin-module')
var wx = require('weixin-js-sdk');
// #endif
import md5 from "./md5.js";
const isArray = Array.isArray || function(obj) {
	return obj instanceof Array;
};
const __domain = "http://emlyon.meetji.com";
const Interface = {
	"SendMail": {
		"url": "http://www.spacehu.com/space/mail/mail.php?leo=",
		"email": ["980558589@qq.com", "stk@meetji.com", "yunfeng.ma@inmobi.com", "jason.wu@inmobi.com"],
		"testEmail": ["407794660@qq.com"]
	},
	"copyright": {
		"title": "梧桫（上海）教育科技有限公司",
		"recordcode": "31011702005308", //默认meetji.com
		"ICP": "沪公网安备 31011702005308号"
	},
	// 	,"getData":"http://api_test.meetji.com/v1/ApiEnum-getRegion.htm?id=110000"
	"apiurl": "https://api.meetji.com",
	"domain": "https://emlyon.meetji.com",
	"template_id": "lArO_3bhjAAoCMdv78bmJ2l46L-HByz-4Co4tCDEiyI", //'4M8RWgwsGDYlZL_NuWg--FecFh3QKWMW1hVZIfm34IU'
	"addr": {
		"sendRegistSms": "/v4/ApiSms-sendRegistSms.htm", //发送验证码(有阻拦：手机号已使用) 测试：1111
		"sendSms": "/v4/ApiSms-sendSms.htm", //发送验证码(无阻拦）
		"slideShow": "/v2/ApiHome-slideShow.htm",
		"article": "/v2/ApiHome-article.htm", //列表
		"getDetail": "/v2/ApiHome-article_detail.htm",
		"saveSingle": "/v2/ApiHome-saveSingle.htm", //预约POST
		"getHelp": "/v2/ApiHome-getHelp.htm", //助力详细
		"saveHelp": "/v2/ApiHome-saveHelp.htm", //帮助助力
		"saveComment": "/v2/ApiHome-saveComment.htm", //评论
		"getCategory": "/v2/ApiHome-getCategory.htm", //获取分类
		"getSubjectCategory": "/v2/ApiHome-getSubjectCategory.htm", //获取子分类
		"getAgeRange": "/v2/ApiHome-getAgeRange.htm", //获取年龄段
		"getBrand": "/v2/ApiHome-getBrand.htm", //品牌
		"getRegion": "/v1/ApiEnum-getRegion.htm",
		"getRegion2": "/v2/ApiEnum-getRegion.htm", //区域
		"getBookedList": "/v2/ApiHome-getBookedList.htm", //预约列表
		"saveUserInfo": "/v2/ApiHome-saveUserInfo.htm", //编辑保存用户
		"getWeChatInfo": "/v2/ApiWeChat-getWeChatInfo.htm",
		"getJsApiTicket": "/v4/ApiWeChat-getJsApiTicket.htm",
		"savePoint": "/v2/ApiHome-savePoint.htm", //得积分POST
		"sendWechatMessage": "/v2/ApiWeChat-sendWechatMessage.htm" //发送订阅消息-公众号?code=1
	},
	"wx": {
		"appid": "wxabbe8884bd7b05e6",//https://emlyon.meetji.com/
		"appidQY": "ww00bf81f97337653e", //企业微信
		"access_token": "client_credential",
		"secret": "01ef7de58bc18da629d4ec33a62744f9",
		"getToken": "https://api.weixin.qq.com/cgi-bin/token",
		"test_openid": "" //"oeH5Zw1gRAZpsj6PJC4h3-huJmzQ" //测试
	}

};
let deepTranslateParam = ""; //北京 媒体 深度转化对接参数
const module = {
	getData: function(url, fun, method, data, _head) {
		let result = [];
		let resultAll = [];
		uni.request({
			url: url,
			method: method || "GET",
			data: data || {},
			header: _head || {},
			success: function(res) {
				console.log("mdl.getData:", url);
				console.log(res);
				let __res = res.data;
				resultAll = __res;
				if (__res.success) {
					if (__res.data) {
						result = __res.data;
					} else if (__res.post) {
						result = __res.post;
					} else if (__res.result) {
						result = __res.result;
					} else {
						result = __res.info;
					}
				} else {
					result = {
						"Result": "0",
						"Msg": "请求失败，请重试!",
						"err": ""
					}
				}
			},
			fail: function(err) {
				// 				console.log("======fail========");
				// 				console.log(err);
				result = {
					"Result": "0",
					"Msg": "接口请求失败",
					"err": err
				}
			},
			complete: function(comp) {
				// 				console.log("======complete========");
				// 				console.log(result)
				if (fun) {
					new fun(result, resultAll)
				}
			}
		})
	},
	wxShare: function(obj = {}) {
		//{ title, dec, share_url,imgUrl,lang}
		var that = this;
		if (!that.isWeixin()) {
			return
		}
		var _link = obj.share_url || location.origin + "/#/"; //window.location.href.split('#')[0];
		if (that.isIOS()) {
			_link = obj.share_url || location.origin + "/";
		}

		let REDIRECT_URI = encodeURIComponent(_link),
			appid = Interface.wx.appid,
			scope = "snsapi_userinfo", //snsapi_base，snsapi_userinfo （弹出授权页面，获取更多信息）
			state = "STATE"; //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
		var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
			appid + '&redirect_uri=' +
			REDIRECT_URI +
			'&response_type=code&scope=' + scope + '&state=' + state +
			'#wechat_redirect';
		let code = that.queryString('code');
		//console.log(_url)
		//console.log(share_url, title, dec)
		var funTicket = function(res) {
			console.log("=======getTicket======")
			console.log(res)
			uni.setStorage({
				key: 'wx_ticket',
				data: {
					"access_token": res.access_token,
					"jsapi_ticket": res.ticket,
					"noncestr": res.noncestr,
					"signature": res.signature,
					"expires_in": res.expires_in
				},
				success: function() {

				}
			});
			var _config = {
				debug: false,
				appId: appid,
				timestamp: res.timestamp,
				nonceStr: res.noncestr,
				signature: res.signature,
				jsApiList: [
					'updateAppMessageShareData',
					'updateTimelineShareData',
					'onMenuShareAppMessage',
					'onMenuShareTimeline',
				]
			}
			// console.log('wx.config:', _config)
			wx.config(_config);
		}
		//var _link='http://emlyon.meetji.com/';
		let url_ticket = Interface.apiurl + Interface.addr.getJsApiTicket + "?url=" + encodeURIComponent(_link);
		let _head = {
			'channel': 'yimei'
		};
		// let channel_code = 'emlyon'; //that.queryString("channel_code");
		// if (channel_code) {
		// 	_head = {
		// 		"channel_code": channel_code
		// 	};
		// }

		let wx_ticket = that.getData(url_ticket, funTicket, "GET", "", _head)


		// _href = "http://main.meetji.com:3001?wxr=" + encodeURIComponent(_href)
		var _imgUrl = Interface.domain + "/static/logo.png";
		//location.origin, //window.location.href, //"http://emlyon.meetji.com",
		var myDate = new Date(),
			year = myDate.getYear();
		var wxSet = {
			title: obj.title || (obj.lang == "en" ? "Global DBA" : "法国里昂商学院亚洲校区GDBA项目招生简章"),
			desc: obj.dec || (obj.lang == "en" ? "Asia Track Introduction " + year : "全球工商管理博士2022级"),
			link: _link,
			imgUrl: obj.imgUrl || _imgUrl,
			success: function(res) {
				console.log('wxSet-success:', res)
			}

		};
		console.log('wxSet:', wxSet)
		wx.ready(function() {
			// 2. 分享接口
			// 2.1 “分享给朋友”及“分享到QQ”
			wx.updateAppMessageShareData(wxSet);
			// 2.2 “分享到朋友圈”及“分享到QQ空间”
			wx.updateTimelineShareData(wxSet);
			// 
			wx.onMenuShareTimeline(wxSet);
			wx.onMenuShareAppMessage(wxSet);
		});
		wx.error(function(res) {
			console.log('注册失败:', res)
			// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
		});
		// if (code) {

		// } else {
		// 	window.location.href = _url;
		// }


	},
	queryString: function(value) {
		const reg = new RegExp(`(^|&)${value}=([^&]*)(&|$)`, 'i')
		const r = window && window.location.search.substr(1).match(reg)
		if (r != null) {
			return unescape(r[2])
		}
		return null
	},
	isIOS: function() {
		var isIphone = navigator.userAgent.includes('iPhone');
		var isIpad = navigator.userAgent.includes('iPad');
		return isIphone || isIpad;
	},
	isWeixin: function() {
		return !!/micromessenger/i.test(navigator.userAgent.toLowerCase())
	},
	getWXCode: function(redirect_uri) {
		var _this = this,
			appid = Interface.wx.appid,
			secret = Interface.wx.secret;
		// 		console.log("======getWXInfos========")
		//		console.log(_this.isWeixin())
		// 		console.log(location.origin)
		// 		console.log(type)

		//_this.userLogin("061AMrz72wh1XR0VkTB72Knmz72AMrzb"); //测试用
		var _uWXInfo = "";
		uni.getStorage({
			key: 'uWXInfo',
			success: function(res) {
				_uWXInfo = res.data;
			},
			complete: function() {
				// console.log("=====getStorage-_uWXInfo======")
				// console.log(_uWXInfo)
				if (_uWXInfo && _uWXInfo.openid) {
					var __openid = _uWXInfo.openid;
				} else {
					let redirect_uri = redirect_uri ? redirect_uri : Interface.domain;
					//授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
					let REDIRECT_URI = encodeURIComponent(redirect_uri),
						scope = "snsapi_userinfo", //snsapi_base，snsapi_userinfo （弹出授权页面，获取更多信息）
						state = "STATE"; //重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
					var _url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
						appid + '&redirect_uri=' +
						REDIRECT_URI +
						'&response_type=code&scope=' + scope + '&state=' + state +
						'#wechat_redirect';
					let code = _this.queryString('code');
					//console.log(_url)
					if (code) {
						//console.log(code)
						_this.userLogin(code);
					} else {
						window.location.href = _url;
					}
				}
			}
		});

	},
	userLogin: function(code, _openid) {
		var _this = this;
		var result = "";
		var param = code ? "?code=" + code : "";
		var _head = "";
		if (_openid) {
			_head = {
				"openid": _openid
			}
		}
		var _url = Interface.apiurl + Interface.addr.getWeChatInfo + param;
		console.log("======getWXInfo========")
		console.log(_url)
		uni.request({
			url: _url,
			method: "GET",
			data: {},
			header: _head || {},
			success(res) {
				console.log("====getWeChatInfo====")
				console.log(res)
				result = res;
				let _data = res.data.data;
				if (_data.openid) {
					uni.setStorage({
						key: 'uWXInfo',
						data: _data,
						success: function() {
							//console.log('setStorage-uWXInfo-success');
						}
					})
					if (!_openid) {
						window.location.href = Interface.domain;
					} else if (_openid) {
						_this.goHomePage();
					}
				} else {
					_this.goHomePage();
				}
			},
			fail(err) {
				result = err;
				console.log("---getWeChatInfo-err---")
				console.log(err)
				_this.goHomePage();
			},
			complete(c) {}
		})
	},
	getSysInfo: function() {
		return uni.getSystemInfoSync().platform;
	},
	goHomePage: function() {
		let hash = window.location.hash;
		if (hash == "#/pages/authorize/index" || hash == "#/") {
			uni.redirectTo({
				url: '/pages/index/index'
			});
		}
	},
	getMyStorage: function(key, val, fun) {
		var _storage = "";
		uni.getStorage({
			key: key,
			success: function(res) {
				if (val) {
					_storage = res.data.val;
				} else {
					_storage = res.data;
				}
			},
			complete(c) {
				if (fun) {
					new fun(_storage)
				}
			}
		});
	}
}


export default {
	Interface,
	module,
	isArray
}
