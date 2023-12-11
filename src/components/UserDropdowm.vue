<script setup>
import { ref , watch } from 'vue'
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore';
import { useLedgerStore } from '@/stores/ledgerStore';
import { imageSrc } from '@/utils/imageSrc';
import { storeToRefs } from 'pinia';
const Router = useRouter()
const userStore = useUserStore()
const ledgerStore = useLedgerStore()
const {userInfo} =storeToRefs(userStore)
const confirmEvent = () => {
    userStore.removeToken()
    Router.push('/login')
    ElMessage({
        type: 'success',
        message: '退出成功'
    })
    //退出登录，清除数据
    userStore.cleanUserInfo()
    ledgerStore.cleanLedger()
}
//监听图片更新后重新赋值
watch(userInfo, () => {
    imgUrl.value = imageSrc(userInfo.value.user_pic)
})
const imgUrl = ref(imageSrc(userInfo.value.user_pic))
</script>

<template>
    <el-dropdown size="large">
        <a href="javascript:;">
            <span class="el-dropdown-link">
                <!-- 初始头像 -->
                <el-avatar :icon="UserFilled" v-if="0"/>
                <el-avatar :size="55" :src="imgUrl" v-else>
                    <!--头像加载失败 -->
                    <el-icon style="font-size:40px;"><UserFilled/></el-icon>
                    <!-- <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/> -->
                </el-avatar>
            </span>
        </a>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="Router.push('/user')">个人空间</el-dropdown-item>
                <el-dropdown-item>Action 2</el-dropdown-item>
                <el-dropdown-item>
                    <el-popconfirm confirm-button-text="退出" cancel-button-text="返回" title="确认退出？" @confirm="confirmEvent">
                        <template #reference>
                            退出登录
                        </template>
                    </el-popconfirm>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<style lang="scss" scoped>
.el-dropdown-link {
    margin: 5px 10px;
    cursor: pointer;
    height: 25px;

    .icon-yonghu {
        font-size: 30px;
        height: 20px;
        width: 25px;
    }
}
</style>