<script setup lang="ts">
import NavView from '@/modules/navView.vue';

</script>
<template>
    <NavView></NavView>
    <div style="margin-left: 100px;margin-top: 4rem;height: auto;">
        <router-view></router-view>
    </div>
</template>
<style>
body {
    margin: 0% !important;
}
</style>