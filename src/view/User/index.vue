<script setup>
// import ItemInfo from '@/components/ItemInfo.vue';
import UserInfo from './components/UserInfo.vue'
import UserNav from './components/UserNav.vue'
// import BodyNav from './components/BodyNav.vue';
</script>

<template>
  <!-- <BodyNav></BodyNav> -->
  <!-- 三级路由出口 -->
  <div class="container">
    <UserNav></UserNav>
    <div class="main">
      <UserInfo></UserInfo>
      <!-- <RouterView></RouterView> -->
      <div class="like">
        最近点赞
        <!-- <ItemInfo></ItemInfo> -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  max-width: 1500px;
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
}
.main {
   display: flex;

}



.like {
  width: 100%;
  height: 100px;
  background-color: #fff;
  text-align: center;
  line-height: 100px;
}
</style>