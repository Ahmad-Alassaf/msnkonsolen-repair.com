import {ref} from 'vue'
const deletedevice=()=>{
    const deletedeviceError=ref(null)
    const rundeletedevice=async(id,token)=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
        let config={
                                                    headers:{
                                                        Accept: 'application/vnd.api+json',                                
                                                        Authorization: `Bearer ${token}`
                                                    }
                     }
        await axios.delete(`/api/devices/${id}`,config)
        .then( this.alldevices())
        .catch(error=>{
            throw Error(error.message)
        })
        }
        catch(err){
            deletedeviceError.value=err.message

        }
}
return {deletedeviceError,rundeletedevice}
}
export default deletedevice