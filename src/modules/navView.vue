<script setup lang="ts">
import { AdminType, keepLogin } from '@/modules/user/getUserData';
import { Button, HeadMenu, MenuItem, Image, Link, Submenu, Badge } from 'tdesign-vue-next'
import { currectUser } from './user/currectUser';
import userSign from './user/userSign.vue';
import { Ref, ref } from 'vue';
import axios from 'axios';
import { ip } from './ip';
import 'tdesign-vue-next/es/style/css'
import './normalize.css'
import './layui-v2.9.8/layui/css/layui.css'
import './main.css';

const unReadMessageNum: Ref<number> = ref(0);
axios.post(`${ip}/getUnReadMessageNum`, {
    uid: currectUser.uid,
    token: currectUser.token
}).then((num) => {
    let tot = 0;
    for (let now in num.data.data) {
        tot += num.data.data[now];
    }
    unReadMessageNum.value = tot;
})
const logined: Ref<boolean> = ref(false), uid: Ref<number> = ref(0);
const admin:Ref<AdminType> = ref(new AdminType());
keepLogin().then((res) => {
    if (res.logined) {
        logined.value = true;
        uid.value = res.uid;
        admin.value = res.admin;
    }
})
function jumpHome() {
    window.location.href = `/`
}
</script>
<template>
    <HeadMenu id="headMenu" theme="dark" expand-type="popup">
        <template #logo>
            <Image src="/logo.png" style="width: 6vh;height: 6vh;" @click="jumpHome"></Image>
        </template>
        <Submenu value="apps" title="应用" style="font-size: 1.1rem;">
            <MenuItem value="apps-files" :href="`/files`">
            文件系统
            </MenuItem>
            <MenuItem value="apps-netcut" :href="`/netcut#/mine`">
            云剪切板
            </MenuItem>
        </Submenu>
        <MenuItem value="problems" :href="`/problem#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">题库</span>
        </MenuItem>
        <MenuItem value="trainings" :href="`/training#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">题单</span>
        </MenuItem>
        <MenuItem value="contests" :href="`/contest#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">比赛</span>
        </MenuItem>
        <MenuItem value="records" :href="`/record#/list?user=${currectUser.uid}`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">提交记录</span>
        </MenuItem>
        <MenuItem value="discussions" :href="`/discuss#/list`">
        <span class="menuitem" style="color:white;font-size: 1.1rem;">讨论</span>
        </MenuItem>
        <MenuItem value="backend" :href="`/admin#/index`">
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
                <Badge style="margin-top: 10px;" :count="unReadMessageNum" :max-count="99">
                    <Button :href="`/chat#/list`" v-if="logined" size="large" variant="text" style="padding: 0px;height: 32px;">
                        <template #icon>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"
                                fill="#b77676">
                                <path
                                    d="M216 50H40a14 14 0 0 0-14 14v160a13.88 13.88 0 0 0 8.09 12.69A14.11 14.11 0 0 0 40 238a13.87 13.87 0 0 0 9-3.31l.09-.08l32.14-28.17a2 2 0 0 1 1.27-.44H216a14 14 0 0 0 14-14V64a14 14 0 0 0-14-14m2 142a2 2 0 0 1-2 2H82.5a14 14 0 0 0-9 3.29l-.09.08l-32.16 28.17A2 2 0 0 1 38 224V64a2 2 0 0 1 2-2h176a2 2 0 0 1 2 2Zm-80-64a10 10 0 1 1-10-10a10 10 0 0 1 10 10m-44 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10m88 0a10 10 0 1 1-10-10a10 10 0 0 1 10 10" />
                            </svg>
                        </template>
                    </Button>
                </Badge>
                <Link variant="text" v-if="logined" shape="square" :href="`/user#/${uid}`"
                    style="margin-left: 1vw;min-width: 3rem;">
                    <userSign :uid="uid" :headImgPos="`right`" :showHeadImg="true"></UserSign>
                </Link>
            </div>
        </template>
    </HeadMenu>
</template>

<style>
.operator:hover {
    color: rgba(69, 69, 241, 0.8);
}


@media screen and (max-width: 900px) {
    .t-head-menu .t-menu__item {
        padding: 0 12px;
    }
}
@media screen and (max-width: 840px) {
    .t-head-menu .t-menu__item {
        padding: 0 8px;
    }
}
@media screen and (max-width: 775px) {
    #headMenu {
        display: none;
    }
}
</style>