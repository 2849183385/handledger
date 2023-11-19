<script setup>

const url1 = 'src/assets/images/banner1.jpg'
const url2 = 'src/assets/images/banner2.jpg'

</script>

<template>
  <el-carousel height="360px" style="border-radius: 10px;">
    <el-carousel-item v-for="item in 1" :key="item">
      <el-image style="width: 1500px; height: 360px" :src="url1"/>
    </el-carousel-item>
    <el-carousel-item v-for="item in 1" :key="item">
      <el-image style="width: 1500px; height: 360px" :src="url2"/>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped></style>
