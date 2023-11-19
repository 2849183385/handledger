<script setup>
// import { ref } from 'vue';
import HeaderNav from '@/components/HeaderNav.vue';
import { useScroll } from '@vueuse/core'

//window在纵方向上的位移y
const { y } = useScroll(window)


</script>

<template>
    <div class="header-sticky" :class="{ show:y > 90 }" style="border-radius: 10px;">
       <HeaderNav></HeaderNav>
    </div>
</template>

<style lang="scss"  scoped>
.header-sticky {
    background-color: #f8e3c5;
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
    z-index: 999;
    //关键样式
    //状态一，往上平移+完全透明 
    transform: translateY(-100%);
    opacity: 0;

    //状态2:移除平移+不透明
    &.show {
        transition: all 0.3s linear;
        transform: none;
        opacity: 1;
    }
}
</style>