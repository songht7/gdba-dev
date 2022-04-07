<template>
	<view class="content" :style="{'background-image':'url('+imgUrl+lang+'/home/1.jpg)'}">
		<view class="pg-main">
			<!-- <img lazy-load="true" class="logo-type" src='/static/logo-type.png' /> -->
			<!-- <img lazy-load="true" class="logo" src='/static/logo.png' /> -->
			<image lazy-load="true" class="logo-type" src="/static/logo-type.png" mode="widthFix"></image>
			<image lazy-load="true" class="logo" src="/static/logo.png" mode="aspectFill"></image>
			<view class="lang-box">
				<view v-if="lang=='en'" class="lg-btn" @click="setLang('cn')">
					中文
				</view>
				<!-- <view class="lg-cut">
					/
				</view> -->
				<view v-if="lang=='cn'" class="lg-btn" @click="setLang('en')">
					EN
				</view>
			</view>
			<view class="nav-box">
				<block v-for="(obj,key) in list['nav'][lang]" :key="key">
					<navigator class="nav-btn" :url="obj.link+lang">
						<image lazy-load="true" class="nav-btn-img" :src='imgUrl+lang+obj.btn' mode="widthFix"
							:alt='obj.title'></image>
					</navigator>
				</block>
			</view>
			<!-- <img :src='list["pageBg"][$store.state.lang]["bg"]' class="pg-img" alt=""> -->

			<drag-button :isDock="true" :existTabBar="true" />
		</view>
	</view>
</template>

<script>
	import util from '../../common/util.js';
	const mdl = util.module;
	const inter = util.Interface;
	const apiurl = inter.apiurl;

	import {
		Home
	} from "../../common/data.js"

	import dragButton from "@/components/drag-button/drag-button.vue";
	export default {
		data() {
			return {
				list: Home,
				imgUrl:Home.imgUrl,
				lang: this.$store.state.lang
			}
		},
		components: {
			dragButton
		},
		onLoad(option) {
			const that = this;
			// let lang = option.lg || "cn";
			// this.setLang(lang)
			that.$store.dispatch('getLang');
		},
		onReady() {
			// console.log("isWeixin：", this.$store.state.isWeixin)

			var lang = this.$store.state.lang;
			this.lang = lang;
			//console.log("lang lang：", lang, this.lang)
			//#ifdef H5
			mdl.wxShare({
				lang
			});
			//#endif
		},
		methods: {
			getApp(type) {
				console.log(type)
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
						that.lang = lg;
						uni.setNavigationBarTitle({
							title: that.list['title'][that.$store.state.lang]
						})
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
	/*每个页面公共css */
	page,
	body {
		min-height: 100%;
		height: inherit;
	}

	.content {
		height: 100%;
		/* background: url(../../static/cn/home/1.jpg) no-repeat 50% bottom; */
		background-repeat: no-repeat;
		background-position: 50% top;
		background-size: cover;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.pg-main {
		height: 100%;
		width: 100%;
		position: relative;
	}

	.logo-type,
	.logo {
		position: absolute;
		top: 0;
		right: 0;
		width: 150upx;
		height: 150upx;
	}

	.logo-type {
		top: 2%;
		right: auto;
		left: 3%;
	}

	.nav-box {
		width: 500upx;
		position: absolute;
		top: 45%;
		left: 8%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		align-content: center;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.nav-btn {
		width: 45%;
		height: calc(width * 1);
		margin: 0 10upx;
	}

	.nav-btn:nth-child(3),
	.nav-btn:nth-child(4) {
		top: -12px;
		position: relative;
	}

	.nav-btn-img {
		display: inline-block;
		width: 100%;

	}

	.pg-img {
		width: 100%;
		display: block;
	}
</style>
