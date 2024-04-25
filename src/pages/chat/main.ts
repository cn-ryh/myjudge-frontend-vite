import App from './routerLoader.vue';
import { router } from './loader';
import { createApp } from 'vue';

const app = createApp(App);
app.use(router);
import '@arco-design/web-vue/es/button/style/css.js';
import '@arco-design/web-vue/es/tag/style/css.js';
import '@arco-design/web-vue/es/tabs/style/css.js';
import '@arco-design/web-vue/es/table/style/css.js';
import '@arco-design/web-vue/es/notification/style/css.js';
import '@arco-design/web-vue/es/card/style/css.js';
import '@arco-design/web-vue/es/link/style/css.js';

app.mount('#chat');
