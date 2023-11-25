import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI ,getUserInfoAPI} from "@/apis/user";

export const useUserStore = defineStore("user", () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    const getUserInfo = async (account) => {
        const res = await getUserInfoAPI(account)
        // console.log(res.data.data)
        res.data.data.user_region =JSON.parse(res.data.data.user_region)
        userInfo.value = res.data.data
    }
    const cleanUserInfo = () => {
        userInfo.value = {}
    }
    const getToken = async ({ account, password }) => {
        const res = await loginAPI({ account, password })
        token.value = res.data.token
    }
    // const setUserInfo = (obj) => {
    //     userInfo.value = obj
    // }
    const token = ref("")
    //设置token
    const removeToken = () => {
        token.value = ""
    }
    return {
        token,
        getToken,
        removeToken,
        userInfo,
        getUserInfo,
        cleanUserInfo
        // setUserInfo
    }
}, {
    persist: true
})