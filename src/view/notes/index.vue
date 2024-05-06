<script setup >
import { ref } from 'vue'
import ItemInfo from '@/components/ItemInfo.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { getPostsAPI } from "@/apis/user";

import router from '@/router';

const userStore = useUserStore()
const { user_id } = userStore.userInfo

// const { posts } = userStore.userInfo
const loading = ref(true)
const posts = ref({})
const getPosts = async() => {
  const res = await getPostsAPI(user_id)
    loading.value = false
  posts.value = res.data.data
  console.log(posts.value);
}
const deleteSuccess=()=>{
  getPosts()
  // console.log(111);
  // console.log(posts.value);
}
onMounted(() => {
  // console.log(posts.value);
 getPosts()
  // console.log(imageArray);
})
// const deletePost = (post_id) => {

// }

</script>

<template>
  <div class="container">
   
      <!-- <el-text>我的作品</el-text> -->
       <el-skeleton :rows="5" animated  v-if="loading"/>
      <div class="posts" v-else>
        <div class="item-list" v-for="item in posts" :key="item">
          <!-- 向子组件传参 -->
        <ItemInfo :item="item" @delete="deleteSuccess"></ItemInfo>
      </div>
        <div class="upload">
          <el-icon @click="router.push('/publish')">
            <Plus />
          </el-icon>
        </div>
      </div>
  </div>
</template>

<style lang='scss' scoped>
.container{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.posts {  
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 10px;
  width: 100%;
  border-radius: 20px;
  background: #fff;
 
}

.upload {
  height: 200px;
  width: 180px;
  margin: 20px;
  border-radius: 20px;
  .el-icon {
    font-size: 40px;
    top: 50%;
    left: 50%;
    color: #0000003b;
    transform: translate(-50%, -50%);

    &:hover {
      font-size: 80px;
    }
  }
}</style>