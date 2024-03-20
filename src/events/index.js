let events 
(() => {
    try{
        events = new EventSource(`${ process.env.REACT_APP_SERVER_URL }/api/stream`,{ 
            headers: {
                'sourceId': new Date().getTime() 
            }
        })     
    } catch(error){ console.log(error) }
})()

export default events;