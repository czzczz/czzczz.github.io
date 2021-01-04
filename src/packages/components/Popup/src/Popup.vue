<template>
	<ShutBTransition name="fade" :duration="duration" mode="out-in">
		<ShutBWrapper class="shut-b-popup" :style="{ zIndex }" v-show="visible">
			<ShutBMask :visible="true" :backgroundColor="backgroundColor" :opacity="opacity"></ShutBMask>
			<div class="shut-b-popup__content" v-if="$slots.default && !component" :style="{ zIndex: zIndex + 1 }">
				<slot></slot>
			</div>
			<div
				class="shut-b-popup__content"
				ref="componentRef"
				v-if="component"
				:style="{ zIndex: zIndex + 1 }"
			></div>
		</ShutBWrapper>
	</ShutBTransition>
</template>

<script lang="ts">
import { defineComponent, createApp, ref, watch, nextTick, watchEffect, onBeforeUnmount } from 'vue';
import ShutBWrapper from '../../Wrapper/src/Wrapper.vue';
import ShutBMask from '../../Mask/src/Mask.vue';
import ShutBTransition from '../../Transition/src/Transition.vue';
import { nextZIndex } from '@/utils/common';

const useCustomContent = (
	props: Readonly<
		{
			component: Record<string, any>;
			componentOpt: Record<string, any>;
		} & {}
	>,
) => {
	const componentRef = ref('');

	const createIntance = () => {
		if (!props.component.name) return;
		const contentInstance = createApp(props.component, props.componentOpt);
		nextTick(() => {
			contentInstance.mount(componentRef.value);
		});
		onBeforeUnmount(() => {
			contentInstance.unmount(componentRef.value);
		});
		return contentInstance;
	};

	return {
		componentRef,
		createIntance,
	};
};

const useVisible = (
	props: Readonly<
		{
			duration: number;
			modelValue: boolean;
			visibleTimer: number;
			component: Record<string, any>;
			componentOpt: Record<string, any>;
		} & {}
	>,
	emit: Function,
) => {
	const { componentRef, createIntance } = useCustomContent(props);
	const visible = ref(false);

	watchEffect(() => {
		if (visible.value && props.component) createIntance();
	});

	// 外部变量更新时更新visible
	watch(props, () => {
		const { modelValue } = props;
		visible.value = modelValue;
	});

	const hide = () =>
		new Promise(resolve => {
			visible.value = false;
			emit('update:modelValue', false);
			resolve();
		});

	const show = () =>
		new Promise(resolve => {
			visible.value = true;
			emit('update:modelValue', true);
			if (props.visibleTimer > 0)
				setTimeout(() => {
					hide();
				}, props.visibleTimer);
			resolve();
		});

	return {
		visible,
		show,
		hide,
		componentRef,
	};
};
const useZIndex = () => {
	const zIndex = ref(nextZIndex());
	return {
		zIndex,
	};
};

export default defineComponent({
	name: 'ShutBPopup',

	setup(props, { emit }) {
		const { visible, show, hide, componentRef } = useVisible(props, emit);

		const { zIndex } = useZIndex();

		return {
			visible,
			show,
			hide,
			componentRef,
			zIndex,
		};
	},

	props: {
		modelValue: {
			type: Boolean,
			description: '从组件外控制组件显隐',
		},
		visibleTimer: {
			type: Number,
			default: -1,
		},
		component: {
			type: Object,
			default: () => ({}),
		},
		componentOpt: {
			type: Object,
			default: () => ({}),
		},
		backgroundColor: {
			type: String,
			default: 'black',
		},
		opacity: {
			type: Number,
			default: 0.2,
		},
		duration: {
			type: Number,
			default: 300,
		},
	},

	components: {
		ShutBWrapper,
		ShutBMask,
		ShutBTransition,
	},

	emits: {
		'update:modelValue': () => true,
	},
});
</script>

<style lang="scss" scoped>
.shut-b-popup {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 100;
	.shut-b-popup__content {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
