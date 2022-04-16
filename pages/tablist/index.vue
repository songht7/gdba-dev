<template>
	<view :class="['content','lang-'+lang]">
		<view class="pg-main" :class="[pageis=='doctor'?'doctor-main':'']">
			<view :class="[pageis!='doctor'?'uni-tab-bar':'']">
				<view :class="['tab-box',pageis=='doctor'?'fixed':'']">
					<!-- 头部菜单按钮 -->
					<view class="tab-nav" @click="drawerShow()">
						<image src="/static/menu.png" class="drawer-menu" mode="widthFix"></image>
					</view>
					<scroll-view id="tab-bar" style="width: 90%;" class="uni-swiper-tab" :scroll-x="true"
						:show-scrollbar="false" :scroll-into-view="scrollInto">
						<view v-for="(tab,index) in tabBars" :key="tab.id" class="uni-tab-item" :id="`tb-${tab.id}`"
							:data-current="index" @click="ontabtap">
							<text class="uni-tab-item-title title-block"
								:class="tabIndex==index ? 'uni-tab-item-title-active' : ''">{{tab.name}}</text>
						</view>
					</scroll-view>
				</view>
				<block v-if="pageis=='doctor'">
					<view class="flex-station"></view>
				</block>
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="ontabchange">
					<swiper-item v-for="(lst,index1) in contList" :key="index1">
						<scroll-view class="list" scroll-y @scrolltolower="loadMore(index1)">
							<view class="tab-img-list">
								<block v-if="lst['val'].length" v-for="(img,k) in lst.val" :key="k">
									<block v-if="img.split('|').length>1&&img.split('|')[0]=='video'">
										<view class="video-box">
											<video class="myVideo" :src="domain+img.split('|')[1]" :autoplay='autoplay'
												:show-mute-btn='muteBtn' :loop='loop' controls></video>
										</view>
									</block>
									<block v-else>
										<image class="tab-dtl-img" :src='imgUrl+lang+img' @click="linkto(lst,k)"
											mode="widthFix"></image>
										<!-- <img class="tab-dtl-img" :src='"/static/"+lang+img' @click="linkto(lst,k)" alt=""> -->
									</block>
								</block>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>

			</view>
			<!-- 同窗学友页（同窗寄语） -->
			<block v-if="pageis=='doctor'">
				<view>
					<container :titleImg='imgUrl+lang+list["titleImg"][lang]'>
						<ls-swiper :list="base_lsit" :imgUrl="imgUrl" imgKey="imgUrl" imgWidth="98%"
							:previousMargin="previousMargin" :nextMargin="nextMargin" :height="height"
							:imgRadius="imgRadius" />
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
						<image src="/static/menu.png" class="drawer-menu" mode="widthFix"></image>
					</view>
					<navigator class="drawer-nav-btn" :url="getLT(navFix,'link','home')">
						{{getLT(navFix,'title','home')}}
					</navigator>
					<block v-for="(obj,key) in nav[lang]" :key="key">
						<navigator :class="['drawer-nav-btn',obj.key==pageis?'active':'']" :url="obj.link+lang">
							{{obj.title}}
						</navigator>
					</block>
					<navigator class="drawer-nav-btn" :url="getLT(navFix,'link','contact')">
						{{getLT(navFix,'title','contact')}}
					</navigator>

					<view class="lang-box">
						<view v-if="lang=='en'" class="lg-btn" @click="setLang('cn')">
							中文
						</view>
						<view v-if="lang=='cn'" class="lg-btn" @click="setLang('en')">
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
				domain: Home.domain,
				imgUrl: Home.imgUrl,
				navFix: Home.navFix,
				lang: this.$store.state.lang,
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
				height: this.$store.state.lang == 'en' ? 430 : 400,
				imgRadius: 5,
				base_lsit: [],
				autoplay: true,
				loop: true,
				muteBtn: true
				/*doctor end*/
			}
		},
		components: {
			uniDrawer,
			dragButton,
			container,
			LsSwiper,
		},
		computed: {
			getLT() {
				var that = this;
				return function(navFix, type, page) {
					var dt = '';
					var lg = that.$store.state.lang;
					switch (type) {
						case 'link':
							dt = navFix[page][lg]["link"];
							break;
						case 'title':
							dt = navFix[page][lg]["title"];
							break;
						default:
							break;
					}
					return dt;
				}

			}
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
		onReady() {
			var lang = this.$store.state.lang;
			this.lang = lang;
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
						that.lang = lg;
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
		background: url(http://emlyon.meetji.com/image/cn/doctor/bg.jpg) no-repeat 50% bottom;
		background-size: cover;
	}

	.lang-box {
		top: auto;
		right: auto;
		left: 10%;
		bottom: 30%;
		height: auto;
	}

	.video-box {
		width: 100%;
		padding: 20upx 0;
		background: url(../../static/bg.jpg) repeat-y 50% 50%;
		background-size: contain;
	}

	.myVideo {
		width: 80%;
		margin: 0 10%;
	}
</style>
