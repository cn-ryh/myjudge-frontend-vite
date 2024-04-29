<script setup lang="ts">
import { ref } from 'vue';
import chatDetail from './chatDetail.vue';
import { NotifyPlugin } from 'tdesign-vue-next';
function getQueryVariable(variable: string) {
    const query = window.location.href.split(`?`)[1];
    if (!query) {
        return null;
    }
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (null);
}
const chatId = ref(window.location.hash.split(`/`)[1]??``);
if (chatId.value == `` || (!chatId.value.includes(`&`) && !chatId.value.includes(`-`)))
{
    NotifyPlugin.error({
        title: `对话不存在`,
        content: `请检查网址`
    })
}
console.log(chatId.value)
</script>
<template>
    <main style="height: 80vh;overflow-y: auto;overflow-x: hidden;padding: 4px;" class="card">
        <chatDetail v-if="chatId != `` && chatId" :chat-id="chatId"></chatDetail>
    </main>
</template>
<style>
</style>