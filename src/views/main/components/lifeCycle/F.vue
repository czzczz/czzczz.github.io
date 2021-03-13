<template>
	<div></div>
</template>

<script>
export default {
	setup() {
		console.log('setup F');
		return {};
	},
	beforeCreate() {
		console.log('beforeCreate F');
	},
	created() {
		console.log('created F');
	},
	beforeMount() {
		console.log('beforeMount F');
	},
	mounted() {
		console.log('mounted F');
	},
	activated() {
		console.log('activated F');
	},
	beforeUpdate() {
		console.log('beforeUpdate F');
	},
	updated() {
		console.log('updated F');
	},
	deactivated() {
		console.log('deactivated F');
	},
	beforeUnmount() {
		console.log('beforeUnmount F');
	},
	unmounted() {
		console.log('unmounted F');
	},
};
</script>

<style lang="scss" scoped></style>
