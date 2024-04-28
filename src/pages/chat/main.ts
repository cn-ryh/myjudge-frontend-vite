import App from './routerLoader.vue';
import { router } from './loader';
import { createApp } from 'vue';

const app = createApp(App);
app.use(router);

app.mount('#chat');
