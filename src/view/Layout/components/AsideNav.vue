<script setup >
import { ref } from 'vue'
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';
import {
    Hide, View,
    House,
    ArrowLeft,
    ArrowRight,
    Setting,
} from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus';
const userStore = useUserStore()
const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}
const router = useRouter()

const loginOut = () => {
    userStore.token = ''
    router.push('/login')
    ElMessage.success('退出成功')
   
}
const value = ref(true)
const routes = useRoute()
const routePath = routes.path
</script>

<template>
    <div class="aside-shell">
        <div class="trigger">
            <el-button :icon="ArrowRight" @click="isCollapse = !isCollapse" v-show="isCollapse" text></el-button>
            <el-button :icon="ArrowLeft" @click="isCollapse = !isCollapse" v-show="!isCollapse" text></el-button>
        </div>
        <!-- <div class="avatar">
            <el-avatar :src="imgUrl">
                头像加载失败 
                <el-icon >
                    <UserFilled />
                </el-icon>
                <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
        </div> -->
        <el-menu :default-active='routePath' :collapse="isCollapse" @open="handleOpen" class="el-menu-vertical"
            :collapse-transition=false @close="handleClose" :router="true">
            <el-menu-item index="/">
                <el-icon>
                    <House />
                </el-icon>
                <template #title>
                    <span>首页</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/plan">
                <el-icon>
                    <Clock />
                </el-icon>
                <template #title>计划</template>
            </el-menu-item>
            <el-menu-item index="/notes">
                <el-icon>
                    <Notebook />
                </el-icon>
                <template #title>笔迹</template>
            </el-menu-item>
            <el-menu-item index="/favorites">
                <el-icon>
                    <Star />
                </el-icon>
                <template #title>我的收藏</template>
            </el-menu-item>
            <el-menu-item index="/publish">
                <el-icon>
                    <EditPen />
                </el-icon>
                <template #title>创作中心</template>
            </el-menu-item>
            <el-menu-item index="/user">
                <el-icon>
                    <User />
                </el-icon>
                <template #title>个人中心</template>
            </el-menu-item>
            <el-menu-item index="setting">
                <el-icon>
                    <Setting />
                </el-icon>
                <template #title>
                    <span>设置</span>
                </template>
            </el-menu-item>
            <el-menu-item index="/help">
                <el-icon>
                    <QuestionFilled />
                </el-icon>
                <template #title>
                    <span>帮助</span>
                </template>
            </el-menu-item>
        </el-menu>
        <el-switch v-model="value" @change="loginOut" class="mt-2" inline-prompt :active-action-icon="View" :inactive-action-icon="Hide" />
    </div>
</template>

<style lang='scss' scoped>
//屏幕宽度不小于950时样式
/*@media screen and (min-width:1350px){
   .el-menu-vertical:not(.el-menu--collapse) {
  width: 150px;
  min-height: 400px;
}*/
.el-icon{
    font-size: 28px;
}
.aside-shell {
    padding: 50px 0 0 0;
    margin: 0 30px 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    height: 100%;
     top: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    z-index:1;
    .trigger {
        position: absolute;
        top: 0;
        right: -15px;
        z-index: 999;
        border-radius: 50%;
        .el-button {
            background-color: pink;
            margin-left: 0;
            border-radius: 50%;
            height: 30px;
            width: 30px;
             box-shadow: 0 0 0 1px #e4e7ed;
        }
    }

    .el-menu {
        border-right: none;
    }

    .el-switch {
        bottom: 0;
        margin: 0 auto;
    }
}
/*
} 
@media screen and (max-width: 1350px) {
    .aside-shell{
        display: none;
    }
}*/

</style>