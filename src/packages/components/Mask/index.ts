import { App } from 'vue';
import ShutBMask from './src/Mask.vue';

export const install = (vm: App): void => {
	vm.component(ShutBMask.name, ShutBMask);
};

export default {
	install,
};
