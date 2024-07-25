import App from './routerLoader.vue';
import { createApp } from 'vue';
import { router } from './loader';
import '@arco-design/web-vue/es/notification/style/index';
import '@arco-design/web-vue/es/avatar/style/css.js';
import '@arco-design/web-vue/es/link/style/css.js';
import '@arco-design/web-vue/es/card/style/css.js';
import '@arco-design/web-vue/es/tabs/style/css.js';
import '@arco-design/web-vue/es/table/style/css.js';
import '@arco-design/web-vue/es/list/style/css.js';
import '@arco-design/web-vue/es/tag/style/css.js';
const app = createApp(App);
app.use(router);

app.mount('#training');
