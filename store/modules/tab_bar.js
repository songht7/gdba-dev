const nav_default = [{
		name: '首页',
		name_code: 'home',
		link: "/pages/index/index",
		icon: '',
		flex_dir: "flex-column"
	},
	{
		name: '预约',
		name_code: 'reserve',
		link: "/pages/reserved/index",
		icon: '',
		flex_dir: "flex-column"
	},
	{
		name: '我的',
		name_code: 'user',
		link: "/pages/user/index",
		icon: '',
		flex_dir: "flex-column"
	}

]
export default {
	state: {
		footer_nav: nav_default,
		now_page_index: 0,
	},
	mutations: {
		change_nav_list(state, data) {
			state.footer_nav = data;
		},
		change_page(state, index) {
			state.now_page_index = index;
		}
	},
	actions: {
		menu_default(ctx) {
			let menu_list = nav_default
			ctx.commit("change_nav_list", menu_list)
		}
	}
}
