<template>
	<ShutBWrapper
		class="shut-b-button"
		:class="{
			[type]: true,
			[size]: true,
			disabled: disabled,
		}"
		@mouseenter="changeMaskVisible(true)"
		@mouseleave="changeMaskVisible(false)"
	>
		<slot name="prefix">
			<ShutBIcon v-if="prefixIcon" :name="prefixIcon" style="margin-right: 0.1em"></ShutBIcon>
		</slot>
		<slot></slot>
		<slot name="suffix">
			<ShutBIcon v-if="suffixIcon" :name="suffixIcon" style="margin-left: 0.1em"></ShutBIcon>
		</slot>
		<ShutBMask :visible="maskVisible"></ShutBMask>
	</ShutBWrapper>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ShutBWrapper from '../../Wrapper/src/Wrapper.vue';
import ShutBMask from '../../Mask/src/Mask.vue';
import ShutBIcon from '../../Icon/src/Icon.vue';

function useMaskVisible() {
	// mask显隐
	const maskVisible = ref(false);
	const changeMaskVisible = (val: boolean) => {
		maskVisible.value = val;
	};
	return {
		maskVisible,
		changeMaskVisible,
	};
}

export default defineComponent({
	name: 'ShutBButton',

	components: {
		ShutBWrapper,
		ShutBMask,
		ShutBIcon,
	},

	props: {
		type: {
			type: String,
			default: 'plain',
			validator: v => ['plain', 'primary', 'text'].includes(String(v)),
		},
		size: {
			type: String,
			default: 'mid',
			validator: v => ['min', 'mid', 'max'].includes(String(v)),
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		prefixIcon: {
			type: String,
		},
		suffixIcon: {
			type: String,
		},
	},

	setup() {
		const { maskVisible, changeMaskVisible } = useMaskVisible();

		return {
			maskVisible,
			changeMaskVisible,
		};
	},
});
</script>

<style lang="scss" scoped>
.shut-b-button {
	cursor: pointer;
	font-size: 16px;
	border-radius: 0.2em;
	border: 1px solid var(--borderColor);
	background: white;
	color: var(--textColor);
	padding: 0.35em 0.4em;
	display: flex;
	justify-content: center;
	align-items: center;
	width: fit-content;

	&.disabled {
		cursor: not-allowed;
	}

	&.primary {
		border: none;
		background: var(--primary);
		color: white;
	}

	&.text {
		border: none;
		background: none;
		color: var(--primary);
	}

	&.min {
		padding: 0.25em 0.3em;
	}

	&.max {
		padding: 0.45em 0.5em;
	}
}
</style>
