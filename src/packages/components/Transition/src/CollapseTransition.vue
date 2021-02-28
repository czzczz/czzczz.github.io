<template>
	<transition v-on="on">
		<slot></slot>
	</transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ShutBCollapseTransition',
	setup() {
		const dataset: Partial<CSSStyleDeclaration> = {
			paddingTop: '',
			paddingBottom: '',
			overflowY: '',
			height: '',
		};
		const on = {
			beforeEnter(el: HTMLElement) {
				el.classList.add('shut-b-collapse-transition');
			},
			enter(el: HTMLElement) {
				el.style.height = '0px';
				const st = window.getComputedStyle(el);
				dataset.paddingTop = st.paddingTop;
				dataset.paddingBottom = st.paddingBottom;
				dataset.overflowY = st.overflowY;
				el.style.paddingTop = el.style.paddingBottom = '0';
				el.style.overflowY = 'hidden';
				el.style.height = el.scrollHeight + 'px';
			},
			afterEnter(el: HTMLElement) {
				el.classList.remove('shut-b-collapse-transition');
				dataset.height = el.style.height;
				el.style.height = '';
				el.style.overflowY = dataset.overflowY || '';
			},
			beforeLeave(el: HTMLElement) {
				el.classList.add('shut-b-collapse-transition');
			},
			leave(el: HTMLElement) {
				el.style.transitionProperty = 'height';
				el.style.paddingTop = dataset.paddingTop || '';
				el.style.paddingBottom = dataset.paddingBottom || '';
				el.style.overflowY = 'hidden';
				el.style.height = dataset.height || '';
				el.offsetHeight; // 触发重绘
				el.style.height = '0px';
			},
			afterLeave(el: HTMLElement) {
				el.classList.remove('shut-b-collapse-transition');
				el.style.height = '';
				el.style.overflowY = dataset.overflowY || '';
			},
		};

		return {
			on,
		};
	},
});
</script>

<style lang="scss" scoped>
.shut-b-collapse-transition {
	transition: 0.3s height ease-in-out, 0.3s padding-top ease-in-out, 0.3s padding-bottom ease-in-out;
}
</style>
