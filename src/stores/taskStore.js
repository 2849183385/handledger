import { defineStore } from "pinia";
import { getTaskInfoAPI } from "@/apis/task";
import {ref} from 'vue'
export const useTaskStore = defineStore('task', () => {
    //定义管理任务数据的store
    const taskInfo=ref({})
    const getTasksById = async (user_id) => {
        const res = await getTaskInfoAPI(user_id)
        taskInfo.value = res.data.data
    }
    return {
        taskInfo,
        getTasksById,
    }
},
    {
    persist:true
})