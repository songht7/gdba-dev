<div class="cont-box">
	<div class="cont-block"><a class="cont-btn phone-btn" href="tel:13797252451"><img
				src="http://www.aglbaby.com/wp-content/uploads/2022/03/icon-phone.png" class="icon icon-phone">一键通话</a>
	</div>
	<div class="cont-block"><a class="cont-btn mailto" href="mailto:anxin@qq.com"><img
				src="http://www.aglbaby.com/wp-content/uploads/2022/03/icon-email.png" class="icon icon-phone">邮箱</a>
	</div>
	<div class="cont-block"><a id="WeiXin" class="cont-btn weixin" data-clipboard-text="13797252451"
			href="javascript:;"><img src="http://www.aglbaby.com/wp-content/uploads/2022/03/icon-wx.png"
				class="icon icon-phone">微信</a></div>
</div>
<div id="WeiXinBox">
	<div class="wx-row">
		<p class="wx-block">微信号：<text>13797252451</text></p>
	</div>
	<div class="wx-row">
		<p>我们将提供专业一对一咨询服务</p>
	</div>
</div>
<div id="dialog" title="已复制微信号">
	<div style="font-size: 1.2rem;line-height: 1.4;padding:10px 0 0">
		<p>微信号：<text>13797252451</text></p>
		<p>赶快添加好友吧</p>
	</div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
<script src="https://cdn.bootcdn.net/ajax/libs/clipboard.js/2.0.10/clipboard.min.js"></script>
<script type="text/javascript">
	(function() {
		var clipboard = new ClipboardJS('#WeiXin');
		var copybtn = document.getElementById("WeiXin");
		copybtn.addEventListener('click', function() {
			clipboard.on('success', function(e) {
				//console.info('clipboard:', e);
				//alert("已复制微信号：" + e.text);
				//e.clearSelection();
				$("#dialog").dialog({
					modal: true,
					buttons: {
						"确定": function() {
							$(this).dialog("close");
						}
					}
				});
			});
		});
	}());
</script>
<style>
	div.cont-box {
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: self-start;
		background: #3d80d7;
		justify-content: center;
		/* 底部联系 浮低 */
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 3.5rem;
		left: 0;
		/* 底部联系 浮低 end */
	}

	.cont-block {
		width: 28%;
		height: 100%;
		margin: 0 1rem;
	}

	.cont-btn {
		display: flex;
		flex-direction: row;
		align-content: center;
		align-items: center;
		background: #3d80d7;
		justify-content: center;
		height: 100%;
		color: #fff;
		line-height: 4;
		font-size: 1rem;
		text-align: center;
	}

	a.cont-btn:hover {
		color: #fff;
	}

	.cont-btn.mailto {
		background-color: #62a5e9;
	}

	.icon {
		height: 28%;
		margin-right: 10px;
	}

	.ui-widget-header {
		border: 1px solid #dddddd;
		background: #1e80df;
		color: #f7f7f7;
		font-weight: bold;
	}

	#dialog {
		display: none
	}

	#WeiXinBox {
		background-color: #62a5e9;
		color: #FFFFFF;
		padding: .8rem 1rem 0.005rem;
		font-size: 1.4rem;
		line-height: 2;
		text-align: center;
	}

	#WeiXinBox p {
		margin-bottom: 5px;
	}

	.wx-block {
		background-color: #ffc73c;
		padding: 0.5rem 2rem;
		display: inline;
		border-radius: 2rem;
	}
</style>
