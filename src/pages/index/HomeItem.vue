<script setup lang="ts">
import { translateTime } from '@/modules/functions'
import { ip } from "@/modules/ip";
import navView from "@/modules/navView.vue";
import { Card } from "@arco-design/web-vue";
import { Tag } from "tdesign-vue-next";
import axios from "axios";
import { NotifyPlugin } from "tdesign-vue-next";

import { Ref, ref } from "vue";
import { IDiscussion, discussType } from "@/modules/interface";
import UserSign from "@/modules/user/userSign.vue";
window.onhashchange = () => {
    window.location.reload();
};
const oneWord: Ref<string> = ref(``);
const oneWordAuth: Ref<string> = ref(``);
const fontSize: Ref<string> = ref(`15px`);
/**
 * 获取一言
 * @param times 获取失败次数
 */
function getWord(times: number = 0) {
    axios.get(`${ip}/getOneWord`).then((data) => {
        oneWord.value = data.data.hitokoto;
        oneWordAuth.value = data.data.from;
        if (oneWord.value.length < 10) {
            fontSize.value = `18px`;
        }
        else if (oneWord.value.length < 20) {
            fontSize.value = `17px`;
        }
        else {
            fontSize.value = `16px`;
        }
    }).catch((err) => {
        console.error(err);
        if (times > 10) {
            NotifyPlugin.error({
                content: `获取一言失败`
            })
            return;
        }
        setTimeout(() => {
            getWord(times + 1);
        }, 800);
    })
}
getWord();
const contests: Ref<any[]> = ref([]);
axios.get(`${ip}/getContestList`).then((res) => {
    contests.value = res.data;
});

const discussionList: Ref<IDiscussion[]> = ref([]);
axios.post(`${ip}/getDiscussionList`, { page: 1 }).then((getListRes) => {
    if (getListRes.data.code === 0) {
        discussionList.value.push(...getListRes.data.data);
    }
    else {
        NotifyPlugin.warning({
            title: `获取列表失败`,
            content: `请查看日志`
        });
    }
    return;
})
function jump(url: string) {
    window.location.href = url;
}
</script>
<template>
    <navView></navView>
    <main>
        <div class="layui-row layui-col-space32">
            <div class="layui-col-md9">
                <div class="card"
                    style="height: 180px;background-image: url(/bander3.png);background-size: cover;background-repeat: no-repeat;">
                </div>
            </div>
            <div class="layui-col-md3">
                <div class="card" :style="{
                    height: `180px`,

                }">
                    <h2 style="width: 100%;text-align: center;">一言</h2>
                    <p :style="{ marginTop: `1.4rem`, fontSize: fontSize }">{{ oneWord
                        }}</p>
                    <div id="oneWordAuth">—— {{ oneWordAuth }}</div>
                </div>
            </div>
        </div>
        <div class="layui-row layui-col-space32">
            <div class="layui-col-md7">
                <div class="card">
                    <h2>最近比赛</h2>
                    <br />
                    <div class="layui-row layui-col-space32">
                        <div class="layui-col-md6" v-for="(item, idx) of contests" :key="idx">
                            <Card @click="jump(`/contest#/${item.id}`)" size="small"
                                style="width: 100%;display: inline-block;height: auto;margin: 3% 2%;"
                                :title="item.title">

                                <center>
                                    <Tag>{{ item.type }}</Tag>
                                </center>
                                <br>
                                <span>
                                    {{
                                        `${translateTime(new Date(item.begintime))}~ ${translateTime(new
                                            Date(item.endtime))}`
                                    }}
                                </span>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layui-col-md5">
                <div class="card">
                    <h2>最近讨论</h2>
                    <br />
                    <div @click="jump(`/discuss#/${item.id}`)"
                        style="margin-bottom: 20px;padding: 20px;border: 1px solid var(--color-danger-light-4);"
                        v-for="(item, index) of discussionList" :key="index" class="discussionListItem card">
                        <div>
                            <h3 style="color: rgb(255,75,75);">{{ item.title }}</h3>

                            <UserSign tagsize="small" :uid="item.creater" show-tag :font-color="`black`">
                            </UserSign>

                        </div>
                        <div style="width: 100%;margin-top: 10px;">
                            <span>
                                {{ translateTime(new Date(item.createTime)) }}
                            </span>
                            <span v-if="item.type === discussType.problem" style="margin-left: 10px;">{{ item.problem
                                }}</span>
                            <span style="float: right;">最近回复：{{ !item.replyTime ? `无` : translateTime(new
                                Date(item.replyTime))
                                }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style>
#oneWordAuth {
    float: inline-end;
    bottom: 30px;
    position: absolute;
    font-size: 13px;
    right: 35px;
}
</style>