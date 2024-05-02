<script setup lang="ts">
import { ref } from 'vue';
import axio from 'axios';
import { ip } from '@/modules/ip';
import { setCookie } from '@/modules/cookie';
import { NotifyPlugin } from 'tdesign-vue-next';
import NavView from '@/modules/navView.vue';

window.onhashchange = () => {
    window.location.reload();
};
const user = ref(``);
const pass = ref(``);
/**
 * 登录处理函数
 * @param username 用户名
 * @param password 密码
 */
function login(username: string, password: string) {
    axio.post(`${ip}/login`, {
        head: username,
        password: password
    }).then((res) => {
        if (res.data.nouser == true) {
            NotifyPlugin.error({
                title: `登录失败`,
                content: `用户不存在`
            });
            return;
        }
        if (res.data.login == true) {
            setCookie(`uid`, res.data.uid, 1000);
            setCookie(`token`, res.data.usertoken, 1000);
            NotifyPlugin.success({
                title: `登录成功`,
                content: `三秒后跳转到主页`
            });
            setTimeout(() => {
                window.location.href = `/`;
            }, 3000);

        }
        else {
            window.alert(`用户名或密码错误，请重试！`);
        }
    }).catch((err) => {
        console.error(err);
    });
}
function toRegister() {
    window.location.href = `/register`;
}
</script>
<template>
    <NavView></NavView>
    <center>
        <div id="welcome">
            <h2><b>
                    欢迎登录长春市十一高中在线题库
                </b></h2>
        </div>
    </center>
    <div id="loginblock">
        <input v-model="user" id="username" class="awa" />
        <input v-model="pass" id="password" type="password" class="awa" />
        <div>
            <button @click="login(user, pass)" class="awa">登录</button>
            <button @click="toRegister()" class="awa">注册</button>
        </div>
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

button {
    background-color: aqua;
    height: 15%;
    width: 15%;
}

.awa {
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 3%;
}

#loginblock {
    display: block;
    margin: auto;
    width: 50%;
    height: 50%;
    background-color: antiquewhite;
    padding: 5%;
}

body {
    margin: 0% !important;
}
</style>
