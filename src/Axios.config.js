import { axiosInstance } from "./constants/utils"

axiosInstance.interceptors.request.use( request => {
    return request
}, async error  => {
    if( error ) return Promise.reject(error.response.data)
})

axiosInstance.interceptors.response.use( response => {
    return { data: response.data, code: response.status, status: response.statusText }
}, async error  => {
    if( error ) return Promise.reject({ ...error?.response?.data })
})
