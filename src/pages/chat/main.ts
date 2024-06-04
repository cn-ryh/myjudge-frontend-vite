import App from './routerLoader.vue';
import { router } from './loader';
import { createApp } from 'vue';
console.log(1);
const app = createApp(App);
app.use(router);

app.mount('#chat');
