<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab" :scroll-x="true" :show-scrollbar="false"
			:scroll-into-view="scrollInto">
			<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="`tb-${tab.id}`"
				:data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title title-block"
					:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
			</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="ontabchange">
			<swiper-item v-for="(lst,index1) in contList" :key="index1">
				<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
					<view class="tab-img-list">
						<block v-if="lst['val'].length" v-for="(img,k) in lst.val" :key="k">
							<img class="tab-dtl-img" :src='"/static/"+$store.state.lang+img' @click="linkto(lst,k)"
								alt="">
						</block>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import {
		Home,
		College, //关于学院
		Project, //关于项目
		Doctor, //
		Study //学习之旅
	} from "../../common/data.js"

	import dragButton from "@/components/drag-button/drag-button.vue";
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';

	import container from '../../components/container/index.vue'
	import LsSwiper from '../../components/ls-swiper/index.vue'

	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;

	export default {
		data() {
			return {
				nav: Home.nav,
				navFix: Home.navFix,
				pageis: "",
				list: [],
				tabBars: [],
				contList: [],
				cacheTab: [],
				tabIndex: 0,
				scrollInto: "",
				scrollLeft: 0,
				isClickChange: false,
				showTips: false,
				navigateFlag: false,
				pulling: false,
				showLeft: false, //侧滑菜单
				/*doctor*/
				previousMargin: 30,
				nextMargin: 100,
				height: 400,
				imgRadius: 5,
				base_lsit: [],
				/*doctor end*/
			}
		},
		components: {
			uniDrawer,
			dragButton,
			container,
			LsSwiper,
		},
		onLoad(option) {
			const that = this;
			that.$store.dispatch('getLang');

			let pageis = option.id || "";
			this.pageis = pageis;
			this.getData();

			// let lang = option.lg || "cn";
			// this.setLang(lang)
		},
		onReady() {},
		methods: {
			getData() {
				var _lg = this.$store.state.lang
				switch (this.pageis) {
					case 'college':
						uni.setNavigationBarTitle({
							title: College['title'][_lg]
						})
						this.tabBars = College['tabBars'][_lg];
						this.contList = College['contList'][_lg];
						break;
					case 'project':
						uni.setNavigationBarTitle({
							title: Project['title'][_lg]
						})
						this.tabBars = Project['tabBars'][_lg];
						this.contList = Project['contList'][_lg];
						break;
					case 'study':
						uni.setNavigationBarTitle({
							title: Study['title'][_lg]
						})
						this.tabBars = Study['tabBars'][_lg];
						this.contList = Study['contList'][_lg];
						break;
					case 'doctor':
						uni.setNavigationBarTitle({
							title: Doctor['title'][_lg]
						})
						this.list = Doctor;
						this.tabBars = Doctor['tabBars'][_lg];
						this.contList = Doctor['contList'][_lg];
						this.base_lsit = Doctor['docList'][_lg];
						break;
					default:
						uni.redirectTo({
							url: '/pages/index/index',
						})
						break;
				}
			},
			linkto(obj, index) {
				var that = this;
				if (obj.link) {
					// console.log(obj["link"][index])
					uni.navigateTo({
						url: `${obj["link"][index]}${that.$store.state.lang}`
					})
				}
			},
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
				this.scrollInto = `tb-${this.tabBars[index].id}`;
			},
			loadMore(e) {
				var that = this;
			},
			drawerShow(e) {
				console.log("show", e);
				this.showLeft = true
			},
			drawerHide() {
				console.log("hide");
				this.showLeft = false
			},
			setLang(val) {
				var that = this;
				uni.setStorage({
					key: 'DBA-Lang',
					data: val,
					success: function() {
						let lg = val || "cn";
						that.$store.state.lang = lg;
						that.$store.dispatch('getLang');
						that.getData();
					},
					fail() {
						// that.$store.state.lang = "cn";
					}
				});
			}
		}
	}
</script>

<style scoped>
	@import "/common/tab.css";

	.content {
		display: flex;
		/* flex-direction: column;
		align-items: center;
		justify-content: center; */
		min-height: 100%;
		background: #f1f1f1;
	}

	.pg-main {
		width: 100%;
		position: relative;
		/* padding-top: 50upx; */
	}

	.doctor-main {
		background: url(../../static/cn/doctor/bg.jpg) no-repeat 50% bottom;
		background-size: cover;
	}

	.lang-box {
		top: auto;
		right: auto;
		left: 10%;
		bottom: 30%;
		height: auto;
	}
</style>
