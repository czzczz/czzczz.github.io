<template>
	<ShutBWrapper class="shut-b-tree">
		<ShutBTreeNode
			v-for="(nd, idx) of data"
			:key="nd[dataKey] || idx"
			:path="[idx]"
			:data="nd"
			:style="{ paddingLeft: indent / 2 + 'px' }"
		></ShutBTreeNode>
		<slot name="empty" v-if="data.length === 0">
			<div class="empty-box">暂无数据</div>
		</slot>
	</ShutBWrapper>
</template>

<script lang="ts">
import { defineComponent, provide, reactive } from 'vue';
import ShutBWrapper from '../../Wrapper/src/Wrapper.vue';
import ShutBTreeNode from './TreeNode.vue';
import { TreeProps, TreeDataListConstructor, TreeBodyContext } from './type';

export default defineComponent({
	name: 'ShutBTree',

	props: {
		data: {
			type: TreeDataListConstructor,
			default: () => [],
		},
		dataKey: {
			type: String,
			default: 'id',
		},
		childrenKey: {
			type: String,
			default: 'child',
		},
		labelKey: {
			type: String,
			default: 'name',
		},
		indent: {
			type: Number,
			default: 18,
		},
	},

	setup(props: TreeProps, ctx) {
		provide(
			'treeCtx',
			reactive({
				props,
				ctx,
			}) as TreeBodyContext,
		);
		return {};
	},

	components: {
		ShutBWrapper,
		ShutBTreeNode,
	},
});
</script>

<style scoped lang="scss">
.shut-b-tree {
	.empty-box {
		width: 100%;
		box-sizing: border-box;
		height: 50px;
		line-height: 50px;
		text-align: center;
		color: var(--borderColorDeep);
	}
}
</style>
