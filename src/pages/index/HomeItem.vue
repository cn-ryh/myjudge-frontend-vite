<script setup lang="ts">
import { ip } from "@/modules/ip";
import navView from "@/modules/navView.vue";
import axios from "axios";
import { NotifyPlugin } from "tdesign-vue-next";
import { Ref, ref } from "vue";
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