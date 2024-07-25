<script setup lang="ts">
import { ip } from '@/modules/ip';
import axios from 'axios';
import { ref } from 'vue';

import { Upload, Card, TabPane, Tabs, Select, Option, Steps, Step } from '@arco-design/web-vue';
import { NotifyPlugin, Button } from 'tdesign-vue-next';
const title = ref(``);
const description = ref(``);
const diff = ref(0);
const page = window.location.href;
const pid = ref(``);
if (page.substring(page.lastIndexOf(`/`) + 1) !== `problem`) {
    axios.get(`${ip}/getProblem/${page.substring(page.lastIndexOf(`/`) + 1)}`).then((res) => {
        const problem = res.data;
        description.value = problem.description;
        pid.value = problem.pid;
        title.value = problem.title;
        diff.value = problem.difficult;
    });
}

function changeProblem() {
    axios.post(`${ip}/changeProblem/${page.substring(page.lastIndexOf(`/`) + 1)}`, {
        title: title.value,
        description: description.value,
        difficult: diff.value
    }).then(() => {
        NotifyPlugin.success({ title: `更新成功` });
    });
}
const uploadPro = ref(1);
function uploadGen() {
    const gensh = (document.getElementById(`genSh`) as HTMLInputElement).value ?? ``;
    const gencpp = (document.getElementById(`genCpp`) as HTMLInputElement).value ?? ``;
    const stdcpp = (document.getElementById(`stdCpp`) as HTMLInputElement).value ?? ``;
    axios.post(`${ip}/uploadDataGen/${pid.value}`, {
        gensh, gencpp, std: stdcpp
    }).then((res) => {
        if(res.data.successUpload)
        {
            NotifyPlugin.success({ title: `上传成功` });
        }
        else
        {
            NotifyPlugin.error({
                title: `上传失败`,
                content: `请检查`
            })
        }
    });
}
function showSuccess()
{
    NotifyPlugin.success({
        title: `上传成功`
    })
}
</script>
<template>
    <Card style="width: 90%;margin-left: 5%;margin-top: 1%;">
        <div>
            <span> 题目编号 </span>
            <input id="problemIdInputer" v-model="pid">
        </div>
        <Tabs default-active-key="1">

            <TabPane key="1" title="管理">

                <div style="width: 40%; height: 32px;display: flex;">
                    <span>题目名称：</span>
                    <input v-model="title" id="title" style="outline: 0;flex: 1;font-size: large;" />
                </div><br>
                <br>
                <div>
                    <span>题目描述</span>
                    <br>
                    <textarea v-model="description" class="inputarea"
                        style="height: 30rem;width: 95%;resize: none;margin-left: 10px;"
                        placeholder="请输入题目描述，支持Markdown。"></textarea>
                </div>

                <br>
                <div>
                    <span>题目难度</span>
                    <Select v-model="diff" style="width:280px;margin-left: 2%;" placeholder="请选择题目难度">
                        <Option :value="1">普及 T1</Option>
                        <Option :value="2">普及 T2</Option>
                        <Option :value="3">普及 T3</Option>
                        <Option :value="4">普及 T4 / 提高 T1</Option>
                        <Option :value="5">提高 T2</Option>
                        <Option :value="6">提高 T3</Option>
                        <Option :value="7">提高 T4</Option>
                        <Option :value="8">省选</Option>
                        <Option :value="9">NOI</Option>
                        <Option :value="10">NOI+</Option>
                        <Option :value="0">暂无评定</Option>
                    </Select>
                    <Button @click="changeProblem" theme="primary">
                        提交
                    </Button>
                </div>
            </TabPane>
            <TabPane key="2" title="数据上传">
                <Tabs>
                    <TabPane key="1" title="上传数据生成器">
                        <Steps :current="uploadPro">
                            <Step>
                                上传 gen.cpp
                            </Step>
                            <Step>
                                上传 std.cpp
                            </Step>
                            <Step>
                                上传 gen.sh
                            </Step>
                        </Steps>
                        <br />
                        <div style="height: 65vh;">
                            <div style="width: 100%;height: 100%;" v-show="uploadPro == 1">
                                <div style="width: 20%;margin-left: 40%;text-align: center;">
                                    <p>在文本框填写 gen.cpp</p>
                                </div>
                                <div style="width: 100%;height: 70%;margin-top: 1%;">
                                    <textarea id="genCpp"
                                        style="width: 80%;margin-left: 10%; height: 90%;resize: none;"></textarea>
                                </div>
                                <Button theme="primary" style="width: 6%;margin-left: 47%;" @click="() => {
                                    ++uploadPro
                                }">下一步</Button>
                            </div>
                            <div style="width: 100%;height: 100%;" v-show="uploadPro == 2">
                                <div style="width: 20%;margin-left: 40%;text-align: center;">
                                    <p>在文本框填写 std.cpp</p>
                                </div>
                                <div style="width: 100%;height: 70%;margin-top: 1%;">
                                    <textarea id="stdCpp"
                                        style="width: 80%;margin-left: 10%; height: 90%;resize: none;"></textarea>
                                </div>

                                <Button theme="primary" style="width: 6%;margin-left: 44%;" @click="() => {
                                    --uploadPro
                                }">上一步</Button>
                                <Button theme="primary" style="width: 6%;" @click="() => {
                                    ++uploadPro
                                }">下一步</Button>
                            </div>
                            <div style="width: 100%;height: 100%;" v-show="uploadPro == 3">
                                <div style="width: 20%;margin-left: 40%;text-align: center;">
                                    <p>在文本框填写 gen.sh</p>
                                </div>
                                <div style="width: 100%;height: 70%;margin-top: 1%;">
                                    <textarea id="genSh"
                                        style="width: 80%;margin-left: 10%; height: 90%;resize: none;"></textarea>
                                </div>
                                <Button theme="primary" style="width: 6%;margin-left: 44%;" @click="() => {
                                    --uploadPro
                                }">上一步</Button>
                                <Button theme="success" style="width: 6%;" @click="() => {
                                    uploadGen();
                                }">完成</Button>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane key="2" title="上传压缩包">
                        <span>
                            <p>数据上传</p>
                            <Upload draggable :action="`${ip}/uploadData`" :name="pid" @success="showSuccess()" />
                        </span>
                    </TabPane>
                </Tabs>
            </TabPane>
        </Tabs>
    </Card>
</template>
<style>
#newProblem {
    width: 80%;
    margin: 0 auto;
}
</style>