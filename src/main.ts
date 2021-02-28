import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import comp from './packages/components';
import 'highlight.js/styles/github.css';
import 'github-markdown-css';

const app = createApp(App);
app.use(store)
	.use(router)
	.use(comp);

app.mount('#app');
