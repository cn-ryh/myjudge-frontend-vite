<script setup lang="ts">
import navView from '@/modules/navView.vue';
window.onhashchange = () => {
    window.location.reload();
};
</script>

<template>
    <navView>
    </navView>
    <span style="width: 100vw;text-align: center;">
        *当前阶段，为节省服务器流量，网页不与服务器进行实时通讯，最新消息需要刷新才能获得
    </span>
    <router-view></router-view>
</template>
<style>
body {
    margin: 0% !important;
}
</style>