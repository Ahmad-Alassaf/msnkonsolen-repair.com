import {ref } from 'vue'
const newrole=()=>{
    const addnewroleError=ref(null)
    const addnewrole=async(role,token)=>{
     
      
            await axios.get('/sanctum/csrf-cookie');
            let config={
                            headers:{
                                Accept: 'application/vnd.api+json',
                                Authorization: `Bearer ${token}`   
                            }
                        }
                       
              await axios.post(`/api/roles`,{
                name:role
              },config).catch(error=>{
                            addnewroleError.value=error.message
                           
                            throw Error(error.response.data.message)
                          })  
 }
 return {addnewroleError,addnewrole}
}
export default newrole