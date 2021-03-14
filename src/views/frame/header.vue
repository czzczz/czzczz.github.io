<template>
	<div class="page-header">
		<div class="title">瞎比比，小小实验室</div>
		<a class="link-group" target="_blank" href="https://github.com/czzczz/czzczz.github.io">
			Github
		</a>
	</div>
</template>

<script>
export default {
	name: 'PageHeader',
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped>
.page-header {
	height: 60px;
	line-height: 60px;
	margin-bottom: 10px;
	color: #fff;
	background: linear-gradient(var(--primaryDeeper), var(--primaryLighter));
	display: flex;
	align-items: center;
	.title {
		flex: 1;
		font-size: 30px;
	}
	.link-group {
		width: 100px;
		color: #fff;
		cursor: pointer;
	}
}
</style>
