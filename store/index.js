import Vue from 'vue'
import Vuex from 'vuex'
import tab_bar from "./modules/tab_bar.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		sourceUrl: "https://api.meetji.com",
		loading: "0",
		base_url: "",
		user: {},
		access_token: "",
		openid: "",
		phone: "",
		data: "",
		isWeixin: false,
		sysInfo: "",
		popup_user: "on",
		lang: ""
	},
	mutations: {
		isWeixin(state, status) {
			state.isWeixin = status
		},
		get_user(state, data) {
			console.log(data)
			if (data.access_token) {
				state.access_token = data.access_token;
			} else {
				state.user = data
				state.openid = data.openid
				state.phone = data.phone;
			}
		},
		set_sysInfo(state, data) {
			state.sysInfo = data
		},
		set_popup_user(state, data) {
			state.popup_user = data
		},
		setLang(state, data) {
			state.lang = data
		}
	},
	actions: {
		getLang(ctx) {
			uni.getStorage({
				key: 'DBA-Lang',
				success: function(res) {
					console.log("getLang success")
					ctx.commit("setLang", res.data)
					// const _nav = [{
					// 	"btn": `/static/${lg}/home/nav-1.png`,
					// 	"link": `/pages/college/index?lg=${lg}`,
					// 	"title": "关于学院",
					// }, {
					// 	"btn": `/static/${lg}/home/nav-2.png`,
					// 	"link": `/pages/project/index?lg=${lg}`,
					// 	"title": "关于项目",
					// }, {
					// 	"btn": `/static/${lg}/home/nav-3.png`,
					// 	"link": `/pages/doctor/index?lg=${lg}`,
					// 	"title": "同窗学友",
					// }, {
					// 	"btn": `/static/${lg}/home/nav-4.png`,
					// 	"link": `/pages/study/index?lg=${lg}`,
					// 	"title": "学习之旅",
					// }]
					// ctx.state.nav = _nav;
				},
				fail() {
					console.log("getLang fail")
					ctx.commit("setLang", "cn")
				}
			});
		},
		cheack_user(ctx) {
			var user = "";
			uni.getStorage({
				key: "uWXInfo",
				success: function(res) {
					user = res.data;
					ctx.commit("get_user", user)
				}
			})
			uni.getStorage({
				key: "wx_ticket",
				success: function(res) {
					let ticket = res.data;
					ctx.commit("get_user", ticket)
				}
			})
		},
		goback(ctx, url) {
			if (url) {
				uni.navigateTo({
					url: url
				});
			} else {
				uni.navigateBack({
					delta: 1
				});
			}
		},
		makePhoneCall(ctx) {
			uni.makePhoneCall({
				phoneNumber: ctx.state.phoneNumber
			});
		},
		checkWeixin(ctx) {
			let _isWeixin = !!/micromessenger/i.test(navigator.userAgent.toLowerCase());
			ctx.commit("isWeixin", _isWeixin)
		},
		get_sysInfo(ctx) {
			uni.getSystemInfo({
				success: (res) => {
					ctx.commit("set_sysInfo", res)
				}
			})
		},
		set_popup_user(ctx, t) {
			console.log(t)
			ctx.commit("set_popup_user", t)
		}
	},
	modules: {
		tab_bar
	}
})
export default store
