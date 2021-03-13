<template>
	<div>
		<A v-if="show"></A>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue';
import A from './components/lifeCycle/A.vue';

export default defineComponent({
	name: 'mainPage',

	components: {
		A,
	},

	setup() {
		const state = reactive({
			show: true,
		});

		setTimeout(() => {
			state.show = false;
		}, 6000);

		return { ...toRefs(state) };
	},
});
</script>
