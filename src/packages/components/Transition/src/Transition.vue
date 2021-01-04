<template>
	<transition v-if="!group" v-bind="attrs" v-on="hooks">
		<slot></slot>
	</transition>
	<transition-group v-if="group" v-bind="attrs" v-on="hooks">
		<slot></slot>
	</transition-group>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

const useTransitionListeners = (props: Readonly<{ duration: number }>, emits: Function) => {
	const setDuration = (el: HTMLElement) => {
		el.style.transitionDuration = `${props.duration}ms`;
	};
	const cleanUpDuration = (el: HTMLElement) => {
		el.style.transitionDuration = '';
	};

	const emit = (event: string, el: HTMLElement) => {
		emits(event, el);
	};

	const beforeEnter = (el: HTMLElement) => {
		setDuration(el);
		emit('beforeEnter', el);
	};
	const beforeLeave = (el: HTMLElement) => {
		setDuration(el);
		emit('beforeLeave', el);
	};

	const enter = (el: HTMLElement) => {
		emit('enter', el);
	};
	const leave = (el: HTMLElement) => {
		emit('leave', el);
	};
	const appear = (el: HTMLElement) => {
		emit('appear', el);
	};

	const afterEnter = (el: HTMLElement) => {
		cleanUpDuration(el);
		emit('afterEnter', el);
	};
	const afterLeave = (el: HTMLElement) => {
		cleanUpDuration(el);
		emit('afterLeave', el);
	};
	const afterAppear = (el: HTMLElement) => {
		emit('afterAppear', el);
	};

	// const enterCanceled = (el: HTMLElement) => {
	// 	emit('enterCanceled', el);
	// };
	// const leaveCanceled = (el: HTMLElement) => {
	// 	emit('leaveCanceled', el);
	// };
	// const appearCanceled = (el: HTMLElement) => {
	// 	emit('appearCanceled', el);
	// };

	const hooks = computed(() => ({
		beforeEnter,
		beforeLeave,
		enter,
		leave,
		appear,
		afterEnter,
		afterLeave,
		afterAppear,
		// enterCanceled,
		// leaveCanceled,
		// appearCanceled,
	}));

	return {
		hooks,
	};
};

export default defineComponent({
	name: 'ShutBTransition',

	setup(props, { attrs, emit }) {
		const { hooks } = useTransitionListeners(props, emit);

		return {
			attrs,
			emit,
			hooks,
		};
	},

	props: {
		group: {
			type: Boolean,
			default: false,
		},
		duration: {
			type: Number,
			default: 300,
		},
	},

	emits: {
		beforeEnter: (el: HTMLElement) => !!el,
		beforeLeave: (el: HTMLElement) => !!el,
		enter: (el: HTMLElement) => !!el,
		leave: (el: HTMLElement) => !!el,
		appear: (el: HTMLElement) => !!el,
		afterEnter: (el: HTMLElement) => !!el,
		afterLeave: (el: HTMLElement) => !!el,
		afterAppear: (el: HTMLElement) => !!el,
		// enterCanceled: (el: HTMLElement) => !!el,
		// leaveCanceled: (el: HTMLElement) => !!el,
		// appearCanceled: (el: HTMLElement) => !!el,
	},
});
</script>

<style lang="scss" scoped>
.fade {
	&-enter-active,
	&-leave-active {
		transition: opacity;
	}
	&-enter-to,
	&-leave-from {
		opacity: 1;
	}
	&-enter-from,
	&-leave-to {
		opacity: 0 !important;
	}
}
.width {
	&-enter-active,
	&-leave-active {
		transition: width;
		overflow: hidden !important;
	}
	&-enter-to,
	&-leave-from {
		width: 100%;
	}
	&-enter-from,
	&-leave-to {
		width: 0;
	}
}
</style>
