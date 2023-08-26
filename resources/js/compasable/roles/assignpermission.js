import {ref} from 'vue'
const assignpermission =()=>{
    const runnassigning=async(roleID,permission,token)=>{
                                await axios.get('/sanctum/csrf-cookie');
                                let config={
                                                headers:{
                                                    Accept: 'application/vnd.api+json',
                                                    Authorization: `Bearer ${token}` 
                                                }
                                            }
                                
                                await axios.put(`/api/roles/assignPermission/${roleID}`,{name:permission},config)
                                .then(()=>{
                                    console.log('Permission asigned')
                                       
                                        
                                })
                                .catch(error=>{console.log(error)})  


    }
    return {runnassigning}

}
export default assignpermission