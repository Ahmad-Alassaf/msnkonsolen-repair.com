import {ref,computed} from 'vue'
import { useStore } from 'vuex'
const deleteuser=()=>{
    const deleteusererror=ref(null)
    const store=useStore()
    const token=computed(()=>{
        return store.getters['auth/gettoken']
    })
    const rundelete=async(id)=>{
        await axios.get('/sanctum/csrf-cookie');
        let config={
            headers:{
                Accept: 'application/vnd.api+json',                    
                Authorization: `Bearer ${token}`
            }
        }
        await axios.delete(`/api/users/${id}`,config).then(response=>{
           console.log(response)
           
        }).catch(err=>{
            console.log(err);
            deleteusererror.value=err
        })
    }
    return {rundelete,deleteusererror}
}
export default deleteuser