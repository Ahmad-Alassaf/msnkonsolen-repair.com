<template lang="">
    <div>
       
            <section class="headersection" id="headersection">
                <navbar />
                <jambotron />
    
            </section>
            <div class="container py-5">
                <form class="form w-25 m-auto  shadow" @submit.prevent="verify" v-if="user.attributes.isverified ==0">
                    <div class=" d-flex">
                        <input type="text" v-model="verificationcode" class="form-control m-1 py-2 border-0 shadow" placeholder="XXXXX">
                        <input type="submit" value="Verifiy" class="btn btn-primary py-0">

                    </div>
                    <label class="text-primary verificationcode" @click="resend()">Schick Verificationcode wieder!</label>
                  
                </form>
                <div v-else class="alert alert-primary">
                    Ihre Email ist schon verified


                </div>

            </div>
        
    </div>
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { onMounted,computed } from "vue";
    import { ref } from 'vue';
export default {
    name:"verified",
    
    components:{
        navbar,      
        jambotron,},
    setup() {
        const verificationcode=ref('')
        const store=useStore()
        const router=useRouter();
  
        const user=computed(()=>{
            return store.getters['auth/getuser']
        })
        
        const verify=()=>{
            console.log('user.value.attributes.verificationcode')
            console.log(user.value.attributes.verificationcode)
            if(user.value.attributes.verificationcode==verificationcode.value)
            {
                store.dispatch('auth/setverify',{email:user.value.attributes.email})
             //  router.push('/')
            }
            else
            {
                alert('Nicht verified')
            }

        }
        const resend=()=>{
            store.dispatch('auth/resendverify',{email:user.value.attributes.email})

        }
        return {verify ,resend,verificationcode}
    }
    
}
</script>
<style >
.verificationcode{
    padding: 5px 5px 5px 5px;
    font-style: italic ;
    text-decoration: underline;
}
.verificationcode:hover{
    cursor: pointer;
}
    
</style>