<script setup lang="ts">
import { ip } from '@/modules/ip';
import { currectUser } from '@/modules/user/currectUser';
import { getPrivateUser, getUserData } from '@/modules/user/getUserData';
import axios from 'axios';
import { TabPanel, Tabs, Input, Form, FormItem, Upload, Button, NotifyPlugin } from 'tdesign-vue-next'
import { ref, Ref } from 'vue';
const userSetting: Ref<{
    username: string,
    lastPassword: string,
    newPassword: string,
    headImg: string,
    privateSetting: {
        realName: string,
        email: string,
        qq: string,
        wechat: string,
        class: string,
        phone: number;
    }
}> = ref({
    username: ``,
    lastPassword: ``,
    newPassword: ``,
    headImg: ``,
    privateSetting: {
        realName: ``,
        qq: ``,
        wechat: ``,
        class: ``,
        email: ``,
        phone: 0
    }
})
const repeatPassword: Ref<string> = ref(``);
getUserData(currectUser.uid).then((userData) => {
    userSetting.value.username = userData.username;
    userSetting.value.headImg = userData.headImg;
})
getPrivateUser().then((user)=>
{
    if(user.privateSetting)
    {
        for(let now in user.privateSetting)
        {
            userSetting.value.privateSetting[now] = user.privateSetting[now];
        }
    }
    
}).catch((err)=>
{
    console.error(err);
})
function updateImg(context) {
    console.log(userSetting.value.headImg);
    console.log(context.response);
    userSetting.value.headImg = context.response.url;
}
function updateUserSetting() {
    axios.post(`${ip}/updateUser`, {
        uid: currectUser.uid,
        token: currectUser.token, config: userSetting.value
    }).then((res) => {
        if(res.data.code === 0)
        {
            NotifyPlugin.success({
                title: `更新成功`
            })
        }
        else
        {
            console.error(res.data.error);
            NotifyPlugin.error({
                title: `更新失败`,
                content: `请查看日志`
            })
        }
    }).catch((err)=>
{
    console.error(err);
    NotifyPlugin.error({
        title: `更新失败`,
        content: `请查看日志`
    })
})
}
</script>
<template>
    <main style="width: 90%;">
        <div style="width: 100%;height:auto" class="card">

            <center>所有设置点击最下方提交成功后才有效！</center>
            <Tabs :default-value="1">
                <TabPanel :value="1" :label="`基本信息`">
                    <div class="userSettingForm">
                        <div class="row">
                            <span>用户名</span>
                            <div>
                                <span>更改用户名需要更新数据库数据并刷新缓存，<strong>不建议频繁更改</strong></span>
                                <Input v-model="userSetting.username" style="width: 12rem;margin-top: 5px;"></Input>
                            </div>
                        </div>
                        <div class="row">
                            <span>头像</span>
                            <div>
                                <img style="width: 160px;height: 160px;border-radius: 50%;"
                                    :src="userSetting.headImg" />
                                <Upload autoUpload @fail="() => { console.error(`err`) }" @success="updateImg"
                                    :action="`https://lenovo.cnryh.cn:38888/img-backend/uploadFiles`"
                                    :abridgeName="[3, 3]" :showUploadProgress="true" theme="image" accept="">
                                    修改头像</Upload>
                            </div>
                        </div>
                        <div class="row">
                            <span>隐私信息</span>
                            <div>
                                <p>此处是个人隐私信息，为方便团队管理设立，您可自愿填写</p>
                                <p>填写后，除真实姓名向其他用户展示外，其他信息普通用户不可见，仅站长及教练员可查看。</p>
                                <p>11 Online Judge 坚决保护用户隐私，使用加密方式传输数据，不会向任何第三方透露任何用户隐私。</p>
                                <Form :label-width="`5rem`" style="margin-top: 20px;">
                                    <FormItem label="真实姓名">
                                        <Input v-model="userSetting.privateSetting.realName"
                                            style="width: 10rem;"></Input>
                                    </FormItem>
                                    <FormItem label="手机号码">
                                        <Input v-model="userSetting.privateSetting.phone" style="width: 15rem;"></Input>
                                    </FormItem>
                                    <FormItem label="微信号码">
                                        <Input v-model="userSetting.privateSetting.wechat"
                                            style="width: 15rem;"></Input>
                                    </FormItem>
                                    <FormItem label="QQ号码">
                                        <Input v-model="userSetting.privateSetting.qq" style="width: 10rem;"></Input>
                                    </FormItem>
                                    <FormItem label="邮箱">
                                        <Input v-model="userSetting.privateSetting.email" style="width: 20rem;"></Input>
                                    </FormItem>
                                    <FormItem  label="班级">
                                        <Input v-model="userSetting.privateSetting.class" style="width: 5rem;"></Input>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel :value="2" :label="`安全验证`">
                    <div class="userSettingForm">
                        <div class="row">
                            <span>密码</span>
                            <div>
                                <Form labelWidth="4rem">
                                    <FormItem label="原密码">
                                        <Input type="password" v-model="userSetting.lastPassword"
                                            style="width: 20rem;"></Input>
                                    </FormItem>
                                    <FormItem label="新密码">
                                        <Input type="password" v-model="userSetting.newPassword"
                                            style="width: 20rem;"></Input>
                                    </FormItem>
                                    <FormItem name="repassword" label="确认密码">
                                        <Input type="password" v-model="repeatPassword" style="width: 20rem;"></Input>
                                    </FormItem>
                                </Form>
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </Tabs>
            <Button @click="updateUserSetting">全部提交</Button>
        </div>
    </main>
</template>
<style scoped>
.userSettingForm>.row {
    display: flex;
    display: -webkit-flex;
    padding: 10px 20px;
}

.userSettingForm>.row>span {
    display: inline-block;
    flex: 0 0 10em;
    padding-right: 1em;
    box-sizing: border-box;
    text-align: left;
    font-weight: 700;
    font-size: larger;
}

.userSettingForm>.row>div {
    width: 100%;
}
</style>