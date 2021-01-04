import { App } from 'vue';
import ShutBButton from './src/Button.vue';

export const install = (vm: App): void => {
	vm.component(ShutBButton.name, ShutBButton);
};

export default {
	install,
};
