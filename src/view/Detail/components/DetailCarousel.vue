<script setup >
const imgUrl = [
    'src/assets/images/article-1.png',
    'src/assets/images/article-2.png'
]
</script>

<template>
    
        <el-carousel >
            <el-carousel-item v-for="item in imgUrl" :key="item">
                <el-image :src="item" fit="scale-down" />
            </el-carousel-item>
        </el-carousel>
    
</template>

<style lang='scss' scoped>
.el-image {
    margin: 0 auto;
}
</style>