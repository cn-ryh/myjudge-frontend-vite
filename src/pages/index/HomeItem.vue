<script setup lang="ts">
import navView from "@/modules/navView.vue";
window.onhashchange = () => {
    window.location.reload();
};
</script>
<template>
    <navView></navView>
    <div id="page">
    </div>
</template>
<style>
a {
    text-decoration: none;
    color: #262626;
}

.menu {
    width: 90vw;
    height: 3rem;
    background-color: aquamarine;
}

main {
    background-color: rgb(71, 71, 104);
    flex: 1;
}

html body {
    height: 100%;
    margin: 0px !important;
}

.menu-obj {
    height: 4rem;
    width: 95px;
    display: inline-block;
    margin-top: auto;
    padding-top: .65rem;
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Noto Sans", "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans", "PingFang SC", "Segoe UI", "Microsoft YaHei", sans-serif;
    font-size: large;

}

.menu-obj .a {
    margin: auto;
}


:deep(.arco-layout-header),
:deep(.arco-layout-footer),
:deep(.arco-layout-sider-children),
:deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
}
</style>