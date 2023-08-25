import {ref} from 'vue'
const removepermission=()=>{
    const removpermissionerror=ref(null)
    const runremovingpermission=async(id,permissionName,token)=>{        
        try{
          
            let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                                
                        Authorization: `Bearer ${token}`
                    }
                } 
                await axios.get('/sanctum/csrf-cookie')
             
             
                await axios.put(`/api/removepermission/${id}`,{name:permissionName},config)
                           .then().catch(error=>{
                            console.log(error)
                            throw Error('Error occured')
                        })
            
        }
        catch(error){
            removpermissionerror.value=error.message
            console.log(error)
        }
    }
    return {removpermissionerror,runremovingpermission}

}
export default removepermission