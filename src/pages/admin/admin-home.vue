<script setup lang="ts">
function jump(url: string) {
    window.location.href = url;
}
import { Input,Button, InputGroup } from 'tdesign-vue-next';
import { ref, Ref } from 'vue';
const editProblemId: Ref<string> = ref(``);
const editTrainingId: Ref<string> = ref(``);
const editContestId: Ref<string> = ref(``);
</script>
<template>
    <div class="card" style="width: 100%;height: 100%;">
        <div class="options">
            <div class="option" @click="jump(`/admin#/newproblem`)">
                <h2>新建题目</h2>

            </div>
            <div class="option">
                <h2>管理题目</h2>
                <br>
                <div>
                    <InputGroup>
                        <Input size="large" v-model="editProblemId"></Input>
                        <Button size="large" @click="jump(`/admin#/problem/${editProblemId}`)">确定</Button>
                    </InputGroup>
                </div>
            </div>
        </div>
        <div class="options">
            <div class="option" @click="jump(`/admin#/newtraining`)">
                <h2>新建题单</h2>

            </div>
            <div class="option">
                <h2>管理题单</h2>
                <br>
                <div>
                    <InputGroup>
                        <Input size="large" v-model="editTrainingId"></Input>
                        <Button size="large" @click="jump(`/admin#/training/${editTrainingId}`)">确定</Button>
                    </InputGroup>
                </div>
            </div>
        </div>
        <div class="options">
            <div class="option" @click="jump(`/admin#/newcontest`)">
                <h2>新建比赛</h2>
            </div>
            <div class="option">
                <h2>管理比赛</h2>
                <br>
                <div>
                    <InputGroup>
                        <Input size="large" v-model="editContestId"></Input>
                        <Button size="large" @click="jump(`/admin#/contest/${editContestId}`)">确定</Button>
                    </InputGroup>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.card .option {
    display: flex;
    flex-direction: column;
    background-color: #fcf7f7;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(194, 187, 187, 0.308);
    box-sizing: border-box;
    min-height: 1px;
    padding: 10px 20px;
    height: auto;
    width: 45%;
}
.option:hover
{
    cursor: pointer;
}
.options {
    display: flex;
    align-items: stretch;
    justify-content: space-evenly;
    margin: 20px;
}
</style>