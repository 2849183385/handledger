<script setup >
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia';
// import { ElMessage } from 'element-plus'
import { updateAvatarAPI } from '@/apis/user'
import ImageCompressor from 'image-compressor.js'
import { avatarSrc } from '@/utils/imageSrc'
import { ElMessage } from 'element-plus';
const imgUrl = ref(null)
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
// const beforeAvatarUpload = (Avatar) => {
//   if (Avatar.type !== 'image/jpeg' && Avatar.type!== 'image/png') {
//     ElMessage.error('头像格式不符合要求!')
//     return false
//   } else if (Avatar.size / 1024 / 1024 > 2) {
//     ElMessage.error('头像大小不能超过2MB')
//     return false
//   }
//   // reader.readAsDataURL(Avatar);
//   return true
// }


const handleFileChange = (file) => {
  //压缩图片质量
  new ImageCompressor(file.raw, {
    quality: 0.6, // 压缩质量，0-1之间
    maxWidth: 800, // 图片最大宽度
    maxHeight: 800, // 图片最大高度
    success(result) {
      const reader = new FileReader()
      reader.readAsDataURL(result);
      reader.onload = (e) => {
        imgUrl.value = reader.result
        updateAvatarAPI(userInfo.value.user_id, e.target.result).then(() => {
          userStore.getUserInfo(userInfo.value.account)

        })
      }
    },
    error(e) {
      console.error(e.message);
    },
  })
  ElMessage.success('头像上传成功')
}

// 创建URL并将Blob转换为URL
imgUrl.value = avatarSrc(userInfo.value.user_pic)
console.log(imgUrl.value)
// 现在imageUrl包含了原始图片的URL，您可以将其赋值给img标签的src属性来显示图片
</script>

<template>
  <div class="h-inner">
    <div class="container">
      <div class="user">
        <div class="user-avatar">
          <el-upload class="avatar-uploader" :show-file-list="false" :auto-upload="false" :on-change="handleFileChange">
            <el-avatar :size="150" style="border-radius: 50%;" :src="imgUrl">
              <!--头像加载中 -->
              <div class="loading" v-show="loading">
                <div class="loading-spinner">
                  <svg viewBox="25 25 50 50">
                    <circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
                    <circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle>
                  </svg>
                </div>
              </div>
              <!--头像加载失败 -->
              <el-icon style="font-size:60px;">
                <UserFilled />
              </el-icon>
              <!-- <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/> -->
            </el-avatar>
          </el-upload>
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

        position: relative;
        overflow: hidden;
        border-radius: 50%;
        border: 5px solid silver;
        /* 添加银白色边框 */
        box-sizing: border-box;

        /* 设置box-sizing为border-box，使边框不影响组件内容宽度 */
        .avatar-uploader:hover {
          cursor: pointer;

          ::before {
            display: inline-block;
            border-radius: 50%;
            content: '更换头像';
            position: absolute;
            line-height: 160px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: 800;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
          }
        }

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