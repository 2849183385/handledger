<script setup >
import UserInfo from '../components/UserInfo.vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
const { user_id } = userStore.userInfo
onMounted(() => {
  userStore.getPosts(user_id)
})
</script>

<template>
  <div class="container">
    <div class="content">
      <div class="posts">
        <div class="item" v-for="item in 3" :key="item">
        </div>
      </div>
    </div>
    <UserInfo></UserInfo>
  </div>
</template>

<style lang='scss' scoped>
.content {
  background: #fff;
  width: 1150px;
  height: 500px;
  border-radius: 5px;
  float: left;
  padding: 15px 20px;
  margin-right: 15px;

  .section {
    border-bottom: 1px solid #eee;
    margin-bottom: 17px;
    position: relative;

  }
}

.posts {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: 1px dotted gray;
  display: block;
  border-radius: 20px;

  .item {
    flex: 1;
    height: 150px;
    width: 200px;
    border: #eee 1px solid;
    border-radius: 20px;
    margin: 10px;
    background: #fff;
    box-shadow: 0 0 10px #ccc;
    transition: 0.5s;

    &:hover {
      cursor: pointer;
      box-shadow: 0 0 10px #000;
    }
  }
}</style>