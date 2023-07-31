import {ref} from 'vue'
const deleteplatform=()=>{

    const deleteplatformerrors=ref(null)
const rundeleteplatform=async (id,token)=>{
   
    try{
        await axios.get('/sanctum/csrf-cookie');
        let config={
            headers:{
                Accept: 'application/vnd.api+json',                    
                Authorization: `Bearer ${token}`
            }
        }
        await axios.delete(`/api/platforms/${id}`,config).then(response=>{
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
        deleteplatformerrors.value=err.message

    }

}
return {deleteplatformerrors,rundeleteplatform}
}
export default deleteplatform