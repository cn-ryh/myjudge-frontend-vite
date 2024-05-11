<script setup lang="ts">
import { markdownit } from '@/modules/MarkdownIt/markdown';
import { getAnotherUser } from '@/modules/chat/func';
import { ip } from '@/modules/ip';
import { currectUser } from '@/modules/user/currectUser';
import { getUserData, keepLogin } from '@/modules/user/getUserData';
import UserSign from '@/modules/user/userSign.vue';
import axios from 'axios';
import { NotifyPlugin, Button, Drawer } from 'tdesign-vue-next';
import { ref, Ref, watch } from 'vue';
keepLogin().then((loginRes) => {
    if (!loginRes.logined) {
        NotifyPlugin.error({ title: `请登录` });
        return;
    }
    getChat();
});
const props = defineProps<{ chatId: string }>()
const Chat: Ref<any> = ref(null);
const messages: Ref<any[]> = ref([]);
const loadedPage: Ref<number> = ref(1);
const previewing: Ref<boolean> = ref(false), previewHTML = ref(``);
function showPreview() {
    previewing.value = true;
    previewHTML.value = markdownit.render(document.getElementById(`messageInputer`)?.innerText ?? ``);
}
function loadMore(time: number = 0) {
    if (time > 5) {
        NotifyPlugin.error({
            content: `获取失败`
        })
        return;
    }
    axios.post(`${ip}/getMessages`, {
        chatId: props.chatId,
        uid: currectUser.uid,
        token: currectUser.token,
        pages: loadedPage.value + 1
    }).then((messageRes) => {
        if (messageRes.data.code === 0) {
            messages.value = [...messages.value, ...messageRes.data.data]
            ++loadedPage.value;
        }
        else {
            setTimeout(() => { loadMore(time + 1) }, 200);
        }
    }).catch((err) => {
        console.error(err);
        setTimeout(() => { loadMore(time + 1) }, 200)

    })
}
function getChat() {
    if (!props.chatId || props.chatId == ``) {
        return;
    }
    axios.post(`${ip}/getChat`, {
        uid: currectUser.uid,
        token: currectUser.token,
        chatId: props.chatId
    }).then((getChatRes) => {
        if (getChatRes.data.code === 0) {
            Chat.value = getChatRes.data.data.chat;
            for (let now of Chat.value.users) {
                if (!userImages.value[now]) {
                    getUserData(now).then((user) => {
                        userImages.value[now] = user.headImg;
                    })
                }
            }
            messages.value = getChatRes.data.data.messages;
            for (let i = 1; i <= 10; i++) {
                setTimeout(() => {
                    document.getElementById(`messageView`)?.scroll({
                        top: 100000
                    });
                }, 20 * i)
            }
        }
        else {
            console.error(getChatRes.data);
            NotifyPlugin.warning({
                title: `获取聊天失败`,
                content: `请查看日志`
            })
        }
    }).catch((err) => {
        console.error(err);
        NotifyPlugin.error({
            title: `获取聊天失败`,
            content: `请查看日志`
        })
    });
}

