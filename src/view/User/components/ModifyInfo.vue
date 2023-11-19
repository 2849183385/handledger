<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import areaData from '@/assets/area/province-element-min.json'

const areaDataRef = ref(null)
// console.log(areaData)


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


const dialogFormVisible = ref(false)
// const formLabelWidth = '140px'

const form = ref({
    uid: '123456',
    username: '范小勤',
    gender: '男',
    email: '1955454545@qq.com',
    phone: '166666666',
    region: ["江西省", "吉安市"],
    brithday: 'Thu Nov 23 2023 00:00:00 GMT+0800',
})

const rules = ({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    gender: [
        { required: true, message: '请选择性别', trigger: 'change' }
    ],
    region: [
        { type: 'array', required: true, message: '请选择籍贯', trigger: 'change' }
    ],
    phone: [
        { required: true, message: '请输入联系方式', trigger: 'blur' },
        { pattern: /^\d{11}$/, message: '联系方式需为11位数字', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ],
    date: [
        { required: true, message: '请选择出生日期', trigger: 'change' }
    ]
})
const handleAreaChange = (value) => {
    console.log(value)
}

// 提交前统一校验
const onSubmit = () => {
    console.log(form)
     form.value.validate(async(valid) => {
        if (valid) {
            // 表单验证通过，提交表单
           await this.submitToServer();
        } else {
            // 表单验证不通过
            this.$message.error('表单验证不通过');
        }
    });
}

</script>

<template>
    <div class="update-info">
        <el-button text @click="dialogFormVisible = true">
            修改资料
        </el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" title="用户信息" draggable center close-on-click-modal="false" width="500px">
        <el-form :model="form" label-width="120px" :rules="rules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="form.gender" prop="gender">
                    <el-radio label="男"></el-radio>
                    <el-radio label="女"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="籍贯" prop="region">
                <el-cascader v-model="form.region" v-if="areaDataRef" :options="areaDataRef" :props="props1"
                    @change="handleAreaChange" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="联系方式" prop="phone">
                <el-input v-model="form.phone" type="tel" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" type="email" />
            </el-form-item>
            <el-form-item label="出生日期" prop="date">
                <el-col :span="11">
                    <el-date-picker v-model="form.date" type="brithday" placeholder="Pick a date" style="width: 100%" />
                </el-col>
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
    padding: 0 150px;
    display: flex;
    justify-content: space-between;

    .el-button {
        font-size: 18px;
        height: 50px;
        width: 150px;
    }
}
</style>