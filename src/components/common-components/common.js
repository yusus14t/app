import axios from 'axios'

export async function request ( req = 'get', url, payload, getAuthHeader = () => {} ) {
    return new Promise( async ( resolve, reject ) => {
        try {
            let data = null
            if( req === 'get') data = await axios.get(url, payload, getAuthHeader())
            if( req === 'post') data = await axios.post(url, payload, getAuthHeader())
            if( req === 'put') data = await axios.put(url, payload, getAuthHeader())
            resolve(data)
        } catch(error){
            reject(error)
        }
    })
}
