<script setup lang="ts">
import adminNav from './adminNav.vue';
import { keepLogin } from '@/modules/user/getUserData';

import { Notification } from '@arco-design/web-vue';
import { ref, Ref } from 'vue';
window.onhashchange = () => {
    window.location.reload();
};
let haveAdmin:Ref<boolean> = ref(false);
keepLogin().then((res) => {
    for (let now in res.admin) {
        if (res.admin[now]) {
            haveAdmin.value = true;
            break;
        }
    }
    if (!haveAdmin.value) {
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
    <adminNav></adminNav>
    <router-view v-if="haveAdmin"></router-view>
</template>
<style>
body {
    margin: 0% !important;
}
</style>