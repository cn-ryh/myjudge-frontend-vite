<script setup lang="ts">
import NavView from '@/modules/navView.vue';


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
blockquote {
    background-color: rgba(247, 247, 247, 0.829);
    border-left-width: 8px;
    border-left-style: inset;
    border-left-color: rgba(213, 210, 210, 0.438);

    border-top-width: 2px;
    border-top-style: inset;
    border-top-color: rgba(213, 210, 210, 0.438);

    border-right-width: 2px;
    border-right-style: inset;
    border-right-color: rgba(213, 210, 210, 0.438);
    border-top-width: 2px;

    border-bottom-style: outset;
    border-bottom-width: 2px;
    border-bottom-color: rgba(213, 210, 210, 0.438);

    padding-left: 10px;
    padding-top: 20px;
    padding-bottom: 20px;
}

body {
    margin: 0% !important;
}
</style>