let lastTime = 0;
let timer = 0;
let toMany = false;
watch(props, (_lastVal, newVal) => {
    console.log(`Change Chat to ${newVal.chatId}`);
    loadedPage.value = 1;
    const x = new Date().getTime();
    if (toMany) {
        if (x - lastTime < 60000) {
            if (timer > 15) {
                window.alert(`过量请求将被封禁 ip！`);
                window.alert(`过量请求将被封禁 ip！`);
                window.alert(`过量请求将被封禁 ip！`);
            }
            ++timer;
            NotifyPlugin.error({
                title: `请求过于频繁`,
                content: `请一分钟后重试`
            })
            return;
        }
        else {
            toMany = false;
            timer = 0;
        }
    }
    if (x - lastTime < 15000) {
        ++timer;
        if (timer > 5) {
            toMany = true;
            NotifyPlugin.error({
                title: `请求过于频繁`,
                content: `请一分钟后重试`
            })
            return;
        }
    }
    else {
        timer = 0;
    }
    lastTime = x;
    getChat();
    setTimeout(() => {
        document.getElementById(`messageInputer`)!.innerText = ``;
    }, 200)
    axios.post(`${ip}/readMessages`, {
        uid: self.value,
        token: currectUser.token,
        chatId: props.chatId,
        time: new Date().getTime()
    })
})
function sendMessage() {
    const value = document.getElementById(`messageInputer`)?.innerText;
    if (!value || value == ``) {
        NotifyPlugin.error({
            content: `请填写消息内容`
        })
        return;
    }
    if (props.chatId.includes(`&`)) {
        axios.post(`${ip}/sendMessageToUser`, {
            to: +getAnotherUser(props.chatId),
            sender: currectUser.uid,
            token: currectUser.token,
            value
        }).then((res) => {
            if (res.data.code === 0) {
                messages.value.push({
                    sender: currectUser.uid,
                    value
                })
                document.getElementById(`messageInputer`)!.innerText = ``;
                setTimeout(() => {
                    document.getElementById(`messageView`)?.scroll({
                        top: 10000000
                    });

                }, 10)
            }
            else {
                NotifyPlugin.error({
                    title: `发送失败`,
                    content: `发生了未知错误，请查看日志`
                })
            }
        }).catch((err) => {
            console.error(err);
            NotifyPlugin.error({
                title: `发送失败`,
                content: `与服务器连接断开，请重试`
            })
        })
    }
    else {
        axios.post(`${ip}/sendMessageInGroup`, {
            chatId: props.chatId,
            sender: currectUser.uid,
            token: currectUser.token,
            value
        }).then((res) => {
            if (res.data.code === 0) {
                messages.value.push({
                    sender: currectUser.uid,
                    value
                })
                document.getElementById(`messageInputer`)!.innerText = ``;
                setTimeout(() => {
                    document.getElementById(`messageView`)?.scroll({
                        top: 10000000
                    });

                }, 10)
            }
            else {
                NotifyPlugin.error({
                    title: `发送失败`,
                    content: `发生了未知错误，请查看日志`
                })
            }
        }).catch((err) => {
            console.error(err);
            NotifyPlugin.error({
                title: `发送失败`,
                content: `与服务器连接断开，请重试`
            })
        })
    }
}
const self = ref(currectUser.uid)
const userImages: Ref<{ [key: number]: string }> = ref({});
function jump(uid:number)
{
    window.open(`/user#/${uid}`);
}
</script>
<template>
    <div v-if="Chat != null" style="height: 100%;">
        <div id="header">
            <div id="chatName">
                <UserSign style="justify-content: center;" :show-tag="true" :font-color="`black`"
                    v-if="$props.chatId.includes(`&`)" :uid="+getAnotherUser($props.chatId)">
                </UserSign>
                <div v-if="Chat.name" style="width: auto;margin-left: auto;margin-right: auto;text-align: center;">{{
                    Chat.name }}</div>
            </div>
            <div id="operator">

            </div>
        </div>
        <div id="messageView"
            style="overflow-y: auto;border-style:none none groove none;width: 99%;margin-left: auto;margin-right: auto;margin-top: 10px;height: 70%;">
            <div @click="loadMore(0)" v-if="Chat.messages.length > 30 * loadedPage"
                style="width: 100%;text-align: center;color: rgba(170,170,170,.8);">显示更多信息</div>
            <div class="message-item" v-for="(item, index) of messages" :key="index">
                <div :class="item.sender == self ? `message self` : `message other`">
                    <img @click="jump(item.sender)" style="width: 30px;height: 30px;border-radius: 50%;" :src="userImages[item.sender]" />
                    <div style="margin: 0px 5px;" class="message-block">
                        <UserSign :uid="item.sender" font-color="rgb(175 175 175 / 89%)" :style="{
                            flexDirection: item.sender == self ? `row-reverse` : `row`
                        }"></UserSign>

                        <div class="message-detail" v-html="markdownit.render(item.value)"></div>
                    </div>

                </div>
            </div>
            <div id="bottom"></div>
        </div>

        <div style="height: 20%;padding-left: 20px;" class="layui-row">
            <div class="layui-col-lg10 layui-col-md10 layui-col-sm10" style="height: 100%;">
                <div id="messageInputer" contenteditable>
                </div>
            </div>
            <div id="operators" class="layui-col-lg1 layui-col-md2 layui-col-sm2" style="height: 100%;">
                <Button id="sendMessage" @click="sendMessage">发送</Button>
                <Button id="previewMessage" @click="showPreview">预览</Button>
            </div>
        </div>
        <Drawer sizeDraggable :size="`70vw`" v-model:visible="previewing" close-btn :cancel-btn="false">
            <div id="preview" style="width: 80%;" v-html="previewHTML"></div>
        </Drawer>
    </div>
</template>
<style>
.message {
    width: auto;
    margin: 5px 5px 10px 5px;
    display: inline-block;
    height: auto;
}
.message .message-block
{
    max-width: 70%;
}
.message-block .userName
{
    margin-left: 0px !important;
    margin-right: 0px !important;
    margin-bottom: 5px;
}
.message .message-block .message-detail {
    border-radius: 10px;
    padding: 5px 5px;
    width: auto;
}

.message {
    flex-direction: row;
    display: flex;
    align-items: center;
}

.message-item .userName {
    font-size: smaller !important;
}

.message.self {
    display: flex;
    flex-direction: row-reverse;
}


.message.self .message-block .message-detail {
    background-color: rgb(122, 204, 255);
    padding: 10px;
}

.message.other .message-block .message-detail {
    background-color: rgb(156, 156, 156);
}

.message-block img {
    max-width: 30vh;
    display: block;
}

#messageInputer {
    display: inline-block;
    position: relative;
    width: calc(100% - 14px);
    height: 90%;
    padding: 6px;
    border-style: solid;
    margin-top: 2px;
    overflow: auto;
}

#sendMessage {
    height: 30%;
    width: 70%;
    margin-left: 15%;
    margin-top: 15%;
    font-size: larger;
    font-weight: 600;
}

#previewMessage {
    height: 30%;
    width: 70%;
    margin-left: 15%;
    margin-top: 10%;
    font-size: larger;
    font-weight: 600;
}

@media screen and (min-width:1200px) {
    #operators {
        margin-left: 40px;
    }

    #sendMessage {
        height: 30%;
        width: 95%;
        margin-left: 2%;
        margin-top: 15%;
        font-size: larger;
        font-weight: 600;
    }

    #previewMessage {
        height: 30%;
        width: 95%;
        margin-left: 2%;
        margin-top: 10%;
        font-size: larger;
        font-weight: 600;
    }
}
</style>
<style scoped>
#header {
    width: calc(100% - 20px);
    text-align: center;
    border-bottom-style: dotted;
    padding: 10px;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content: center;
}

#operator {
    width: 20px;
    height: 20px;
}

#chatName {
    margin-left: 20px;
    flex: 1 1;
}
</style>
<style>
.message-block a
{
    color: red;
}
.message-block a:after {
    content: "\2197";
}
</style>