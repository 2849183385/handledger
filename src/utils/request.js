import axios from "axios";
// import { ElMessage } from "element-plus";
import { useUserStore } from '@/stores/userStore';
import router from "@/router";
import { ElMessage } from "element-plus";
const baseURL= 'http://127.0.0.1:8080'
const request = axios.create({
    baseURL,
    timeout:5000
})


// axios请求拦截器
request.interceptors.request.use( config =>{
    const userStore = useUserStore();
    if (userStore.token){
        config.headers.Authorization = userStore.token ;
    }
    return config
},
    (e) => Promise.reject(e)
)



//axios响应拦截器
request.interceptors.response.use(
    //服务器返回数据不正常则进行另外处理
    response => {
        const useStore = useUserStore()
        // 如果响应回来的status为0 说明登录成功，否则不成功
        if (response.data.status === 0) return response
        if (response.data.status == 401) {
            useStore.removeToken
            router.push('/login')
        }
        ElMessage.error(response.data.message || '服务异常')
        return Promise.reject(response.data)
        
    },
    error => {     
        // 返回状态码会触发该函数。
        // 对响应错误做点什么
        return Promise.reject(error)
    } 
)


export default request
export { baseURL }