<script setup>

import { ip } from '@/modules/ip';
import axios from 'axios';
import { ref } from 'vue';
const trainings = ref([]);
import { List,ListItem,ListItemMeta,Avatar } from '@arco-design/web-vue';
axios.get(`${ip}/getTrainingList`).then((res) => {
    trainings.value = res.data;
});
</script>
<template>
    <h1 style="text-align: center;width: 90%;">题单列表</h1>
    <div style="margin-top: 3rem;margin-left: 10%;">
        <List style="width: 80%;" :data="trainings" :pagination-props="{
            total: trainings.length,
            pageSize: 10,
        }" :split="true">
            <template #item="{ item, index }">
                <div style="margin: 10px;border-bottom-style: outset;border-bottom-width: 2px;">
                    <a :href="`/training#/${item.id}`">
                        <ListItem :key="index">
                            <ListItemMeta :title="item.title" :description="item.title + `题单`">
                                <template #avatar>
                                    <Avatar shape="square" style="background-color: aqua;">
                                        {{ index + 1 }}
                                    </Avatar>
                                </template>
                            </ListItemMeta>
                        </ListItem>
                    </a>
                </div>

            </template>
        </List>
    </div>
</template>

<style>
a {
    text-decoration: none;
}
</style>

