<template>
	<page-frame></page-frame>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import pageFrame from '@/views/frame/index.vue';

export default defineComponent({
	name: 'App',

	components: {
		pageFrame,
	},

	setup() {
		console.log('shutBB');
	},
});
</script>

<style lang="scss">
html,
body,
#app {
	margin: 0;
	padding: 0;
	position: absolute;
	height: 100%;
	width: 100%;
	font-family: 'Helvetica Neue', Helvetica, Arial, 'PingFang SC', 'Hiragino Sans GB', 'Heiti SC', 'Microsoft YaHei',
		'WenQuanYi Micro Hei', sans-serif;
}
</style>
