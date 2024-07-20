<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
const contests:Ref<any[]> = ref([]);
import { Card, Link, Tag } from '@arco-design/web-vue';
axios.get(`${ip}/getContestList`).then((res) => {
    contests.value = res.data;
});
function translateTime(date: Date) {
    const year = date.getFullYear().toString().padStart(4, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    const second = date.getSeconds().toString().padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}
</script>
<template>
    <main>
        <h1 style="text-align: center">比赛列表</h1>
        <div class="card">
            <div class="" style="text-align: center;">
                <a :href="`/contest#/${item.id}`" v-for="(item, index) of contests" :key="index">
                    <Card size="small" style="width: 30%;display: inline-block;height: auto;margin: 3% 2%;"
                        :title="item.title">
                        <template #extra>
                            <Link :href="`/contest#/${item.id}`">查看详情</Link>
                        </template>
                        <Tag>{{ item.type }}</Tag>
                        <br>
                        <br>
                        <span>
                            {{
                            `${translateTime(new Date(item.begintime))}~ ${translateTime(new Date(item.endtime))}`
                            }}
                        </span>
                    </Card>
                </a>

            </div>
        </div>
    </main>
</template>

<style>
a {
    text-decoration: none;
}
</style>
