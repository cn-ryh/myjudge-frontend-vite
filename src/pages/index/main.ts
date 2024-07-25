import { createApp } from "vue";
import HomeItem from './HomeItem.vue';
import '@arco-design/web-vue/es/card/style'
const app = createApp(HomeItem);


app.mount(`#home`);