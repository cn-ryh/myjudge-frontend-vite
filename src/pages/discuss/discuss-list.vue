<script lang="ts" setup>
import { Link, Button, NotifyPlugin } from 'tdesign-vue-next';
import { render } from '@/modules/MarkdownIt/markdown'
import { getQueryVariable, translateTime } from '@/modules/functions';
import { Ref, ref } from 'vue';
import axios from 'axios';
import { ip } from '@/modules/ip';
import { IDiscussion,discussType } from '@/modules/interface';
import UserSign from '@/modules/user/userSign.vue';
const discussTypes: Ref<string[]> = ref([`problem`, `tool`, `workOrder`, `language`, `firstExam`, `other`]);
const discussTypesDisplay: Ref<string[]> = ref([`题目专版`, `工具链`, `工单`, `语言相关`, `初试相关`, `其他`]);
const discussTypesRules: Ref<{
    [key: string]: string
}> = ref({
    "problem": `这里可以询问/反馈与题目相关的问题，**但禁止在讨论区发布题目解法！**`,
    "tool": `这里是讨论各种工具、编译器使用方法的板块，可以讨论包括但不限于考试系统、\`VS Code\` 等编译器、\`g++\` 等工具的使用方法`,
    "workOrder": `这里是反馈由 cn_ryh 制作的各类网站（OJ、博客等）存在功能性问题或美化建议的位置，与博客内容及其正确性相关的问题请在对应博客讨论区查看`,
    "language": `这里是讨论各语言语法的位置，适合初学者遇到编译错误等进行询问，询问前建议先浏览一遍已有的讨论`,
    "firstExam": `这里是讨论 CSP初试/NOI笔试 相关问题的板块`,
    "other": `如有其他讨论需求，请在这里发布讨论`
});


const type: Ref<string> = ref(getQueryVariable(`type`) ?? ``);
function jump(url: string) {
    window.location.href = url;
}
setTimeout(() => {
    if (type.value === ``) {
        (document.getElementsByClassName(`discussTypeLinkAll`)[0] as HTMLElement).style.fontWeight = `800`;
        (document.getElementsByClassName(`discussTypeLinkAll`)[0] as HTMLElement).style.fontSize = `1.2rem`;
    }
    else {
        (document.getElementsByClassName(`discussTypeLink${type.value}`)[0] as HTMLElement).style.fontWeight = `400`;
        (document.getElementsByClassName(`discussTypeLink${type.value}`)[0] as HTMLElement).style.fontSize = `1.1rem`;
        (document.getElementsByClassName(`discussTypeLink${type.value}`)[0] as HTMLElement).style.color = `rgba(20,200,20,1)`;
    }
}, 100)
const list: Ref<IDiscussion[]> = ref([]);
const page: Ref<number> = ref(+(getQueryVariable(`page`) ?? 1))
axios.post(`${ip}/getDiscussionList`, { page: page.value, type: type.value }).then((getListRes) => {
    if (getListRes.data.code === 0) {
        list.value.push(...getListRes.data.data);
    }
    else {
        NotifyPlugin.warning({
            title: `获取列表失败`,
            content: `请查看日志`
        });
    }
    return;
})
</script>
<template>
    <div>
        <main style="padding: 2vh 1vw;margin-top: 10px;">
            <div class="mainView">
                <div class="layui-row layui-col-space32">
                    <div class="layui-col-md3">
                        <div class="card" style="height: auto;padding: 10px;">
                            <div style="padding: 10px 25px;">
                                <div class="discussTypeItem" style="height: 5vh;">
                                    <Link class="discussTypeLinkAll"
                                        style="font-size: 1.05rem;font-weight: 200;color: rgba(102,102,102,1);"
                                        :href="`/discuss/list`"> 所有板块
                                    </Link>
                                </div>
                                <div class="discussTypeItem" v-for="(item, index) of discussTypes" style="height: 5vh;"
                                    :key="index">
                                    <Link :class="`discussTypeLink${item}`" style="font-size: 1.05rem;font-weight: 200;"
                                        :href="`/discuss/list?type=${item}`"> {{ discussTypesDisplay[index] }} </Link>
                                </div>
                            </div>
                        </div>
                        <div v-if="type !== ``" class="card" style="margin-top: 3vh;padding: 15px 10px;font-size: 15px;"
                            v-html="render(discussTypesRules[type])">
                        </div>
                        <div v-if="type !== ``" class="card"
                            style="margin-top: 3vh;padding: 15px 10px;font-size: 15px;">
                            <Button @click="jump(`/discuss/new?type=${type}`)">创建</Button>
                        </div>
                    </div>
                    <div class="layui-col-md9">
                        <div  @click="jump(`/discuss/${item.id}`)" style="margin-bottom: 20px;padding: 15px 20px;"
                            v-for="(item, index) of list" :key="index" class="discussionListItem card">
                            <div style="width: 100%;">
                                <UserSign style="display: flex;margin-bottom: 10px;" :uid="item.creater" show-tag :font-color="`black`">
                                    <template #before>
                                        <h3 style="flex: 1 1;color: rgba(200,100,100,0.8);">{{ item.title }}</h3>
                                    </template>
                                </UserSign>
                                <span>
                                    {{ translateTime(new Date(item.createTime)) }}
                                </span>
                                <span v-if="item.type === discussType.problem" style="margin-left: 10px;">{{ item.problem
                                    }}</span>
                                <span style="float: right;">最近回复：{{ !item.replyTime ? `无` : 
                                    translateTime(new Date(item.replyTime))
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<style scoped>
.discussionListItem.card:hover
{
    cursor:pointer
}
.grid-demo {
    background-color: aliceblue;
}

main .mainView {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
}

section {
    display: block;
    unicode-bidi: isolate;
    background-color: #FFFFFF;
}
</style>