<script setup lang="ts">
import NavView from '@/modules/navView.vue';
import adminNav from './adminNav.vue';
import { keepLogin } from '@/modules/user/getUserData';
import { NotifyPlugin } from 'tdesign-vue-next';
import { ref, Ref } from 'vue';
window.onhashchange = () => {
    window.location.reload();
};
let haveAdmin: Ref<boolean> = ref(false);
keepLogin().then((res) => {
    for (let now in res.admin) {
        if (res.admin[now]) {
            haveAdmin.value = true;
            break;
        }
    }
    if (!haveAdmin.value) {
        NotifyPlugin.error({
            title: `无访问权限`,
            content: `无管理权限或未登录`,
        });
        setTimeout(() => { window.location.href = `/`; }, 3000);
    }
});
</script>

<template>
    <NavView></NavView>
    <div class="layui-row layui-col-space64" style="width: 100vw;">
        <div class="layui-col-sm2 layui-col-md2">
            <adminNav></adminNav>
        </div>
        <div class="layui-col-sm10 layui-col-md10">
            <router-view v-if="haveAdmin" style="margin-top: 5vh;"></router-view>
        </div>
    </div>
</template>
<style>
</style>