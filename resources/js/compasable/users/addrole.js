import {ref} from 'vue'
const addrole=()=>{
    const addroleEror=ref(null)
    const runnaddrole=async (id,rolename,token)=>{
        try{                
            let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                                
                        Authorization: `Bearer ${token}`
                    }
                } 
                await axios.get('/sanctum/csrf-cookie')
                await axios.put(`/api/users/${id}`,{name:rolename,type:'role'},config)
                           .then(()=>{console.log('Role Added...')})
                           .catch(error=>{
                            console.log(error)
                            throw Error('Error occured')
                           })
        }
        catch(error){
           addroleEror.value=error
        }

    }
    return {addroleEror,runnaddrole}

}
export default addrole