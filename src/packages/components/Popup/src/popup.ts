import { mountToBodyEnd } from '@/utils/vue';
import { ComponentPublicInstance, nextTick } from 'vue';
import Popup from './Popup.vue';

interface PopupInstance extends ComponentPublicInstance {
	show: () => any;
	hide: () => any;
}

const defaultOpt = {
	duration: 300,
	opacity: 0.3,
};

export function $popup(opt?: Record<string, any>, hiddenLife = 1000 * 15) {
	const { inst, unmount } = mountToBodyEnd(Popup, { ...defaultOpt, ...opt });

	nextTick(() => {
		(inst as PopupInstance).show();
	});

	let dropTimer = -1;
	return {
		show: () => {
			(inst as PopupInstance).show().then(() => {
				clearTimeout(dropTimer);
			});
		},
		hide: () => {
			(inst as PopupInstance).hide().then(() => {
				dropTimer = setTimeout(() => {
					unmount();
				}, hiddenLife);
			});
		},
	};
}

export default $popup;
