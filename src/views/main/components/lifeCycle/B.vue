<template>
	<div>
		<C :d="d"></C>
	</div>
</template>

<script>
import C from './C';
export default {
	components: { C },
	props: {
		d: String,
	},
	setup() {
		console.log('setup B');
		return {};
	},
	beforeCreate() {
		console.log('beforeCreate B');
	},
	created() {
		console.log('created B');
	},
	beforeMount() {
		console.log('beforeMount B');
	},
	mounted() {
		console.log('mounted B');
	},
	activated() {
		console.log('activated B');
	},
	beforeUpdate() {
		console.log('beforeUpdate B');
	},
	updated() {
		console.log('updated B');
	},
	deactivated() {
		console.log('deactivated B');
	},
	beforeUnmount() {
		console.log('beforeUnmount B');
	},
	unmounted() {
		console.log('unmounted B');
	},
};
</script>

<style lang="scss" scoped></style>
