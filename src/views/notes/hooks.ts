import { ref, reactive, watch, nextTick } from 'vue';
import { useRouter, useRoute, RouteRecordRaw } from 'vue-router';
import mds from '@/router/mdComponents';

type KnowledgeTreeNode = {
	id: string;
	name: string;
	routeName?: string;
	child: KnowledgeTreeNode[];
};

const knowledgeTree: KnowledgeTreeNode[] = (() => {
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

export function useKnowledgeTree() {
	const $router = useRouter();
	const knowledgeNodeClick = (data: KnowledgeTreeNode) => {
		if (data.routeName) $router.push({ name: data.routeName });
	};
	return { knowledgeTreeData: knowledgeTree, knowledgeNodeClick };
}

interface NoteBodyPoint {
	id: string;
	name: string;
	el: HTMLElement;
	child: NoteBodyPoint[];
}

export function isHTMLElement(el: Element): el is HTMLElement {
	return (el as HTMLElement).addEventListener !== undefined && (el as HTMLElement).removeEventListener !== undefined;
}

export function usePagePoint() {
	const $route = useRoute();
	const noteBodyRef = ref<HTMLElement>();
	const noteBodyPoints = reactive<NoteBodyPoint[]>([]);
	const noteBodyPointClick = (node: NoteBodyPoint) => {
		node.el.scrollIntoView({
			behavior: 'smooth',
			block: 'center',
			inline: 'center',
		});
	};
	const initBodyPoints = () => {
		noteBodyPoints.length = 0;
		noteBodyRef.value?.querySelectorAll('h2,h3').forEach((node, i) => {
			if (!isHTMLElement(node)) return;
			if (node.tagName === 'H2')
				noteBodyPoints.push({
					id: i + '',
					name: node.innerText,
					el: node,
					child: [],
				});
			else if (node.tagName === 'H3')
				noteBodyPoints[noteBodyPoints.length - 1]?.child?.push?.({
					id: i + '',
					name: node.innerText,
					el: node,
					child: [],
				});
		});
	};
	watch(
		() => $route.name,
		() => nextTick(initBodyPoints),
		{
			immediate: true,
		},
	);
	return { noteBodyRef, noteBodyPoints, noteBodyPointClick };
}
