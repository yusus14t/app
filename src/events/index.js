import { SERVER_URL } from "../configs/env"

let events 
(() => {
    try{
        events = new EventSource(`${ SERVER_URL }/api/stream`,{ 
            headers: {
                'sourceId': new Date().getTime() 
            }
        })     
    } catch(error){ console.log(error) }
})()

export default events;