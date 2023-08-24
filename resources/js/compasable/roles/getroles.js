import {ref} from 'vue'
const getroles=()=>{
    const rolesError=ref(null)
    const roles=ref([])
    const loadroles=async (token)=>{
        let config={
            headers:{
                Accept: 'application/vnd.api+json',                                
                Authorization: `Bearer ${token}`
            }
        } 
        await axios.get('/sanctum/csrf-cookie')
        await axios.get('/api/roles',config)
                   .then(response=>{
                     
                      
                       roles.value=response.data.data
                   })


    }
    return {rolesError,roles,loadroles}

}
export default getroles