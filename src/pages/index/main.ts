import { createApp } from "vue";
import HomeItem from './HomeItem.vue';

const app = createApp(HomeItem);

import '@arco-design/web-vue/es/link/style/css.js';
import '@arco-design/web-vue/es/card/style/css.js';
import 'tdesign-vue-next/es/calendar/style/css.mjs';
import 'tdesign-vue-next/es/style/css.mjs';

app.mount(`#home`);