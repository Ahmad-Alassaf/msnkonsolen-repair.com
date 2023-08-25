import {ref} from 'vue'
const removerole=()=>{
    const removeroleerror=ref(null)
    const runremoving=async(id,roleName,token)=>{        
        try{
          
            let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                                
                        Authorization: `Bearer ${token}`
                    }
                } 
                await axios.get('/sanctum/csrf-cookie')
             
             
                await axios.put(`/api/removerole/${id}`,{name:roleName},config)
                           .then().catch(error=>{
                            console.log(error)
                            throw Error('Error occured')
                        })
            
        }
        catch(error){
            removeroleerror.value=error.message
            console.log(error)
        }
    }
    return {removeroleerror,runremoving}

}
export default removerole