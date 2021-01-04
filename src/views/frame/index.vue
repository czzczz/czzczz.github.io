<template>
	<no-head-frame class="frame" v-if="isNoHead"></no-head-frame>
	<default-frame class="frame" v-else></default-frame>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import defaultFrame from './default.vue';
import noHeadFrame from './noHead.vue';

export default defineComponent({
	name: 'pageFrame',

	components: {
		defaultFrame,
		noHeadFrame,
	},

	setup() {
		const isNoHead = ref(false);

		return {
			isNoHead,
		};
	},
});
</script>

<style lang="scss" scoped>
.frame {
	width: 100%;
	height: 100%;
}
</style>
