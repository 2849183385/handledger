import { defineStore } from "pinia";
import { ref } from "vue";
import { loginAPI, getUserInfoAPI, getLikesIdAPI, getFavoritesIdAPI, getPostsAPI } from "@/apis/user";

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
    const getLikesId = async (id) => {
        try {
        const res = await getLikesIdAPI(id)
        userInfo.value.likesId=res.data.data
        } catch (e) {
            console.log(e)
        }  
    }
    const getFavoritesId=async(user_id)=>{
        try{
            const res=await getFavoritesIdAPI(user_id)
            userInfo.value.favoritesId=res.data.data
        }catch(e){
            console.log(e)
        }
    }

    const getPosts = async (user_id) => {
        const res = await getPostsAPI(user_id)
        userInfo.value.posts=res.data.data
    }
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
        getLikesId,
        getFavoritesId,
        getPosts,
        cleanUserInfo
        // setUserInfo
    }
}, {
    persist: true
})