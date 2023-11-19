<script setup >

</script>

<template>
    <div class="container">
        <ul class="header-nav">
            <li class="index">
                <RouterLink :to="`/user`">主页</RouterLink>
            </li>
            <li class="opus">
                <RouterLink :to="`/user/opus`">作品</RouterLink>
            </li>
            <li class="collection">
                <RouterLink :to="`/user/collection`">收藏</RouterLink>
            </li>
            <li class="setting">
                <RouterLink :to="`/user/setting`">设置</RouterLink>
            </li>
        </ul>
    </div>
</template>

<style lang='scss' scoped>
.header-nav {
    width: 600px;
    display: flex;
    padding-left: 40px;
    z-index: 998;

    li {
        flex: 1;
        margin: 0 40px;
        width: 38px;
        text-align: center;

        a {
            display: block;
            font-size: 18px;
            line-height: 40px;
            height: 40px;
            display: inline-block;

            &:hover {
                color: green;
            }
        }

        //routerlink-exact-active 路由被选中后自带的类名，用于高亮
        .router-link-exact-active {
            color: green;
        }
    }
}
</style>