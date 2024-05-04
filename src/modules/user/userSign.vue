<script lang="ts" setup>
import { Tag } from 'tdesign-vue-next';
import '@arco-design/web-vue/es/tag/style/index'
import { getUserData } from '@/modules/user/getUserData';
import { Ref, ref, watch } from 'vue';
const props = withDefaults(defineProps<{
    uid: number,
    showTag?: boolean,
    fontColor?: string,
    showHeadImg?: boolean,
    headImgPos?: "left" | "right",
    headImgSize?: string
}>(), {
    uid: 1,
    showTag: false,
    fontColor: `white`,
    showHeadImg: false,
    headImgPos: `left`,
    headImgSize: `50px`
});
const emit = defineEmits(['update:showTag'])
if (!props.showTag) {
    emit(`update:showTag`, false);
}
const username = ref(``);
const tagOpt: Ref<{ color: string, text: string, textcolor: string }[]> = ref([]);
const headImg: Ref<string> = ref(``)
getUserData(props.uid).then((res) => {
    tagOpt.value = res.tag;
    username.value = res.username;
    headImg.value = res.headImg;

})
watch(props, () => {
    getUserData(props.uid).then((res) => {
        tagOpt.value = res.tag;
        username.value = res.username;
    })
})

</script>
<template>
    <div style="display: flex;align-items: center;">
        <img :style="{ width: $props.headImgSize, height: $props.headImgSize }" class="headImg"
            v-if="$props.showHeadImg && ($props.headImgPos == `left`)" :src="headImg" />
        <span :style="{
            color: $props.fontColor, fontSize: `large`, fontWeight: 600, marginRight: `10px`,
            marginTop: `2px`,
            display: `inline-block`,
            height: `auto`,
            whiteSpace: `nowrap`,
            marginLeft: `10px`
        }">{{ username }}</span>
        <div v-if="showTag">
            <Tag size="medium"
                :style="`margin-top:-5px;margin-right:10px;text-color:${item.textcolor};font-weight:450;font-size:15px`"
                v-for="(item, index) of tagOpt" :color="item.color" :key="index">{{
                    item.text }}</Tag>
        </div>
        <img class="headImg" v-if="$props.showHeadImg && ($props.headImgPos == `right`)" :src="headImg" />
        <slot name="after">
        </slot>
    </div>
</template>
<style>
.headImg {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
