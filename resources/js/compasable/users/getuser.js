import {ref} from 'vue'
const getuser=()=>{
   
    const user=ref(null)
    const getuserErrors=ref(null)
    const loaduser=async (id,token)=>{
       
        try{
          
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.get(`/api/users/${id}`,config).then(response=>{
                if(response.data)
                {
                    user.value=response.data.data
                   
                   
                }
                else{
                    throw Error('there is no Data')

                }
               
            }).catch(err=>{
                console.log(response.data);
               
               
                
            })

        }
        catch(err){
            getuserErrors.value=err.message
           
        }
    }
    return {getuserErrors,user,loaduser}

}
export default getuser