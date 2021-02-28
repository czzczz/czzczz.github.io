import { App } from 'vue';

const ctx = require.context('./', true, /^\.\/\w+\/index\.ts$/);

const allComponents = [...ctx.keys()] as const;

export interface ShutBBInstallOptions {
	components: string[];
}

const install = (vm: App, opt: ShutBBInstallOptions | undefined) => {
	const { components = allComponents } = opt || {};
	// 没有传参，默认安装全部
	if (components === allComponents) for (const pth of allComponents) vm.use(ctx(pth).default);
	// 有传参，判断是否选择安装
	else
		for (const pth of allComponents)
			for (const choosedComp of components) if (pth.split('/')[1] === choosedComp) vm.use(ctx(pth).default);
};

export default {
	install,
};
