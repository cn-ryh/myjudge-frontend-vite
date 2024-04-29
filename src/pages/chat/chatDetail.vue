<script setup lang="ts">
import { markdownit } from '@/modules/MarkdownIt/markdown';
import { getAnotherUser } from '@/modules/chat/func';
import { ip } from '@/modules/ip';
import { currectUser } from '@/modules/user/currectUser';
import UserSign from '@/modules/user/userSign.vue';
import axios from 'axios';
import { NotifyPlugin, Button, DialogPlugin, Drawer } from 'tdesign-vue-next';
import { ref, Ref, watch } from 'vue';

const props = defineProps<{ chatId: string }>()
const Chat: Ref<any> = ref(null);
const messages: Ref<any[]> = ref([]);
const loadedPage: Ref<number> = ref(1);
const previewing:Ref<boolean> = ref(false),previewHTML = ref(``);
function showPreview()
{
    previewing.value = true;
    previewHTML.value= markdownit.render(document.getElementById(`messageInputer`)?.innerText??``);
}

function loadMore() {

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
        console.log(getChatRes.data)
        if (getChatRes.data.code === 0) {
            console.log(getChatRes.data.data);
            Chat.value = getChatRes.data.data.chat;
            messages.value = getChatRes.data.data.messages;
            setTimeout(() => {
                document.getElementById(`messageView`)?.scroll({
                    top: 10000000
                });
            }, 10)
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
getChat();
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

</script>
<template>
    <div v-if="Chat != null" style="height: 100%;">
        <div id="header" style="width: 100%;text-align: center;border-bottom-style: dotted;padding: 10px;">
            <UserSign show-tag :font-color="`black`" v-if="$props.chatId.includes(`&`)" :uid="+getAnotherUser($props.chatId)">
            </UserSign>
            <span style="width: auto;margin-left: auto;margin-right: auto;text-align: center;">{{
                Chat.name }}</span>
        </div>
        <div id="messageView"
            style="overflow-y: auto;border-style:none none groove none;width: 99%;margin-left: auto;margin-right: auto;margin-top: 10px;height: 70%;">
            <div v-if="Chat.messages.length > 30 * loadedPage"
                style="width: 100%;text-align: center;color: rgba(170,170,170,.8);">显示更多信息</div>
            <div class="message-item" v-for="(item, index) of messages" :key="index">
                <div :class="item.sender == self ? `message self` : `message other`">
                    <div class="message-block" v-html="markdownit.render(item.value)"></div>
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
    margin: 10px 5px;
    display: inline-block;
    height: auto;
}

.message .message-block {
    display: inline-block;
    border-radius: 10px;
    padding: 5px 5px;
    max-width: 70%;
}

.message.self {
    display: flex;
    flex-direction: row-reverse;
}

.message.self .message-block {
    background-color: rgb(122, 204, 255);
    padding: 10px;
}

.message.other .message-block {
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
@media screen and (min-width:1200px){
    #operators
    {
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