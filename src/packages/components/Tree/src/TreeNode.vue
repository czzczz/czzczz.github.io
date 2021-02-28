<template>
	<div class="shut-b-tree-node" :style="{ paddingLeft: treeCtx.props.indent + 'px' }">
		<div class="shut-b-tree-node-body" @click.stop="nodeClick">
			<ShutBIcon
				:class="{ expand: state.expand }"
				name="i-chevron_right_24px"
				:visible="(data[treeCtx.props.childrenKey] || []).length !== 0"
			></ShutBIcon>
			<div class="content">
				<ShutBTreeNodeContent :data="data"></ShutBTreeNodeContent>
			</div>
		</div>
		<ShutBCollapseTransition>
			<div class="shut-b-tree-children" v-show="state.expand">
				<ShutBTreeNode
					v-for="(nd, idx) of children"
					:key="nd[treeCtx.props.dataKey] || idx"
					:path="path.concat(idx)"
					:data="nd"
				></ShutBTreeNode>
			</div>
		</ShutBCollapseTransition>
	</div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, reactive, computed } from 'vue';
import ShutBIcon from '../../Icon/src/Icon.vue';
import ShutBCollapseTransition from '../../Transition/src/CollapseTransition.vue';
import ShutBTreeNodeContent from './TreeNodeContent.vue';
import { TreeBodyContext, TreeDataConstructor } from './type';

export default defineComponent({
	name: 'ShutBTreeNode',

	props: {
		data: {
			type: TreeDataConstructor,
			default: () => [],
		},
		path: {
			type: Array as PropType<number[]>,
		},
	},

	setup(props) {
		const treeCtx = inject<TreeBodyContext>('treeCtx');
		if (!treeCtx) console.error('TreeNode must work in Tree Context');
		const state = reactive({
			expand: false,
		});
		const children = computed(() => {
			const childrenKey = treeCtx?.props.childrenKey || 'name';
			const data = props.data;
			return data[childrenKey] || [];
		});

		const nodeClick = () => {
			state.expand = !state.expand;
			treeCtx?.ctx?.emit('nodeClick', props.data, { path: props.path, state });
		};

		return {
			treeCtx,
			state,
			children,
			nodeClick,
		};
	},

	components: {
		ShutBIcon,
		ShutBTreeNodeContent,
		ShutBCollapseTransition,
	},
});
</script>

<style scoped lang="scss">
.shut-b-tree-node {
	display: flex;
	flex-direction: column;
	.shut-b-tree-node-body {
		display: flex;
		padding: 5px 0;
		.shut-b-icon {
			font-size: 18px;
			transition: transform 0.2s ease-in-out;
			&.expand {
				transform: rotate(90deg);
			}
			&.hidden {
				color: #00000000 !important;
			}
		}
		.content {
			flex: 1;
		}
	}
}
</style>
