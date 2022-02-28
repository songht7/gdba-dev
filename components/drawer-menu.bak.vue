<template>
	<view class="drawer-menu">
		<uni-drawer :visible="showLeft" mode="left" @close="drawerHide()">
			<view class="drawer-nav">
				<view class="d-nav-list">
					<view class="tab-nav" @click="drawerHide()">
						<img src="/static/menu.png" class="drawer-menu" />
					</view>
					<navigator class="drawer-nav-btn" url="/pages/index/index">
						{{navFix["home"][$store.state.lang]["title"]}}
					</navigator>
					<block v-for="(obj,key) in nav[$store.state.lang]" :key="key">
						<navigator :class="['drawer-nav-btn',obj.key==pageis?'active':'']"
							:url="obj.link+$store.state.lang">
							{{obj.title}}
						</navigator>
					</block>
					<navigator class="drawer-nav-btn" url="/pages/contact/index">
						{{navFix["contact"][$store.state.lang]["title"]}}
					</navigator>
				</view>
			</view>
		</uni-drawer>
	</view>
</template>


<script>
	import {
		Home
	} from "../../common/data.js"

	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'

	export default {
		props: {
			visible: false
		},
		data() {
			return {
				nav: Home.nav,
				navFix: Home.navFix,
				pageis: "",
				showLeft: false, //侧滑菜单
			};
		},
		onShow() {},
		components: {
			uniDrawer
		},
		computed: {},
		methods: {
			drawerShow(e) {
				console.log("show", e);
				this.showLeft = true
				this.$emit()
			},
			drawerHide() {
				console.log("hide");
				this.$emit()
				this.showLeft = false
			}
		}
	}
</script>


<style>
	.tab_bar {
		position: fixed;
		height: 100upx;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #fff;
		border-top: 2upx solid #D1D1D1;
	}

	.tab_main {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: space-around;
		align-content: center;
		align-items: center;
	}

	.tab_item {
		width: 33.33%;
		height: 80%;
		display: flex;
		justify-content: center;
	}

	.flex-row {
		flex-direction: row;
	}

	.flex-column {
		flex-direction: column;
	}

	.tab_block {
		display: flex;
		justify-content: center;
		align-content: center;
		align-items: center;
		text-align: center;
		font-size: 28upx;
		color: #929292;
		line-height: 1;
		width: 100%;
		height: 100%;
	}

	.tab_name {
		line-height: 1;
	}

	.tab_bat_active .tab_name {
		color: #008CEE;
	}

	.tab-bk-company.tab_bat_active .tab_name {
		color: #ffffff;
	}
</style>
