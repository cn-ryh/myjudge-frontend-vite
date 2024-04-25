<script setup lang="ts">
import NavView from '@/modules/navView.vue';

window.onhashchange = () => {
    window.location.reload();
};
</script>
<template>
    <NavView></NavView>
    <div style="margin-top: 8vh;">
        <router-view></router-view>
    </div>
</template>