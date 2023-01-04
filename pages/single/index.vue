<template>
	<view :class="['content','lang-'+lang]">

		<view class="single pg-main">
			<view class="page-block page-bgs">
				<block v-for="index of pageBgLength" :key="index">

					<view v-if="[1].indexOf(index)>-1" class="page-home">
						<image lazy-load="true" class="logo-type" src="/static/logo-type.png" mode="widthFix">
						</image>
						<image lazy-load="true" class="logo" src="/static/logo.png" mode="aspectFill"></image>

						<image class="tab-dtl-img" :src='`/static/single/images/s_${index}.jpg`' mode="widthFix">
						</image>
					</view>
					<view v-if="[1,2,5,9,12].indexOf(index)==-1" :class="['page-bg','page-img']">
						<image class="tab-dtl-img" :src='`/static/single/images/s_${index}.jpg`' mode="widthFix">
						</image>
					</view>
					<view v-else :class="['page-bg']">
						<view v-if="[2,12].indexOf(index)>-1"
							:class="['block-init','page-contact','page-contact-'+index]">
							<form class="" @submit="formSubmit" @reset="formReset">
								<view class="form-block uni-list-box">
									<image v-if="index==12" class="tab-dtl-img" src='/static/single/images/ct.png'
										mode="widthFix"></image>
									<view class="form-row row-full">
										<block v-for="(obj,key) in ContactList['form'][lang]" :key="key">
											<view class="uni-list-block"
												:class="[obj.type=='textarea'?'alignTop':'','form-'+obj.name,obj.err?'row-err':'']">
												<view class="uni-list-warp uni-list-left">
													<text v-if="obj.notnull">*</text>{{obj.label}}
												</view>
												<view class="uni-list-warp uni-list-right">
													<block>
														<input class="uni-input u-ipt" :name="obj.name" :type="obj.type"
															value="" v-model="formData[obj.name]"
															@focus="clearErr(obj.name)" />
													</block>
												</view>
												<block v-if="obj.errVal">
													<view class="errVal">
														<uni-icons type="info" color="#d73743" rotate="0" size="16">
														</uni-icons>
														{{obj.errVal}}
													</view>
												</block>
											</view>
										</block>
									</view>

									<button formType="submit" :loading="loading" class="submit-btn">免费领取课程资料</button>
								</view>
							</form>
						</view>

						<view v-if="[5].indexOf(index)>-1" class="views video-box">
							<video class="myVideo" src="https://emlyon.meetji.com/video/project-1.m4v"
								:autoplay='autoplay' :show-mute-btn='true' :loop='true' controls></video>
						</view>

						<!-- 同窗学友页（同窗寄语） -->
						<view v-if="[9].indexOf(index)>-1" class="page-doctor">
							<ls-swiper :list="base_lsit" :imgUrl="imgUrl" imgKey="imgUrl" imgWidth="98%"
								:previousMargin="previousMargin" :nextMargin="nextMargin" :height="height"
								:imgRadius="imgRadius" />
						</view>
					</view>
				</block>
			</view>

			<!-- <view class="page-block page-contact">
				<view class="block-init">
					<form class="" @submit="formSubmit" @reset="formReset">
						<view class="form-block uni-list-box">
							<view class="form-row row-full">
								<block v-for="(obj,key) in ContactList['form'][lang]" :key="key">
									<view class="uni-list-block"
										:class="[obj.type=='textarea'?'alignTop':'','form-'+obj.name,obj.err?'row-err':'']">
										<view class="uni-list-warp uni-list-left">
											<text v-if="obj.notnull">*</text>{{obj.label}}
										</view>
										<view class="uni-list-warp uni-list-right">
											<block>
												<input class="uni-input u-ipt" :name="obj.name" :type="obj.typve"
													v-model="formData[obj.name]" @focus="clearErr(obj.name)" />
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
								class="submit-btn">{{ContactList["submit"][lang]}}</button>
						</view>
					</form>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	import {
		Home,
		Doctor, //
		Contact //联系 留资
	} from "../../common/data-single.js"

	import util from '../../common/util.js';
	const mdl = util.module;
	import container from '../../components/container/index.vue'
	import LsSwiper from '../../components/ls-swiper/index.vue'
	var graceChecker = require("../../common/graceChecker.js");

	// 缓存每页最多
	const MAX_CACHE_DATA = 100;
	// 缓存页签数量
	const MAX_CACHE_PAGE = 3;

	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				nav: Home.nav,
				domain: Home.domain,
				imgUrl: Home.imgUrl,
				navFix: Home.navFix,
				loading: false,
				lang: 'cn',
				pageis: "",
				list: [],
				Doctor: [],
				DoctorList: [],
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
				autoplay: true,
				loop: true,
				muteBtn: true,
				/*doctor end*/

				pageBgLength: 13, //页面背景图片个数

				/*Contact*/
				ContactList: Contact,
				channel: "", //账户自建 "CHANNEL 渠道" 值，需匹配，用户预约列表对应账号
				Education: "",
				eduIndex: -1,
				date: "",
				formData: {},
			}
		},
		components: {
			container,
			LsSwiper,
		},
		computed: {},
		onLoad(option) {
			const that = this;
			let pageis = option.id || "doctor";
			this.pageis = pageis;
			let channel = option.cl || "yimei"; //xxx.com?cl=test, 账号：emlyon，测试channel：emlyon，test，正式channel：elyGdba，yimei
			this.channel = channel;

			this.getData('doctor');
		},
		onReady() {
			this.lang = 'cn';
			this.ContactList['form'][this.lang].map((obj, key) => {
				this.$set(this.formData, obj.name, '')
			});
			//#ifdef H5
			if (this.$store.state.isWeixin) {
				//location.origin, //window.location.href, //"http://emlyon.meetji.com",
				var share_url = 'https://emlyon.meetji.com/#/pages/single/index',//window.location.href,
					title = "法国里昂商学院亚洲校区GDBA项目招生简章",
					dec = "全球工商管理博士2023级",
					imgUrl = "http://emlyon.meetji.com/static/logo.png";
				mdl.wxShare(share_url, title, dec, imgUrl);
			}
			//#endif
		},
		methods: {
			getData(type) {
				var _lg = this.lang;
				switch (type) {
					case 'doctor':
						uni.setNavigationBarTitle({
							title: Home['title'][_lg]
						})
						this.Doctor = Doctor;
						this.tabBars = Doctor['tabBars'][_lg];
						this.base_lsit = Doctor['docList'][_lg];
						break;
					default:
						uni.redirectTo({
							url: '/pages/single/index',
						})
						break;
				}
			},
			formSubmit: function(e) {
				var that = this;
				var _lg = that.lang
				if (that.loading == true) {
					return
				}
				//console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var _formData = that.formData; //e.detail.value;
				that.loading = true;
				var rule = [{
						name: "name",
						checkType: "notnull",
						checkRule: "", //"Can`t be empty"，"Please fill out the required fields"
						errorMsg: _lg == "cn" ? "必填项不能为空" : "Can`t be empty"
					},
					{
						name: "phone",
						checkType: "phoneno",
						checkRule: "",
						errorMsg: _lg == "cn" ? "请填写正确的手机号" : "Please fill in the correct phone number"
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
					}
				];
				//进行表单检查
				var checkRes = graceChecker.check(_formData, rule);
				if (checkRes) {
					// _formData['years'] = _formData['workyear'] || '';
					// _formData['highest_education'] = _formData['education'] || '';
					// _formData['note'] = _formData['mark'] || '';

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
					this.ContactList['form'][this.lang].map((obj, key) => {
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
				that.ContactList['form'][that.lang].map((obj, key) => {
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
		}
	}
</script>

<style scoped>
	@import "/common/tab.css";
	@import "./contact.css";
	@import "./single.css";

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
