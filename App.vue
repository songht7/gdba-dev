<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			//#ifdef H5
			this.$store.dispatch('checkWeixin');
			//#endif
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "/common/uni.css";
</style>
