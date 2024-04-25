<script setup lang="ts">
import NavView from '@/modules/navView.vue';
import { keepLogin } from '@/modules/user/getUserData';

import { Notification } from '@arco-design/web-vue';
window.onhashchange = () => {
    window.location.reload();
};
keepLogin().then((res) => {
    if (res.admin == false) {
        // document = null
        // setTimeout(() => {
        const pd = document.createElement(`div`);
        pd.setAttribute(`style`, `position:fixed;top:0;left:0;width:10000px;height:100000px;background-color:white;z-index:2`);
        document.body.appendChild(pd);
        Notification.error({
            title: `无访问权限`,
            content: `无管理权限或未登录`,
            closable: false
        });
        setTimeout(() => { window.location.href = `/`; }, 3000);
    }
});
</script>

<template>
    <NavView></NavView>
    <div style="margin-top: 5rem;">
        <router-view></router-view>

    </div>
</template>
<style>
body {
    margin: 0% !important;
}
</style>