<template>
	<div class="footer">
		<slot></slot>
	</div>
</template>
<script>
	export default {
		name: 'footer'
	}
</script>
<style scoped>
	.footer {
		width: 100%;
		height: 1.33333rem;
		background-color: #ff293c;
		line-height: 1.33333rem;
		font-size: 0.48rem;
		color: #fff;
		text-align: center;
		position: fixed;
		bottom: 0;
		z-index: 999;
	}
</style>
