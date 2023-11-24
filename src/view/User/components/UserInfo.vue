<script setup >
// import { reactive } from 'vue'
import ModifyInfo from './ModifyInfo.vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
console.log(userInfo)
//用户信息表单
// const userInfo = reactive({
//   uid: '123456',
//   username: '范小勤',
//   gender: '男',
//   brithday: '12-15',
//   email: '',
//   phone: '166666666',
//   text: 'vocal',
//   address: '江西吉安',
// })

</script>

<template>
  <div class="user-info">
    <div class="header">
      <ul>
        <li>
          <a href="javascript:;">关注</a>
          <span>111</span>
        </li>
        <li>
          <a href="javascript:;">粉丝</a>
          <span>111</span>
        </li>
        <li>
          <a href="javascript:;">获赞</a>
          <span>111</span>
        </li>
      </ul>
    </div>

    <div class="content">
      <div class="title">
        <h4>个人资料</h4>
        <div class="alert-info">
          <ModifyInfo></ModifyInfo>
        </div>
      </div>

      <el-divider />

      <div class="uid">
        <div class="info-item ">
          <label>Uid：</label>
          <span>{{ userInfo.user_id }}</span>
        </div>

        <div class="info-item">
          <label>账号：</label>
          <span>{{ userInfo.account }}</span>
        </div>
        <div class="info-item">
          <label>昵称：</label>
          <span>{{ userInfo.nick_name }}</span>
        </div>
        <div class="info-item">
          <label>性别：</label>
          <span>{{ userInfo.user_sex ? '女' : '男' }}</span>
        </div>

        <div class="info-item">
          <label>生日：</label>
          <span>{{ userInfo.user_brithday }}</span>
        </div>



        <div class="info-item">
          <label>邮箱：</label>
          <span>{{ userInfo.user_email }}</span>
        </div>

        <div class="info-item">
          <label>手机号：</label>
          <span>{{ userInfo.user_tel }}</span>
        </div>

        <div class="info-item">
          <label>籍贯：</label>
          <span>{{ userInfo.user_region[0] }} - {{ userInfo.user_region[1] }}</span>
        </div>

        <el-input  :rows="5" resize='none' type="textarea" :placeholder='userInfo.user_motto' style="margin-top: 25px;" :disabled="true"
          show-word-limit maxlength="30" />

      </div>

    </div>

  </div>
</template>

<style lang='scss' scoped>
.user-info {
  width: 320px;
  margin: 10px 0 0 15px;
  float: right;
  background-color: #fff;

  .header {
    padding: 0 0 10px 0;
    border-bottom: solid 1px #dcdfe6;

    ul {
      margin: 0 auto;
      display: flex;
      align-items: center;

      li {
        margin-top: 5px;
        text-align: center;
        flex: 1;
        display: flex;
        flex-direction: column;

        a {
          font-size: 12px;
          color: #99a2aa;
          height: 20px;
          flex: 1;
        }

        span {
          margin-top: 5px;
          height: 15px;
          flex: 1;
          color: #222;
          font-size: 12px;
        }
      }
    }
  }

  .content {

    width: 320px;
    height: 350px;
    border-radius: 5px;
    padding: 15px 20px;

    .el-divider {
      margin: 10px 0;
    }

    .title {
      padding: 0 10px;
      display: flex;
      justify-content: space-between;

      h4 {
        line-height: 27px;
      }

      span {
        display: block;
        float: left;
      }


    }

    .uid {
      margin-top: 10px;
      text-align: center;
      display: flex;
      flex-wrap: wrap;

      .info-item {
        width: 50%;

        color: #6d757a;
        font-size: 12px;
        line-height: 16px;
        margin: 10px 0 5px 0;
        display: flex;
        align-items: center;

        label {
          display: inline-block;

          font-weight: bold;
        }

      }

    }
  }

}
</style>