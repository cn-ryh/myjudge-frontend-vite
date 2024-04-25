<script lang="ts" setup>
import { Tag } from '@arco-design/web-vue'
import '@arco-design/web-vue/es/tag/style/index'
import { getUserData } from '@/modules/user/getUserData';
import { Ref, ref } from 'vue';
const props = withDefaults(defineProps<{
    uid: number,
    showTag?: boolean,
    fontColor?:string
}>(), {
    uid: 1,
    showTag: false,
    fontColor: `white`
});
const emit = defineEmits(['update:showTag'])
if (!props.showTag) {
    emit(`update:showTag`, false);
}
const username = ref(``);
const tagOpt: Ref<{ color: string, text: string, textcolor: string }[]> = ref([]);
getUserData(props.uid).then((res) => {
    tagOpt.value = res.tag;
    console.log(tagOpt);
    username.value = res.username;
    console.log(username);
})
</script>
<template>
    <span style="max-width: 500px;display: inline-block;">
        <span :style="{
            color:$props.fontColor , fontSize: `large`, fontWeight: 600, marginRight: `10px`,
            marginTop: `2px`,
            display: `inline-block`,
            height: `auto`,
            whiteSpace: `nowrap`,
}">{{ username }}</span>
        <span v-if="showTag">
            <Tag size="medium" :style="`margin-top:-5px;margin-right:10px;text-color:${item.textcolor};font-weight:450;font-size:15px`"
                v-for="(item, index) of tagOpt" :color="item.color" :key="index">{{
                item.text }}</Tag>

        </span>
    </span>
</template>
