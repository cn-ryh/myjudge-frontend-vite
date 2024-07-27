<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { ref } from 'vue';
import { NotifyPlugin, Button, Select, Option, Tabs, TabPanel } from 'tdesign-vue-next';
import '@/modules/main.css'
import { currectUser } from '@/modules/user/currectUser';
document.title = `新建题目`;
const title = ref(``);
const description = ref(``);
const diff = ref(0);
const type = ref(`P`);
console.log(1);
function newProblem() {
    axios.post(`${ip}/newProblem`, {
        title: title.value,
        description: description.value,
        author: currectUser.uid,
        difficult: diff.value,
        type: type.value
    }).then((res) => {
        if (res.data.success == true) {
            NotifyPlugin.success({
                title: "成功",
                content: `题目创建成功，pid为 ${res.data.pid}`
            });
            setTimeout(() => {
                window.location.href = `/admin/problem/${res.data.pid}`;
            }, 3000);
        }

    });
}

</script>
<template>
    <div class="card">
        <div>
            <span> 题目编号 </span>
            <input placeholder="自动分配" id="problemIdInputer" disabled>
        </div>
        <Tabs :default-value="1">
            <TabPanel :value="1" label="题目信息">
                <div style="height: 32px;display: flex;">
                    <span style="flex: 0 1 6rem; font-size: 1.1rem; ">题库：</span>
                    <Select v-model=" type" style="width:280px;" placeholder="请选择题库">
                        <Option label="入门题库" :value="`B`">入门题库</Option>
                        <Option label="主题库" :value="`P`">主题库</Option>
                        <Option label="精英题库" :value="`M`">精英题库</Option>
                    </Select>
                </div><br>
                <div style="height: 32px;display: flex;">
                    <span style="flex: 1 1 7rem; font-size: 1.1rem;">题目名称：</span>
                    <input v-model="title" id="title" style="width: 100%;outline: 0;font-size: large;" />
                </div><br>
                <br>
                <div style="display: flex;flex-direction: row;">
                    <span style="flex: 1 1 7rem; font-size: 1.1rem;">题目描述：</span>
                    <textarea v-model="description" class="inputarea"
                        style="height: 28rem;width: 100%;resize: none;padding: 5px 5px;"
                        placeholder="请输入题目描述，支持Markdown。"></textarea>
                </div>
                <br>
                <div style="display: flex;flex-direction: row;">
                    <span style="flex: 0 1 6rem; font-size: 1.1rem;">题目难度</span>
                    <Select v-model="diff" style="width:280px;margin-left: 2%;" placeholder="请选择题目难度">
                        <Option label="普及 T1" :value="1">普及 T1</Option>
                        <Option label="普及 T2" :value="2">普及 T2</Option>
                        <Option label="普及 T3" :value="3">普及 T3</Option>
                        <Option label="普及 T4 / 提高 T1" :value="4">普及 T4 / 提高 T1</Option>
                        <Option label="提高 T2" :value="5">提高 T2</Option>
                        <Option label="提高 T3" :value="6">提高 T3</Option>
                        <Option label="提高 T4" :value="7">提高 T4</Option>
                        <Option label="省选" :value="8">省选</Option>
                        <Option label="NOI" :value="9">NOI</Option>
                        <Option label="NOI+" :value="10">NOI+</Option>
                        <Option label="暂无评定" :value="0">暂无评定</Option>
                    </Select>
                </div>
                <br />
                <Button @click="newProblem" theme="primary">
                    新建题目
                </Button>
            </TabPanel>
            <TabPanel value="2" label="数据上传" disabled @click="() => { $notification.error(`需要先创建题目`) }">
            </TabPanel>
        </Tabs>
    </div>

</template>