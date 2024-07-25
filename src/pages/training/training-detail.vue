<script setup>
import { ip } from "@/modules/ip";
import axios from "axios";
import { ref } from "vue";
import { translateColor, translateDiff } from "@/modules/problem/translate";
const id = ref(0);
const src = window.location.href;
id.value = src.substring(src.lastIndexOf(`/`) + 1);
const title = ref(``);
const description = ref(``);
const problems = ref([]);
const author = ref(``);
import { Tabs, TabPane, Table, TableColumn, Tag, Link, Card } from '@arco-design/web-vue';
import { render } from "@/modules/MarkdownIt/markdown";
axios.get(`${ip}/getTraining/${id.value}`).then((res) => {
    title.value = res.data.title;
    description.value = res.data.description;
    problems.value = res.data.problems;
    console.log(problems.value);
    author.value = res.data.author;
    document.getElementById(`description`).innerHTML = render(description.value);
});

</script>
<template>

    <main>
        <h1 style="text-align: center;">{{ title }}</h1>
        <Card>
            <Tabs default-active-key="1">
                <TabPane key="1" title="题单介绍">
                    <div>
                        <span id="description" style="font-size: 15px;"></span>
                    </div>
                </TabPane>
                <TabPane key="2" title="题目列表">
                    <div>
                        <Table :data="problems" size="medium">
                            <template #columns>
                                <TableColumn title="题号" data-index="pid" :sortable="true"></TableColumn>
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
                                <!-- </a> -->
                            </template>
                        </Table>
                    </div>
                </TabPane>
            </Tabs>
        </Card>
    </main>
</template>
