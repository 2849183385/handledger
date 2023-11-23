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

// export const getUserInfoAPI = (account) => {
//     return request({
//         url: '/api/getUserInfo',
//         method: 'get',
//         params: {
//             account
//         }
//     })
// }