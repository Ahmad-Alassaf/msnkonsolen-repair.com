import {ref} from 'vue'
const getusers=()=>{
   
    const users=ref(null)
    const getusersErrors=ref(null)
    const loadusers=async (token)=>{       
        try{          
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.get(`/api/users`,config).then(response=>{
                if(response.data)
                {
                    users.value=response.data.data
                }
               
            }).catch(err=>{
                console.log(response.data);
                throw Error('there is no Data')
            })
        }
        catch(err){
            getusersErrors.value=err.message
        }
    }
    return {getusersErrors,users,loadusers}
}
export default getusers