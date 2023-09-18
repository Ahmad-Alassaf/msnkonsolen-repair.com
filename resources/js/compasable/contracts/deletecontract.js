import {ref} from 'vue'
const deletecontract=()=>{
    const deletecontracterror=ref(null)
    const runndeletecontract=async(id,token)=>{
    try{
       
                    let config={
                        headers:{
                                    Accept: 'application/vnd.api+json',                                
                                    Authorization: `Bearer ${token}`
                                }
                           } 
                      await axios.get('/sanctum/csrf-cookie');                                           
                      await  axios.delete(`/api/contracts/${id}`,config)
                    .then(()=>{
                            console.log('Contract deleted successfully')
                           
                        })
                 .catch((er)=>{
                    console.log(er)
                    throw Error('Some Thing went Wrong')
                })

        }
        catch(err){
            deletecontracterror.value=err
    
        }
       

    }
   
    return {deletecontracterror,runndeletecontract}

}

export default deletecontract