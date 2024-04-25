<script setup>
import NavView from '@/modules/navView.vue';


// window.location.reload();
window.onhashchange = () => {
    window.location.reload();
};
</script>

<template>
    <NavView></NavView>
    <div style="margin-top: 4rem;">
        <router-view></router-view>
    </div>
</template>

<style>
body {
    margin: 0% !important;
}
</style>