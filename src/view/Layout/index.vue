<script setup>
// import LayoutFixed from './components/LayoutFixed.vue';
// import LayoutNav from './components/LayoutNav.vue'
// import LayoutHeader from './components/LayoutHeader.vue'
// import LayoutFooter from './components/LayoutFooter.vue';
import AsideNav from './components/AsideNav.vue';

</script>

<template>
  
    <!-- 路由页面内容 -->
    <!-- <LayoutFixed></LayoutFixed> -->
    <!-- <LayoutNav></LayoutNav> -->
    <!-- <LayoutHeader></LayoutHeader> -->
    <AsideNav></AsideNav>
    <RouterView></RouterView>
    <!-- <LayoutFooter></LayoutFooter> -->
    
    <!-- backup回到顶部 -->
    <el-backtop :bottom="100">
      <div style=" height: 100%; width: 100%;">
        <i class="iconfont icon-huojian1" />
      </div>
    </el-backtop>
  
 
</template>

<style lang="scss" scoped>
.app {
  background-image: url(src/assets/images/login-bg.png);
}

.el-backtop {
  background-color: rgba(255, 255, 255, 0);
}

.iconfont {
  font-size: 41px;
}
</style>