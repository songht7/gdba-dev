const Home = {
	'domain': 'https://emlyon.meetji.com',
	'imgUrl': 'https://emlyon.meetji.com/image/',
	"title": {
		"cn": "法国里昂商学院",
		"en": "Global DBA (Asia Track)",
	},
	"navFix": {
		'home': {
			"cn": {
				"btn": "",
				"link": "/pages/index/index?id=home&lg=cn",
				"title": "首页",
				"key": "home"
			},
			"en": {
				"btn": "",
				"link": "/pages/index/index?id=home&lg=en",
				"title": "Home",
				"key": "home"
			}
		},
		'contact': {
			"cn": {
				"btn": "",
				"link": "/pages/contact/index?id=ct&lg=cn",
				"title": "联系我们",
				"key": "ct"
			},
			"en": {
				"btn": "",
				"link": "/pages/contact/index?id=ct&lg=en",
				"title": "Contact Us",
				"key": "ct"
			}
		},
	},
	"nav": {
		"cn": [{
			"btn": "/home/nav-1.png",
			"link": "/pages/tablist/index?id=college&lg=",
			"title": "关于学院",
			"key": "college"
		}, {
			"btn": `/home/nav-2.png`,
			"link": `/pages/tablist/index?id=project&lg=`,
			"title": "关于项目",
			"key": "project"
		}, {
			"btn": `/home/nav-3.png`,
			"link": `/pages/tablist/index?id=doctor&lg=`,
			"title": "同窗学友",
			"key": "doctor"
		}, {
			"btn": `/home/nav-4.png`,
			"link": "/pages/tablist/index?id=study&lg=",
			"title": "学习之旅",
			"key": "study"
		}],
		"en": [{
			"btn": "/home/nav-1.png",
			"link": "/pages/tablist/index?id=college&lg=",
			"title": "School",
			"key": "college"
		}, {
			"btn": `/home/nav-2.png`,
			"link": `/pages/tablist/index?id=project&lg=`,
			"title": "Program",
			"key": "project"
		}, {
			"btn": `/home/nav-3.png`,
			"link": `/pages/tablist/index?id=doctor&lg=`,
			"title": "Students Profile",
			"key": "doctor"
		}, {
			"btn": `/home/nav-4.png`,
			"link": "/pages/tablist/index?id=study&lg=",
			"title": "Study Process",
			"key": "study"
		}],
	}
};
const College = {
	"id": "college",
	"title": {
		"cn": "关于学院",
		"en": "About College",
	},
	"tabBars": {
		"cn": [{
				"id": 1,
				"name": "学校介绍"
			},
			{
				"id": 2,
				"name": "世界排名"
			},
			{
				"id": 3,
				"name": "研究实力"
			}
		],
		"en": [{
				"id": 1,
				"name": "SCHOOL INTRODUCTION"
			},
			{
				"id": 2,
				"name": "RANKING"
			},
			{
				"id": 3,
				"name": "RESEARERCH CENTERS"
			}
		],
	},
	"contList": {
		"cn": [{
				"id": 1,
				"val": ["/college/1-1.jpg", "/college/1-2.jpg", "/college/1-3.jpg"]
			},
			{
				"id": 2,
				"val": ["/college/2-1.jpg", "/college/2-2.jpg", "/college/2-3.jpg"]
			},
			{
				"id": 3,
				"val": ["/college/3-1.jpg", "/college/3-2.jpg"]
			}
		],
		"en": [{
				"id": 1,
				"val": ["/college/1-1.jpg", "/college/1-2.jpg", "/college/1-3.jpg"]
			},
			{
				"id": 2,
				"val": ["/college/2-1.jpg", "/college/2-2.jpg", "/college/2-3.jpg"]
			},
			{
				"id": 3,
				"val": ["/college/3-1.jpg", "/college/3-2.jpg"]
			}
		],
	},
};
const Project = {
	"id": "project",
	"title": {
		"cn": "关于项目",
		"en": "About Project",
	},
	"tabBars": {
		"cn": [{
				"id": 1,
				"name": "Global DBA"
			},
			{
				"id": 2,
				"name": "项目特色"
			},
			{
				"id": 3,
				"name": "学术主任寄语"
			}
		],
		"en": [{
				"id": 1,
				"name": "Global DBA"
			},
			{
				"id": 2,
				"name": "Distinctive Program Features"
			},
			{
				"id": 3,
				"name": "program directors vision"
			}
		],
	},
	"contList": {
		"cn": [{
				"id": 1,
				"val": ["/project/1-1.jpg", "/project/1-2.jpg",'video|/video/project-1.m4v', "/project/1-3.jpg", "/project/1-4.jpg"]
			},
			{
				"id": 2,
				"val": ["/project/2-1.jpg", "/project/2-2.jpg", "/project/2-3.jpg", "/project/2-4.jpg"]
			},
			{
				"id": 3,
				"val": ["/project/3-1.jpg", "/project/3-2.jpg", "/project/3-3.jpg", "/project/3-4.jpg"]
			}
		],
		"en": [{
				"id": 1,
				"val": ["/project/1-1.jpg", "/project/1-2-1.jpg",'video|/video/project-1.m4v', "/project/1-2-2.jpg","/project/1-3.jpg", "/project/1-4.jpg"]
			},
			{
				"id": 2,
				"val": ["/project/2-1.jpg", "/project/2-2.jpg", "/project/2-3.jpg", "/project/2-4.jpg"]
			},
			{
				"id": 3,
				"val": ["/project/3-1.jpg", "/project/3-2.jpg", "/project/3-3.jpg", "/project/3-4.jpg"]
			}
		],
	},
};
const Doctor = {
	"id": "doctor",
	"title": {
		"cn": "同窗学友",
		"en": "Student Friend",
	},
	"titleImg": { //同窗学友
		"cn": "/doctor/tab-title.png",
		"en": "/doctor/tab-title.png",
	},
	"tabBars": {
		"cn": [{
			"id": 1,
			"name": "同窗学友"
		}],
		"en": [{
			"id": 1,
			"name": "STUDENTS PROFILE"
		}],
	},
	"contList": {
		"cn": [{
			"id": 1,
			"val": ["/doctor/1.jpg"]
		}],
		"en": [{
			"id": 1,
			"val": ["/doctor/1.jpg"]
		}],
	},
	"docList": {
		"cn": [{
			id: '9',
			imgUrl: '/doctor/d9.png',
			name: "张振坤"
		}, {
			id: '8',
			imgUrl: '/doctor/d8.png',
			name: "周月容"
		}, {
			id: '7',
			imgUrl: '/doctor/d7.png',
			name: "高毓霖"
		}, {
			id: '6',
			imgUrl: '/doctor/d6.png',
			name: "马磊"
		}, {
			id: '5',
			imgUrl: '/doctor/d5.png',
			name: "黎永强"
		}, {
			id: '4',
			imgUrl: '/doctor/d4.png',
			name: "周平"
		}, {
			id: '3',
			imgUrl: '/doctor/d3.png',
			name: "唐卫民"
		}, {
			id: '2',
			imgUrl: '/doctor/d2.png',
			name: "刘静晶"
		}, {
			id: '10',
			imgUrl: '/doctor/d10.png',
			name: "林云逸"
		}, {
			id: '1',
			imgUrl: '/doctor/d1.png',
			name: "刘志彬"
		}],
		"en": [{
			id: '9',
			imgUrl: '/doctor/d9.png',
			name: "张振坤"
		}, {
			id: '8',
			imgUrl: '/doctor/d8.png',
			name: "周月容"
		}, {
			id: '7',
			imgUrl: '/doctor/d7.png',
			name: "高毓霖"
		}, {
			id: '6',
			imgUrl: '/doctor/d6.png',
			name: "马磊"
		}, {
			id: '5',
			imgUrl: '/doctor/d5.png',
			name: "黎永强"
		}, {
			id: '4',
			imgUrl: '/doctor/d4.png',
			name: "周平"
		}, {
			id: '3',
			imgUrl: '/doctor/d3.png',
			name: "唐卫民"
		}, {
			id: '2',
			imgUrl: '/doctor/d2.png',
			name: "刘静晶"
		}, {
			id: '10',
			imgUrl: '/doctor/d10.png',
			name: "林云逸"
		}, {
			id: '1',
			imgUrl: '/doctor/d1.png',
			name: "刘志彬"
		}],
	}
};

