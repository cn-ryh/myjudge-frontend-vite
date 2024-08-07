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
    headImgSize?: string,
    tagsize?: "small" | "medium",
    disableJump?: boolean
}>(), {
    uid: 1,
    showTag: false,
    fontColor: `white`,
    showHeadImg: false,
    headImgPos: `left`,
    headImgSize: `50px`,
    tagsize: `medium`,
    disableJump: false
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
        headImg.value = res.headImg;
    })
})
function jump(uid: number) {
    window.open(`/user/${uid}`);
}
</script>
<template>
    <div style="display: flex;align-items: center;">
        <slot name="before">
        </slot>
        <img @click="() => {
            if ($props.disableJump) {
                return;
            }
            jump($props.uid || 1)
        }" :style="{ width: $props.headImgSize, height: $props.headImgSize }" class="headImg"
            v-if="$props.showHeadImg && ($props.headImgPos == `left`)" :src="headImg" />
        <span @click="() => {
            if ($props.disableJump) {
                return;
            }
            jump($props.uid || 1)
        }" class="userName" :style="{
            color: $props.fontColor, fontSize: `large`, fontWeight: 600, marginRight: `10px`,
            marginTop: `-2px`
        }">{{ username }}</span>
        <div class="userTags" v-if="showTag">
            <Tag :size="$props.tagsize ?? `medium`" :style="`text-color:${item.textcolor};`"
                v-for="(item, index) of tagOpt" :color="item.color" :key="index">{{
                    item.text }}</Tag>
        </div>
        <img @click="() => {
            if ($props.disableJump) {
                return;
            }
            jump($props.uid || 1)
        }" class="headImg" v-if="$props.showHeadImg && ($props.headImgPos == `right`)" :src="headImg" />
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

.userTags :not(:last-child) {
    margin-right: 10px;
}

.userName {
    margin-top: 2px;
    display: inline-block;
    height: auto;
    white-space: nowrap;
    margin-left: 10px;
}
</style>
