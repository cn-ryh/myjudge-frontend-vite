<script setup lang="tsx">
import { getTime, getAnotherUser } from '@/modules/chat/func';
import { ip } from '@/modules/ip';
import { currectUser } from '@/modules/user/currectUser';
import axios from 'axios';
import { Ref, watch } from 'vue';
import { ref } from 'vue';
import UserSign from '@/modules/user/userSign.vue';
import ChatDetail from './chatDetail.vue';
import { Badge } from 'tdesign-vue-next';
const chatList: Ref<any[]> = ref([]);
axios.post(`${ip}/getChatList`, {
    uid: currectUser.uid, token: currectUser.token
}).then((data) => {
    console.log(data);
    chatList.value = data.data.data;
})
const unReadMessages: Ref<any> = ref({});
axios.post(`${ip}/getUnReadMessageNum`, {
    uid: currectUser.uid,
    token: currectUser.token
}).then((num) => {
    unReadMessages.value = num.data.data;
})
const nowChatId: Ref<string> = ref(``);
watch(nowChatId, () => {
    unReadMessages.value[nowChatId.value] = 0;
})
</script>
<template>
    <main style="width: 90vw;">
        <div class="card" style="width: 90%;height: 85vh;margin-left: 5%;margin-top: 4vh;">
            <div class="layui-row" style="height: 100%;">
                <div class="layui-col-md3 layui-col-sm4" style="border-style:ridge;height: 100%;">
                    <div style="width: 100%;text-align: center;">
                        <h2>消息列表</h2>
                    </div>
                    <div style="margin-top: 10px;">
                        <div style="width: 100%;" v-for="(item, index) of chatList" :key="index">
                            <Badge :count="unReadMessages[item.id]" style="width: 100%;">
                                <div @click="nowChatId = item.id"
                                    style="border-style: solid none none none;border-color: rgba(10,10,10,0.2);padding: 15px 15px;width: calc(100% - 30px);">
                                    {{ item.name }}
                                    <div v-if="item.name"></div>
                                    <div v-if="!item.name">
                                        <UserSign font-color="black" :uid="+getAnotherUser(item.id)"></UserSign>
                                        <span style="float: right;">{{ getTime(item.mx) }}</span>
                                    </div>
                                </div>
                            </Badge>
                        </div>
                    </div>
                </div>
                <div class="layui-col-md9 layui-col-sm8" style="height: 100%;">
                    <ChatDetail :chat-id="nowChatId"></ChatDetail>
                    <div v-if="!nowChatId || nowChatId == ``"
                        style="height: 20%;margin-top: 40%;width: 100%;text-align: center;font-size: larger;">请选择会话
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style>
.layui-col-md3 .t-badge--circle {
    margin-top: 13px;
    margin-right: 10px;
}
</style>