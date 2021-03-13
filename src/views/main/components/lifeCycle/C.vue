<template>
	<div></div>
</template>

<script>
export default {
	props: {
		d: String,
	},
	setup() {
		console.log('setup C');
		return {};
	},
	beforeCreate() {
		console.log('beforeCreate C');
	},
	created() {
		console.log('created C');
	},
	beforeMount() {
		console.log('beforeMount C');
	},
	mounted() {
		console.log('mounted C');
	},
	activated() {
		console.log('activated C');
	},
	beforeUpdate() {
		console.log('beforeUpdate C');
	},
	updated() {
		console.log('updated C');
	},
	deactivated() {
		console.log('deactivated C');
	},
	beforeUnmount() {
		console.log('beforeUnmount C');
	},
	unmounted() {
		console.log('unmounted C');
	},
};
</script>

<style lang="scss" scoped></style>
