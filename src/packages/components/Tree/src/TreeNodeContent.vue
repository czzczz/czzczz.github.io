<script lang="ts">
import { defineComponent, h, inject, computed } from 'vue';
import { TreeBodyContext, TreeDataConstructor } from './type';

export default defineComponent({
	name: 'ShutBTreeNodeContent',

	props: {
		data: {
			type: TreeDataConstructor,
			default: () => [],
		},
	},

	setup(props) {
		const treeCtx = inject<TreeBodyContext>('treeCtx');

		if (!treeCtx) console.error('TreeNode must work in Tree Context');

		const labelKey = computed(() => {
			return treeCtx?.props.labelKey || 'name';
		});

		return () => {
			const content = treeCtx?.ctx.slots.default?.({ data: props.data }) || [
				h('span', { class: 'shut-b-tree-node__label' }, [props.data[labelKey.value]]),
			];
			return content;
		};
	},
});
</script>

<style scoped lang="scss">
.shut-b-tree-node__label {
	padding: 5px;
}
</style>
