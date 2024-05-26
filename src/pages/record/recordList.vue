<script setup lang="ts">
import { ip } from "@/modules/ip";
import axios from "axios";
import { ref } from "vue";
import { List } from '@arco-design/web-vue';
import { Input, InputGroup, Option, Select } from "tdesign-vue-next";
import { Ref } from "vue";
import UserSign from "@/modules/user/userSign.vue";
import { translateTime } from "@/modules/functions";
const tot = ref(0);
const records: Ref<any[]> = ref([]);
const nowPage = window.location.href;
function getQueryVariable(variable: string) {
    const query = window.location.href.split(`?`)[1];
    if (!query) {
        return null;
    }
    const vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
        const pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return (null);
}
const searchOpinion: Ref<{ [key: string]: string }> = ref({})

searchOpinion.value.problem = getQueryVariable(`problem`)??``;
searchOpinion.value.user = getQueryVariable(`user`)??``;
searchOpinion.value.state = getQueryVariable(`state`)??``;
if (nowPage.split(`?`).length > 1) {
    axios.get(`${ip}/searchRecord?${nowPage.split(`?`)[1]}`).then((res) => {
        tot.value = res.data.length;
        records.value = res.data;
        records.value.reverse();
    }).catch((err) => {
        console.error(err);
    });
}

function getrecord() {

    if (searchOpinion.value["recordId"] && searchOpinion.value["recordId"] !== ``) {
        window.location.href = `/record#/${searchOpinion.value["recordId"]}`;
        return;
    }
    if (Object.keys(searchOpinion.value).length === 0) {
        window.alert(`不提供所有提交记录的查询`);
        return;
    }
    let url = `/record#/list?`;
    for (const now in searchOpinion.value) {
        if (searchOpinion.value[now] && searchOpinion.value[now] != ``)
        {
            url += `${now}=${searchOpinion.value[now]}&`;
        }
    }
    window.location.href = url;
    window.location.reload();
}

</script>

<template>
    <main style="width: 85%;">
        <div class="card">
            <div>
                <span style="margin-top: 5rem !important;">
                    <InputGroup separate>
                        <Select v-model="searchOpinion.state" placeholder="请选择记录状态" name="state" id="state"
                            style="width: 10rem;">
                            <Option value="">全部状态</Option>
                            <Option value="Accept">Accept</Option>
                            <Option value="UnAccept">UnAccept</Option>
                            <Option value="Compile Error">Compile Error</Option>
                        </Select>
                        <Input v-model="searchOpinion.recordId" placeholder="记录编号"
                            style="margin-left: 20px;display: inline-block;width: 12rem;height: 2rem;" />
                        <Input v-model="searchOpinion.problem" placeholder="题目编号"
                            style="display: inline-block;width: 12rem;height: 2rem;" />
                        <Input v-model="searchOpinion.user" placeholder="用户"
                            style="display: inline-block;width: 12rem;height: 2rem;" />
                    </InputGroup>
                    <button @click="getrecord()"> 确认 </button>
                </span>
                <span style="margin-right: 15px;"> 共 <b>{{ tot }}</b> 条记录 </span>
            </div>
        </div>
        <div style="margin-top: 40px;" class="card">
            <List :data="records" :paginationProps="{
                total: records.length,
                pageSize: 15
            }">
                <template #item="{ item }">
                    <div class="listItem" style="">
                        <div style="margin-left: 1rem;width: 28%;">
                            <UserSign fontColor="black" showTag showHeadImg :uid="item.user"></UserSign>
                        </div>
                        <div style="margin-left: 20px;width: 15%;">
                            {{ translateTime(new Date(item.submitTime)) }}
                        </div>
                        <div style="width: 12%;">
                            <a :href="`/record#/${item.id}`">
                                <span :class="`State-${item.state}`.replace(/\s/g, ``)"
                                    style="padding:1px 2px;font-size: large;font-weight: 420;">
                                    {{ item.state }}
                                </span>
                            </a>
                        </div>
                        <div class="problem" style="width: 10%;">
                            <div>
                                <a :href="`/problem#/${item.problem}`" style="color: rgb(10, 10, 230);">
                                    <span class="pid">
                                        <b>{{ item.problem }}</b>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div class="detail lfe-caption" style="display: inline-block;color: rgba(200,200,200,.9);">
                            <span style="display: inline-block;width: 7.5rem;">最大时间 {{ item.maxtime < 1000 ?
                                `${item.maxtime}ms` : `${(item.maxtime / 1000.00).toFixed(2)}s` }}</span>
                                    <span style="display: inline-block;width: 7.5rem;margin-left: 1rem;">总时间 {{
                                        item.sumtime < 1000 ? `${item.sumtime}ms` : `${(item.sumtime /
                                            1000.00).toFixed(2)}s` }}</span>
                                            <span style="display: inline-block;margin-left: 1rem;">内存 {{ item.memory
                                                }}MB</span>
                        </div>
                    </div>
                </template>
            </List>
        </div>
    </main>
</template>
<style scoped>
.listItem {
    display: flex;
    align-items: center;
    font-size: 15px;
    height: 3.5rem;
    border-bottom-style: outset;
    border-bottom-width: 2px;
    border-bottom-color: rgba(100, 100, 100, .2);
}
</style>
<style>
.State-Accept {
    color: rgb(82, 196, 26) !important;
}

.State-UnAccept {
    color: rgb(255, 23, 23) !important;
}

.State-UnShown {
    color: black !important;
}

/* 圆角下拉框 */
select {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 5px;
    width: 10rem;
    border: none;
    background: #beeba8;
    font-size: medium;

    padding: 10px;
}

section * {
    font-size: medium;
}

.row {
    height: 4rem;
    background-color: azure;
}

.rows> :not(:last-child) {
    border-bottom-style: outset;
    border-bottom-width: 3px;
    border-bottom-color: #ccc;
}

.row>* {
    margin: 0 1rem;
}

.row * {
    display: inline-block;
}

button {
    border-radius: 5px;
    margin-right: 0 !important;
    color: #fff;
    background-color: #0e90d2;
    border-color: #0e90d2;

    display: inline-block;
    margin-bottom: 0;
    padding: .5em 1em;
    font-size: 1.rem;
    font-weight: 400;
    line-height: 1.2;
    text-align: center;
    white-space: nowrap;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 0;
    cursor: pointer;
    outline: 0;
    user-select: none;
    -webkit-transition: background-color 300ms ease-out, border-color 300ms ease-out;
    transition: background-color 300ms ease-out, border-color 300ms ease-out;

}
</style>