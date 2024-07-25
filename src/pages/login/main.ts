import makeLog from './loginView.vue';
import { createApp } from 'vue';
const app = createApp(makeLog);
import '@arco-design/web-vue/es/notification/style/css.js';
app.mount(`#login`);
