<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { ref } from 'vue';
import { Notification, Button, Select, Option, Tabs, TabPane } from '@arco-design/web-vue';
import '@/modules/main.css'
document.title = `新建题目`;
const title = ref(``);
const description = ref(``);
const diff = ref(0);
function newProblem() {
    axios.post(`${ip}/newProblem`, {
        title: title.value,
        description: description.value,
        author: "cn_ryh",
        difficult: diff.value
    }).then((res) => {
        if (res.data.success == true) {
            Notification.success({
                title: "成功",
                content: `题目创建成功，pid为 ${res.data.pid}`
            });
            setTimeout(() => {
                window.location.href = `/admin#/problem/${res.data.pid}`;
            }, 3000);
        }

    });
}

</script>
<template>
    <div class="card" style="">
        <div>
            <span> 题目编号 </span>
            <input placeholder="自动分配" id="problemIdInputer" disabled>
        </div>
        <Tabs default-active-key="1">
            <TabPane key="1" title="管理">
                <div style="width: 40%; height: 32px;display: flex;">
                    <span>题目名称：</span>
                    <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
                </div><br>
                <br>
                <div>
                    <span>题目描述</span>
                    <br>
                    <textarea v-model="description" class="inputarea"
                        style="height: 28rem;width: 90%;resize: none;margin-left: 6%;padding: 5px 5px;"
                        placeholder="请输入题目描述，支持Markdown。"></textarea>
                </div>
                <br>
                <div>
                    <span>题目难度</span>
                    <Select v-model="diff" style="width:280px;margin-left: 2%;" placeholder="请选择题目难度">
                        <Option :value="1">普及 T1</Option>
                        <Option :value="2">普及 T2</Option>
                        <Option :value="3">普及 T3</Option>
                        <Option :value="4">普及 T4 / 提高 T1</Option>
                        <Option :value="5">提高 T2</Option>
                        <Option :value="6">提高 T3</Option>
                        <Option :value="7">提高 T4</Option>
                        <Option :value="8">省选</Option>
                        <Option :value="9">NOI</Option>
                        <Option :value="10">NOI+</Option>
                        <Option :value="0">暂无评定</Option>
                    </Select>
                    <Button @click="newProblem" type="primary">
                        新建题目
                    </Button>
                </div>
            </TabPane>
            <TabPane key="2" title="数据上传" disabled @click="() => { $notification.error(`需要先创建题目`) }">
            </TabPane>
        </Tabs>
    </div>

</template>