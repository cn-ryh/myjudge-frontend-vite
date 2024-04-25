<script setup lang="ts">
import { ref } from 'vue';
const link = ref('');
link.value = window.location.href;
</script>
<template>
    <div style="width: 100vw;height: 80vh;margin-top: 10vh;padding: auto;">
        <div style="font-size: 20rem;width: 100vw;text-align: center;color: rgb(171,12,12);">
            404
        </div>
        <div style="width: 100vw;text-align: center;font-size: 5rem;">
            您访问的页面不存在
        </div>
        <div style="width: 100%;text-align: center;font-size: 1.2rem;margin-top: 5vh;"> 当前界面：{{ link }}
        </div>
    </div>
</template>