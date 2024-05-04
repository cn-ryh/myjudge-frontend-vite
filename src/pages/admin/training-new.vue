<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { Ref, ref } from 'vue';
import { Notification, Button } from '@arco-design/web-vue';
import ProblemSelecter from '@/modules/problem/problemSelecter.vue';
import { IProblem } from '@/modules/interface';
import { currectUser } from '@/modules/user/currectUser';

const title = ref(``);
const description = ref(``);
document.title = `新建题单`;
const upproblems:Ref<IProblem[]> = ref([]);

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
            Notification.success({
                title: "成功",
                content: `题单创建成功`
            });
        }

    });
}

</script>
<template>
    <Card>
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
        <br>
        <ProblemSelecter v-model:upproblems="upproblems"></ProblemSelecter>
        <Button @click="newTraining"> 确认新建 </Button>
    </Card>
</template>