import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import mds from './mdComponents';

const routes = ([] as RouteRecordRaw[]).concat(mds).concat([
	{
		path: '/test',
		name: 'test',
		component: () => import('@/views/main/index.vue'),
	},
	{
		path: '/',
		name: 'Index',
		component: () => import('@/views/main/index.vue'),
		redirect: '/notes/README.md',
	},
]);

const router = createRouter({
	history: createWebHashHistory(process.env.BASE_URL),
	routes,
});

export default router;
