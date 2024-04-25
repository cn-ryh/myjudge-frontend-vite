<script setup lang="ts">
import { ref } from 'vue';
import axio from 'axios';
import { ip } from '@/modules/ip';
window.onhashchange = () => {
    window.location.reload();
};
const username = ref(``);
const password = ref(``);
const repassword = ref(``);
const email = ref(``);
function Register() {
    if (password.value !== repassword.value) {
        password.value = ``;
        repassword.value = ``;
        window.alert(`两次输入的密码不同`);
        return;
    }

    axio.post(`${ip}/register`, {
        username: username.value,
        password: password.value,
        email: email.value
    }).then((res) => {
        if (res.data.success == true) {
            window.alert(`注册成功，您的 uid 为 ${res.data.uid}，请及时关注邮件信息。`);
            window.location.href = `/login`;
        }
        else {
            window.alert(`注册失败：${res.data.reason}`);
        }
    }).catch((err) => {
        console.error(err);
    });
}
</script>
<script update></script>
<template>
    <center>
        <div id="welcome">
            <h2>欢迎注册长春市十一高中在线题库账号</h2>
        </div>
    </center>
    <div id="registerBlock">
        <span>
            <p>用户名</p><input v-model="username" id="username" />
        </span>
        <br>
        <span>
            <p>邮 箱</p><input v-model="email" id="email" />
        </span>
        <br>
        <span>
            <p>密码</p><input v-model="password" id="password" type="password" />
        </span>
        <br>
        <span>
            <p>重复密码</p><input v-model="repassword" id="repassword" type="password" />
        </span>
        <br>
        <button @click="Register()" class="awa">确认注册</button>
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

span {
    font-size: larger;
    margin: auto;
    text-align: center;
}

input {
    margin-left: 20%;
    width: 60%;
}

#registerBlock {
    display: block;
    margin: auto;
    width: 50%;
    height: 50%;
    background-color: antiquewhite;
    padding: 2%;
}
</style>
