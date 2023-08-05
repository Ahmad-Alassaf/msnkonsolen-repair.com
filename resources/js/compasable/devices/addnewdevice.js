import {ref} from 'vue'
const addnewdevice=()=>{
    
    const addnewdeviceErrors=ref(null)
    const runaddnewdevice=async (data,token)=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
            let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${token}`
                                                        }
                                                    }
   
            await axios.post(`/api/devices`,{
                title:data.device_title,
                platform_id:data.platform_id
            },config)
            .then( )
            .catch(error=>{
                throw Error(error.message)
            })

        }
        catch(err){
            addnewdeviceErrors.value=err.message
            console.log(err)
        }
    }
    return {runaddnewdevice,addnewdeviceErrors}

}
export default addnewdevice;