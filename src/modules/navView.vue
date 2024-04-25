<script setup lang="ts">
import { keepLogin } from '@/modules/user/getUserData';
import { Button, HeadMenu, MenuItem, Image, Link, Submenu } from 'tdesign-vue-next'
import { io } from 'socket.io-client'
import './normalize.css'
import './layui-v2.9.8/layui/css/layui.css'
import './main.css'
import { currectUser } from './user/currectUser';
const socket = io(`https://lenovo.cnryh.cn:38888`, {
    path: `/oj/socket.io`
});
socket.emit(`emittt`,`${window.location.href}`);
socket.on(`emittt`,(emit)=>
{
    console.log(emit)
})
import 'tdesign-vue-next/es/style/css';
import userSign from './user/userSign.vue';
import { Ref, ref } from 'vue';
const logined: Ref<boolean> = ref(false), uid: Ref<number> = ref(0);
keepLogin().then((res) => {
    if (res.logined) {
        logined.value = true;
        uid.value = res.uid;
    }
})
function jumpHome() {
    window.location.href = `/`
}
</script>
<template>
    awa
    <HeadMenu theme="dark" style="position: fixed;top: 0;z-index: 9;" expand-type="popup">
        <template #logo>
            <Image src="/logo.png" style="width: 6vh;height: 6vh;" @click="jumpHome"></Image>
        </template>
        <Submenu value="awa1" title="应用" style="font-size: 1.1rem;">
            <MenuItem value="awa1-1" :href="`/files`">
            文件系统
            </MenuItem>
            <MenuItem value="awa1-1" :href="`/netcut#/mine`">
            云剪切板
            </MenuItem>
        </Submenu>
        <MenuItem value="item2" :href="`/problem#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">题库</span>
        </MenuItem>
        <MenuItem value="item3" :href="`/training#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">题单</span>
        </MenuItem>
        <MenuItem value="item4" :href="`/contest#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">比赛</span>
        </MenuItem>
        <MenuItem value="item6" :href="`/record#/list?user=${currectUser.uid}`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">提交记录</span>
        </MenuItem>
        <MenuItem value="item7" :href="`/discuss#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">讨论</span>
        </MenuItem>
        <MenuItem value="item5" :href="`/admin#/index`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">后台</span>
        </MenuItem>
        <template #operations>
            <div class="t-demo-menu--dark">
                <Button variant="text" shape="square" style="min-width: 3rem;" v-if="!logined">
                    <span class="operator" style="color:white;font-size: larger;">注册</span>
                </Button>
                <Button variant="text" shape="square" :href="`/login`" style="margin-left: 1vw;min-width: 3rem;"
                    v-if="!logined">
                    <span class="operator" style="color:white;font-size: large;">登录</span>
                </Button>
                <Link variant="text" v-if="logined" shape="square" :href="`/user#/${uid}`"
                    style="margin-left: 1vw;min-width: 3rem;">
                <userSign :uid="uid"></UserSign>
                </Link>
            </div>
        </template>
    </HeadMenu>
</template>

<style scoped>
.operator:hover {
    color: rgba(69, 69, 241, 0.8);
}
</style>