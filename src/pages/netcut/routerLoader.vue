<script setup lang="ts">
import navView from '@/modules/navView.vue';
window.onhashchange = () => {
    window.location.reload();
};
</script>

<template>
    <navView>
    </navView>
    <router-view style="margin-top: 8vh;"></router-view>
</template>
<style>
body {
    margin: 0% !important;
}
</style>