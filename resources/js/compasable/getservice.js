import {ref} from 'vue'
const getservice=(id)=>{
    const service=ref(null)
    const error=ref(null)
    const  loadservice=async()=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                   // Authorization: `Bearer ${this.token()}`
                }
            }
            await axios.get(`/api/services/${id}`,config).then(response=>{
                if(!response.data)
                {
                    throw Error('there is no Data')
                }
                else{
                    console.log(response.data)
                     service.value=response.data.data
                    console.log(service)
                   

                }
               
            })

        }
        catch(err){
            error.value=err.message
            console.log(error.value)
        }
       
    }
    return {service,error,loadservice}


}
export default getservice