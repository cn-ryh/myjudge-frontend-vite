<script setup lang="ts">
import NavView from '@/modules/navView.vue';


window.onhashchange = () => {
    window.location.reload();
};
</script>

<template>
    <NavView></NavView>
    <div>
        <router-view></router-view>
    </div>
</template>

<style>

body {
    margin: 0% !important;
}
</style>