<script setup lang="ts">
import navView from "@/modules/navView.vue";
window.onhashchange = () => {
    window.location.reload();
};
</script>
<template>
    <navView></navView>
    <main>
    </main>
</template>
<style>
</style>