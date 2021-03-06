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

export default mds;
