<script setup lang="ts">
import 'tdesign-vue-next/es/style/css';

import '@arco-design/web-vue/es/table/style/css.js';
import '@arco-design/web-vue/es/select/style/css.js';
import '@arco-design/web-vue/es/link/style/css.js';
import '@arco-design/web-vue/es/tag/style/css.js';
import { translateColor, translateDiff } from '@/modules/problem/translate'
import { Button, Link, Tag, Table, TableColumn } from '@arco-design/web-vue';
import { ref, Ref } from 'vue';
import { AutoComplete, AutoCompleteOption, AutoCompleteOptionObj, NotifyPlugin } from 'tdesign-vue-next';
import axios from 'axios';
import { ip } from '@/modules/ip';
import { IProblem } from '../interface';
const problemList: Ref<IProblem[]> = ref([]);
const props = defineProps<{
    upproblems: IProblem[]
}>()
const emit = defineEmits(['update:upproblems'])
const nowProblem = ref(``);
const options: Ref<AutoCompleteOption[]> = ref([]);
axios.get(`${ip}/getProblemList`).then((res) => {
    options.value = [];
    problemList.value = res.data.problems;
    for (const now of res.data.problems) {
        options.value.push(`${now.pid} ${now.title}`);
    }
});
function filterWords(keyword: string, option: AutoCompleteOption) {
    const regExp = new RegExp(keyword);
    return regExp.test((option as AutoCompleteOptionObj).text!);
}
function addToTable() {
    if (nowProblem.value !== ``) {
        const id = nowProblem.value.split(` `)[0];
        if (!id) {
            NotifyPlugin.error({ title: `题目未找到`, content: `您选择的题目 ${nowProblem.value} 未找到` });
            return;
        }
        const x = problemList.value.filter((item) => {
            return item.pid == id;
        })[0];
        if (!x) {
            NotifyPlugin.error({ title: `题目未找到`, content: `您选择的题目 ${nowProblem.value} 未找到` });
            return;
        }
        if (props.upproblems.includes(x)) {
            NotifyPlugin.warning({ title: `题目已存在`, content: `您选择的题目 ${nowProblem.value} 已经存在，你可以拖动改变位置` });
            return;
        }
        emit(`update:upproblems`, props.upproblems.concat([x]))
        console.log(props.upproblems);
        nowProblem.value = ``;
    }
    else {
        return;
    }
}
function removeFromTable(pid: string) {
    emit(`update:upproblems`, props.upproblems.filter((item) => { return item.pid !== pid }));
}
const handleChange = (_data: IProblem[]) => {
    emit(`update:upproblems`,_data);
};
</script>
<template>
    <div>
        <span>请选择题目：</span>
        <AutoComplete v-model="nowProblem" :options="options" :filter="filterWords" highlight-keyword
            placeholder="请输入题目编号或标题" style="width: 280px;display: inline-block;" />
        <Button @click="addToTable()">确认</Button>

        <Table @change="handleChange as Function" style="margin-top: 20px;" :data="upproblems"
            :draggable="{ type: 'handle', width: 40 }">
            <template #columns>
                <TableColumn title="题号" data-index="pid">
                </TableColumn>
                <TableColumn title="题目名称" data-index="title">
                    <template #cell="{ record }">
                        <Link :href="`/problem#/${record.pid}`">
                        <span style="font-weight: 800;">
                            {{ record.title }}
                        </span>
                        </Link>
                    </template>
                </TableColumn>
                <TableColumn title="题目难度" data-index="difficult">
                    <template #cell="{ record }">
                        <Tag :color="translateColor(record.difficult)">
                            {{ translateDiff(record.difficult) }}
                        </Tag>
                    </template>
                </TableColumn>
                <TableColumn title="移除" data-index="difficult">
                    <template #cell="{ record }">
                        <Button @click="removeFromTable(record.pid)">移除题目</Button>
                    </template>
                </TableColumn>
            </template>
        </Table>
    </div>
</template>