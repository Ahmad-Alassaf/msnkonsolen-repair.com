import {ref} from 'vue'
const addnewpermission=()=>{
   
   const runaddnewpermission=async(permission,token)=>{
        await axios.get('/sanctum/csrf-cookie');
        let config={
                        headers:{
                            Accept: 'application/vnd.api+json',
                            Authorization: `Bearer ${token}` 
                        }
                    }
          await axios.post(`/api/permissions`,{name:permission},config)
                      .then(()=>{ })
                      .catch(error=>{
                        console.log(error)
                        throw Error(error.response.data.message)
                      })  

    }
    return {runaddnewpermission}
   

}
export default addnewpermission