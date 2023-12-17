<script setup>
const imgUrl = [
  'src/assets/images/banner1.jpg',
  'src/assets/images/banner2.jpg'
]
</script>

<template>
  <el-carousel  style="border-radius: 10px;">
    <el-carousel-item v-for="item in imgUrl" :key="item">
      <el-image  :src="item"/>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
.el-carousel {
  width: 100vw;
  max-width:1500px ;
  min-width: 900px;
  .el-image{
    width:100%;
  }
}
</style>
