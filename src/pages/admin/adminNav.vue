<template>
    <Menu id="adminNav" theme="light" default-value="2-1" :collapsed="collapsed">
        <template #logo>
            <span>11 Online Judge 后台</span>
        </template>
        <MenuItem value="goBack" :href="`/`">
        <template #icon>
            <Icon name="rollback" />
        </template>
        回到前台
        </MenuItem>
        <MenuItem value="item1">
        <template #icon>
            <Icon name="dashboard" />
        </template>
        仪表盘
        </MenuItem>
        <MenuItem value="problem">
        <template #icon>
            <Icon name="address-book" />
        </template>
        题目管理
        </MenuItem>
        <MenuItem value="user">
        <template #icon>
            <Icon name="user" />
        </template>
        用户管理
        </MenuItem>

        <MenuItem value="item3">
        <template #icon>
            <Icon name="play-circle" />
        </template>
        视频区
        </MenuItem>
        <MenuItem value="item4" :disabled="true">
        <template #icon>
            <Icon name="edit-1" />
        </template>
        资源编辑
        </MenuItem>
        <template #operations>
            <Button class="t-demo-collapse-btn" variant="text" shape="square" @click="changeCollapsed">
                <template #icon>
                    <Icon :name="iconName" />
                </template>
            </Button>
        </template>
    </Menu>
</template>

<script setup>
import { Button, Icon, Menu, MenuItem, Submenu } from 'tdesign-vue-next';
import { ref, computed } from 'vue';

const collapsed = ref(false);

const iconName = computed(() => (collapsed.value ? 'chevron-right' : 'chevron-left'));

const changeCollapsed = () => {
    collapsed.value = !collapsed.value;
};
</script>

<style scoped>
#adminNav {
    position: -webkit-sticky;
    position: sticky;
    top: 10vh;
}
</style>