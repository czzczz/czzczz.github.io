<template>
	<div></div>
</template>

<script>
export default {
	props: {
		d: String,
	},
	setup() {
		console.log('setup D');
		return {};
	},
	beforeCreate() {
		console.log('beforeCreate D');
	},
	created() {
		console.log('created D');
	},
	beforeMount() {
		console.log('beforeMount D');
	},
	mounted() {
		console.log('mounted D');
	},
	activated() {
		console.log('activated D');
	},
	beforeUpdate() {
		console.log('beforeUpdate D');
	},
	updated() {
		console.log('updated D');
	},
	deactivated() {
		console.log('deactivated D');
	},
	beforeUnmount() {
		console.log('beforeUnmount D');
	},
	unmounted() {
		console.log('unmounted D');
	},
};
</script>

<style lang="scss" scoped></style>
