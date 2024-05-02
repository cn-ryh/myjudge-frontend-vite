<script setup lang="ts">
import adminNav from './adminNav.vue';
import { keepLogin } from '@/modules/user/getUserData';
import '@/modules/layui-v2.9.8/layui/css/layui.css'
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
    <div class="layui-row" style="width: 95%;">
        <div class="layui-col-sm2 layui-col-md2">
            <adminNav></adminNav>
        </div>
        <div class="layui-col-sm10 layui-col-md10">
            <router-view v-if="haveAdmin" style="margin-top: 5vh;"></router-view>
        </div>
    </div>
</template>
<style>
body {
    margin: 0% !important;
}
</style>