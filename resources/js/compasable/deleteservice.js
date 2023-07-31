import {ref } from 'vue'

const deleteservice=()=>
{
    const message=ref('')
    const  executedelete=async(id,token)=>{
        try{
          
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.delete(`/api/services/${id}`,config).then(response=>{
                if(response.data)
                {
                    throw Error('there is no Data')
                   
                }
                else{
                    message.value='success'
                }
               
            })

        }
        catch(err){
            message.value=err.message
           
        }
    }
    return {message,executedelete}

}
export default deleteservice