import request from "@/utils/request";

export const loginAPI = ({account, password}) => {
    return request({
        url: '/api/login',
        method: 'post',
        data: {
            account,
            password
        }
    })
}

export const registerAPI = ({ account, password }) => {
    return request({
        url: '/api/reguser',
        method: 'post',
        data: {
            account,
            password
        }
    })
}

export const getUserInfoAPI = (account) => {
    return request({
        url: '/user/getUserInfo',
        method: 'get',
        params: {
            account
        }
    })
}

export const updateUserInfoAPI = (data) => {
    return request({
        url: '/user/updateUserInfo', 
        method: 'put',
        data
    })
}