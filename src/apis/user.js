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

export const updateAvatarAPI = (user_id,avatar) => {
    return request({
        url: '/user/updateAvatar',
        method: 'post',
        data: {
            user_id,
            user_pic: avatar
        }
    })
}

//获取用户点赞数据
export const getLikesAPI = (user_id) => {
    return request({
        url: '/user/getLikes',
        method: 'get',
        params: {
            user_id
        }
    })
}