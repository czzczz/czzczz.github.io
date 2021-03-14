<template>
	<div class="default-frame">
		<Header></Header>
		<router-frame class="page-body"></router-frame>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from './header.vue';
import routerFrame from './router.vue';

export default defineComponent({
	name: 'defaultFrame',

	components: {
		Header,
		routerFrame,
	},
});
</script>

<style lang="scss" scoped>
.default-frame {
	background: #eee;
	display: flex;
	flex-direction: column;
	.page-body {
		flex: 1;
	}
}
</style>
