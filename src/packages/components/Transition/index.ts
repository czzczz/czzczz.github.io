import { App } from 'vue';
import ShutBTransition from './src/Transition.vue';
import ShutBCollapseTransition from './src/CollapseTransition.vue';

export const install = (vm: App): void => {
	vm.component(ShutBTransition.name, ShutBTransition);
	vm.component(ShutBCollapseTransition.name, ShutBCollapseTransition);
};

export default {
	install,
};
