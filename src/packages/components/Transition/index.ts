import { App } from 'vue';
import ShutBTransition from './src/Transition.vue';

export const install = (vm: App): void => {
	vm.component(ShutBTransition.name, ShutBTransition);
};

export default {
	install,
};
