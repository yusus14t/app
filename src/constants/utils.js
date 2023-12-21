import axios from 'axios';

export const getAuthHeader = () => {
    let token = JSON.parse(localStorage.getItem('token'))
    return { headers: {'auth-token': token} }
}

// axios instance 
export const axiosInstance = axios.create({
    baseURL:  `${ process.env.REACT_APP_SERVER_URL }/api`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'auth-token': getAuthHeader()['headers']['auth-token'],
    },
})

export const emailPattern = {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i,
    message: "Invalid email address.",
};

export const numberValidator = (value) => {
    if(value.target.value.length <= 11 ) return value.target.value = value.target.value.slice(0,10)
}



export const formatDate = ( value ) => {
    let date = new Date(value)
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
}

export const formatPhone = ( phone ) => {
    return (phone ? `+91 ${phone.slice(0,3)} - ${phone.slice(3,6)} - ${phone.slice(-4)}` : '-')
}
 
export const dateFormat = (date) => `${date.getDate()} / ${ date.getMonth() + 1 } / ${ date.getFullYear() }` 

export const NumberFormat = ( e ) =>  {
    if( !Number(e.target.value) ) return e.target.value = e.target.value.slice(0, -1)
}

export const getFullPath = (filename) => {
    if( process.env.REACT_APP_ENVIRONMENT === 'production' )  return `${process.env.REACT_APP_BUCKET_URL}/${ filename }`
    else return `${ process.env.REACT_APP_SERVER_URL }/images/${ filename }`
}

export const userInfo = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : {}

export const updateUser = async () => {
    try{
        let { data } = await axiosInstance.post('/session-info', getAuthHeader() )
        localStorage.setItem('user', JSON.stringify(data.user) )
    } catch(error){ console.error(error) }
}

updateUser()

export const getImages = async () => {
    try{
      return await axiosInstance.get('/website-images', getAuthHeader())
    } catch(error){ console.error(error) }
}

export const  convertTo12HourFormat = ( time24 ) => {
    if( !time24 ) return '- - : - -'
    const [hours, minutes] = time24.split(':');
    const period = parseInt(hours) >= 12 ? 'PM' : 'AM';
    const hours12 = parseInt(hours) % 12 || 12;

    return `${hours12}:${minutes} ${period}`;
  }

export const truncate = (str,length)=>{
    if(str.length <= length) return str
    return str.substring(0,length) + "..."
}


export const Logout = () => {
    localStorage.clear()
    window.location.replace('/login')
}
