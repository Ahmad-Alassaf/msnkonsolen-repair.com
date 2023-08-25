import {ref} from 'vue'
const addpermission=()=>{
    const addpermissionEror=ref(null)
    const runaddpermission=async (id,rolename,token)=>{
        try{                
            let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                                
                        Authorization: `Bearer ${token}`
                    }
                } 
                await axios.get('/sanctum/csrf-cookie')
                await axios.put(`/api/users/${id}`,{name:rolename,type:'permission'},config)
                           .then(()=>{})
                           .catch(error=>{
                            console.log(error)
                            throw Error('Error occured')
                           })
        }
        catch(error){
            addpermissionEror.value=error
        }

    }
    return {addpermissionEror,runaddpermission}

}
export default addpermission