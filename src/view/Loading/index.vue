<script setup>

</script>

<template>
    <transition name="slide">
        <div class="loader"></div>
      </transition>
</template>
<style scoped>
/* HTML: <div class="loader"></div> */
.loader {
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  background:
    radial-gradient(farthest-side,#000 98%,#0000) 55% 20%/8px 8px no-repeat,  
    #ffcc00;
  box-shadow: 2px -6px 12px 0px inset rgba(0, 0, 0, 0.7);
  animation: l4 .5s infinite steps(5) alternate;
}
@keyframes l4{ 
    0% {clip-path: polygon(50% 50%,100%   0,100% 0,0 0,0 100%,100% 100%,100% 100%)}
  100% {clip-path: polygon(50% 50%,100% 65%,100% 0,0 0,0 100%,100% 100%,100%  35%)}
}
/* 过渡动画 */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter, .slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to, .slide-leave {
  transform: translateX(0);
}
</style>