<template>
	<view class="content">
		<view class="pg-main">
			<view class="tabs">
				<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false"
					:scroll-into-view="scrollInto">
					<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id"
						:data-current="index" @click="ontabtap">
						<text class="uni-tab-item-title title-block"
							:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
					</view>
				</scroll-view>
				<block v-for="(tab,index1) in contList" :key="index1">
					<img v-show="tabIndex===index1" class="tab-dtl-img" :src='"/static/"+$store.state.lang+tab.val'
						alt="">
				</block>
				<!-- <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
					<swiper-item class="swiper-item" v-for="(tab,index1) in contList" :key="index1">
						<img class="tab-dtl-img" :src='"/static/"+$store.state.lang+tab.val' alt="">
					</swiper-item>
				</swiper> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		College
	} from "../../common/data.js"

	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;

	export default {
		data() {
			return {
				list: College,
				tabBars: [],
				contList: [],
				cacheTab: [],
				tabIndex: 0,
				scrollInto: "",
				showTips: false,
				navigateFlag: false,
				pulling: false,
			}
		},
		components: {},
		onLoad(option) {
			const that = this;
			// let lang = option.lg || "cn";
			// this.setLang(lang)
			that.$store.dispatch('getLang');
		},
		onReady() {
			var _lg = this.$store.state.lang
			uni.setNavigationBarTitle({
				title: College['title'][_lg]
			})
			this.tabBars = College['tabBars'][_lg];
			this.contList = College['contList'][_lg];

			//#ifdef H5
			if (this.$store.state.isWeixin) {
				//location.origin, //window.location.href, //"http://emlyon.meetji.com",
				var share_url = window.location.href,
					title = "法国里昂商学院",
					dec = "全球工商管理博士项目",
					imgUrl = "http://emlyon.meetji.com/static/logo.png";
				mdl.wxShare(share_url, title, dec, imgUrl);
			}
			//#endif
		},
		methods: {
			ontabtap(e) {
				// console.log(e)
				let index = e.target.dataset.current || e.currentTarget.dataset.current;
				this.switchTab(index);
			},
			ontabchange(e) {
				// console.log("ontabchange:", e)
				let index = e.target.current || e.detail.current;
				this.switchTab(index);
			},
			switchTab(index) {
				// console.log(this.tabIndex, index)
				if (this.tabIndex === index) {
					return;
				}
				this.tabIndex = index;
				// this.scrollInto = this.tabBars[index].id;
			}
		}
	}
</script>

<style>
	@import "/common/tab.css";

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.pg-main {
		width: 100%;
		position: relative;
		/* padding-top: 50upx; */
	}
</style>
