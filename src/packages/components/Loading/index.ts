import { App, createApp, Directive, ComponentPublicInstance, nextTick } from 'vue';
import ShutBLoading from './src/Loading.vue';

// 全局保存loader的父元素以及loader实例映射关系
const loaderMap = new Map<
	HTMLElement,
	{
		inst: LoaderInst;
		wrapper: HTMLDivElement;
	}
>();

interface LoaderInst extends ComponentPublicInstance {
	show: (tip?: string) => void;
	hide: () => void;
}

const createLoader = (el: any, customStyle: any) => {
	// 创建新的dom节点以及loader实例并挂载
	const loader = document.createElement('div');
	console.log(getComputedStyle(el).getPropertyValue('position'));
	if (getComputedStyle(el).getPropertyValue('position') === 'static') el.style.position = 'relative';
	loader.classList.add('shut-b-loading--wrapper');
	const inst = createApp(ShutBLoading, { customStyle }).mount(loader);
	// 添加到目标父元素
	el.appendChild(loader);
	const res = { inst: inst as LoaderInst, wrapper: loader };
	loaderMap.set(el, res);
	return res;
};
const toggleLoaderVisible = (el: any, visible: boolean) => {
	let inst = loaderMap.get(el);
	if (!inst) inst = createLoader(el, {});
	// 根据绑定的值判断显隐
	if (visible) {
		inst.inst.show();
		nextTick(() => {
			if (inst && inst.wrapper) inst.wrapper.style.display = 'block';
		});
	} else {
		inst.inst.hide();
		nextTick(() => {
			if (inst && inst.wrapper) inst.wrapper.style.display = 'none';
		});
	}
};

export const createLoadingDirective = (styleObj = {}) => {
	const directive: Directive = {
		mounted(el, binding) {
			createLoader(el, styleObj);
			toggleLoaderVisible(el, !!binding.value);
		},
		updated(el, binding) {
			toggleLoaderVisible(el, !!binding.value);
		},
	};

	return directive;
};

export const createGlobalLoader = (styleObj = {}) => {
	const loader = createLoader(document.querySelector('body'), styleObj);
	return loader;
};

export const install = (vm: App): void => {
	vm.component(ShutBLoading.name, ShutBLoading);
	vm.directive('loading', createLoadingDirective());
};

export default {
	install,
};
