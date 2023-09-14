import{ref} from 'vue'

const addcontract=()=>{
    const addcontracterror=ref(null)
    const newcontractid=ref(null)
    const runaddcontract=async(data,token)=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
            let config={
                            headers:{
                                Accept: 'application/vnd.api+json',                                
                                Authorization: `Bearer ${token}`
                            }
                        }
                        console.log(data.services)
            await axios.post(`/api/contracts`,data ,config)
                        .then((response)=>{
                            console.log(response.data)
                            console.log('response.data.data.id')
                           console.log(response.data.data.id)
                            newcontractid.value=response.data.data.id
                        
                           
                        })
                        .catch(error=>{
                            console.log(error)
                            throw Error(error.message)
                        })
                       

        }
        catch(error){
            addcontracterror.value=error
        }

    }
    return {addcontracterror,runaddcontract,newcontractid}

}
export default addcontract