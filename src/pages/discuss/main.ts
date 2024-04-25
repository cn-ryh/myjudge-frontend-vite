import App from './routerLoader.vue';
import { createApp } from 'vue';
import { router } from './loader';
const app = createApp(App);
app.use(router);
app.mount('#discuss');
