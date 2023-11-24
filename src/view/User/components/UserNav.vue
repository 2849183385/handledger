<script setup >
import { useUserStore } from '@/stores/userStore'

const { userInfo } = useUserStore()
</script>

<template>
  <div class="h-inner">
    <div class="container">
      <div class="user">
        <div class="user-avatar">
          <el-avatar :size="160" src="src/assets/images/avatar1.jpg">
            <!--头像加载失败 -->
            <el-icon style="font-size:40px;">
              <UserFilled />
            </el-icon>
            <!-- <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/> -->
          </el-avatar>
        </div>
        <div class="user-basic">
              <span>{{ userInfo.nick_name }}</span>
              <div class="user-signature">
            <input id="h-sign" type="text" placeholder="接受，≠我同意" maxlength="60" class="space_input">
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.h-inner {
  .container {
    overflow: hidden;
    height: 200px;
    background-image: url(src/assets/images/banner1.jpg);
    position: relative;

    .user {
      display: flex;
      height: 160px;
      margin: 20px 30px 20px 20px;
      flex-direction: row-reverse;

      .user-avatar {
        width: 160px;
        height: 160px;
      }

      .user-basic {
        margin: 80px 50px 0 0;
        width: 500px;
        position: relative;
        span {
          position: absolute;
          right: 0px;
          top: 0;
          display: inline-block;
          margin-right: 5px;
          font-weight: 700;
          line-height: 30px;
          font-size: 30px;
          vertical-align: middle;

        }

        .user-signature {
          position: absolute;
          bottom: 0;
          #h-sign {
            //聚焦后外边框
            outline: none;
            background: transparent;
            border-radius: 4px;
            border: none;
            box-shadow: none;
            color: hsla(0, 0%, 100%, .8);
            font-size: 15px;
            font-family: Microsoft Yahei;
            line-height: 26px;
            height: 35px;
            padding: 0 5px;
            position: relative;
            top: -1px;
            width: 500px;
            text-align: right;
          }

          #h-sign:hover {
            background: hsla(0, 0%, 100%, .2);
            box-shadow: 0 0 0 1px hsla(0, 0%, 100%, .5);
          }

          #h-sign:focus {
            background: #fff;
            box-shadow: inset 0 2px 4px rgba(35, 54, 86, .3);
            color: #6d757a;
          }


        }
      }
    }
  }
}
</style>