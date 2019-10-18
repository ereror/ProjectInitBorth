<template lang='pug'>
  	<div>
  		<div class='pdtest'> 渠道管理 </div>
    	<router-view></router-view>
    </div>
</template>
<script>
	export default {
		name: 'app',
	    data() {
	      return {
	        appName: '渠道管理',
	      }
	    }
	}
</script>
<style lang='less'>
	.pdtest {
		width: 200px;
		height: 300px;
		font-size: 25px;
	}
</style>