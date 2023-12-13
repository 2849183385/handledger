<script  setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore'
import {  registerAPI } from "@/apis/user";
import { ElMessage } from 'element-plus'
// import { FormInstance, FormRules } from 'element-plus'

const size = ref('large')
const Router = useRouter()
const loading = ref(false)
const isLogin = ref(true)
function toggleLayout() {
  isLogin.value = !isLogin.value
}
//表单对象
const form = ref({
  account: 'taylor',
  password: "23648112+a",
  confirmpassword: '23648112+a'
})
// const {account,password} = form.value
//校验规则对象
// const PassValidarte = '/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,'
const rules = ({
  account: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在2-10之间', trigger: 'blur' },
  ],
  //密码验证
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    {
      pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
      required: true,
      message: '密码应当包含大小写字母，数字，特殊符号中任意三项', trigger: 'blur'
    }
  ],
  confirmpassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
      message: '密码应当包含大小写字母，数字，特殊符号中任意三项',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (value !== form.value.password) {
          callback(new Error('两次输入密码不一致！'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

 
//登录前的统一校验
const formRef = ref(null)
const userStore = useUserStore()
const doLogin = async () => {
  const { account, password } = form.value
  //表单中ref绑定的时formRef，所以formRef是表单这个标签对象，进行验证时，对表单进行验证，而不是对form进行验证
  await formRef.value.validate(async (valid) => {
    console.log(1)
    // valid所有验证都通过才为true
    if (valid) {
      loading.value = true
      //ToDo Login 
      try {
      await userStore.getToken({ account, password })
      await userStore.getUserInfo(account)
        ElMessage({
        type:'success',
        message: '登录成功'
         })
        await userStore.getLikes(userStore.userInfo.user_id)
        await userStore.getFavorites(userStore.userInfo.user_id)
      // Router.replace('/')
      Router.push('/')
      } catch (error) {
        loading.value = false
        console.log(error)
        ElMessage({
          type:'error',
          message: error.message||'登录失败'
        })
      }
    }
  })
  
  console.log(1)
}

const doRegister = async () => {
 
  const { account, password } = form.value
   await formRef.value.validate(async (valid) => {
     if (valid) {
       loading.value = true
      await registerAPI({ account, password })
      
      ElMessage({
        type:'success',
        message: '注册成功'
      })
      toggleLayout()
    }
   })
  loading.value = false
}
watch(isLogin, () => {
  form.value = {
    account: '',
    password: "",
    confirmpassword: ''
  }
})
</script>
<template>
  <div class="container" v-loading="loading">
    <div class="header">
      <div class="logo">
        <span>chan</span>
      </div>
    </div>

    <div class="main">

      <!-- 登录表单 -->
      <div class="form" v-if="isLogin">
        <h1>Hand Ledger</h1>
        <el-form :hide-required-asterisk="true" ref="formRef" :model="form" class="demo-form-inline"
           label-width="55px" :size="size" :rules="rules" :scroll-to-error="true"
          style="max-width: 500px">

          <!-- prop='验证规则' -->
          <el-form-item prop="account" label="账号">
            <el-input v-model="form.account" placeholder="请输入账号" clearable />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码(大小写字母，数字，特殊符号中任意三项)" show-password clearable />
          </el-form-item>
          <div class="toggle">
            <span @click="toggleLayout">没有账号？点击注册</span>
          </div>
          <el-button class="subBtn" type="primary" @click="doLogin">登录</el-button>
        </el-form>
      </div>

      <!-- 注册表单 -->
      <div class="form" v-else>
        <h1>Hand Ledger</h1>
        <el-form :hide-required-asterisk="true" ref="formRef" :model="form" class="demo-form-inline" :label-position="left"
          label-width="80px" :size="size" :rules="rules" scroll-to-error="true" style="max-width: 500px">
          <el-form-item prop="account" label="账号">
            <el-input v-model="form.account" placeholder="请输入账号" clearable />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="密码应当包含大小写字母，数字，特殊符号中任意三项" show-password clearable />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmpassword">
            <el-input v-model="form.confirmpassword" placeholder="请再次输入密码(密码应当包含大小写字母，数字，特殊符号中任意三项)" show-password clearable />
          </el-form-item>
          <div class="toggle">
            <span @click="toggleLayout">已有账号？登录</span>
          </div>
          <el-button class="subBtn" type="primary" @click="doRegister">注册</el-button>
        </el-form>
      </div>

    </div>

    <div class="footer">
      <span>Copyright @chan 2023 </span>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.container {
  background-image: url(src/assets/images/login-bg.png);
  background-color: rgb(246, 242, 235);
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .header {
    flex: 1;
    width: 100%;
    padding: 0;

    .logo {
      height: 100px;
      width: 50px;
      color: black;

      span {
        color: #33679e;
        font-size: 10ch;
      }
    }
  }

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
      //添加阴影，鼠标移动到后，阴影消失
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
          width: 100%;
          margin: 20px auto 10px;
          border-bottom: 1px solid transparent;
          /* 添加一个透明的下边框 */

          &:last-child {
            margin-bottom: 10px; // 设置较小的margin-bottom值
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

  .footer {
    flex: 1;
    bottom: 0;
    left: 50%;
    height: 5%;

    span {
      display: block;
      margin: 0 auto;
      line-height: 60px;
      text-align: center;
      font-size: large;
      color: gray;
      font-weight: bold;
    }
  }

}

h1 {
  color: #33679e;
  display: block;
  font-size: 2em;
  margin-block-start: 0.67em;
  margin-block-end: 0.67em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
  height: 50px;
  padding: 0 10px;
  text-align: center;
  line-height: 50px;
  border-radius: 5px;
}
</style>