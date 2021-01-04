<template>
	<ShutBWrapper class="shut-b-mask" :class="maskClass" :style="maskStyle">
		<slot></slot>
	</ShutBWrapper>
</template>

<script lang="ts">
import { defineComponent, reactive, watchEffect } from 'vue';
import ShutBWrapper from '../../Wrapper/src/Wrapper.vue';

const useStyle = (
	props: Readonly<
		{
			type: string;
			backgroundColor: string;
			opacity: number;
		} & {}
	>,
) => {
	const style = {
		backgroundColor: props.backgroundColor || '#fff',
		opacity: props.opacity,
		zIndex: 99,
	};
	const maskStyle = reactive(style);

	// 根据type决定mask的颜色
	watchEffect(() => {
		maskStyle.backgroundColor = props.type === 'light' ? '#fff' : '#000';
		if (props.backgroundColor) maskStyle.backgroundColor = String(props.backgroundColor);
		maskStyle.opacity = props.opacity;
	});

	return {
		maskStyle,
	};
};

interface CSSClass {
	[key: string]: any;
}

export default defineComponent({
	name: 'ShutBMask',

	components: {
		ShutBWrapper,
	},

	props: {
		type: {
			type: String,
			default: 'light',
			description: '蒙板类型',
			validator: v => ['light', 'dark'].includes(String(v)),
		},
		backgroundColor: {
			type: String,
			default: '',
		},
		opacity: {
			type: Number,
			default: 0.15,
		},
		visible: {
			type: Boolean,
			default: true,
		},
	},

	setup(
		props: Readonly<
			{
				type: string;
				backgroundColor: string;
				opacity: number;
				visible: boolean;
			} & {}
		>,
	) {
		const { maskStyle } = useStyle(props);

		const cls: CSSClass = {};
		const maskClass = reactive(cls);
		watchEffect(() => {
			maskClass.unVisible = !props.visible;
		});

		return {
			maskStyle,
			maskClass,
		};
	},
});
</script>

<style lang="scss" scoped>
.shut-b-mask {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;

	&.unVisible {
		display: none;
	}
	.mask {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	.shut-b-mask-content {
		position: absolute;
	}
}
</style>
