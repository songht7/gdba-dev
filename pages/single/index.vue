<template>
	<view :class="['content','lang-'+lang]">

		<view class="pg-main">
			<view class="page-block page-contact">
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
							class="submit-btn">{{ContactList["submit"][lang]}}</button>
					</view>
				</form>
			</view>
			<view class="page-block">
				<swiper :current="tabIndex" class="swiper-box" duration="300" @change="ontabchange">
					<swiper-item v-for="(lst,index1) in DoctorList" :key="index1">
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
										<image class="tab-dtl-img" :src='imgUrl+lang+img' mode="widthFix"></image>
										<!-- <img class="tab-dtl-img" :src='"/static/"+lang+img' @click="linkto(lst,k)" alt=""> -->
									</block>
								</block>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
			<view class="page-block page-doctor">
				<!-- 同窗学友页（同窗寄语） -->
				<view>
					<container :titleImg='imgUrl+lang+Doctor["titleImg"][lang]'>
						<ls-swiper :list="base_lsit" :imgUrl="imgUrl" imgKey="imgUrl" imgWidth="98%"
							:previousMargin="previousMargin" :nextMargin="nextMargin" :height="height"
							:imgRadius="imgRadius" />
					</container>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		Home,
		College, //关于学院
		Project, //关于项目
		Doctor, //
		Study, //学习之旅
		Contact //联系 留资
	} from "../../common/data-single.js"

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

			this.getData();
		},
		onReady() {
			this.lang = 'cn';
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
				var _lg = this.lang;
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
							title: Home['title'][_lg]
						})
						this.Doctor = Doctor;
						this.tabBars = Doctor['tabBars'][_lg];
						this.DoctorList = Doctor['contList'][_lg];
						this.base_lsit = Doctor['docList'][_lg];
						break;
					default:
						uni.redirectTo({
							url: '/pages/index/index',
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
					_formData['years'] = _formData['workyear'] || '';
					_formData['highest_education'] = _formData['education'] || '';
					_formData['note'] = _formData['mark'] || '';

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
