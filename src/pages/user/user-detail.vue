<script setup lang="ts">
import { ip } from "@/modules/ip";
import { Card, Tag, Link, Tabs, TabPane } from "@arco-design/web-vue";
import { translateColor, translateDiff } from "@/modules/problem/translate";
import axios from "axios";
import { Ref, ref } from "vue";
const uid = window.location.href.substring(window.location.href.lastIndexOf(`/`) + 1);
const acceptedProblems: Ref<string[]> = ref([]);
const triedProblems: Ref<string[]> = ref([]);
const payed = ref(0);
const username = ref('');
const level = ref(0);
const exp = ref(0);
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
    payed.value = res.data.payed;
    username.value = res.data.username;
    level.value = res.data.level;
    exp.value = res.data.exp;
});

</script>

<template>
    <div style="width: 90vw;height: auto;min-height: 100vh;">
        <div style="width: 60%;height: auto;min-height: 95vh;float: left;margin-top: 4vh;">
            <Card style="width: 100%;height: auto;min-height: 80vh;padding: 5%;font-size: larger;">
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
            </Card>
        </div>
        <div style="position: fixed;width: 25vw;height: 70vh;right: 3vw ;top:8vh;float: right;">

            <Card style="width: 100%;height: 90%;">
                <div>
                    <center>
                        <h2>
                            欢迎 <span style="color: black;">{{ username.substring(0, 1) }}</span><span
                                style="color: red;">{{
                                    username.substring(1) }}</span>。
                        </h2>
                    </center>
                </div>
                <br />
            </Card>
        </div>
    </div>
</template>
