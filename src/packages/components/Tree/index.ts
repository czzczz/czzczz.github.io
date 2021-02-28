import { App } from 'vue';
import ShutBTree from './src/Tree.vue';

const install = (vm: App) => {
	vm.component(ShutBTree.name, ShutBTree);
};

export default {
	install,
};
