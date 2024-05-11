<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { updatePasswordAPI } from '@/apis/user'
import { ElMessage } from 'element-plus';
const userStore = useUserStore()
const account = userStore.userInfo.account

// 定义表单数据
const form = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
});
const formRef = ref(null)
// 表单规则
const rules = {
    oldPassword: [
        { required: true, message: '请输入旧密码', trigger: 'blur' },
    ],
    newPassword: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
            required: true,
            message: '密码应当包含大小写字母，数字，特殊符号中任意三项', trigger: 'blur'
        }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入密码', trigger: 'blur' },
        {
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
            message: '密码应当包含大小写字母，数字，特殊符号中任意三项',
            trigger: 'blur'
        },
        {
            validator: (rule, value, callback) => {
                if (value !== form.value.newPassword) {
                    callback(new Error('两次输入密码不一致！'))
                } else {
                    callback()
                }
            },
            trigger: 'blur'
        }
    ],
};
// 提交表单的方法
const submitForm = async () => {
    
    // 检查新旧密码是否相同
    const newPassword =form.value.newPassword
    if (form.value.newPassword === form.value.oldPassword) {
        alert('新旧密码不能相同，请重新输入');
        return;
    } else {
         const res = await updatePasswordAPI({ account, newPassword })
        ElMessage.success(res.data.message)
        //刷新页面
        location.reload()
    }
    // console.log(form.value);
   
//    console.log(res);
    // 在这里，您可以调用后端接口，发送表单数据
   
};
</script>


<template>
    <div class="container" v-loading="loading">
        <div class="main">
            <div class="form">
                <h1>修改密码</h1>
                <el-form :hide-required-asterisk="true" ref="formRef" :model="form" class="demo-form-inline"
                    label-width="70px" :size="size" :rules="rules" :scroll-to-error="true" style="max-width: 500px">
                    <el-form-item prop="oldPassword" label="旧密码">
                        <el-input placeholder="请输入旧密码" v-model="form.oldPassword" clearable />
                    </el-form-item>
                    <el-form-item prop="newPassword" label="新密码">
                        <el-input v-model="form.newPassword" placeholder="新密码(大小写字母，数字，特殊符号中任意三项)" show-password clearable />
                    </el-form-item>
                    <el-form-item prop="confirmPassword" label="确认密码">
                        <el-input v-model="form.confirmPassword" placeholder="请再次输入新密码" show-password clearable />
                    </el-form-item>
                    <el-button class="subBtn" type="primary" @click="submitForm">修改密码</el-button>
                </el-form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    display: flex;
    flex-direction: column;

    .main {
        position: relative;
        flex: 8;

        .form {
            position: absolute;
            /*top: 50%;left: 50%; 是以这个坐标点为起点，图像并不在窗口中心，要平移上自身的一半translate(-50%, -50%)*/
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid #f6f2eb;
            width: 500px;
            padding: 50px;
            background-color: white;
            border-radius: 30px;
            align-items: center;
            box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
            transition: 0.5s;

            &:hover {
                box-shadow: none;
            }

            .el-form {
                width: 100%;
                height: 100%;

                .el-form-item {
                    height: 40px;
                    border-radius: 20px;
                    width: 90%;
                    margin: 20px auto 10px;
                    border-bottom: 1px solid transparent;
                    /* 添加一个透明的下边框 */

                    &:last-child {
                        margin-bottom: 10px;
                    }
                }

                .toggle {

                    margin-bottom: 10px;
                    font-size: 12px;
                    color: #33679e;
                    cursor: pointer;
                    line-height: 20px;
                    ;
                    float: right;
                }

                .el-button {
                    width: 100%;
                    height: 50px;
                    border-radius: 10px;
                    box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
                    transition: 0.5s;

                    &:hover {
                        box-shadow: none;
                    }
                }

            }

        }
    }
}
</style>