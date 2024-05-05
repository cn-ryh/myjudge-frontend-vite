import { createApp } from "vue";
import HomeItem from './HomeItem.vue';

const app = createApp(HomeItem);


app.mount(`#home`);