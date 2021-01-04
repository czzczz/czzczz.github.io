import { App } from 'vue';
import ShutBIcon from './src/Icon.vue';

export const install = (vm: App): void => {
	vm.component(ShutBIcon.name, ShutBIcon);
};

export default {
	install,
};
