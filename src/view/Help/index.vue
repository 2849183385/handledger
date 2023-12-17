<script setup >
import { ArrowRight } from '@element-plus/icons-vue'
</script>

<template>
  <div class="article" >
    <div class="container" style="width:1200px">
      <div class="header" >
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>新手帮助</el-breadcrumb-item>
          <el-breadcrumb-item>什么是手账</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="secBody">
        <h1 class="title">
          什么是手帐？
        </h1>
        <p class="content">
          手帐这个词源于日本，它的本意只是一个随手携带、随时取用的本子。但其实手帐更是一个身兼数职的超强文具，它可以成为我们日程本、账本、计划本、剪贴本，甚至相册，总的来说一帐在手，应有尽有。
        </p>
        <div class="imgBox">
          <img src="src/assets/images/article-1.png" alt="什么是手帐">
        </div>
        <p class="content">
          除了本子之外，广义上的手帐还包括写手帐所用的到的各种文具，如画笔、贴纸、胶带等等，在它们的帮助下可以让你的手帐既有内涵又有颜值。而在移动互联网时代，更有如时光手帐APP这样的优秀电子手帐产品，让你能够随时随地自由拼贴，随心创作，更可以打印成书，用心珍藏。
        </p>
        <p class="content">
          总而言之，手帐是一种生活方式的代号，是让你的生活更具仪式感的魔法。只要你用心的使用手帐，它就会变成你的得力助手，无论是做工作安排，让你能够忙而不乱，还是做生活总结，让你的回忆更加精彩，手帐是最忠实于你自己的陪伴。
        </p>
        <div class="imgBox">
          <img src="src/assets/images/article-2.png" alt="什么是手帐">
        </div>
        <a href="javascript:;" class="next">
          <b>下一篇：</b><span data-v-5e0a8082="">为什么要写手帐？</span></a>
      </div>

    </div>
  </div>
</template>

<style lang='scss' scoped>
.article{
background-color: #f2f5f7;
overflow:hidden;
.header{
  margin-top: 15px;

.el-breadcrumb {
  font-size: 20px;
}
}
.secBody {
  h1.title {
    margin: 0;
    margin-top: 40px;
    text-align: center;
    line-height: 32px;
    letter-spacing: 4px;
    font-size: 26px;
    font-weight: 600;
    color: #333;
  }

  .imgBox {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      flex: 1;
      max-width: 400px;
      height: auto;
      vertical-align: top;
    }
  }

  p.content {
    width: 100%;
    height: auto;
    font-size: 18px;
    font-weight: 400;
    line-height: 40px;
    letter-spacing: 1px;
    text-indent: 36px;
  }

  a {
    display: block;
    text-decoration: none;
    color: #000;
    width: 50%;
    height: auto;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 40px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 12px 0;
    border-radius: 10px;
    background: rgba(255, 233, 180, .45);
    letter-spacing: 3px;
    line-height: 30px;
    font-size: 18px;
    font-weight: 400;
    font-family: Helvetica Neue, Arial, PingFang SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    text-align: center;
  }
}
}
</style>