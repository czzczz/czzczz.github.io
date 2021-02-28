import { createApp } from 'vue';

const mountToElementEnd = (target: HTMLElement, component: any, opt?: Record<string, any>) => {
	const el = document.createElement('div');
	target.appendChild(el);

	const app = createApp(component, opt);
	const inst = app.mount(el);
	return {
		inst,
		unmount: () => {
			app.unmount();
			target.removeChild(el);
		},
	};
};

export const mountToBodyEnd = (component: any, opt?: Record<string, any>) => {
	return mountToElementEnd(document.body, component, opt);
};
