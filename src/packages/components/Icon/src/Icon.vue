<template>
	<ShutBWrapper class="shut-b-icon" :class="{ [type]: !color }">
		<svg
			v-show="visible"
			:style="{
				color,
			}"
		>
			<use :xlink:href="'#' + name"></use>
		</svg>
	</ShutBWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import './iconfont';
import ShutBWrapper from '../../Wrapper/src/Wrapper.vue';

export default defineComponent({
	name: 'ShutBIcon',

	components: {
		ShutBWrapper,
	},

	props: {
		type: {
			type: String,
			default: 'text',
			validator: val => ['text', 'info', 'success', 'warning', 'error'].includes(String(val)),
		},
		visible: {
			type: Boolean,
			default: true,
		},
		color: {
			type: String,
			default: 'var(--textColor)',
		},
		name: {
			type: String,
			required: true,
		},
	},
});
</script>

<style lang="scss" scoped>
.shut-b-icon {
	width: 1em;
	height: 1em;
	svg {
		position: absolute;
		width: 1em;
		height: 1em;
	}

	&.text {
		color: var(--textColor);
	}

	&.info {
		color: var(--info);
	}

	&.success {
		color: var(--success);
	}

	&.warning {
		color: var(--warning);
	}

	&.error {
		color: var(--error);
	}
}
</style>
