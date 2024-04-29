<script setup lang="ts">
import { ref } from "vue";
import axio from "axios";
import { ip } from '@/modules/ip';
import { keepLogin } from "@/modules/user/getUserData";
import { Notification, Button, Link } from '@arco-design/web-vue';
import * as monaco from 'monaco-editor'
import 'monaco-editor/esm/vs/basic-languages/cpp/cpp.contribution';
let monacoInstance: monaco.editor.IStandaloneCodeEditor;
setTimeout(() => {
    monacoInstance = monaco.editor.create(document.getElementById("codeInputer")!, {
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
const problemName = ref(``);

const problemId = ref(window.location.href.split('/')[window.location.href.split('/').length - 1].split(`?`)[0]);
document.title = problemId.value;
const TimeLimit = ref(0);
const MemoryLimit = ref(0);
const problemDescription = ref(``);
axio.get(`${ip}/getProblem/${problemId.value}`).then((res) => {
    if (res.data == ``) {
        alert(`不存在的题目`);
        location.replace(`/problem#/list`);
    }
    problemName.value = res.data.title;
    document.title = problemName.value;
    problemDescription.value = res.data.description;
    TimeLimit.value = res.data.TimeLimit;
    MemoryLimit.value = res.data.MemoryLimit;
});
const showsubmit = ref(false);
const showAdmin = ref(false);
keepLogin().then((res) => {
    if (res.admin) {
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
                Notification.error({
                    title: '请登录',
                    content: '三秒后自动跳转到登录界面',
                    closable: true,
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
                    Notification.error(`比赛已结束`);
                    return;
                }
                keepLogin().then((res) => {
                    if (res.logined == false) {
                        Notification.error({
                            title: '请登录',
                            content: '三秒后自动跳转到登录界面',
                            closable: true,
                        });
                        setTimeout(() => {
                            window.location.href = `/login`;
                        }, 3000);
                    }
                    else {
                        axio.post(ip + `/problem-submit`, {
                            user: res.uid,
                            submittime: `${Timer.getFullYear()}-${Timer.getMonth() + 1}-${Timer.getDate()}  ${Timer.getHours()}:${Timer.getMinutes()}:${Timer.getSeconds()}`,
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
            Notification.error({
                title: '请登录',
                content: '三秒后自动跳转到登录界面',
                closable: true,
            });
            setTimeout(() => {
                window.location.href = `/login`;
            }, 3000);
        }
        else {
            axio.post(ip + `/problem-submit`, {
                user: res.uid,
                submittime: `${Timer.getFullYear()}-${Timer.getMonth() + 1}-${Timer.getDate()}  ${Timer.getHours()}:${Timer.getMinutes()}:${Timer.getSeconds()}`,
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
                <h1 class="content-heading">{{ problemId }} {{ problemName }}</h1>
                <p>时间限制：{{ TimeLimit }}ms&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 空间限制：{{ MemoryLimit }}MB</p>
            </div>
        </div>
        <div id="header">
            <Button @click="changView" id="changeViewButton" type="primary" status="success" size="large"
                style="padding: 10px;margin-right: 20px !important">
                提交题目
            </Button>
            <Button @click="submit" id="Submit" v-show="showsubmit" type="primary" status="success" size="large"
                style="padding: 10px;">
                提交
            </Button>
        </div>

        <div v-show="showsubmit" id="codeInputer">
        </div>
        <div v-show="(showsubmit == false)" id="problem" style="margin-top: 20px;" class="layui-row layui-col-space64">
            <div class="layui-col-md8" id="description">
                <div class="card" v-html="problemDescription" style="padding: 20px 30px;"></div>
            </div>
            <div class="layui-col-md4">
                <div class="card" style="padding: 20px 30px;">
                    <Link :href="`/record#/list?problem=${problemId}`">
                    <span>提交记录</span>
                    </Link>
                    <Link :href="`/admin#/problem/${problemId}`" v-show="showAdmin">
                    题目管理
                    </Link>
                </div>
            </div>
        </div>
    </main>
</template>

<style>


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
#problem #description h1,h2,h3,h4
{
    margin-bottom: 10px;
    margin-top: 20px;
}
#problem #description
{
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