import {ref} from 'vue'
const removepermission =()=>{
    const runremoving=async(roleID,permission,token)=>{
                                await axios.get('/sanctum/csrf-cookie');
                                let config={
                                                headers:{
                                                    Accept: 'application/vnd.api+json',
                                                    Authorization: `Bearer ${token}` 
                                                }
                                            }                                
                                await axios.put(`/api/roles/removepermission/${roleID}`,{name:permission},config)
                                .then(()=>{
                                    console.log('Permission removed')                                      
                                        
                                })
                                .catch(error=>{console.log(error)})

    }
    return {runremoving}
}
export default removepermission