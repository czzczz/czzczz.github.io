import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import Loader from './packages/components/Loading';
import 'highlight.js/styles/github.css';
import 'github-markdown-css';

const app = createApp(App);
app.use(store).use(router);

app.use(Loader);

app.mount('#app');
