<script setup lang="ts">
import { translateColor, translateDiff } from "@/modules/problem/translate";
import { Ref, ref } from "vue";
import axio from "axios";
import { ip } from '@/modules/ip';
import { keepLogin } from "@/modules/user/getUserData";
import { Button, Link, NotifyPlugin, Tag } from "tdesign-vue-next";
import { editor } from 'monaco-editor'
import UserSign from "@/modules/user/userSign.vue";
import { IDiscussion, IProblem } from "@/modules/interface";

import { markdownit } from "@/modules/MarkdownIt/markdown";
import { getQueryVariable, translateTime } from "@/modules/functions";
let monacoInstance: editor.IStandaloneCodeEditor;
setTimeout(() => {
    monacoInstance = editor.create(document.getElementById("codeInputer")!, {
        value: `#include <bits/stdc++.h>
using namespace std;
signed main()
{
    return 0;
}`, language: "cpp",
        acceptSuggestionOnCommitCharacter: true, // 接受关于提交字符的建议
        acceptSuggestionOnEnter: 'on', // 接受输入建议 "on" | "off" | "smart" 
        accessibilityPageSize: 10, // 辅助功能页面大小 Number 说明：控制编辑器中可由屏幕阅读器读出的行数。警告：这对大于默认值的数字具有性能含义。
        accessibilitySupport: 'on', // 辅助功能支持 控制编辑器是否应在为屏幕阅读器优化的模式下运行。
        autoClosingBrackets: 'always', // 是否自动添加结束括号(包括中括号) "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoClosingDelete: 'always', // 是否自动删除结束括号(包括中括号) "always" | "never" | "auto"
        autoClosingOvertype: 'always', // 是否关闭改写 即使用insert模式时是覆盖后面的文字还是不覆盖后面的文字 "always" | "never" | "auto"
        autoClosingQuotes: 'always', // 是否自动添加结束的单引号 双引号 "always" | "languageDefined" | "beforeWhitespace" | "never"
        autoIndent: "full", // 控制编辑器在用户键入、粘贴、移动或缩进行时是否应自动调整缩进
        automaticLayout: true, // 自动布局
        codeLens: true, // 是否显示codeLens 通过 CodeLens，你可以在专注于工作的同时了解代码所发生的情况 – 而无需离开编辑器。 可以查找代码引用、代码更改、关联的 Bug、工作项、代码评审和单元测试。
        codeLensFontFamily: "", // codeLens的字体样式
        codeLensFontSize: 14, // codeLens的字体大小
        colorDecorators: false, // 呈现内联色彩装饰器和颜色选择器
        comments: {
            ignoreEmptyLines: true, // 插入行注释时忽略空行。默认为真。
            insertSpace: true // 在行注释标记之后和块注释标记内插入一个空格。默认为真。
        }, // 注释配置
        contextmenu: true, // 启用上下文菜单
        columnSelection: false, // 启用列编辑 按下shift键位然后按↑↓键位可以实现列选择 然后实现列编辑
        autoSurround: "languageDefined", // 是否应自动环绕选择
        copyWithSyntaxHighlighting: true, // 是否应将语法突出显示复制到剪贴板中 即 当你复制到word中是否保持文字高亮颜色
        cursorBlinking: 'solid', // 光标动画样式
        cursorSmoothCaretAnimation: "on", // 是否启用光标平滑插入动画  当你在快速输入文字的时候 光标是直接平滑的移动还是直接"闪现"到当前文字所处位置
        cursorStyle: "line",
        cursorSurroundingLines: 0, // 光标环绕行数 当文字输入超过屏幕时 可以看见右侧滚动条中光标所处位置是在滚动条中间还是顶部还是底部 即光标环绕行数 环绕行数越大 光标在滚动条中位置越居中
        cursorSurroundingLinesStyle: 'all', // "default" | "all" 光标环绕样式
        cursorWidth: 2, // <=25 光标宽度
        minimap: {
            enabled: true // 是否启用预览图
        }, // 预览图设置
        folding: true, // 是否启用代码折叠
        links: true, // 是否点击链接
        overviewRulerBorder: true, // 是否应围绕概览标尺绘制边框
        renderLineHighlight: 'gutter', // 当前行突出显示方式
        roundedSelection: false, // 选区是否有圆角
        scrollBeyondLastLine: true, // 设置编辑器是否可以滚动到最后一行之后
        readOnly: false, // 是否为只读模式
        theme: 'vs',// vs, hc-black, or vs-dark
        fontSize: 16,
    })
    monacoInstance;
}, 1000)
const problem: Ref<IProblem> = ref(new IProblem)
const problemId = ref(window.location.href.split('/')[window.location.href.split('/').length - 1].split(`?`)[0]);
const contestId = ref(getQueryVariable(`contestId`) ?? ``)
document.title = `11OJ | ` + problemId.value;
const discussions: Ref<IDiscussion[]> = ref([])
axio.get(`${ip}/getProblem/${problemId.value}`).then((res) => {
    if (res.data == ``) {
        alert(`不存在的题目`);
        location.replace(`/problem#/list`);
    }
    if (contestId) {
        axio.get(`${ip}/getContest/${contestId.value}`).then((res) => {
            if (new Date().getTime() > res.data.endtime) {
                NotifyPlugin.error({
                    title: `比赛已结束`,
                    content: `请至练习界面提交题目`
                });
                return;
            }
            else if (new Date().getTime() < res.data.begintime) {
                NotifyPlugin.error({
                    title: `比赛未开始`,
                    content: `比赛开始时间：${translateTime(new Date(res.data.begintime))}`
                });
                return;
            }
            problem.value = res.data;
        });
    }

});
axio.post(`${ip}/getDiscussionList`, {
    type: `problem`,
    problem: problemId.value
}).then((discussionRes) => {
    if (discussionRes.data.code === 0) {
        discussions.value = discussionRes.data.data;
    }
})
const showsubmit = ref(false);
const showAdmin = ref(false);
keepLogin().then((res) => {
    if (res.admin.problem) {
        showAdmin.value = true;
    }
});
/**
 * @function changeView 改变视图：显示题目界面或显示提交界面
 */
