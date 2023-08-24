import {ref } from 'vue'
const deleterole=()=>{
  
    const deleteroleError=ref(null)
    const rundeleterole=async(id,token)=>{
       
        await axios.get('/sanctum/csrf-cookie');
        let config={
                        headers:{
                            Accept: 'application/vnd.api+json',
                            Authorization: `Bearer ${token}`                                
                          
                        }
                    }
        await axios.delete(`/api/roles/${id}`,config)
      
        .catch(error=>{
            console.log(error) 
            deleteroleError.value=error.message})   
 }
 return {deleteroleError,rundeleterole}
}
export default deleterole