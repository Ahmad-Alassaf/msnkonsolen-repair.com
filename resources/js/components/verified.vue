<template lang="">
    <div>
        <h1>Email verified</h1>
        
    </div>
</template>
<script>
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { onMounted,computed } from "vue";
    import { ref } from 'vue';
export default {
    name:"verified",
    setup() {
        const store = useStore()
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const route=useRoute()
        const router=useRouter()
                    onMounted(async () => {
                                let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${token}`
                                                        }
                                                    } 
                                    await axios.get('/sanctum/csrf-cookie');                                           
                                    await  axios.post(`/email/verify/${5}/${55}`,{data:5},config)
                                                .then((response)=>{console.log(response)})
                                                .catch((err)=>{console.log(err)})

                    


        })
    }
    
}
</script>
<style lang="">
    
</style>