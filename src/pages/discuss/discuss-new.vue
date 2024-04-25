<script setup lang="ts">
import { ip } from '@/modules/ip';
import { currectUser } from '@/modules/user/currectUser';
import axios from 'axios';
import { Form, FormItem, Select, Option, Input, Button, NotifyPlugin } from 'tdesign-vue-next';
import { Ref, ref } from 'vue';
const discussTypes: Ref<string[]> = ref([`problem`, `tool`, `workOrder`, `language`, `firstExam`, `other`]);
const discussTypesDisplay: Ref<string[]> = ref([`题目专版`, `工具链`, `工单`, `语言相关`, `初试相关`, `其他`]);

document.title = `创建讨论`

function getQueryVariable(variable: string) {
    const query = window.location.href.split(`?`)[1];
    if (!query) {
        return null;
    }
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        console.log(pair[0], variable)
        console.log(pair[0] == variable)
        if (pair[0] == variable) {
            console.log(`pair`);
            return pair[1];
        }
    }
    return (null);
}
const type: Ref<string> = ref(getQueryVariable(`type`) ?? ``);
const title: Ref<string> = ref(''), value: Ref<string> = ref(``), problem: Ref<string> = ref(``);
function newDiscussion() {
    if (title.value === ``) {
        NotifyPlugin.error({
            closeBtn: true,
            title: `内容错误`,
            content: `请填写标题`
        });
        return;
    }
    if (value.value === ``) {
        NotifyPlugin.error({
            closeBtn: true,
            title: `内容错误`,
            content: `请填写讨论内容`
        });
        return;
    }
    if (type.value === ``) {
        NotifyPlugin.error({
            closeBtn: true,
            title: `内容错误`,
            content: `请选择讨论板块`
        });
        return;
    }
    if (type.value === `problem`) {
        if (!/^(B|P|M)/.test(problem.value)) {
            NotifyPlugin.error({
                closeBtn: true,
                title: `内容错误`,
                content: `题号应以 B、P、M 开头`
            })
            return;
        }
    }
    axios.post(`${ip}/newDiscussion`,
        {
            uid: currectUser.uid,
            token: currectUser.token,
            title: title.value,
            type: type.value,
            value: value.value
        }
    ).then((createRes) => {
        if (createRes.data.code === 0) {
            NotifyPlugin.success({
                closeBtn: true,
                title: `创建成功`,
                content: `即将跳转到讨论界面`
            })
            setTimeout(() => {
                window.location.href = `/discuss#/${createRes.data.data.id}`;
            }, 2000)
        }
        else {
            NotifyPlugin.error({
                title: `创建失败`,
                content: `请查看日志`
            })
            console.error(createRes.data.error);
        }
    }).catch((err) => {
        console.error(err);
        NotifyPlugin.error({
            title: `创建失败`,
            content: `请查看日志`
        })
    })
}
</script>
<template>
    <div>
        <main>
            <div class="card">
                <h1 style="text-align: center;">创建讨论</h1>
                <Form style="margin-top: 20px;">
                    <FormItem requiredMark label="讨论类型">
                        <Select v-model="type">
                            <Option v-for="(item, index) of discussTypes" :key="item"
                                :label="discussTypesDisplay[index]" :value="discussTypes[index]">
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem v-if="type === `problem`" requiredMark label="关联题目" help="请填写完整题号，不要有多余空格">
                        <Input v-model="problem"></Input>
                    </FormItem>
                    <FormItem requiredMark label="标题">
                        <Input v-model="title"></Input>
                    </FormItem>
                    <FormItem requiredMark label="内容">
                        <textarea v-model="value" style="width: 80vw;height: 40vh;padding: 10px;"></textarea>
                    </FormItem>
                    <FormItem>
                        <Button type="submit" @click="newDiscussion">确认新建</Button>
                    </FormItem>
                </Form>

            </div>
        </main>
    </div>
</template>
<style></style>