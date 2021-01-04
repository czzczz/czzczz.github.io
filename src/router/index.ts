import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import mds from './mdComponents';

const routes = ([] as RouteRecordRaw[]).concat(mds).concat([
	{
		path: '/',
		name: 'Index',
		component: () => import('@/views/main/index.vue'),
		redirect: '/notes/README.md',
	},
]);

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
