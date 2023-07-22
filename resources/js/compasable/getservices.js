 import {ref } from 'vue'
 const  getservices=()=>{
   
    const services=ref([])
    const error=ref(null)
    const load=async()=>{
        try{
          
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                   // Authorization: `Bearer ${this.token()}`
                }
            }
            await axios.get(`/api/services`,config)
            .then(response=>{ 
              
               if(!response.data){
                throw Error('No Services available')
               }
               else{
                services.value=response.data.data
             
               }
            }) 

        }
        catch(err){
            error.value=err.message
           

        }
    }
    return {services,error,load}
    
}
export default getservices