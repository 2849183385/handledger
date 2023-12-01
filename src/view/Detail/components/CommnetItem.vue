<script setup >

</script>

<template>
     <div class="total">
                        <span>评论</span>
                        <span>123</span>
                    </div>
    <div class="comment-list">
        <div class="comment">
            <div class="user-avatar"><img src="user-avatar.jpg" alt="User Avatar"></div>
            <div class="comment-text">这是一条评论的内容。</div>
        </div>
    </div>
</template>

<style lang='scss' scoped>
 .total {
            display: flex;
            align-items: center;
             padding: 0 16px;
            span {
                margin-left: 10px;
            }
        }
.comment-list {
    
    padding: 10px;
}
</style>