<template>
	<div class="no-header-frame">
		<router-frame></router-frame>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import routerFrame from './router.vue';

export default defineComponent({
	name: 'noHeaderFrame',

	components: {
		routerFrame,
	},
});
</script>

<style lang="scss" scoped></style>
