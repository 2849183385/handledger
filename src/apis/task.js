import request from '@/utils/request'

//获取任务信息
export const getTaskInfoAPI = (id) => {
    return request({
        method: 'get',
        url: `/task/getTasksById`,
        params: {
            id
        }
    })
}


//修改任务状态
export const updateTaskStatusAPI = (user_id,task_id, status) => {
    return request({
        method: 'post',
        url: `/task/updateTaskStatus`,
        data: {
            task_id,
            status,
            user_id
        }
    })
}

//添加新的任务
export const addNewTaskAPI = (data) => {
    return request({
        method: 'post',
        url: `/task/addTask`,
        data
    })
}

//删除任务
export const deleteTaskAPI = (user_id, task_id) => {
    return request({
        method: 'delete',
        url: `/task/deleteTask`,
        data: {
            task_id,
            creator_id:user_id
        }
    })
}