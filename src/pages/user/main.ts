import App from './routerLoader.vue';
import { createApp } from 'vue';
import { router } from './loader';
import '@arco-design/web-vue/es/link/style/css.js';
import '@arco-design/web-vue/es/tag/style/css.js';
import '@arco-design/web-vue/es/tabs/style/css.js';
import '@arco-design/web-vue/es/card/style/css.js';
import '@arco-design/web-vue/es/progress/style/css.js';

const app = createApp(App);

app.use(router);
app.mount('#user');
