<script setup>
import UserDropdowm from '@/components/UserDropdowm.vue';
import SearchInput from '@/components/SearchInput.vue';


</script>

<template>
    <div class="container">
        <ul class="header-nav">
            <li class="index"  >
               <RouterLink :to="`/`">首页</RouterLink> 
            </li>
            <li class="plan">
                <RouterLink :to="`/plan`">计划</RouterLink>
            </li>
            <li class="home">
                Role
            </li>
            <li class="user">
                 <RouterLink :to="`/user`">个人空间</RouterLink>
            </li>
        </ul>
        <SearchInput></SearchInput>
        <div class="user-box">
            <UserDropdowm></UserDropdowm>
            <span class="user-name">接受，≠我同意</span>
        </div>
    </div>
</template>

<style lang="scss"  scoped>
.container {
    height: 90px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .header-nav {
        flex: 3;
        width: 820px;
        display: flex;
        padding-left: 40px;
        z-index: 998;

        li {
            flex: 1;
            margin-right: 40px;
            width: 38px;
            text-align: center;

            a {
                display: block;
                font-size: 30px;
                line-height: 32px;
                height: 32px;
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

   

    .user-box {
        flex: 1;
        margin-top: 5px;
        display: flex;
        align-items: center;
        flex-direction: column;

        .user-name {
            line-height: 25px;
            height: 25px;
            font-size: 20px;
            color: black;
        }
    }

}
</style>