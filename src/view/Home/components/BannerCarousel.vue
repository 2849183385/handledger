<script setup>
const imgUrl = [
  'src/assets/images/banner1.jpg',
  'src/assets/images/banner2.jpg'
]
</script>

<template>
  <el-carousel height="360px" style="border-radius: 10px;">
    <el-carousel-item v-for="item in imgUrl" :key="item">
      <el-image style="width: 1500px; height: 360px" :src="item"/>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped></style>
