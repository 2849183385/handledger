import { defineStore } from "pinia";
import { getTaskInfoAPI ,updateTaskStatusAPI} from "@/apis/task";
import { ref } from 'vue'

export const useTaskStore = defineStore('task', () => {
    //定义管理任务数据的store
    const taskInfo=ref({})
    const getTasksById = async (user_id) => {
        const res = await getTaskInfoAPI(user_id)
        setTaskInfo(res.data.data)
    }
    const updateTaskStatus = async (user_id,task_id,status) => {
        await updateTaskStatusAPI(user_id,task_id,status)
        await getTasksById(user_id)
    }
    const setTaskInfo = (obj) => {
        taskInfo.value = obj
    }
    return {
        taskInfo,
        getTasksById,
        updateTaskStatus,
        setTaskInfo
    }
},
    {
    persist:true
})
