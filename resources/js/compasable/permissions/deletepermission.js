import {ref } from 'vue'
const deletepermission=()=>{
  
    const deletepermissionError=ref(null)
    const rundeletepermission=async(id,token)=>{
       
        await axios.get('/sanctum/csrf-cookie');
        let config={
                        headers:{
                            Accept: 'application/vnd.api+json',
                            Authorization: `Bearer ${token}`                                
                          
                        }
                    }
        await axios.delete(`/api/permissions/${id}`,config)
      
        .catch(error=>{
            console.log(error) 
            deletepermissionError.value=error.message})   
 }
 return {deletepermissionError,rundeletepermission}
}
export default deletepermission