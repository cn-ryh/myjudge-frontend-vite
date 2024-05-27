<script setup lang="ts">
import { ip } from "@/modules/ip";
import axios from "axios";
import { Ref, ref } from "vue";
const lastres: Ref<any[]> = ref([]);
const user = ref(``);
const time = ref(``);
const memory = ref(``);

const submitTime = ref(``);
const state = ref(``);
const title = ref(``);
const point = ref(0);
const problem = ref(``);
import { Link } from '@arco-design/web-vue';
import hljs from "highlight.js";
import 'highlight.js/styles/atom-one-light.min.css'
import { translateTime } from "@/modules/functions";
import { currectUser } from "@/modules/user/currectUser";
import { NotifyPlugin } from "tdesign-vue-next";

function showResult(res) {

    lastres.value = [];
    const num = res.detail.length;
    for (let i = 0; i < num; i++) {
        lastres.value.push(res.detail[i]);
    }
}
const nowView = ref(`Details`);

/**
 * @function tranformState 将服务端返回的完整结果转译成缩写
 * @param {string} res 服务端返回的测试点评测结果
 * @returns {string} 转译的结果
 */
function tranformState(state) {
    if (state == `Accept`) {
        return `AC`;
    }
    if (state == `Wrong Answer`) {
        return `WA`;
    }
    if (state == `Time Limit Error`) {
        return `TLE`;
    }
    if (state == `RunTime Error`) {
        return `RE`;
    }
    if (state == `Time Limit Error`) {
        return `TLE`;
    }
    return `UKE`;
}
const codes = ref(``);

function getrecord() {
    return new Promise<void>((reslove) => {
        const args = (window.location.href.split(`/`));
        const recordid = args[args.length - 1];
        if(!currectUser.uid || isNaN(currectUser.uid))
        {
            NotifyPlugin.error({
                title: `请先登录`
            });
            return ;
        }
        axios.post(`${ip}/getRecord/${recordid}`, {
            uid: currectUser.uid,
            token: currectUser.token
        }).then((res) => {
            const record = res.data;
            if (record != null && record != `` && record != undefined) {
                showResult(record);
                user.value = record.user;
                problem.value = record.problem;
                submitTime.value = translateTime(new Date(record.submitTime));
                user.value = record.username;
                state.value = record.state;
                time.value = (record.sumtime > 60000 ? `${(record.sumtime / 60000.00).toFixed(2)} min` : (record.sumtime > 1000 ? (`${(record.sumtime / 1000.00).toFixed(2)} s`) : (`${record.sumtime} ms`)));
                memory.value = record.memory + `MB`;
                codes.value = record.code;
                point.value = record.point;
                document.getElementById(`code-View`)!.innerHTML = hljs.highlight(codes.value, { language: `cpp` }).value;
                hljs.highlightAll();
                axios.get(`${ip}/getProblem/${problem.value}`).then((problemData) => {
                    title.value = problemData.data.title;
                    reslove();
                });
            }
            else {
                window.alert(`未找到提交记录`);
                window.location.href = `/`;
            }
        });
    }).catch((err) => {
        console.error(err);
    });

}
function changeView() {
    if (nowView.value == `Code`) {
        nowView.value = `Details`;
        $(`#recordDetails`).get()[0].style.width = `60%`;
        document.getElementById(`changeView`)!.innerText = `查看代码`;
    }
    else {
        nowView.value = `Code`;
        $(`#recordDetails`).get()[0].style.width = `80%`;
        document.getElementById(`changeView`)!.innerText = `查看测试点`;

    }
}
function tryGetting() {
    return new Promise<void>((resolve) => {
        getrecord().then(() => {
            if (state.value === 'Waiting' || state.value === 'Judging') {
                setTimeout(() => {
                    tryGetting().then(() => {
                        resolve();
                    });
                }, 1000);
            }
            else {
                resolve();
            }
        });
    });
}
tryGetting();
</script>

<template>
    <main>
        <div class="layui-row layui-col-space64">
            <div class="layui-col-md8">
                <button id="changeView" @click="changeView()">查看代码</button>
                <div v-show="nowView == `Details`">
                    <div v-for="(item, index) in lastres" class="testcase" :key="index">
                        <div :class="'testcase' + tranformState(item.state)"
                            style="text-align: center;width: 100%;height: 100%;">
                            <div style="padding-top: .7em;">
                                {{ `#${(index + 1)}` }}
                                <br />
                                {{ tranformState(item.state) }}
                                <br />
                                <span>{{ item.time }}ms</span>
                                <br />
                                <span>{{ item.memory.toFixed(1) }}MB</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="nowView == `Code`">
                    <pre><code id="code-View" style="font-size: larger;font-weight: 650;"></code></pre>
                </div>
            </div>
            <div class="layui-col-md4">
                <div class="recordInfo">
                    <div style="margin:4%;font-size: large;">
                        <div class="info-row">
                            提交者：{{ user }}
                        </div>
                        <div style="flex:1 0 auto;">
                            <div>
                                <span>
                                    所属题目：
                                </span>
                                <Link :href="`/problem#/${problem}`" class="link color-default"
                                    style="font-size: medium;margin-bottom: 0 !important;">
                                {{ (problem + ` ` + title).length < 20 ? (problem + ` ` + title) : ((problem + ` ` +
                                    title).substring(0, 16) + `...`) }} </Link>
                            </div>
                            <div>
                                <span>评测状态：</span>
                                <span :class="`State-${state}`" style="font-weight: 800;">
                                    {{ state }}
                                </span>
                            </div>
                            <div>
                                <span>得分：</span>
                                <span id="point" style="font-weight: bold;"
                                    :class="(point <= 30 ? `pointLow` : (point >= 70 ? `pointHigh` : `pointMid`))">
                                    {{ point }}
                                </span>
                            </div>
                            <div>
                                <span>用时：</span>
                                <span>{{ time }} </span>
                            </div>
                            <div>
                                <span>空间占用：</span>
                                <span>{{ memory }} </span>
                            </div>
                            <div>
                                <span>提交时间：</span>
                                <span>{{ submitTime }} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

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

.pointLow {
    color: rgb(231, 76, 60);
}

.pointMid {
    color: rgb(245, 138, 14);
}

.pointHigh {
    color: rgb(82, 196, 26);
}

a {
    /* color: #5e72e4 !important; */
    text-decoration: none;
}

.recordInfo * {
    margin-bottom: 10px;
    padding-top: 2%;
}

body * {
    text-indent: 0;
}

.recordDetails {
    display: block;
    width: 60%;
    margin-left: 7%;
    padding-top: 3%;
}

.recordInfo {
    background-color: #c5cee5;
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

#changeView {
    margin-bottom: 20px;
}

.testcaseAC {
    background: rgba(88, 219, 23, 0.932);
    border-radius: 25px;
}

.testcaseWA {
    background: rgb(231, 76, 60);
    border-radius: 25px;
}

.testcaseUKE {
    background: rgb(76, 31, 31);
    border-radius: 25px;
}

.testcaseTLE {
    background: rgb(5, 34, 66);
    border-radius: 25px;
}

.testcaseMLE {
    background: rgb(5, 34, 66);
    border-radius: 25px;
}

.testcase {
    position: relative;
    vertical-align: top;
    cursor: pointer;
    font-weight: 700;
    margin: 0.55rem;
    height: 6rem;
    width: 6rem;
    padding: 0;
    color: #fff;
    display: inline-block;
    border-radius: 45px;
}

code {
    font-family: Courier !important;
    font-size: medium !important;
}
</style>