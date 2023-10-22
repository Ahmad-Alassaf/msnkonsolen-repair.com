<template >
    <section class="headersection" id="headersection">
        <navbar />
        <jambotron />

    </section>
    <div>
       
        <div class="container  text-center px-0">
               <div class="row py-5 px-1 mb-3 text-start" v-for="contract in unpaidcontracts">
                   <div class="col-2 ">{{ contract.attributes.jobsnumber }} </div> 
                   <div class="col-4 ">{{ contract.attributes.device }} </div> 
                   <div class="col-6 " v-for="service in contract.relationships.services">
                    {{ service.attributes.title}} --{{ service.attributes.prise }} €
                </div> 

                </div>
                <div class="py-3 bg-secondary text-white fw-bold mb-3">
                    {{ contractsprise}} €
                </div>
                
           
            <button class="btn btn-primary m-auto w-50" @click="submit">Pay now!</button>

        </div>
        <div class="   d-flex align-items-center pb-4">
            <StripeCheckout
                  v-if="sessionId!=null" 
                    ref="checkoutRef"
                    :pk="publishableKey"
                     :sessionId="sessionId"
            />
               
        </div> 
        
    </div>
</template>
<script>

import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import getcontracts from '../../compasable/contracts/getcontracts';
import {ref,computed,onMounted,onUnmounted} from 'vue'
import { useStore } from 'vuex'
export default {
       
    components:{ navbar, jambotron,StripeCheckout },
    setup(){
          
        const publishableKey=ref('pk_test_51NRR9iJmrCQ5cBeW5Mk3NT6Zy2O9CfCc3JWkeECXfamrlJ1P5xontXDeQJdc7ek5nTo8pANsmloesdI9keh5uARn00fvM20aij')
        const sessionId=ref(null)
        const checkoutRef=ref(null)
        const store=useStore()
        
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contracts,unpaidcontracts,contractserror,loadcontracts,contractsprise}=getcontracts()
        loadcontracts(token)  
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
                        console.log(contracts.value) 
                        if(contracts.value.length>0)
                        {
                                await  axios.post('/api/getsession',{contractslist:unpaidcontracts.value},config)
                                .then(response=>{
                                    if(response.status!=404)
                                    {                                  
                                    sessionId.value=response.data.id  
                                    store.dispatch('auth/sessionid',response.data.id) 
                                    }
                                    else{
                                        alert('Page Not Found')
                                    }                        
                                }) 
                                .catch((er)=>{
                                    console.log(er)
                                    alert(er.message)
                                
                                })
                        }  
        })
        const submit=async()=>{
            checkoutRef.value.redirectToCheckout()
        } 
        onUnmounted(() => {
            sessionId.value=null
            

        })
        return{publishableKey,sessionId,submit,checkoutRef,unpaidcontracts,contractsprise}
    }    
}
</script>
<style lang="">
    
</style>