<script setup>
import NavView from '@/modules/navView.vue';


// window.location.reload();
window.onhashchange = () => {
    window.location.reload();
};
</script>

<template>
    <NavView></NavView>
    <router-view style="margin-top: 56px;"></router-view>
</template>

<style>
body {
    margin: 0% !important;
}
</style>