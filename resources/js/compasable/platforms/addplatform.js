import {ref} from 'vue'
const addnewplatform=()=>{
  
    const error=ref(null)
    const runaddplatform=async(data,token)=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                   Authorization: `Bearer ${token}`
                }
            }
            alert(data)
            await axios.post(`/api/platforms`,{
                title:data
            },config).then(response=>{
                console.log(response.data)
              
            })
        }
        catch(err){
            error.value=err.message
            console.log(err)
        }
    }

    return {error,runaddplatform}

}
export default addnewplatform