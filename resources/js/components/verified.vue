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
                    onMounted(async () => {
                        routeToken.value=route.params.token 
                    })
        const routeToken=ref(null)
        const route=useRoute()
        const router=useRouter()
        const store=useStore()
        const token=computed(()=>{
            return store.getters['auth/gettoken']


        })
        console.log('token from Store')
        console.log(token.value)
        console.log('token from route')
        console.log(routeToken.value)
        if(token==routeToken)
        {
            console.log('Email verfied successfully')
        }
        else{
            console.log('not Verified !!!!!')
        }
        
    }
    
}
</script>
<style lang="">
    
</style>