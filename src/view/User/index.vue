<script setup>

import UserNav from './components/UserNav.vue'
import BodyNav from './components/BodyNav.vue';
</script>

<template>
  <UserNav></UserNav>
  <BodyNav></BodyNav>
  <!-- 三级路由出口 -->
  <RouterView></RouterView>
</template>

<style lang="scss" scoped>

</style>