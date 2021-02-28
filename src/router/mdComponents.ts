import { RouteRecordRaw } from 'vue-router';

const requireCtx = require.context('@/notes', true, /.md$/);

const mdList = requireCtx.keys().map(file => {
	const path = file.slice(2);
	const fileName = path.split('/').pop() || '暂无标题';

	return { path, fileName };
});

export { mdList };

const mds: RouteRecordRaw[] = [
	{
		path: '/notes',
		name: 'notes',
		component: () => import('@/views/notes/index.vue'),
		children: mdList.map(page => {
			const name = page.path.replace(/\//g, '_');
			return {
				path: encodeURIComponent(page.path).replace(/%2F/g, '/'),
				name,
				component: () => import('@/notes/' + page.path),
			};
		}),
	},
];

export type KnowledgeTreeNode = {
	id: string;
	name: string;
	routeName?: string;
	child: KnowledgeTreeNode[];
};

export const knowledgeTree: KnowledgeTreeNode[] = (() => {
	const tree: KnowledgeTreeNode[] = [];
	const pushRouteNodeIntoTree = (route: RouteRecordRaw) => {
		let pin: KnowledgeTreeNode[] = tree;
		const fetchPath = (route.name as string).split('_');
		fetchPath.forEach((p, i, arr) => {
			let node = pin.find(n => n.id === p);
			if (!node) {
				node = {
					id: p,
					name: p,
					child: [],
					routeName: i === arr.length - 1 ? (route.name as string) : undefined,
				};
				pin.push(node);
			}
			pin = node.child;
		});
	};
	for (const r of mds[0].children as RouteRecordRaw[]) pushRouteNodeIntoTree(r);
	return tree;
})();

export default mds;
