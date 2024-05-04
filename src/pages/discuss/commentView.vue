<script setup lang="ts">
import { Divider, Button, NotifyPlugin } from 'tdesign-vue-next'
import { IReply } from '@/modules/interface';
import { markdownit } from '@/modules/MarkdownIt/markdown';
import UserSign from '@/modules/user/userSign.vue';
import { ref, Ref } from 'vue';
import axios from 'axios';
import { ip } from '@/modules/ip';
const props = defineProps<{
    item: IReply,
    replyToReplys: (id: string) => void
}>();

const showedReply: Ref<boolean> = ref(false);
const replys: Ref<IReply[]> = ref([]);

function showReply() {
    axios.get(`${ip}/getReplys/${props.item.id}`).then((replyRes) => {
        if (replyRes.data.code === 0) {
            showedReply.value = true;
            replys.value = replyRes.data.data;
        }
        else {
            console.error(replyRes.data.error)
            NotifyPlugin.error({
                title: `获取失败`,
                content: `请查看日志`
            })
        }
    }).catch((err) => {
        console.error(err);
        NotifyPlugin.error({
            title: `获取失败`,
            content: `请查看日志`
        })
    })

}
</script>
<template>
    <div class="reply card" style="margin-top: 10px;margin-bottom: 10px;">
        <div>
            <UserSign head-img-size="30px" style="margin-left: -10px;" show-head-img font-color="black" show-tag
                :uid="$props.item.sender">
                <template #after>
                    <div style="margin-left: auto;display: flex;align-items: center;">
                        <span>{{ new Date(item.sendTime).toLocaleString() }}</span>
                        <span style="color: rgba(10,10,10,.3);margin-left: 10px;font-size: 10px;" :id="item.id">id:{{
                            item.id }}</span>
                        <Button @click="$props.replyToReplys(item.id)" style="float: right;" variant="text"
                            type="button">回复</Button>
                    </div>

                </template>
            </UserSign>
        </div>
        <Divider></Divider>
        <div v-html="markdownit.render(item.value)" style="padding: 10px 20px;"></div>
        <div v-if="!showedReply">
            <span>共有 {{ item.children.length }} 条回复</span><span v-if="item.children.length"
                style="text-decoration:underline;margin-left: 10px;" @click="showReply">点击查看</span>
        </div>
        <div v-if="showedReply"
            style="width: 100%;padding: 5px;margin: -5px -10px;background-color: rgb(239, 239, 239);">
            <div style="width: 95%;margin-left: 5%;">
                <commentView v-for="(reply, idx) of replys" :key="idx" :item="reply"
                    :reply-to-replys="$props.replyToReplys"></commentView>
            </div>
        </div>
    </div>

</template>
<style></style>