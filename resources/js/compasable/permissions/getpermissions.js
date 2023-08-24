import {ref} from 'vue'
const getpermissions=()=>{
    const permissionsError=ref(null)
    const permissions=ref([])
    const loadpermissions=async (token)=>{
        let config={
            headers:{
                Accept: 'application/vnd.api+json',                                
                Authorization: `Bearer ${token}`
            }
        } 
        await axios.get('/sanctum/csrf-cookie')
        await axios.get('/api/permissions',config)
                   .then(response=>{
                    permissions.value=response.data.data
                   })
    }
    return {permissionsError,permissions,loadpermissions}

}
export default getpermissions