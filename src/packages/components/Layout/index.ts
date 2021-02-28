import { App } from 'vue';
import ShutBRow from './src/Row.vue';
import ShutBCol from './src/Col.vue';

export const install = (vm: App): void => {
	vm.component(ShutBRow.name, ShutBRow);
	vm.component(ShutBCol.name, ShutBCol);
};

export default {
	install,
};
