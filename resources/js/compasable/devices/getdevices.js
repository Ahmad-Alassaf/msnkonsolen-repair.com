import {ref} from 'vue'
const getdevices=()=>{
    const devices=ref([])
    const deviceserror=ref(null)
    const loaddevices=async()=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
          
            let config={
                            headers:{
                                Accept: 'application/vnd.api+json',                                
                             
                            }
                        }
            await axios.get(`/api/devices`,config)
                    .then(response=>{
                                        if(!response.data)
                                        {
                                            throw 'There is no devices'
                                        }
                                        else{
                                          
                                            devices.value=response.data.data
                                           
                                        }
                            })
                
    
    
        }
        catch(err){
            console.log(err)
            deviceserror.value=err.message
        }
    

    }
    



    return{deviceserror,devices,loaddevices}



}
export default getdevices