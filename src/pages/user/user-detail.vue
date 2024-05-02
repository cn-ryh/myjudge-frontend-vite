<script setup lang="ts">
import { ip } from "@/modules/ip";
import { Tag, Link, Tabs, TabPane } from "@arco-design/web-vue";
import { Button } from "tdesign-vue-next";
import { translateColor, translateDiff } from "@/modules/problem/translate";
import axios from "axios";
import { Ref, ref } from "vue";
import { currectUser } from "@/modules/user/currectUser";
const uid = window.location.href.substring(window.location.href.lastIndexOf(`/`) + 1);
const acceptedProblems: Ref<string[]> = ref([]);
const triedProblems: Ref<string[]> = ref([]);
const username = ref('');
const headImg = ref(``)
window.onhashchange = () => {
    window.location.reload();
};

axios.get(`${ip}/getUserData/${uid}`).then((res) => {
    if (res.data == `User not Found`) {
        window.alert(`用户不存在`);
        window.location.href = `/`
    }
    acceptedProblems.value = res.data.acceptedProblems;
    triedProblems.value = res.data.triedProblems;
    username.value = res.data.username;
    headImg.value = res.data.headImg;
});
function getChatHref() {
    return `/chat#/${Math.min(+uid, currectUser.uid)}&${Math.max(+uid, currectUser.uid)}`;
}
</script>

<template>
    <main>
        <div class="layui-row layui-col-space32" style="min-height: 70vh;">
            <div class="layui-col-sm8">
                <div class="card" style="min-height: 70vh;">
                    <Tabs>
                        <TabPane key="1" title="个人主页">
                        </TabPane>
                        <TabPane key="2" title="练习情况">
                            <div v-for="(item, idx) of acceptedProblems" :key="idx">
                                <div v-if="item.length > 0">
                                    <Tag :color="translateColor(idx)" size="large">{{ translateDiff(idx) }}</Tag>
                                    <br />
                                    <br />

                                    <div>
                                        <span v-for="(problem) of item" :key="problem">
                                            <Link :href="`/problem#/${problem}`" style="font-size: large;">
                                            {{ problem }}
                                            </Link>
                                            {{ ' ' }}
                                        </span>
                                    </div>
                                    <br />

                                </div>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

            </div>
            <div class="layui-col-sm4">
                <div class="card">
                    <center>
                        <h2>
                            <span style="color: black;">{{ username.substring(0, 1) }}</span><span
                                style="color: red;">{{
                                    username.substring(1) }}</span>
                        </h2>
                        <br />
                        <img :src="headImg" style="width: 50%;border-radius: 50%;" />
                        <br />
                        <Button v-if="+uid != currectUser.uid" :href="getChatHref()">私信</Button>
                        <Button :href="`/user#/setting`"  v-if="+uid === currectUser.uid">个人设置</Button>
                    </center>
                </div>
            </div>
        </div>

    </main>
</template>
