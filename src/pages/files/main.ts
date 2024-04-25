import Files from './filesView.vue';
import { createApp } from 'vue';

import '@arco-design/web-vue/es/upload/style/css.js';
import '@arco-design/web-vue/es/button/style/css.js';

const FilesApp = createApp(Files);
FilesApp.mount(`#files`);