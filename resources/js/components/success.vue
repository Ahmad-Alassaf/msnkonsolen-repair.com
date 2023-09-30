<template >
    <navbar />
    <jambotron />
    <div>
        <h1>
            Danke für  Ihre Zahlung 
        </h1>
        
    </div>

</template>
<script>
import navbar from './layouts/navbar.vue'
import jambotron from './layouts/jambotron.vue';
import {ref,computed,onMounted,watch} from 'vue'
import { useRoute ,useRouter} from 'vue-router'
import { useStore } from 'vuex'
export default {
    components:{navbar,   jambotron },
    setup(){
        const route = useRoute()
        const router = useRouter()
        const store = useStore()
        onMounted(async()=>{
            let config={   
                                        headers:{
                                                                        "Access-Control-Allow-Origin" : '*',
                                                                        "Accept": 'application/vnd.api+json',                                
                                                                        "Authorization": `Bearer ${token}`,
                                                                        'Access-Control-Allow-Credentials':true
                                            }

                                    }
                                   
                        await axios.get('/sanctum/csrf-cookie');  
                     
                         await  axios.post('/api/success',{
                            sessionID:sessionID.value
                         },config)
                            .then(response=>{
                                console.log('response')
                                console.log(response)
                               if(response.status==404)
                               {
                                alert('Page Not Found !!!!')
                               }
                            
                                                
                            }) 
                            .catch((er)=>{
                               router.push('/pagenotfound')
                               
                            })

        })
  
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const sessionID=computed(()=>{
           return store.getters["auth/getsessionid"]
        })
    }
   
    
}
</script>
<style lang="">
    
</style>