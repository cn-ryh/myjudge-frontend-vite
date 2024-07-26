<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
import { TabPane, Tabs, Card, Table, TableColumn, Link, Tag } from '@arco-design/web-vue';
import { translateTime } from '@/modules/functions';
import { render } from '@/modules/MarkdownIt/markdown';
import { currectUser } from '@/modules/user/currectUser';
import { keepLogin } from '@/modules/user/getUserData';
const id = ref(0);
const src = window.location.href;
id.value = +src.substring(src.lastIndexOf('/') + 1);
const title = ref('');
const description = ref('');
const problems: Ref<any[]> = ref([]);
const author = ref('');
const dashboard:Ref<any[]> = ref([]);
const type: Ref<string> = ref(`OI`);
const TimeRange: Ref<number[]> = ref([5999999999999,5999999999999]);
let admin:Ref<boolean> = ref(false);
keepLogin().then((loginRes)=>
{
    if(loginRes.admin.contest)
    {
        admin.value = true;
    }
})
const nowTime = new Date().getTime();
axios.get(`${ip}/getContest/${id.value}`).then((res) => {
    title.value = res.data.title;
    description.value = res.data.description;
    problems.value = res.data.problems;
    author.value = res.data.author;
    TimeRange.value[0] = res.data.begintime;
    TimeRange.value[1] = res.data.endtime;
    type.value = res.data.type;
    setTimeout(() => {
        document.getElementById('description')!.innerHTML = render(description.value);
    }, 1000);
});
axios.post(`${ip}/getDashBoard/${id.value}`,{
    uid: currectUser.uid,
    token:currectUser.token
}).then((res) => {
    console.log(res);
    dashboard.value = res.data.detail;
    dashboard.value.sort((a,b)=>{
        return b.totPoint - a.totPoint;
    })
}).catch((err)=>
{
    console.error(err);
});
</script>
<template>
    <main>
        <h1 style="width: 90%;text-align: center;height: 40px;">{{ title }}</h1>
        <div style="width: 90%;text-align: center;">
            <Tag>{{ type }}</Tag>
            &emsp;
            <Tag size="large">
                <div style="font-size: 1.05rem;">
                    {{ translateTime(new Date(TimeRange[0])) }}~{{ translateTime(new Date(TimeRange[1])) }}
                </div>
            </Tag>
        </div>
        <Card style="margin-top: 1rem;">
            <Tabs default-active-key="1">
                <TabPane key="1" title="比赛介绍">
                    <div>
                        <span id="description">
                        </span>
                    </div>
                </TabPane>
                <TabPane v-if="(() => { return new Date().getTime() > TimeRange[0]; })()" key="2" title="题目列表">
                    <div>
                        <Table :data="problems" size="medium">
                            <template #columns>
                                <TableColumn title="编号" data-index="pid">
                                </TableColumn>
                                <TableColumn title="题目名称" data-index="title">
                                    <template #cell="{ record }">
                                        <Link :href="`/problem/${record.pid}?contestId=${id}`">
                                        <span style="font-weight: 800;">
                                            {{ record.title }}
                                        </span>
                                        </Link>
                                    </template>
                                </TableColumn>
                            </template>
                        </Table>

                    </div>
                </TabPane>

                <TabPane key="3" title="排行榜" v-if="((type !== `OI`) || (TimeRange[1] < nowTime) || admin)">
                    <Table :data="dashboard" size="medium">
                        <template #columns>
                            <TableColumn title="用户名" data-index="username">
                            </TableColumn>
                            <TableColumn title="总分" data-index="totPoint">
                            </TableColumn>

                            <TableColumn v-for="(item, id) of problems" :title="item.pid" :key="(id)">
                                <template #cell="{ record }">
                                    {{ record.points[id] ? (record.points[id].point) : "" }}
                                </template>
                            </TableColumn>
                        </template>
                    </Table>
                </TabPane>
            </Tabs>
        </Card>
    </main>
</template>
