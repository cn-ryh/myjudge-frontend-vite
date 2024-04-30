<script setup lang="ts">
import NavView from '@/modules/navView.vue';

window.onhashchange = () => {
    window.location.reload();
};
</script>
<template>
    <NavView></NavView>
    <router-view></router-view>
</template>