const Study = {
	"id": "study",
	"title": {
		"cn": "学习之旅",
		"en": "Learning journey",
	},
	"tabBars": {
		"cn": [{
				"id": 1,
				"name": "课程设置"
			},
			{
				"id": 2,
				"name": "独家模块"
			},
			{
				"id": 3,
				"name": "师资力量"
			},
			{
				"id": 4,
				"name": "申请指南"
			},
			{
				"id": 5,
				"name": "申请流程"
			}
		],
		"en": [{
				"id": 1,
				"name": "STUDY PROCESS"
			},
			{
				"id": 2,
				"name": "Exclusive Module"
			},
			{
				"id": 3,
				"name": "FACULTY"
			},
			{
				"id": 4,
				"name": "PROGRAM AT A GLANCE"
			},
			{
				"id": 5,
				"name": "HOW TO APPLY"
			}
		],
	},
	"contList": {
		"cn": [{
				"id": 1,
				"imgArray": true,
				"val": ["/study/1-1.jpg", "/study/1-2.jpg", "/study/1-3.jpg", "/study/1-4.jpg"]
			},
			{
				"id": 2,
				"val": ["/study/2-1.jpg", "/study/2-2.jpg", "/study/2-3.jpg", "/study/2-4.jpg",
					"/study/2-5.jpg"
				]
			},
			{
				"id": 3,
				"val": ["/study/3-1.jpg", "/study/3-2.jpg", "/study/3-3.jpg"]
			},
			{
				"id": 4,
				"val": ["/study/4-1.jpg", "/study/4-2.jpg", "/study/4-3.jpg", "/study/4-4.jpg"]
			},
			{
				"id": 5,
				"val": ["/study/5-1.jpg", "/study/5-2.jpg", "/study/5-3.jpg", "/study/5-4.jpg"],
				"link": ['/pages/contact/index?id=ct&lg=']
			}
		],
		"en": [{
				"id": 1,
				"imgArray": true,
				"val": ["/study/1-1.jpg", "/study/1-2.jpg", "/study/1-3.jpg", "/study/1-4.jpg"]
			},
			{
				"id": 2,
				"val": ["/study/2-1.jpg", "/study/2-2.jpg", "/study/2-3.jpg", "/study/2-4.jpg",
					"/study/2-5.jpg"
				]
			},
			{
				"id": 3,
				"val": ["/study/3-1.jpg", "/study/3-2.jpg", "/study/3-3.jpg"]
			},
			{
				"id": 4,
				"val": ["/study/4-1.jpg", "/study/4-2.jpg", "/study/4-3.jpg", "/study/4-4.jpg"]
			},
			{
				"id": 5,
				"val": ["/study/5-1.jpg", "/study/5-2.jpg", "/study/5-3.jpg", "/study/5-4.jpg"],
				"link": ['/pages/contact/index?id=ct&lg=']
			}
		],
	},
};
const Contact = {
	"id": "contact",
	"title": {
		"cn": "联系我们",
		"en": "Contact Us",
	},
	"tip": {
		"cn": "如果您感兴趣，请与我们联系",
		"en": "If you are interested, please contact us",
	},
	"submit": {
		"cn": "提      交",
		"en": "Submit",
	},
	"c-tip": {
		"cn": "招生信息请详询",
		"en": "Contact",
	},
	"c-name": {
		"cn": "喻老师 Helen YU",
		"en": "Helen YU",
	},
	"form": {
		"cn": [{
			"type": "text",
			"label": "姓名",
			"name": "name",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "number",
			"label": "年龄",
			"name": "age",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "number",
			"label": "手机号",
			"name": "phone",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "email",
			"label": "邮箱",
			"name": "email",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "text",
			"label": "公司",
			"name": "company",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "text",
			"label": "职位",
			"name": "position",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "number",
			"label": "工作年限",
			"name": "workyear",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "picker",
			"label": "最高学历",
			"name": "education",
			"notnull": true,
			"err": false,
			"errVal": "",
			"picker": ['硕士', 'MBA/EMBA', '博士']
		}, {
			"type": "text",
			"label": "毕业学校",
			"name": "school",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "textarea",
			"label": "附言",
			"name": "mark",
			"errVal": "",
			"err": false
		}],
		"en": [{
			"type": "text",
			"label": "Name",
			"name": "name",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "number",
			"label": "Age",
			"name": "age",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "phone",
			"label": "Phone Number",
			"name": "phone",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "email",
			"label": "Email",
			"name": "email",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "text",
			"label": "Company",
			"name": "company",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "text",
			"label": "Position",
			"name": "position",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "number",
			"label": "Years of Working Experience",
			"name": "workyear",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "picker",
			"label": "Highest Degree",
			"name": "education",
			"notnull": true,
			"err": false,
			"errVal": "",
			"picker": ['Master', 'MBA/EMBA', 'phD']
		}, {
			"type": "text",
			"label": "Graduated Institutions",
			"name": "school",
			"err": false,
			"errVal": "",
			"notnull": true
		}, {
			"type": "textarea",
			"label": "Additional Comments",
			"name": "mark",
			"errVal": "",
			"err": false
		}],
	}
};


module.exports = {
	Home, //首页
	College, //关于学院
	Project, //关于项目
	Doctor, //同窗学友
	Study, //学习之旅
	Contact //联系我们
};

// export default {
// 	Data
// }
