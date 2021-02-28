<template>
	<div class="notes page">
		<div>
			<ShutBTree :data="knowledgeTree" @nodeClick="nodeClick"></ShutBTree>
		</div>
		<div class="body">
			<router-view></router-view>
		</div>
		<div>
			<!-- <ShutBTree :data="[]"></ShutBTree> -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { knowledgeTree, KnowledgeTreeNode } from '@/router/mdComponents';

export default defineComponent({
	name: 'MarkdownNotes',

	setup() {
		const $router = useRouter();
		const nodeClick = (data: KnowledgeTreeNode) => {
			if (data.routeName) $router.push({ name: data.routeName });
		};
		return { knowledgeTree, nodeClick };
	},
});
</script>

<style lang="scss" scoped>
.notes {
	display: flex;
	height: 100%;
	align-items: top;
	> div {
		overflow-y: auto;
		&:first-of-type,
		&:last-of-type {
			width: 300px;
			position: sticky;
			top: 0;
		}
		&.body {
			flex: 1;
			position: relative;
		}
	}
}
</style>
