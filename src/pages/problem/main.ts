import App from './routerLoader.vue';
import { router } from './loader';
import { createApp } from 'vue';

const app = createApp(App);
app.use(router);
import '@arco-design/web-vue/es/tag/style/css.js';
import '@arco-design/web-vue/es/tabs/style/css.js';
import '@arco-design/web-vue/es/table/style/css.js';
import '@arco-design/web-vue/es/card/style/css.js';
import '@arco-design/web-vue/es/link/style/css.js';
import { keepLogin } from '@/modules/user/getUserData';
import { NotifyPlugin } from 'tdesign-vue-next';
keepLogin().then((loginRes)=>
{
    if(loginRes.logined)
    {
        app.mount('#problemView');
    }
    else
    {
        NotifyPlugin.error({
            title: `请登录`,
            content: `登陆后才可查看题目`
        })
    }
}).catch((err)=>
{
    console.error(err)
    NotifyPlugin.error({
        title: `请登录`,
        content: `登陆后才可查看题目`
    })

})
