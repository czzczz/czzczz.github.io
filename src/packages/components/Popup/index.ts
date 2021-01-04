import { App } from 'vue';
import ShutBPopup from './src/Popup.vue';
export { $popup } from './src/popup';

export const install = (vm: App): void => {
	vm.component(ShutBPopup.name, ShutBPopup);
};

export default {
	install,
};
