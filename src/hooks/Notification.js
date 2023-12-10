import { axiosInstance, getAuthHeader } from '../constants/utils'

const Notification = () => {
    const create = async ( data ) => {
        try{
            let response = await axiosInstance.post('/common/notification', data, getAuthHeader())
            return response.data
        } catch(error){ console.log(error) }
    }

    const del = async ( data ) => {
        try{
            let response = await axiosInstance.post('/common/delete-notification', data, getAuthHeader())
            return response.data
        } catch(error){ console.log(error) }
    }

    const get = async () => {
        try{
            let response = await axiosInstance.get('/common/notification', {...getAuthHeader()})
            return response
        } catch(error){ console.log(error) }
    }

    return {
        create, get, delete: del
    }
}

export default Notification;
