<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import {  ref } from 'vue';
import { Card, Notification, Button, TabPane, Tabs } from '@arco-design/web-vue';

const title = ref(``);
const description = ref(``);
const page = window.location.href;
const upproblems = ref([]);

const id = ref(``);

function changeTraining() {
    axios.post(`${ip}/changeTraining/${page.substring(page.lastIndexOf(`/`) + 1)}`, {
        title: title.value,
        description: description.value,
        problems: upproblems.value
    }).then(() => {
        Notification.success(`更新成功`);
    });
}

</script>
<template>
    <Card style="width: 90%;margin: 5%;">
        <div>
            <span> 题单编号 </span>
            <input id="problemIdInputer" v-model="id">
        </div>
        <Tabs default-active-key="1">
            <TabPane key="1" title="描述编辑">
                <h3>题单名称</h3>
                <div style="width: 40%; height: 32px;display: flex;margin: 0 auto;">
                    <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
                </div><br>
                <br>
                题单描述
                <br>
                <br>
                <textarea v-model="description" class="inputarea"
                    style="margin-bottom: 20px; height: 20rem;width: 95%;resize: none;margin-left: 10px;"
                    placeholder="请输入题单描述，支持Markdown。"></textarea>

            </TabPane>
            <TabPane key="2" title="题目编辑">
            </TabPane>

        </Tabs>
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