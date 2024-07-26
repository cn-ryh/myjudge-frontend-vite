<script setup lang="ts">
import { Ref, ref } from 'vue';
import { getProblem, Problem } from './getProblems';
import { Table, TableColumn, Tag } from "@arco-design/web-vue";
import { translateColor, translateDiff } from '@/modules/problem/translate';
import { AutoComplete, InputGroup } from 'tdesign-vue-next';
// window.location.
document.title = `题目列表`;
const problemList: Ref<Problem[]> = ref([]);
const options:Ref<string[]> = ref([]);
getProblem().then((res) => {
    problemList.value = res;
    for(let now of problemList.value)
    {
        options.value.push(`${now.pid} ${now.title}`);
    }
});
function jumpProblem(val:string)
{
    const pid = val.split(` `)[0];
    console.log(pid);
    window.open(`/problem/${pid}`)
}
</script>

<template>
    <main>
        <div id="problemList">
            <div class="card" style="height: 15vh;width: 100%;">
                <InputGroup>
                    <AutoComplete :onSelect="jumpProblem" style="width: 20rem;" :options="options" filterable highlight-keyword
                        placeholder="题目搜索" />
                </InputGroup>
            </div>
            <Table :pagination="{ pageSize: 20 }" :data="problemList" size="small" :bordered="false"
                style="width: 100%;margin-top: 5vh;">
                <template #columns>
                    <TableColumn title="题号" data-index="pid">
                    </TableColumn>
                    <TableColumn title="题目名称" data-index="title">
                        <template #cell="{ record }">
                            <a :href="`/problem/${record.pid}`">
                                <span style="font-weight: 800;">
                                    {{ record.title }}
                                </span>
                            </a>
                        </template>
                    </TableColumn>
                    <TableColumn title="题目难度" data-index="difficult">

                        <template #cell="{ record }">
                            <Tag :color="translateColor(record.difficult)">
                                {{ translateDiff(record.difficult) }}
                            </Tag>
                        </template>
                    </TableColumn>
                </template>
            </Table>
        </div>
    </main>

</template>

<style>
a {
    text-decoration: none;
    color: #3e5fe0;
}

button {
    background-color: none !important;
    width: auto !important;
    height: auto !important;
}

.progress-frame {
    box-sizing: border-box;
    background: #e8e8e8;
    border: 2px solid #e8e8e8;
    border-radius: 2px;
    height: 1em;
    overflow: hidden;
}

#problemList .arco-table-size-small .arco-table-cell {
    padding: 5.5px 10px;
}

#problemList th {
    height: 40px;
}
</style>