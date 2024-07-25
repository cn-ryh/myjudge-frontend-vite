<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
import { NotifyPlugin, Button } from "tdesign-vue-next";
import ProblemSelecter from '@/modules/problem/problemSelecter.vue';
import { IProblem } from '@/modules/interface';
import { currectUser } from '@/modules/user/currectUser';

const title = ref(``);
const description = ref(``);
document.title = `新建题单`;
const upproblems: Ref<IProblem[]> = ref([]);

function newTraining() {
    const problems: string[] = [];
    for (let now of upproblems.value) {
        problems.push(now.pid);
    }
    axios.post(`${ip}/newTraining`, {
        title: title.value,
        description: description.value,
        problems: upproblems,
        author: currectUser.uid
    }).then((res) => {
        if (res.data.success == true) {
            NotifyPlugin.success({
                title: "成功",
                content: `题单创建成功`
            });
        }

    });
}

</script>
<template>
    <main style="width: 90%;">
        <div class="card">

            <div style="display: flex;">
                <span style="flex: 0 0 6rem;">题单名称</span>
                <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;width: 40%;" />
            </div><br>
            <br>
            <div style="display: flex;">
                <span style="flex: 0 0 6rem;">题单描述</span>
                <div style="width: 100%;">
                    <textarea v-model="description" class="inputarea"
                        style="margin-bottom: 20px;padding:10px; height: 20rem;width: 95%;resize: none;margin-left: 10px;"
                        placeholder="请输入题单描述，支持Markdown。"></textarea>
                </div>
            </div>

            <br>
            <ProblemSelecter v-model:upproblems="upproblems"></ProblemSelecter>
            <br />
            <div style="display: flex;align-items: center;justify-content: center;">
                <Button @click="newTraining"> 确认新建 </Button>
            </div>
        </div>

    </main>
</template>