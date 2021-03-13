<template>
	<div>
		<B :d="d"></B>
		<D :d="d"></D>
		<E :d="d"></E>
	</div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import B from './B';
import D from './D';
import E from './E';
export default {
	components: { B, D, E },
	setup() {
		console.log('setup A');
		const state = reactive({
			d: '1',
		});
		setTimeout(() => {
			state.d = '2';
		}, 3000);
		return { ...toRefs(state) };
	},
	beforeCreate() {
		console.log('beforeCreate A');
	},
	created() {
		console.log('created A');
	},
	beforeMount() {
		console.log('beforeMount A');
	},
	mounted() {
		console.log('mounted A');
	},
	activated() {
		console.log('activated A');
	},
	beforeUpdate() {
		console.log('beforeUpdate A');
	},
	updated() {
		console.log('updated A');
	},
	deactivated() {
		console.log('deactivated A');
	},
	beforeUnmount() {
		console.log('beforeUnmount A');
	},
	unmounted() {
		console.log('unmounted A');
	},
};
</script>

<style lang="scss" scoped></style>
