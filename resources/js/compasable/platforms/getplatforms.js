import {ref} from 'vue'
const getplatforms=()=>{
    const platformserrors=ref(null)
    const platforms=ref(null)
    const loadplatforms=async (token)=>{
        try{
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                    Authorization: `Bearer ${token}`
                }
            }
            await axios.get(`/api/platforms`,config)
            .then(response=>{ 
              
               if(!response.data){
                throw Error('an Error Occered')
               }
               else{
                platforms.value=response.data.data
             
               }
            }) 


        }
        catch(err){
            platformserrors.value=err.message
        }

    }
    return {platformserrors,platforms,loadplatforms}

}
export default getplatforms