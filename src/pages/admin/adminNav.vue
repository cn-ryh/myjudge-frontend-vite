<template>
    <div style="position: relative;margin-top: 10vh;z-index: 999;">
        <Menu width="12vw" id="adminNav" theme="light" :collapsed="collapsed">
            <template #logo>
                <span>11OJ</span>
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
    </div>
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

</style>