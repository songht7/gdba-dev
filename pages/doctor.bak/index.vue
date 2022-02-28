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
			</view>
			<view>
				<container :titleImg='"/static/"+$store.state.lang+list["titleImg"][$store.state.lang]'>
					<ls-swiper :list="base_lsit" imgKey="imgUrl" imgWidth="98%" :previousMargin="previousMargin"
						:nextMargin="nextMargin" :height="height" :imgRadius="imgRadius" />
				</container>
			</view>
		</view>
		<drag-button :isDock="true" :existTabBar="true" />
	</view>
</template>

<script>
	import {
		Doctor
	} from "../../common/data.js"

	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;


	import api from '../../api/ls-swiper/index.js'
	import container from '../../components/container/index.vue'
	import LsSwiper from '../../components/ls-swiper/index.vue'
	import dragButton from "@/components/drag-button/drag-button.vue";

	export default {
		components: {
			container,
			LsSwiper,
			dragButton
		},
		data() {
			return {
				list: Doctor,
				previousMargin: 30,
				nextMargin: 100,
				height: 450,
				imgRadius: 5,
				base_lsit: [],
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
		onLoad(option) {
			var that = this;
			// this.lang = option.lg ? option.lg : "cn";
			that.$store.dispatch('getLang');
			//this.getBase()
		},
		onReady() {
			var _lg = this.$store.state.lang
			uni.setNavigationBarTitle({
				title: Doctor['title'][_lg]
			})
			this.tabBars = Doctor['tabBars'][_lg];
			this.contList = Doctor['contList'][_lg];
			this.base_lsit = Doctor['docList'][_lg];
		},
		methods: {
			getBase() {
				api.base(100).then(res => {
					this.base_lsit = res
				})
			},
			clickItem(data) {
				console.log(data)
			},
			back() {
				uni.redirectTo({
					url: '/pages/index/index',
				})
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "/common/tab.css";

	.header {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		height: 80rpx;
		padding-left: 20rpx;
		margin-bottom: 30rpx;

		.back {
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>
