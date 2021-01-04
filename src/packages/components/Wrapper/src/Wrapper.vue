<template>
	<div class="shut-b-wrapper">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { defaultThemeColors, hasTheme, setTheme } from '@/utils/common';

export default defineComponent({
	name: 'ShutBWrapper',

	props: {
		theme: {
			type: Object,
			default: () => defaultThemeColors,
		},
		fontSizeName: {
			type: String,
			default: 'fontSize',
		},
		fontSize: {},
	},

	setup(props) {
		// 判断主题色是否全部配置，若没有则进行配置
		onMounted(() => {
			if (!hasTheme(props.theme)) {
				setTheme(props.theme);
				console.log('shutBTheme init');
			}
		});
	},
});
</script>

<style lang="scss" scoped>
.shut-b-wrapper {
	position: relative;
	font-size: 16px;

	/*font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;*/
}
</style>
