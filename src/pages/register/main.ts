import { keepLogin } from '@/modules/user/getUserData';
import makeLog from './user-register.vue';
import { createApp } from 'vue';
import { NotifyPlugin } from 'tdesign-vue-next/es';
const app = createApp(makeLog);

try
{
    const loginRes = await keepLogin();
    if(loginRes.admin.All ||  loginRes.admin.user)
    {
        app.mount(`#register`);
    }
    else
    {
        NotifyPlugin.error({
            title: `无权限`,
            content: `请联系教练获取账户`
        })
        setTimeout(()=>{window.location.href = `/`},3000)
    }
}
catch(err)
{

    NotifyPlugin.error({
        title: `无权限`,
        content: `请联系教练获取账户`
    })
    setTimeout(() => { window.location.href = `/` }, 3000)

}
