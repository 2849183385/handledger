<script setup>
import { ref, onMounted, watch } from 'vue'
import areaData from '@/assets/area/province-element-min.json'
import { updateUserInfoAPI } from '@/apis/user'
import { useUserStore } from '@/stores/userStore';
import { ElMessage } from 'element-plus';
// import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { userInfo: { account, user_sex, nick_name, user_region, user_tel, user_email, user_brithday, user_motto } } = userStore
const areaDataRef = ref(null)
// console.log(areaData)
// const reactiveUserInfo = reactive(userInfo)
//地区数据
onMounted(() => {
    areaDataRef.value = areaData && areaData.map(province => {
        return {
            value: province.value,
            label: province.label,
            children: province.children && province.children.map(city => {
                return {
                    value: city.value,
                    label: city.label,
                    //县区
                    // children: city.children && city.children.map(area => {
                    //     return {
                    //         value: area.value,
                    //         label: area.label,
                    //     }
                    // })
                }
            })
        }
    })
})
watch(() => userStore.userInfo, (newVal) => {
    form.value = newVal
})
const dialogFormVisible = ref(false)
const form = ref(
    {
        account,
        nick_name,
        user_sex,
        user_region,
        user_tel,
        user_email,
        user_brithday,
        user_motto
    }
)
// console.log(form.value)
const rules = ({
    nick_name: [
        { required: true, message: '请输入昵称', trigger: 'blur' },
        { max: 6, message: '昵称最多6个字符', trigger: 'blur' }
    ],
    user_sex: [
        { type: 'number', required: true, message: '请选择性别', trigger: 'blur' }
    ],
    user_region: [
        { required: true, message: '请选择籍贯', trigger: 'blur' }
    ],
    user_tel: [
        { required: true, message: '请输入联系方式', trigger: 'blur' },
        { pattern: /^\d{11}$/, message: '联系方式需为11位数字', trigger: 'blur' }
    ],
    user_email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    user_brithday: [
        { required: true, message: '请选择出生日期', trigger: 'blur' }
    ],
    user_motto: [
        { required: true, message: '请输入个性签名', trigger: 'blur' }
    ]
})
// 提交前统一校验
const formRef = ref(null)
const onSubmit = async () => {
    console.log(form)
    formRef.value.validate(async (valid) => {
        if (valid) {
            // 表单验证通过，提交表单
            //将地区数据转换为字符串
            form.value.user_region = JSON.stringify(form.value.user_region)
            //将时间格式去掉时分秒
            // form.value.user_brithday = moment(form.value.user_brithday).format('YYYY-MM-DD')
            // console.log(form.value.user_brithday)
            // form.value. = form.value.user_sex.toString()
            console.log(form.value.user_region)
            const res = await updateUserInfoAPI(form.value);
            // await userStore.getUserInfo(form.value.account)
            //提交修改后关闭弹窗
            if (res) await userStore.getUserInfo(form.value.account)
            dialogFormVisible.value = false
            ElMessage.success('修改成功');
            console.log(form.value)
            console.log(res)
        } else {
            // 表单验证不通过
            ElMessage.error('表单验证不通过');
        }
    });
}
</script>
<template>
    <div class="update-info">
        <el-button text @click="dialogFormVisible = true">
            修改信息
        </el-button>
    </div>
    <el-dialog :lock-scroll="false" :append-to-bod="true" v-model="dialogFormVisible" title="用户信息" :modal="false" draggable
        center :close-on-click-modal="false" width="500px">
        <el-form style="max-height: 500px;" :hide-required-asterisk="true" :model="form" label-width="70px"
            :rules="rules" ref="formRef" :lock-scroll="false" :append-to-bod="true">
            <el-form-item label="昵称" prop="nick_name">
                <el-input v-model="form.nick_name" type="text" />
            </el-form-item>
            <el-form-item label="性别" prop="user_sex">
                <el-radio-group v-model="form.user_sex">
                    <el-radio :label='0'>男</el-radio>
                    <el-radio :label='1'>女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="籍贯" prop="user_region">
                <el-cascader v-model="form.user_region" v-if="areaDataRef" :options="areaDataRef" clearable>
                </el-cascader>
            </el-form-item>
            <el-form-item label="联系方式" prop="user_tel">
                <el-input v-model="form.user_tel" type="tel" />
            </el-form-item>
            <el-form-item label="邮箱" prop="user_email">
                <el-input v-model="form.user_email" type="email" />
            </el-form-item>
            <el-form-item label="出生日期" prop="user_brithday">
                <el-col :span="11">
                    <el-date-picker v-model="form.user_brithday" type="date" placeholder="Pick a date"
                        format="YYYY/MM/DD" value-format="YYYY-MM-DD" style="width: 100%" />
                </el-col>
            </el-form-item>
            <el-form-item label="个性签名" prop="user_motto">
                <el-input resize='none' show-word-limit maxlength="30" :rows="5" v-model="form.user_motto"
                    type="textarea" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">返回</el-button>
                <el-button type="primary" @click="onSubmit">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style lang='scss' scoped>
.el-form{
    margin: 10px 50px;
}

.update-info {
    float: right;
    border-radius: 3px;
    border: 1px solid gray;


    .el-button {
        font-size: 10px;
        padding: 0 2px;
        height: 25px;
    }
}

.dialog-footer {
    padding: 0 50px;
    display: flex;
    justify-content: space-between;

    .el-button {
        margin: 0 30px;
        font-size: 18px;
        height: 40px;
        width: 150px;
    }
}
</style>