function changView() {
    if (!showsubmit.value) {
        keepLogin().then((res) => {
            const closeButton = document.createElement(`Button`);
            closeButton.innerHTML = `关闭`;
            if (res.logined == false) {
                NotifyPlugin.error({
                    title: '请登录',
                    content: '三秒后自动跳转到登录界面',
                    closeBtn: true
                });
                setTimeout(() => {
                    window.location.href = `/login`;
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }, 5000);
                return;
            }
            showsubmit.value = true;
            document.getElementById(`changeViewButton`)!.innerText = `返回题目`;

        });
    }
    else {
        showsubmit.value = false;
        document.getElementById(`changeViewButton`)!.innerText = `提交题目`;
    }
}

/**
 * @function submit 提交题目
 */
function submit() {
    let flag: number = 0;
    const Timer = new Date();
    window.alert
    if (window.location.hash.split("?")[1]) {
        flag = (+window.location.hash.split("?")[1].match(/contestId=(\S+)/)![1])
        if (flag) {
            axio.get(`${ip}/getContest/${flag}`).then((res) => {
                if (Timer.getTime() > res.data.endtime) {
                    NotifyPlugin.error({
                        title: `比赛已结束`,
                        content: `请至练习界面提交题目`
                    });
                    return;
                }
                keepLogin().then((res) => {
                    if (res.logined == false) {
                        NotifyPlugin.error({
                            title: '请登录',
                            content: '三秒后自动跳转到登录界面',
                            closeBtn: true,
                        });
                        setTimeout(() => {
                            window.location.href = `/login`;
                        }, 3000);
                    }
                    else {
                        axio.post(ip + `/problem-submit`, {
                            user: res.uid,
                            submittime: new Date().getTime(),
                            problem: problemId.value,
                            codes: monacoInstance.getValue(),
                            contestId: flag
                        }).then((res) => {
                            window.location.href = `/record#/${res.data}`;
                        });
                    }
                });
            });
            return;
        }
    }
    keepLogin().then((res) => {
        if (res.logined == false) {
            NotifyPlugin.error({
                title: '请登录',
                content: '三秒后自动跳转到登录界面',
                closeBtn: true,
            });
            setTimeout(() => {
                window.location.href = `/login`;
            }, 3000);
        }
        else {
            axio.post(`${ip}/problem-submit`, {
                user: res.uid,
                submittime: new Date().getTime(),
                problem: problemId.value,
                codes: monacoInstance.getValue(),
                contestEnd: 0
            }).then((res) => {
                window.location.href = `/record#/${res.data}`;
            });
        }
    });
}
</script>

