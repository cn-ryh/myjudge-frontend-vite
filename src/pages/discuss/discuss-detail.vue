<script setup lang="ts">
import $ from 'jquery'
import { Ref, ref } from 'vue';
import { markdownit } from '@/modules/MarkdownIt/markdown';
import { IDiscussion, discussType, processType } from '@/modules/interface';
import { NotifyPlugin, Button } from 'tdesign-vue-next';
import axios from 'axios';
import { ip } from '@/modules/ip';
import CommentView from './commentView.vue';
import { currectUser } from '@/modules/user/currectUser';

const discussion: Ref<IDiscussion> = ref({ problem: null, title: ``, type: discussType.problem, id: 0, value: ``, process: processType.open, creater: 0, createTime: 0, replyTime: 0, replys: [] });
discussion.value.id = +window.location.hash.split(`/`)[1];
axios.get(`${ip}/getDiscussion/${discussion.value.id}`).then((discussionRes) => {
    console.log(discussionRes);
    if (discussionRes.data.code === 0) {
        discussion.value = discussionRes.data.data;
    }
    else {
        NotifyPlugin.error({
            title: `获取剪切板失败`,
            content: `请查看日志`
        })
        console.error(discussionRes.data.error);
    }
}).catch((err) => {
    console.error(err);
    NotifyPlugin.error({
        title: `获取剪切板失败`,
        content: `请查看日志`
    })
})
const replyReply: Ref<boolean> = ref(false);
const replyParentId: Ref<string> = ref(`${discussion.value.id}`);
const replyValue: Ref<string> = ref(``);

function changeReply() {
    replyReply.value = false;
    replyParentId.value = discussion.value.id.toString();
}
function replyToReplys(id: string) {
    console.log(id);
    replyParentId.value = id;
    replyReply.value = true;
    $(`#replyInputer`)[0].scrollIntoView();
}
function makeReply() {
    if (!replyParentId.value || replyParentId.value === ``) {
        NotifyPlugin.error({
            title: `请填写完整信息`,
            content: `回复的内容不存在，请刷新`
        })
        return;
    }
    if (!replyValue.value || replyValue.value.replaceAll(` `, ``) === ``) {
        NotifyPlugin.error({
            title: `请填写完整信息`,
            content: `回复内容不能为空，请检查`
        })
        return;
    }
    if (replyReply.value) {
        axios.post(`${ip}/replyReply`, {
            sender: currectUser.uid,
            token: currectUser.token,
            parentId: replyParentId.value,
            value: replyValue.value
        }).then((replyRes) => {
            if (replyRes.data.code === 0) {
                NotifyPlugin.success({
                    title: `回复成功`
                })
            }
            else {
                console.error(replyRes.data.error);
                NotifyPlugin.warning({
                    title: `回复失败`,
                    content: replyRes.data.error.length <= `15` ? replyRes.data.error : `请查看日志`
                })
            }
        }).catch((err) => {
            console.error(err);
            NotifyPlugin.error({
                title: `评论失败`,
                content: `请查看日志`
            })
        })
    }
    else {
        axios.post(`${ip}/replyDiscussion`, {
            sender: currectUser.uid,
            token: currectUser.token,
            parentId: replyParentId.value,
            value: replyValue.value
        }).then((replyRes) => {
            if (replyRes.data.code === 0) {
                NotifyPlugin.success({
                    title: `回复成功`
                })
            }
            else {
                console.error(replyRes.data.error);
                NotifyPlugin.warning({
                    title: `回复失败`,
                    content: replyRes.data.error.length <= `15` ? replyRes.data.error : `请查看日志`
                })
            }
        }).catch((err) => {
            console.error(err);
            NotifyPlugin.error({
                title: `评论失败`,
                content: `请查看日志`
            })
        })
    }
}
function toView(id: string) {
    const commentDiv = $(`#${id}`).parents(`.reply.card`).get()[0] as HTMLDivElement;
    commentDiv.style.background = `rgb(131 131 255 / 55%)`;
    commentDiv.scrollIntoView();
    for (let i = 1; i <= 5; i++) {
        if (i & 1) {
            setTimeout(() => {
                commentDiv.style.background = `#FFFFFF`;
            }, 300 * i + i * i * 10 + 250);
        }
        else {

            setTimeout(() => {
                commentDiv.style.background = `rgb(131 131 255 / 55%)`;
            }, 300 * i + i * i * 10 + 250);
        }
    }
}
</script>

<template>
    <main style="margin-top: 20px;">
        <div class="layui-row layui-col-space32">
            <div class="layui-col-lg8 layui-col-sm9">
                <div class="discussion card" v-html="markdownit.render(discussion.value)" style="margin-bottom: 50px;">
                </div>
                <p>回复：</p>
                <CommentView :key="index" :item="now" :reply-to-replys="replyToReplys"
                    v-for="(now, index) of discussion.replys">

                </CommentView>
                <div id="replyInputer" class="card" style="margin-top: 50px;">
                    <div v-if="replyReply">
                        <sapn style="color: red;">当前正在回复评论 <span style="text-decoration:underline;"
                                @click="toView(replyParentId)">{{ replyParentId
                                }}</span></sapn>
                        <Button size="small" style="margin-left: 20px;" @click="changeReply">切换到评论 讨论本体</Button>
                    </div>
                    <textarea v-model="replyValue"
                        style="width: 95%;margin-top: 10px;padding: 1px 2.5%;height: 200px;resize: none;overflow: auto;"></textarea>
                    <br>
                    <Button type="submit" @click="makeReply">发射评论！</Button>
                </div>
            </div>
            <div class="layui-col-lg4 layui-col-sm3">
                <div class="card">
                </div>
            </div>
        </div>
    </main>
</template>

<style>
.discussion.card {
    min-height: 10vh;
}

main {
    padding: 10px 20px;
}
</style>