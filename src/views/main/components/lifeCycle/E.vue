<template>
	<div>
		<F :d="d"></F>
	</div>
</template>

<script>
import F from './F';
export default {
	components: { F },
	props: {
		d: String,
	},
	setup() {
		console.log('setup E');
		return {};
	},
	beforeCreate() {
		console.log('beforeCreate E');
	},
	created() {
		console.log('created E');
	},
	beforeMount() {
		console.log('beforeMount E');
	},
	mounted() {
		console.log('mounted E');
	},
	activated() {
		console.log('activated E');
	},
	beforeUpdate() {
		console.log('beforeUpdate E');
	},
	updated() {
		console.log('updated E');
	},
	deactivated() {
		console.log('deactivated E');
	},
	beforeUnmount() {
		console.log('beforeUnmount E');
	},
	unmounted() {
		console.log('unmounted E');
	},
};
</script>

<style lang="scss" scoped></style>
