<template>
	<div class="main-page">
		<!-- <ShutBPopup ref="r" :duration="1000" v-model="popup">1234123412341234123412341234</ShutBPopup> -->
		<!-- <ShutBButton type="primary" prefixIcon="i-add1">button</ShutBButton> -->
		<!-- <ShutBTransition group name="fade" :duration="3000" @beforeEnter="beforeEnter" @afterEnter="afterEnter">
			<div v-for="d in l" :key="d">{{ d }}</div>
		</ShutBTransition> -->
		<!-- <div style="width: 400px; height: 400px; background: red" v-loading="popup">
			<span @click="textC">fasdfasdfasdfasdf</span>
		</div> -->
		<Sss>
			<template v-slot:fasdfsdf>
				<ShutBButton>buttion</ShutBButton>
			</template>
		</Sss>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue';
// import ShutBPopup from '@/packages/components/Popup/src/Popup.vue';
import { $popup } from '@/packages/components/Popup';
import $http from '@/packages/libs/http';
import ShutBButton from '@/packages/components/Button/src/Button.vue';
import Sss from '@/notes/javascript/JS事件队列.md';

document.onselectstart = () => false;

// import ShutBTransition from '@/packages/components/Transition/src/Transition.vue';

export default defineComponent({
	name: 'mainPage',

	components: {
		Sss,
		// ShutBPopup,
		ShutBButton,
		// ShutBTransition,
	},

	setup() {
		// const popup = ref(true);
		// const r = ref(null);
		// const l = reactive([1, 2, 3, 4, 5]);

		// onMounted(() => {
		// 	setInterval(() => {
		// 		popup.value = !popup.value;
		// 		console.log(popup.value);
		// 		// l.push(l[l.length - 1] + 2);
		// 	}, 2000);
		// });

		// function beforeEnter() {
		// 	console.time();
		// }

		// function afterEnter() {
		// 	console.timeEnd();
		// }

		// console.log(sss);

		onMounted(() => {
			setTimeout(() => {
				const i = $popup({
					component: ShutBButton,
					componentOpt: {
						prefixIcon: 'i-add1',
					},
				});
				setTimeout(() => {
					i.hide();
				}, 500);
			}, 2000);
		});

		return {
			// popup,
			// r,
			// l,
			// beforeEnter,
			// afterEnter,
		};
	},
});
</script>
