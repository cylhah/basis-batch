<script setup lang="ts">
import { ref } from "vue";
import { sendEvent } from "../common/event-dispatcher";
const inputPath = ref("");
const outputPath = ref("");
const tip = ref("test");

function onTransClick() {
    sendEvent("runBasis", { inputPath: inputPath.value, outputPath: outputPath.value });
}
</script>

<template>
    <div class="home">
        <div class="title"></div>
        <div class="line">
            <div class="label">输入路径</div>
            <el-input v-model="inputPath" placeholder="请输入要转换文件夹的路径" />
        </div>
        <div class="line">
            <div class="label">输出路径</div>
            <el-input v-model="outputPath" placeholder="请输入要输出文件夹的路径" />
        </div>
        <div class="menus-container">
            <el-button type="primary" @click="onTransClick">开始转换</el-button>
        </div>
        <div class="tip-container">
            <div class="tip">{{ tip }}</div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.home {
    .tip-container {
        color: rgb(58, 206, 58);
        display: flex;
        justify-content: center;
    }
    .menus-container {
        margin: 20px 0;
        display: flex;
        justify-content: center;
    }
    .line {
        display: flex;
        align-items: center;
        margin: 20px 20px;
        .label {
            white-space: nowrap;
            font-size: 14px;
            color: #999;
            margin-right: 10px;
        }
    }
}
</style>
