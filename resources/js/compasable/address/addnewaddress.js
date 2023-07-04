import {ref} from 'vue'
const addnewaddress=(data)=>{
    const address=ref(null)
    const error=ref(null)
    const addaddress=async()=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                   // Authorization: `Bearer ${this.token()}`
                }
            }
            await axios.post(`/api/address`,data,config).then(response=>{
                console.log(response.data)
                address.value=response.data
              
            })

        }
        catch(err){
            error.value=err.message
            console.log(error.value)
        }
    }

    return {address,error,addaddress}

}
export default addnewaddress