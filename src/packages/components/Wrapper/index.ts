import { App } from 'vue';
import ShutBWrapper from './src/Wrapper.vue';

export const install = (vm: App): void => {
	vm.component(ShutBWrapper.name, ShutBWrapper);
};

export default {
	install,
};