<template>
    <main>
        <div class="content-header ui-content-header">
            <div class="container" style="text-align: center;">
                <h1 class="content-heading">{{ problemId }} {{ problem.title }}</h1>
            </div>
        </div>
        <div id="header">
            <Button @click="changView" id="changeViewButton" type="button" theme="primary" status="success" size="large"
                style="padding: 10px;margin-right: 20px !important">
                提交题目
            </Button>
            <Button @click="submit" id="Submit" v-show="showsubmit" type="button" theme="primary" status="success"
                size="large" style="padding: 10px;">
                提交
            </Button>
        </div>

        <div v-show="showsubmit" id="codeInputer">
        </div>
        <div v-show="(showsubmit == false)" id="problem" style="margin-top: 20px;" class="layui-row layui-col-space32">
            <div class="layui-col-md8 layui-col-sm9" id="description">
                <div class="card" v-html="markdownit.render(problem.descriptionmd)" style="padding: 20px 30px;"></div>
            </div>
            <div class="layui-col-md4 layui-col-sm3">
                <div class="card">
                    <div id="problemInfo">
                        <div class="row">
                            <span>题目提供者</span>
                            <div>
                                <UserSign show-tag font-color="black" :uid="problem.author"></UserSign>
                            </div>
                        </div>
                        <div class="row">
                            <span>题目难度</span>
                            <div>
                                <Tag :color="translateColor(problem.difficult)">{{ translateDiff(problem.difficult) }}
                                </Tag>
                            </div>
                        </div>
                        <div class="row">
                            <span>时间限制</span>
                            <div>
                                <span>{{ problem.TimeLimit }}ms</span>
                            </div>
                        </div>
                        <div class="row">
                            <span>空间限制</span>
                            <div>
                                <span>{{ problem.MemoryLimit }}MB</span>
                            </div>
                        </div>
                        <div class="row">
                            <span>测试点数量</span>
                            <div>
                                <span>{{ problem.datanumber }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" style="padding: 20px 30px;margin-top: 20px;">
                    <Link theme="primary" :href="`/record#/list?problem=${problemId}`">
                    <span>提交记录</span>
                    </Link>
                    <Link style="margin-left: 10px;" theme="primary" :href="`/admin#/problem/${problemId}`"
                        v-show="showAdmin">
                    <span>题目管理</span>
                    </Link>
                </div>
                <div style="margin-top: 30px;" class="card">
                    <h2 style="margin-top: 2px;">相关讨论</h2>
                    <div v-if="!discussions.length">
                        <span>暂无讨论</span>
                    </div>
                    <div v-for="(item, index) of discussions" :key="index">
                        <Link theme="primary" :href="`/discuss#/${item.id}`">{{ item.title }}</Link>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<style>
#problemInfo .row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

#problemInfo .row span {
    flex: 1 1;
    font-weight: 500;
    font-size: large;
    margin-top: 2px;
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

<style>
#problem #description h1,
h2,
h3,
h4 {
    margin-bottom: 10px;
    margin-top: 20px;
}

#problem #description {
    font-size: 17px;
    line-height: 29px;
}

#problem table {
    width: 100%;
    border-collapse: collapse;
}

#problem table caption {
    font-size: 2em;
    font-weight: bold;
    margin: 1em 0;
}

#problem th,
#problem td {
    border: 1px solid #999;
    text-align: center;
    padding: 20px 0;
}

#problem table thead tr {
    background-color: #008c8c;
    color: #fff;
}

#problem table tbody tr:nth-child(odd) {
    background-color: #eee;
}

#problem table tbody tr:hover {
    background-color: #ccc;
}

#problem table tbody tr td:first-child {
    color: #f40;
}

#problem table tfoot tr td {
    text-align: right;
    padding-right: 20px;
}

#problem *:not(pre)code {
    background-color: aliceblue;
}

#problem em {
    font-weight: 800;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

#problem ol {
    margin-left: 1.2rem;
}

#problem pre {
    background-color: black;
    font-size: medium;
    color: white;
    line-height: 19px;
}

#problem pre code {
    background-color: black !important;
    font-size: large;
    color: white;
}

#problem blockquote {
    background-color: rgba(247, 247, 247, 0.829);
    border-left-width: 10px;
    border-left-style: inset;
    border-left-color: rgb(148, 146, 146);
}

#codeInputer {
    height: 50vh;
    width: 80vw;
}
</style>