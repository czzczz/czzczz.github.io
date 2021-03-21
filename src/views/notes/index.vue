<template>
	<div class="notes page">
		<div>
			<!-- 自动收集的md文件树 -->
			<ShutBTree :data="knowledgeTreeData" @nodeClick="knowledgeNodeClick"></ShutBTree>
		</div>
		<div class="body" ref="noteBodyRef">
			<router-view></router-view>
		</div>
		<div>
			<!-- 自动收集的页面h2，h3树 -->
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

		// onMounted(() => {
		// 	// 禁止选择和复制
		// 	document.onselectstart = () => false;
		// });

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
	width: 100%;
	align-items: top;
	box-sizing: border-box;
	overflow-y: hidden;
	> div {
		padding: 0 8px;
		overflow-y: auto;
		box-sizing: border-box;
		> * {
			background: #fff;
			padding: 20px 0;
			border-radius: 5px;
			box-shadow: 3px 6px 5px #999;
		}
		&:first-of-type,
		&:last-of-type {
			width: 300px;
			position: sticky;
			top: 0;
		}
		&.body {
			flex: 1;
			position: relative;
			.markdown-body {
				padding: 20px 30px;
				// user-select: none; // 禁止用户选中
			}
			::v-deep() {
				h2,
				h3 {
					&:hover {
						text-decoration: underline;
						&::before {
							content: '#';
						}
					}
				}
				ol {
					list-style-type: decimal;
				}
				ul {
					list-style-type: disc;
				}
			}
		}
	}
}
</style>
