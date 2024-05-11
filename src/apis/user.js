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
//修改密码
export const updatePasswordAPI = ({ account, newPassword }) => {
    return request({
        url: '/user/updatePassword',
        method: 'put',
        data: {
            account,
            newPassword
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

//获取用户作品数据
export const getLedgerIdAPI = (user_id) => {
    return request({
        url: '/user/getWorks',
        method: 'get',
        params: {
            user_id
        }
    })
}

//获取用户点赞数据
export const getLikesIdAPI = (user_id) => {
    return request({
        url: '/user/getLikes',
        method: 'get',
        params: {
            user_id
        }
    })
}

//获取用户收藏数据
export const getFavoritesIdAPI = (user_id) => {
    return request({
        url: '/user/getFavorites',
        method: 'get',
        params: {
            user_id
        }
    })
}

//获取用户作品数据
export const getPostsAPI = (user_id) => {
    return request({
        url: '/user/getPosts',
        method: 'get',
        params: {
            user_id
        }
    })
}
