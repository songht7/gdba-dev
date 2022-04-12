<template>
	<view :class="['content','lang-'+lang]" :style="{'background-image':`url(${imgUrl}${lang}/contact/bg.png)`}">
		<view class="pg-main">
			<view class="tab-box fixed">
				<!-- 头部菜单按钮 -->
				<view class="tab-nav" @click="drawerShow()">
					<image src="/static/menu.png" class="drawer-menu" mode="widthFix"></image>
				</view>
				<view class="tabs">
					<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
						<view class="uni-tab-item">
							<text
								class="uni-tab-item-title uni-tab-item-title-active title-block">{{list.title[lang]}}</text>
						</view>
					</scroll-view>
					<block></block>
				</view>
			</view>
			<view class="flex-station"></view>
			<view class="form-box">
				<view class="form-tip">
					{{list["tip"][lang]}}
				</view>

				<!-- <view class="" style="height: 1000upx;padding-top: 50upx;position: relative;">
					<web-view src="http://emlyon.meetji.com/contact/contact.html"></web-view>
				</view> -->
				<!-- <rich-text :nodes="nodes"></rich-text> -->
				<form class="" @submit="formSubmit" @reset="formReset">
					<view class="form-block uni-list-box">
						<view class="form-row row-full">
							<block v-for="(obj,key) in list['form'][lang]" :key="key">
								<view class="uni-list-block"
									:class="[obj.type=='textarea'?'alignTop':'','form-'+obj.name,obj.err?'row-err':'']">
									<view class="uni-list-warp uni-list-left">
										<text v-if="obj.notnull">*</text>{{obj.label}}
									</view>
									<view class="uni-list-warp uni-list-right">
										<block v-if="obj.type=='textarea'">
											<textarea class="uni-input u-ipt u-txtarea" :name="obj.name"
												:type="obj.type" />
										</block>
										<block v-else-if="obj.type=='picker'&&obj.name=='age'">
											<picker class="ey-picker uni-input u-ipt" mode="date" :value="date"
												:start="startDate" :end="endDate" @change="bindDateChange"
												:data-name="obj.name" :data-val="obj">
												<view class="uni-input">{{date}}</view>
											</picker>
										</block>
										<block v-else-if="obj.type=='picker'&&obj.name=='education'">
											<picker class="ey-picker uni-input u-ipt" @change="bindPickerChange"
												:value="eduIndex" :range="obj['picker']" :data-name="obj.name"
												:data-val="obj">
												<view class="uni-input">{{obj['picker'][eduIndex]}}</view>
											</picker>
										</block>
										<block v-else>
											<input class="uni-input u-ipt" :name="obj.name" :type="obj.type" value=""
												@focus="clearErr(obj.name)" />
										</block>
									</view>
									<block v-if="obj.errVal">
										<view class="errVal">
											<uni-icons type="info" color="#d73743" rotate="0" size="16"></uni-icons>
											{{obj.errVal}}
										</view>
									</block>
								</view>
							</block>
						</view>

						<button formType="submit" :loading="loading"
							class="submit-btn">{{list["submit"][lang]}}</button>
					</view>
				</form>
				<view class="form-block contact-info">
					<view class="c-block c-left">
						<view class="c-init">
							<view class="c-row c-tip">
								{{list["c-tip"][lang]}}
							</view>
							<view class="c-row c-name">
								{{list["c-name"][lang]}}
							</view>
						</view>
					</view>
					<view class="c-block c-right">
						<view class="c-row c-phone" @click="phoneCall('+86 13764186470')">
							<image src="/static/icon-phone.png" class="icons icon-phone" alt="global dba" mode="widthFix"></image>
							+86 137 6418 6470
						</view>
						<view class="c-row c-email">
							<image src="/static/icon-email.png" class="icons icon-email" alt="global dba" mode="widthFix"></image>
							<a href="mailto:DBA@em-lyon.com.cn" class="mailto">
								DBA@em-lyon.com.cn
							</a>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<image src="/static/footer-logos.jpg" class="img-full" mode="widthFix"></image>
			</view>
		</view>

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
		Contact
	} from "../../common/data.js"
	var graceChecker = require("../../common/graceChecker.js");
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue';
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				imgUrl:Home.imgUrl,
				channel: "", //账户自建 "CHANNEL 渠道" 值，需匹配，用户预约列表对应账号
				lang: this.$store.state.lang,
				nav: Home.nav,
				navFix: Home.navFix,
				pageis: "",
				list: Contact,
				loading: false,
				showLeft: false, //侧滑菜单
				Education: "",
				eduIndex: -1,
				date: "",
				formData: {}
			}
		},
		components: {
			uniDrawer
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

			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(option) {
			const that = this;
			let pageis = option.id || "";
			this.pageis = pageis;
			let channel = option.cl || "yimei"; //xxx.com?cl=test, 账号：emlyon，测试channel：emlyon，test，正式channel：elyGdba，yimei
			this.channel = channel;

			// let lang = option.lg || "cn";
			// this.setLang(lang)
			that.$store.dispatch('getLang');
		},
		onReady() {
			var _lg = this.$store.state.lang
			this.lang = _lg;
			uni.setNavigationBarTitle({
				title: Contact['title'][_lg]
			})
			this.lang = _lg;
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
			formSubmit: function(e) {
				var that = this;
				var _lg = that.$store.state.lang
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var _formData = e.detail.value;
				_formData = {
					..._formData,
					...that.formData
				}
				that.loading = true;
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "", //"Can`t be empty"，"Please fill out the required fields"
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Can`t be empty"
					}, {
						name: "age",
						checkType: "notnull",
						checkRule: "",
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Can`t be empty"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: _lg == "cn" ? "请填写正确的手机号" : "Please fill in the correct phone number"
					},
					{
						name: "email",
						checkType: "email",
						checkRule: "",
						errorMsg: _lg == "cn" ? "请填写正确的邮箱" : "Please fill in the correct email address"
					},
					{
						name: "company",
						checkType: "notnull",
						checkRule: "",
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Please fill out the required fields"
					},
					{
						name: "position",
						checkType: "notnull",
						checkRule: "",
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Please fill out the required fields"
					},
					{
						name: "workyear",
						checkType: "notnull",
						checkRule: "",
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Please fill out the required fields"
					},
					{
						name: "education",
						checkType: "notnull",
						checkRule: _lg == "cn" ? "请选择" : "Please select",
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Please fill out the required fields"
					},
					{
						name: "school",
						checkType: "notnull",
						checkRule: "",
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Please fill out the required fields"
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					// _formData['name']
					// _formData['position']
					// _formData['company']
					// _formData['school']
					// _formData['phone']
					// _formData['age']=...
					// _formData['email']
					// _formData['note']
					_formData['years'] = _formData['workyear']
					_formData['highest_education'] = _formData['education']
					_formData['note'] = _formData['mark']


					// var _age = _formData['age'];
					// _formData['code'] = "emlyon";
					// //_formData['name'] = _formData['name']; // + " （来自：emlyon）"
					// _formData['age'] = ""; // 年龄字段字数限制
					// _formData['note'] = "姓名：" + _formData['name'] + "  年龄：" + _age +
					// 	"  手机号：" + _formData['phone'] + "  邮箱：" + _formData['email'] +
					// 	"  公司：" + _formData['company'] + "  职位：" + _formData['position'] +
					// 	"  工作年限：" + _formData['workyear'] + "  最高学历：" + _formData['education'] +
					// 	"  毕业学校：" + _formData['school'] +
					// 	"  附言：" + _formData['mark'];
					// // _formData['note'] = _formData['mark'];

					console.log("_formData：", _formData)
					// return
					let url = "https://api.meetji.com/v4/ApiHome-saveSingle.htm"; //预约POST
					uni.request({
						url: url,
						method: "POST",
						data: _formData,
						header: {
							'channel': that.channel
						},
						success: function(res) {
							console.log("======success========");
							// console.log(url);
							console.log(res)
							let _data = res.data;
							if (res.errMsg == 'request:ok') {
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
							that.loading = false
						}
					})

				} else {
					console.log(graceChecker.typeName, graceChecker.error);
					this.list['form'][this.$store.state.lang].map((obj, key) => {
						if (obj.name == graceChecker.typeName) {
							obj['err'] = true;
							obj['errVal'] = graceChecker.error;
						}
					});
					// uni.showToast({
					// 	title: graceChecker.error,
					// 	icon: "none"
					// });
					this.loading = false
				}

			},
			bindPickerChange: function(e) {
				// console.log('picker发送选择改变，携带值为', e)
				// this.Education=val
				var that = this;
				var val = e.currentTarget.dataset.val,
					name = e.currentTarget.dataset.name,
					index = e.target.value;
				this.eduIndex = index;
				// console.log('val：', val)
				// console.log('name：', name)
				// console.log('picker：', val["picker"][index])
				this.clearErr(name);
				switch (name) {
					case "education":
						that.formData = {
							...that.formData,
							"education": val["picker"][index]
						}
						break;
					default:
						break;
				}
			},
			clearErr(name) {
				var that = this;
				// that.$nextTick(function() {})
				that.list['form'][that.$store.state.lang].map((obj, key) => {
					if (obj.name == name) {
						// console.log("clearErr:", obj.name, name)
						obj['err'] = false;
						obj['errVal'] = "";
					}
				});
			},
			bindDateChange: function(e) {
				var that = this;
				// console.log(e)
				var val = e.target.dataset.val,
					name = e.target.dataset.name,
					value = e.target.value;
				this.date = value;
				this.clearErr(name);
				switch (name) {
					case "age":
						that.formData = {
							...that.formData,
							"age": value
						}
						break;
					default:
						break;
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 90;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			phoneCall(numb) {
				uni.makePhoneCall({
					phoneNumber: numb
				});
			},
			drawerShow(e) {
				// console.log("show", e);
				this.showLeft = true
			},
			drawerHide() {
				// console.log("hide");
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
