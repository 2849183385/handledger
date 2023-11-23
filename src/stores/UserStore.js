import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI } from "@/apis/user";

export const useUserStore = defineStore("user", () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    const getUserInfo = async ({account,password}) => {
        const res = await loginAPI({ account, password })
        userInfo.value = res.data.data[0]
        token.value = res.data.token
    }
    const setUserInfo = (obj) => {
        userInfo.value = obj
    }
    const token = ref("")
    //设置token
    const removeToken = () => {
        token.value = ""
    }
    return {
        token,
        removeToken,
        userInfo,
        getUserInfo,
        setUserInfo
    }
}, {
    persisted: true
})