import { PropType, SetupContext } from 'vue';

interface TreeDataUnit {
	[key: string]: any;
}

export const TreeDataConstructor = Object as PropType<TreeDataUnit>;
export const TreeDataListConstructor = Array as PropType<TreeDataUnit[]>;

export type TreeProps = Readonly<{
	data: TreeDataUnit[];
	dataKey: string;
	childrenKey: string;
	labelKey: string;
	indent: number;
}>;

export interface TreeBodyContext {
	props: TreeProps;
	ctx: SetupContext<any>;
}
