<script setup>
import DetailCarousel from './components/DetailCarousel.vue';
import CommnetItem from './components/CommnetItem.vue'
</script>

<template>
    <div class="card">
        <div class="left ">
            <div class="img-box">
                <DetailCarousel></DetailCarousel>
            </div>
        </div>

        <div class="right">
            <div class="nav-box">
                <div class="user-info">
                    <el-avatar :size="35" src="src/assets/images/avatar.png"></el-avatar>
                    <span style="margin-left: 10px; font-size: 16px;">chan</span>
                </div>
                <el-button>关注</el-button>
            </div>
            <div class="content-box">
                <h4>标题</h4>
                <el-text>content</el-text>
                <el-text>target</el-text>
                <el-text>time</el-text>
            </div>
            <el-divider />
            <div class="comment">
               
                <CommnetItem></CommnetItem>
            </div>
        </div>
    </div>
</template>

<style  scoped>
.el-divider {
    margin: 0 auto;
    width: 92%;
}

.card {
    max-width: 1000px;
    overflow: hidden;
    min-width: 760px;
    min-height: 500px;
    aspect-ratio: 8 / 9;
    height: 90vh;
    width: 80vw;
    /* 使用aspect-ratio属性设置宽高比 */
    border-radius: 20px;
    border: #99a2aa 1px solid;
    display: flex;
    margin: 20px auto;
}

.left {

    width: 45%;
    /* 左侧占50%的宽度 */
    height: 100%;
    /* 高度和父元素相同 */
   position: relative;

    .img-box {
        position: absolute;
        width: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}

.right {
    background-color: #fff;
    width: 55%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .nav-box {
        flex: 1;
        background-color: #fff;
        border-radius: 0 10px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;


    }

    .content-box {
        flex: 1;
        padding: 0 16px 16px;
        display: flex;
        flex-direction: column;
    }
    .comment {
        flex: 8;
        padding: 0 16px;
       
        
    }
}

</style>
