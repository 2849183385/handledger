<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

const input = ref('')
const con = () => {
    if (input.value.length === 0 || input.value === '' || input.value === ' ') {
        ElMessage({
            type: 'warning',
            message: '搜索不能为空'
        })
    }
    console.log(input.value)
    
    input.value = ''
}

// function throttle(fn, time) {
//     let timer
//     return function () {
//         if (!timer) {
//             timer = setTimeout(() => {
//                 fn();
//                 timer = null
//             }, time)
//         }
//     }
// }



</script>

<template>
    <div class="search-box">
        <el-input suffix-icon="Search" @keyup.enter="con" size="large" v-model="input" class="w-50 m-2"
            placeholder="输入点啥吧" />
        <el-button @click="con"></el-button>
    </div>
</template>

<style lang="scss" scoped>
.search-box {
    position: relative;

    .el-input {

        //深度选择器 可以用于定义子组件的专属样式，不易发生冲突。
        :deep(.el-input__wrapper) {
            border-radius: 10px;

        }
    }

    .el-button {
        border-radius: 10px;
        border: none;
        position: absolute;
        right: 1px;
        height: 38px;
        width: 38px;
        top: 1px;
        opacity: 0;
    }
}
</style>