import request from '@/utils/request'


export const getTaskInfoAPI = (id) => {
    return request({
        method: 'get',
        url: `/task/getTasksById`,
        params: {
            id
        }
    })
}