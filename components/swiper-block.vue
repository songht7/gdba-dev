<template name="swiper-block">
	<view class="swiper-block">
		<view class="swiper-box" v-if="swiperList.length">
			<swiper class="swiper" :style="{height:swiperHeight}" :indicator-dots="indicatorDots" :autoplay="autoplay" :circular="circular"
			 :interval="interval" :duration="duration" indicator-color="#979797" indicator-active-color="#FFFFFF">
				<swiper-item class="swiper-item" v-for="(slide,index) in swiperList" :key="index">
					<view class="vli">
						<view class="vli2">
							<block v-if="slide.link=='download'&&!isWeixin">
								<a :href="websiteUrl+'/static/com.zyj.example.apk'" @click="linkTo(slide.link)">
									<image class="slideImg" lazy-load="true" :src="setlink(slide)" mode="aspectFill"></image>
								</a>
							</block>
							<block v-else="">
								<image class="slideImg" @click="linkTo(slide.link)" lazy-load="true" :src="setlink(slide)" mode="aspectFill"></image>
							</block>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="share-tips" v-if="popTips" @click="closePopTips">
			<view class="share-box">
				<view class="s-row">
					点击右上角"<uni-icon size="45" type="more-filled" color="#FCFCFC"></uni-icon>"
					<uni-icon class="undo" size="50" type="undo" color="#FCFCFC"></uni-icon>
				</view>
				<view class="s-row">浏览器打开完成下载</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js';
	import uniIcon from '@/components/uni-icon.vue'
	const mdl = util.module;
	export default {
		name: "swiper-block",
		props: {
			swiperList: {
				type: Array,
				default: []
			},
			swiperHeight: {
				type: String,
				default: "300upx"
			},
			indicatorDots: {
				type: Boolean,
				default: true
			},
			autoplay: {
				type: Boolean,
				default: true
			},
			circular: {
				type: Boolean,
				default: true
			},
			interval: {
				type: Number,
				default: 3000
			},
			duration: {
				type: Number,
				default: 1000
			}
		},
		data() {
			return {
				isWeixin: mdl.isWeixin(),
				popTips: false
			}
		},
		components: {
			uniIcon
		},
		computed: {
			setlink: function(pram) {
				var that = this;
				return function(pram) {
					let link = pram.host && pram.host == 'local' ? pram.original_src : that.sourceUrl + pram.original_src;
					return link
				}
			}
		},
		methods: {
			closePopTips() {
				this.popTips = false
			},
			linkTo(pram) {
				//console.log("sourceUrl:", sourceUrl)
				var that = this;
				if (pram) {
					var _pram = pram.split("-");
					//console.log("_pram：", _pram)
					switch (_pram[0]) {
						case 'download':
							if (mdl.isWeixin()) {
								that.popTips = true;
							}
							// var dl_url = 'http://www.meetji.com/#/static/' + _pram[1];
							// console.log(dl_url)
							// uni.downloadFile({
							// 	url: dl_url,
							// 	success: (res) => {
							// 		if (res.statusCode === 200) {
							// 			console.log('下载成功');
							// 		}
							// 	}
							// });
							break;
						default:
							uni.navigateTo({
								url: '/pages/detail/index?' + pram
							});
							break;
					}
				}
			}
		}
	}
</script>
<style>
	.swiper-box {
		/* margin-bottom: 20upx; */
	}

	.swiper {
		height: 300upx;
	}

	.vli {
		width: 100%;
		height: 100%;
	}

	.vli2 {
		width: 100%;
		margin: 0 auto;
		height: 100%;
	}

	.slideImg {
		width: 100%;
		height: 100%;
		display: inline-block;
	}

	@media screen and (min-device-width: 1025px) {
		.swiper {
			height: 250px;
		}
	}
</style>
