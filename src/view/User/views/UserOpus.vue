<script setup >
import UserInfo from '../components/UserInfo.vue'
</script>

<template>
  <div class="container">
    <div class="content">
      作品
    </div>
    <UserInfo></UserInfo>
  </div>
</template>

<style lang='scss' scoped>
.content {
  background: pink;
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
</style>