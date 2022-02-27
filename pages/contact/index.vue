<template>
	<view class="content" :style="{'background-image':`url(/static/${$store.state.lang}/contact/bg.png)`}">
		<view class="pg-main">
			<view class="tabs">
				<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
					<view class="uni-tab-item">
						<text
							class="uni-tab-item-title uni-tab-item-title-active title-block">{{list.title[$store.state.lang]}}</text>
					</view>
				</scroll-view>
				<block></block>
			</view>
			<view class="form-box">
				<form class="" @submit="formSubmit" @reset="formReset">
					<view class="form-tip">
						{{list["tip"][$store.state.lang]}}
					</view>
					<view class="form-block uni-list-box">
						<view class="form-row">
							<block v-for="(obj,key) in list['form'][$store.state.lang]" :key="key">
								<view class="uni-list-block">
									<view class="uni-list-left">
										<text v-if="obj.notnull">*</text>{{obj.label}}
									</view>
									<view class="uni-list-right">
										<input class="uni-input u-ipt" :name="obj.name" :type="obj.type" placeholder=""
											value="" />
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
							+86 137 6418 6470
						</view>
						<view class="c-row c-email">
							<a href="mailto:DBA@em-lyon.com.cn" class="mailto">DBA@em-lyon.com.cn</a>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<img src="/static/footer-logos.jpg" class="img-full"/>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		Contact
	} from "../../common/data.js"
	var graceChecker = require("../../common/graceChecker.js");
	export default {
		data() {
			return {
				list: Contact,
				loading: false
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
				title: Contact['title'][_lg]
			})
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
			phoneCall(numb){
				uni.makePhoneCall({
				    phoneNumber: numb
				});
			}
		}
	}
</script>

<style scoped>
	@import "/common/tab.css";
	@import "./contact.css";
</style>
