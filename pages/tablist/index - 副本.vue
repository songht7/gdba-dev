<template>
	<view class="content">
		<view class="pg-main" :class="[pageis=='doctor'?'doctor-main':'']">
			<view class="tab-box">
				<!-- 头部菜单按钮 -->
				<view class="tab-nav" @click="drawerShow()">
					<img src="/static/menu.png" class="drawer-menu" />
				</view>
				<!-- 可拖地顶部选项卡 -->
				<view class="tabs">
					<scroll-view id="tab-bar" style="width: 98%;" class="scroll-h" :scroll-x="true"
						:show-scrollbar="false" :scroll-into-view="scrollInto">
						<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="tab.id"
							:data-current="index" @click="ontabtap">
							<text class="uni-tab-item-title title-block"
								:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
						</view>
					</scroll-view>
					<!-- <view class="line-h"></view> -->
					<!-- <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
					<swiper-item class="swiper-item" v-for="(tab,index1) in contList" :key="index1">
						<img class="tab-dtl-img" :src='"/static/"+$store.state.lang+tab.val' alt="">
					</swiper-item>
				</swiper> -->
				</view>
			</view>
			<!-- 页面列表内容（图） -->
			<block v-for="(lst,index1) in contList" :key="index1">
				<view class="tab-img-list" v-show="tabIndex===index1">
					<block v-if="lst['val'].length" v-for="(img,k) in lst.val" :key="k">
						<img class="tab-dtl-img" :src='"/static/"+$store.state.lang+img' @click="linkto(lst,k)" alt="">
					</block>
				</view>
			</block>

			<!-- 同窗学友页（同窗寄语） -->
			<block v-if="pageis=='doctor'">
				<view>
					<container :titleImg='"/static/"+$store.state.lang+list["titleImg"][$store.state.lang]'>
						<ls-swiper :list="base_lsit" imgKey="imgUrl" imgWidth="98%" :previousMargin="previousMargin"
							:nextMargin="nextMargin" :height="height" :imgRadius="imgRadius" />
					</container>
				</view>
			</block>

		</view>

		<!-- 浮动按钮 (联系我们) -->
		<drag-button :isDock="true" :existTabBar="true" />
		<!-- 侧滑菜单 -->
		<uni-drawer :visible="showLeft" mode="left" @close="drawerHide('left')">
			<view class="drawer-nav">
				<view class="d-nav-list">
					<view class="tab-nav" @click="drawerHide()">
						<img src="/static/menu.png" class="drawer-menu" />
					</view>
					<navigator class="drawer-nav-btn" :url='navFix["home"][$store.state.lang]["link"]'>
						{{navFix["home"][$store.state.lang]["title"]}}
					</navigator>
					<block v-for="(obj,key) in nav[$store.state.lang]" :key="key">
						<navigator :class="['drawer-nav-btn',obj.key==pageis?'active':'']"
							:url="obj.link+$store.state.lang">
							{{obj.title}}
						</navigator>
					</block>
					<navigator class="drawer-nav-btn" :url='navFix["contact"][$store.state.lang]["link"]'>
						{{navFix["contact"][$store.state.lang]["title"]}}
					</navigator>

					<view v-if="$lgChane" class="lang-box">
						<view v-if="$store.state.lang=='en'" class="lg-btn" @click="setLang('cn')">
							中文
						</view>
						<view v-if="$store.state.lang=='cn'" class="lg-btn" @click="setLang('en')">
							EN
						</view>
					</view>
				</view>
			</view>
		</uni-drawer>
		<!-- 侧滑菜单/ -->

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
				// this.scrollInto = this.tabBars[index].id;
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
