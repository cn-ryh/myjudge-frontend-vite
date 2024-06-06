<script setup lang="ts">
import { ip } from '@/modules/ip';
import { translateTime } from '@/modules/functions';
import { Card, Notification } from '@arco-design/web-vue';
import { Form, FormItem, Input, Switch, Button, Skeleton } from 'tdesign-vue-next'
import { render } from '@/modules/MarkdownIt/markdown';
import userSign from '@/modules/user/userSign.vue';
import axios from 'axios';
import { ref, Ref } from 'vue';
import { currectUser } from '@/modules/user/currectUser';
import { INetcut } from '@/modules/interface';
const paths = window.location.hash.substring(window.location.hash.lastIndexOf(`/`) + 1, window.location.hash.length)
const netcut: Ref<INetcut> = ref({ paths: paths, password: ``, creater: 1, createTime: 0, updateTime: 0, value: ``, edit: false });
const showPasswordInputer: Ref<boolean> = ref(false);
const showNew: Ref<boolean> = ref(false);
const usePassword: Ref<boolean> = ref(false);
const password: Ref<string> = ref(``);
const onEditing: Ref<boolean> = ref(false);
const canEdit: Ref<boolean> = ref(false);
const loaded: Ref<boolean> = ref(false);
if (paths.includes(`/`) || paths.includes(`\\`)) {
    Notification.error(`剪切板路径格式错误，请检查`);
}
else {
    axios.post(`${ip}/getNetcut`, {
        paths: paths
    }).then((res) => {
        if (res.data.code === 0) {
            netcut.value.createTime = res.data.data.createTime;
            netcut.value.updateTime = res.data.data.updateTime;
            netcut.value.creater = res.data.data.creater;

            if ((+currectUser.uid) === res.data.data.creater) {
                axios.post(`${ip}/getNetcutByToken`, {
                    paths,
                    uid: +currectUser.uid,
                    token: currectUser.token
                }).then((netcutRes) => {
                    if (netcutRes.data.code === 0) {
                        netcut.value = netcutRes.data.data;
                        canEdit.value = true;
                        loaded.value = true;
                    }
                    else {
                        console.error(netcutRes.data.error);
                        showPasswordInputer.value = true;
                    }
                }).catch((err) => {
                    console.error(err);
                })
            } else if (!res.data.data.password || res.data.data.password == ``) {
                // 无密码
                getNetcutByPassword(``);

            }
            else {
                showPasswordInputer.value = true;
            }
        }
        else {
            if (res.data.error === `剪切板不存在`) {
                showNew.value = true;
            }
        }
    }).catch((err) => {
        console.error(err);
    })

}
function createNetcut() {
    axios.post(`${ip}/createNetcut`, {
        paths,
        password: usePassword.value ? password.value : ``,
        creater: currectUser.uid,
        token: currectUser.token,
        canEdit: canEdit.value
    }).then((createRes) => {
        if (createRes.data.code === 0) {
            Notification.success(`创建成功`);
            setTimeout(() => { window.location.reload() }, 1500);
        }
        else {
            Notification.warning(`创建失败，请查看日志`)
            console.error(createRes.data.error);
        }
    }).catch((err) => {
        Notification.error(`创建失败，请查看日志`)
        console.error(err);
    })
}
function getNetcutByPassword(varPassword: string) {
    axios.post(`${ip}/getNetcutByPassword`, {
        paths,
        password: varPassword
    }).then((netcutData) => {
        if (netcutData.data.code === 0) {
            netcut.value = netcutData.data.data;
            canEdit.value = netcut.value.edit;
            loaded.value = true;
            showNew.value = showPasswordInputer.value = false;
        }
        else {
            console.error(netcutData.data.error);
            Notification.warning(`获取剪切板失败，请查看日志`);
        }

    }).catch((err) => {
        Notification.error(`获取剪切板失败，请查看日志`);
        console.error(err);
    });
}
function editClick() {
    // 保存编辑
    if (onEditing.value) {
        if (netcut.value.creater === currectUser.uid) {
            axios.post(`${ip}/updateNetcutByToken`, {
                paths,
                value: netcut.value.value,
                uid: currectUser.uid,
                token: currectUser.token
            }).then((saveRes) => {
                if (saveRes.data.code === 0) {
                    Notification.success(`保存成功`);
                }
                else {
                    Notification.warning(`保存失败，请查看日志`);
                    console.error(saveRes.data.error);
                }
            });
        }
        else {
            axios.post(`${ip}/updateNetcutByPassword`, {
                paths,
                value: netcut.value.value,
                password: password.value
            }).then((saveRes) => {
                if (saveRes.data.code === 0) {
                    Notification.success(`保存成功`);
                }
                else {
                    Notification.warning(`保存失败，请查看日志`);
                    console.error(saveRes.data.error);
                }
            });
        }
        onEditing.value = !onEditing.value;
        return;
    }
    else {
        // 开始编辑
        onEditing.value = !onEditing.value
    }
}
</script>

<template>
    <div style="margin-left: 5vw;">
        <Card v-if="!(showPasswordInputer || showNew)" style="width: 90vw;">
            <Button v-if="canEdit" @click="editClick"><span v-if="onEditing">保存</span><span
                    v-if="!onEditing">编辑</span></Button>
            <br />
            <Card style="margin-top: 1vh; width: 85vw;margin-left: 2vw;">
                <Skeleton :loading="!loaded" animation="gradient">
                    <div v-html="render(netcut.value)" v-if="!onEditing"></div>
                    <br />
                    <textarea v-if="onEditing" v-model="netcut.value" style="width: 70vw;height: 40vh;"></textarea>
                </Skeleton>
            </Card>
        </Card>
        <Card v-if="showPasswordInputer">
            <Card>
                <p>剪切板已加密，输入密码解锁剪切板</p>
                <span>创建者：<userSign :uid="netcut.creater"></userSign></span>
                <br>
                <span>创建时间：{{ translateTime(new Date(netcut.createTime)) }}</span>
                <span>修改时间：{{ translateTime(new Date(netcut.updateTime)) }}</span>
                <Input v-model="password"></Input>
                <Button @click="getNetcutByPassword(password)">确认</Button>
            </Card>
        </Card>
        <Card v-if="showNew" style="width: 80vw;margin-left: 5vw;">
            <h2 style="text-align: center;">新建剪切板</h2>
            <center>
                <p>当前访问的剪切板地址 <code style="background-color: rgba(10,10,10,0.1);padding: 2px 10px;">{{ paths }}</code>
                    不存在，您可以新建剪切板。
                </p>
            </center>
            <Form>
                <FormItem label="路径" name="paths" initial-data="TDesign">
                    <Input disabled placeholder="请输入内容" :value="paths" />
                </FormItem>
                <FormItem label="启用密码" name="tel" initial-data="123456">
                    <Switch v-model="usePassword"></Switch>
                </FormItem>
                <FormItem v-if="usePassword" label="密码" name="tel" initial-data="123456">
                    <Input v-model="password"></Input>
                </FormItem>

                <FormItem help="启用后，正确输入密码的人均可编辑剪切板" v-if="usePassword" :label="`他人编辑`" name="tel"
                    initial-data="123456">
                    <Switch v-model="canEdit"></Switch>
                </FormItem>
            </Form>
            <center><Button theme="primary" type="submit" @click="createNetcut">确认新建</Button></center>
        </Card>
    </div>
</template>

<style></style>