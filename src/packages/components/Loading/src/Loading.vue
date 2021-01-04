<template>
	<ShutBTransition name="fade" :duration="500">
		<ShutBMask class="shut-b-loading" :opacity="0.5" :style="customStyle" v-show="visible">
			<slot>
				<img src="./loading.gif" />
				<div v-if="msg" class="msg">{{ msg }}</div>
			</slot>
		</ShutBMask>
	</ShutBTransition>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue';
import type { PropType } from 'vue';
import ShutBMask from '../../Mask/src/Mask.vue';
import ShutBTransition from '../../Transition/src/Transition.vue';

const useVisible = () => {
	const visible = ref(false);
	const msg = ref('');

	function show(tip?: string) {
		msg.value = tip || '';
		nextTick(() => {
			visible.value = true;
		});
	}

	function hide() {
		visible.value = false;
	}

	return {
		visible,
		msg,
		show,
		hide,
	};
};

export default defineComponent({
	name: 'shutBLoading',

	components: {
		ShutBTransition,
		ShutBMask,
	},

	props: {
		customStyle: {
			type: Object as PropType<Partial<CSSStyleDeclaration>>,
			default: () => ({}),
		},
	},

	setup() {
		const { visible, msg, show, hide } = useVisible();

		return {
			visible,
			msg,
			show,
			hide,
		};
	},
});
</script>

<style lang="scss">
.shut-b-loading--wrapper {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
}
</style>

<style lang="scss" scoped>
.shut-b-loading {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.msg {
		margin-top: 1em;
	}
}
</style>
