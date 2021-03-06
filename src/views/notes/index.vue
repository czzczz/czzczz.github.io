<template>
	<div class="notes page">
		<div>
			<ShutBTree :data="knowledgeTreeData" @nodeClick="knowledgeNodeClick"></ShutBTree>
		</div>
		<div class="body" ref="noteBodyRef">
			<router-view></router-view>
		</div>
		<div>
			<ShutBTree :data="noteBodyPoints" @nodeClick="noteBodyPointClick"></ShutBTree>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useKnowledgeTree, usePagePoint } from './hooks';

export default defineComponent({
	name: 'MarkdownNotes',

	setup() {
		const { knowledgeTreeData, knowledgeNodeClick } = useKnowledgeTree();
		const { noteBodyRef, noteBodyPoints, noteBodyPointClick } = usePagePoint();
		return {
			knowledgeTreeData,
			knowledgeNodeClick,
			noteBodyRef,
			noteBodyPoints,
			noteBodyPointClick,
		};
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
			/deep/ {
				h2,
				h3 {
					&:hover {
						text-decoration: underline;
						&::before {
							content: '#';
						}
					}
				}
			}
		}
	}
}
</style>
