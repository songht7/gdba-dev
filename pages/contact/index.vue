<template>
	<view :class="['content','lang-'+$store.state.lang]"
		:style="{'background-image':`url(/static/${$store.state.lang}/contact/bg.png)`}">
		<view class="pg-main">
			<view class="tab-box fixed">
				<!-- 头部菜单按钮 -->
				<view class="tab-nav" @click="drawerShow()">
					<img src="/static/menu.png" class="drawer-menu" />
				</view>
				<view class="tabs">
					<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
						<view class="uni-tab-item">
							<text
								class="uni-tab-item-title uni-tab-item-title-active title-block">{{list.title[$store.state.lang]}}</text>
						</view>
					</scroll-view>
					<block></block>
				</view>
			</view>
			<view class="flex-station"></view>
			<view class="form-box">
				<form class="" @submit="formSubmit" @reset="formReset">
					<view class="form-tip">
						{{list["tip"][$store.state.lang]}}
					</view>
					<view class="form-block uni-list-box">
						<view class="form-row">
							<block v-for="(obj,key) in list['form'][$store.state.lang]" :key="key">
								<view class="uni-list-block"
									:class="[obj.type=='textarea'?'alignTop':'','form-'+obj.name]">
									<view class="uni-list-left">
										<text v-if="obj.notnull">*</text>{{obj.label}}
									</view>
									<view class="uni-list-right">
										<block v-if="obj.type=='textarea'">
											<textarea class="uni-input u-ipt u-txtarea" :name="obj.name"
												:type="obj.type" />
										</block>
										<block v-else>
											<input class="uni-input u-ipt" :name="obj.name" :type="obj.type"
												placeholder="" value="" />
										</block>
									</view>
								</view>
							</block>
						</view>

						<button formType="submit" :loading="loading"
							class="submit-btn">{{list["submit"][$store.state.lang]}}</button>
					</view>
				</form>
				<view class="form-block contact-info">
					<view class="c-block c-left">
						<view class="c-init">
							<view class="c-row c-tip">
								{{list["c-tip"][$store.state.lang]}}
							</view>
							<view class="c-row c-name">
								{{list["c-name"][$store.state.lang]}}
							</view>
						</view>
					</view>
					<view class="c-block c-right">
						<view class="c-row c-phone" @click="phoneCall('+86 13764186470')">
							<img src="/static/icon-phone.png" class="icons icon-phone" alt="global dba">
							+86 137 6418 6470
						</view>
						<view class="c-row c-email"><img src="/static/icon-email.png" class="icons icon-email" alt="global dba">
							<a href="mailto:DBA@em-lyon.com.cn" class="mailto">
								DBA@em-lyon.com.cn
							</a>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<img src="/static/footer-logos.jpg" class="img-full" />
			</view>
		</view>

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
					<navigator :class="['drawer-nav-btn','active']" :url='navFix["contact"][$store.state.lang]["link"]'>
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
		Contact
	} from "../../common/data.js"
	var graceChecker = require("../../common/graceChecker.js");
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	export default {
		data() {
			return {
				nav: Home.nav,
				navFix: Home.navFix,
				pageis: "",
				list: Contact,
				loading: false,
				showLeft: false, //侧滑菜单
			}
		},
		components: {
			uniDrawer
		},
		onLoad(option) {
			const that = this;
			let pageis = option.id || "";
			this.pageis = pageis;

			// let lang = option.lg || "cn";
			// this.setLang(lang)
			that.$store.dispatch('getLang');
		},
		onReady() {
			var _lg = this.$store.state.lang
			uni.setNavigationBarTitle({
				title: Contact['title'][_lg]
			})
			if (this.$store.state.isWeixin) {
				//location.origin, //window.location.href, //"http://emlyon.meetji.com",
				var share_url = window.location.href,
					title = "法国里昂商学院",
					dec = "全球工商管理博士项目",
					imgUrl = "http://emlyon.meetji.com/static/logo.png";
				mdl.wxShare(share_url, title, dec, imgUrl);
			}
		},
		methods: {
			formSubmit: function(e) {
				var that = this;
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				let formData = e.detail.value;
				that.loading = true;
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写姓名"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: "请填写正确的手机号"
					},
					{
						name: "email",
						checkType: "email",
						checkRule: "",
						errorMsg: "请填写正确的邮箱"
					},
					{
						name: "company",
						checkType: "notnull",
						checkRule: "",
						errorMsg: "请填写公司"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(formData, rule);
				if (checkRes) {
					formData['name'] = formData['name'] + " * 来自：Global DBA";
					formData['note'] = "公司：" + formData['company'] + "  职位：" + formData['position'] + "  附言：" +
						formData['mark'];
					console.log(formData);
					// return
					let url = "http://api_test.meetji.com/v2/ApiHome-saveSingle.htm"; //预约POST
					//console.log(url_saveSingle);
					uni.request({
						url: url,
						method: "POST",
						data: formData,
						header: {},
						success: function(res) {
							let __res = res.data;
							if (__res.success) {
								uni.showToast({
									title: '提交成功！',
									icon: "success",
									duration: 2000
								});
							} else {
								uni.showToast({
									title: '提交失败',
									icon: "error",
									duration: 2000
								});
							}
						},
						fail: function(err) {
							console.log("======fail========");
							console.log(err);
							uni.showToast({
								title: '接口请求失败',
								icon: "fail",
								duration: 2000
							});
						},
						complete: function(comp) {
							console.log("======complete========");
							console.log(comp)
							this.loading = false
						}
					})

				} else {
					uni.showToast({
						title: graceChecker.error,
						icon: "none"
					});
					this.loading = false
				}

			},
			phoneCall(numb) {
				uni.makePhoneCall({
					phoneNumber: numb
				});
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
	@import "/common/tab.css";
	@import "./contact.css";

	.lang-box {
		top: auto;
		right: auto;
		left: 10%;
		bottom: 30%;
		height: auto;
	}
</style>
