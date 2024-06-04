import axios from 'axios';
import { getCookie, setCookie } from '@/modules/cookie';
console.log(2);
window.ipChecked = false;
if (getCookie(`ipChecked`) === `true` && new Date().getTime() - (+(getCookie(`ipCheckTime`) ?? 0)) <= 3600000) {
    window.ipChecked = true;
    document.getElementById(`ipCheck`)!.style.display = `none`;
}
else {
    try {
        const res = await axios.get(`https://2024.ipchaxun.com/`)
        {
            console.log(res);
            const json = res.data; //获取到json字符串，还需解析
            if (!json.data.includes(`吉林`)) {
                window.alert(`地理信息错误！\n\n本网站仅限十一高使用，如有疑问请联系 cn_ryh.`);
                location.href = "https://www.luogu.com.cn";
            } else {
                setCookie(`ipChecked`, `true`, 1);
                setCookie(`ipCheckTime`, new Date().getTime().toString(), 1);
                window.ipChecked = true;
                document.getElementById(`ipCheck`)!.style.display = `none`;
            }
        }
    }
    catch (err) {
        console.error(err);
        window.alert(`ip 检查失败，可能是访问过于频繁，请不要重试了（`);
        window.location.href = `https://www.luogu.com.cn`
    }
}

while (!window.ipChecked) {
    await (async () => {
        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        })
    })();
}
import App from './routerLoader.vue';
import { router } from './loader';
import { createApp } from 'vue';
const app = createApp(App);
app.use(router);

app.mount('#chat');
