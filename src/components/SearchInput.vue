<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue';
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
const expend=ref(false)
const trigger=()=>{
    expend.value=!expend.value
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
    
    <div class="search-bar" @click="trigger" v-if="!expend" >
        <el-icon><Search/></el-icon>
    </div>
    <div class="search-box" v-else>
        <el-input  @keyup.enter="con" size="large" v-model="input" class="w-50 m-2"
            placeholder="输入点啥吧" />
        <el-button text @click="con" :icon="Search"></el-button>
    </div>

</template>

<style lang="scss" scoped>

.search-bar{
    width: 35px;
    height: 35px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: aqua;
    cursor: pointer;
    &:hover{
        background-color: #f0f0f0;
    }
}
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
        color: aqua;
    }
}
</style>