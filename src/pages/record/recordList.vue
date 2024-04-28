<script setup>
import { ip } from "@/modules/ip";
import axios from "axios";
import { ref } from "vue";
import { Card, List } from '@arco-design/web-vue';
const tot = ref(0);
const records = ref([]);
const nowPage = window.location.href;
if (nowPage.split(`?`).length > 1) {
    axios.get(`${ip}/searchRecord?${nowPage.split(`?`)[1]}`).then(async (res) => {
        tot.value = res.data.length;
        records.value = res.data;
        records.value.reverse();
    }).catch((err) => {
        console.error(err);
    });
}
function getrecord() {
    const recordid = document.getElementById(`recordid`).value;
    const pid = document.getElementById(`pid`).value;
    const uid = document.getElementById(`user`).value;
    const state = document.getElementById(`state`).value;
    if (recordid !== ``) {
        window.location.href = `/record#/${recordid}`;
        return;
    }
    const searchOption = {};
    if (pid != `` && pid) {
        searchOption.problem = pid;
    }
    if (uid != `` && uid) {
        searchOption.user = uid;
    }
    if (state != `` && state) {
        searchOption.state = state;
    }
    if (Object.keys(searchOption).length === 0) {
        window.alert(`不提供所有提交记录的查询`);
        return;
    }
    let url = `/record#/list?`;
    for (const now in searchOption) {
        url += `${now}=${searchOption[now]}&`;
    }
    window.location.href = url;
    window.location.reload();
}

</script>

<template>
    <main>
        <Card style="height: 4rem;">
            <div style="margin-left: 15rem;">
                <span style="margin: 20px;margin-top: 5rem !important;">
                    <form action="" style="display: inline;">
                        <select name="state" id="state">
                            <option value="">全部状态</option>
                            <option value="Accept">Accept</option>
                            <option value="Unaccept">Unaccept</option>
                            <option value="Compile Error">Compile Error</option>
                        </select>
                    </form>
                    <input id="recordid" placeholder="记录编号" style="width: 12rem;height: 2rem;" />
                    <input id="pid" placeholder="题目编号" style="width: 12rem;height: 2rem;">
                    <input id="user" placeholder="用户" style="width: 12rem;height: 2rem;">

                    <button @click="getrecord()"> 确认 </button>
                </span>
                <span style="margin-right: 15px;"> 共 <b>{{ tot }}</b> 条记录 </span>
            </div>
        </Card>

        <List style="margin-top: 1rem;width: 90%;margin-left: 5%;" :data="records" :paginationProps="{
            total: records.length,
            pageSize: 10
        }">
            <template #item="{ item }">
                <div
                    style="font-size: 15px;padding-bottom: 10px;height: 2.3rem;border-bottom-style: outset;border-bottom-width: 2px;border-bottom-color: rgba(100, 100, 100, .2);padding-top: 1.2rem;">
                    <div style="display: inline-block;margin-left: 3rem;width: 32%;">
                        <span style="margin-right: 1rem;width: 30%;">
                            <a :href="`/user/${item.user}`">
                                <span style="font-weight: bold;">
                                    {{ item.username }}
                                </span>
                            </a>
                        </span>
                        <span class="lfe-caption" style="width: 40%;">
                            {{ item.submitTime }}
                        </span>
                    </div>
                    <div style="width: 12%;display: inline-block;">
                        <a :href="`/record#/${item.id}`">
                            <span :class="`State-${item.state}`.replace(/\s/g, ``)"
                                style="padding:1px 2px;font-size: large;font-weight: 420;">
                                {{ item.state }}
                            </span>
                        </a>
                    </div>
                    <div class="problem" style="width: 10%;display: inline-block;">
                        <div>
                            <a :href="`/problem#/${item.problem}`" style="color: rgb(10, 10, 230);">
                                <span class="pid">
                                    <b>{{ item.problem }}</b>
                                    {{ item.title }}
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="detail lfe-caption" style="display: inline-block;">
                        {{ item.sumtime }}ms
                        / {{ item.maxtime }}ms
                    </div>
                </div>
            </template>
        </List>
    </main>
</template>

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

.testcaseAC {
    background: rgba(88, 219, 23, 0.932);
}

.testcaseWA {
    background: rgb(231, 76, 60);
}

.testcase {
    position: relative;
    vertical-align: top;
    cursor: pointer;
    margin: 0.35em;
    height: 6em;
    width: 6em;
    padding: 0;
    color: #fff;
    display: inline-block;
    background-color: #0e90d2;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table caption {
    font-size: 2em;
    font-weight: bold;
    margin: 1em 0;
}

th,
td {
    border: 1px solid #999;
    text-align: center;
    padding: 20px 0;
}

table thead tr {
    background-color: #008c8c;
    color: #fff;
}

table tbody tr:nth-child(odd) {
    background-color: #eee;
}

table tbody tr:hover {
    background-color: #ccc;
}

table tbody tr td:first-child {
    color: #f40;
}

table tfoot tr td {
    text-align: right;
    padding-right: 20px;
}
</style>