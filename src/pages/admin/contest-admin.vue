<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
import {  Card, Tabs, TabPane, Button } from '@arco-design/web-vue';
import { DateRangePicker, NotifyPlugin } from 'tdesign-vue-next';
import ProblemSelecter from '@/modules/problem/problemSelecter.vue';
import { IProblem } from '@/modules/interface';
const upproblems: Ref<IProblem[]> = ref([])
const title = ref('');
const description = ref('');
const page = window.location.href;
const TimeRange: Ref<string[]> = ref([]);

const id = ref('');
if (page.substring(page.lastIndexOf('/') + 1) !== 'contest') {
    axios.get(`${ip}/getContest/${page.substring(page.lastIndexOf('/') + 1)}`).then((res) => {
        const contest = res.data;
        description.value = contest.descriptionmd;
        id.value = contest.id;
        title.value = contest.title;
        upproblems.value = contest.problems;
        const l = new Date(contest.begintime), r = new Date(contest.endtime);

        TimeRange.value = [
            l.toLocaleString(),
            r.toLocaleString()];
    });
}

function changeTraining() {
    axios.post(`${ip}/changeContest/${page.substring(page.lastIndexOf('/') + 1)}`, {
        title: title.value,
        description: description.value,
        problems: upproblems.value,
        begintime: (new Date(TimeRange.value[0])).getTime(),
        endtime: (new Date(TimeRange.value[1])).getTime(),
    }).then(() => {
        NotifyPlugin.success({
            title: `成功`
        });
    });
}
</script>
<template>
    <Card style="width: 90%;margin: 5%;">
        <div>
            <span> 比赛编号 </span>
            <input id="problemIdInputer" v-model="id">
        </div>
        <Tabs default-active-key="1">
            <TabPane key="1" title="描述编辑">
                <h3>比赛名称</h3>
                <div style="width: 40%; height: 32px;display: flex;margin: 0 auto;">
                    <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
                </div><br>
                <br>
                比赛描述
                <br>
                <br>
                <textarea v-model="description" class="inputarea"
                    style="margin-bottom: 20px; height: 20rem;width: 95%;resize: none;margin-left: 10px;"
                    placeholder="请输入比赛描述，支持Markdown。"></textarea>

            </TabPane>
            <TabPane key="2" title="题目编辑">
                <ProblemSelecter v-model:upproblems="upproblems"></ProblemSelecter>
            </TabPane>

        </Tabs>
        <DateRangePicker v-model="TimeRange" enable-time-picker allow-input clearable />
        <br>
        <br>
        <Button @click="changeTraining()">
            确认更改
        </Button>
    </Card>
</template>
<style>
#newProblem {
    width: 80%;
    margin: 0 auto;
}
</style>