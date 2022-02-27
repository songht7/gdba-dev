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
				<!-- <view class="line-h"></view> -->
				<block v-for="(lst,index1) in contList" :key="index1">
					<view class="tab-img-list" v-show="tabIndex===index1">
						<block v-if="lst['val'].length" v-for="(img,k) in lst.val" :key="k">
							<img class="tab-dtl-img" :src='"/static/"+$store.state.lang+img' alt="">
						</block>
					</view>
				</block>
				<!-- <swiper :current="tabIndex" class="swiper-box" style="flex: 1;" :duration="300" @change="ontabchange">
					<swiper-item class="swiper-item" v-for="(tab,index1) in contList" :key="index1">
						<img class="tab-dtl-img" :src='"/static/"+$store.state.lang+tab.val' alt="">
					</swiper-item>
				</swiper> -->
			</view>
		</view>
		<drag-button :isDock="true" :existTabBar="true" />
	</view>
</template>

<script>
	import {
		College, //关于学院
		Project, //关于项目
		Study //学习之旅
	} from "../../common/data.js"

	import dragButton from "@/components/drag-button/drag-button.vue";

	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;

	export default {
		data() {
			return {
				list: [],
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
		components: {
			dragButton
		},
		onLoad(option) {
			const that = this;
			that.$store.dispatch('getLang');

			let pageis = option.id || "";

			var _lg = this.$store.state.lang
			switch (pageis) {
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
				default:
					uni.redirectTo({
						url: '/pages/index/index',
					})
					break;
			}
			// let lang = option.lg || "cn";
			// this.setLang(lang)
		},
		onReady() {},
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
