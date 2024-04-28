<script setup lang="ts">
import navView from "@/modules/navView.vue";
window.onhashchange = () => {
    window.location.reload();
};
</script>
<template>
    <navView></navView>
    <main>
        <div id="page" class="card" style="font-size: larger;">
            <h2>公告</h2>
            <br>
            <p>在 2024 年 4 月 1 日至 2024 年 4 月 24 日之间（具体时间未知），由于系统运行错误，出现了一次严重的数据丢失。</p>
            <p>经查看日志、排查代码，已于 2024 年 4 月 26 日晚间定位到问题代码，并对其进行了修正。</p>
            <p>由于在事故发生前完整构建了数据损耗应急预案，在事故发生后成功对题目、提交记录、用户信息等多个数据表进行了重构建与修复。</p>

            <p>目前，大多数功能恢复正常，少数前端界面存在渲染冲突，待修复。</p>
            <br>
            <p >2024.4.27 11 Online Judge cn_ryh</p>
        </div>

    </main>
</template>
<style>
</style>