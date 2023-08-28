<template >
    <navbar />
    <jambotron />
    <div class="container ">
        <div class=" pt-5 ">
                <div class=" p-3">                   
                            <div v-for="contract in contracts" class="mb-1  d-flex">                                             
                                <contract :contract="contract"  />
                            </div>
                            <p class="bg-secondary text-white text-center py-3">gesamtprise:{{ contractsprise }}</p>
                </div>    
                <div class="   d-flex align-items-center pb-4">
                    <StripeCheckout
                          v-if="sessionId!=null" 
                            ref="checkoutRef"
                            :pk="publishableKey"
                             :sessionId="sessionId"
                    />
                    <button class="btn btn-primary m-auto w-50" @click="submit">Pay now!</button>    
                </div> 
        </div>
    </div>
    <foot />
</template>
<script>
import dayjs from 'dayjs';
import navbar from '../layouts/navbar.vue'
import jambotron from '../layouts/jambotron.vue';
import foot from '../layouts/foot.vue';
import {mapActions, mapGetters} from 'vuex'
import contract from '../contracts/contract.vue'
import { StripeCheckout } from '@vue-stripe/vue-stripe';
import axios from 'axios';
import {ref,computed,onMounted} from 'vue'
import getcontracts from '../../compasable/contracts/getcontracts';
export default {
    name:"products",
    components:{navbar,contract,  StripeCheckout, jambotron, foot },
    setup(){
        const publishableKey=ref('pk_test_51NRR9iJmrCQ5cBeW5Mk3NT6Zy2O9CfCc3JWkeECXfamrlJ1P5xontXDeQJdc7ek5nTo8pANsmloesdI9keh5uARn00fvM20aij')
        const sessionId=ref(null)
        const checkoutRef=ref(null)
        const getsession=onMounted(async()=>{
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
                        await  axios.post('/api/getsession',{contractslist:contracts.value},config).then(response=>{
                               // get Session ID from Stripe
                               console.log('Checkout')
                               console.log(response.data)//Checkout
                                sessionId.value=response.data.id                            
                            }) .catch((er)=>{console.log(er)})

        })
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contracts,contractserror,loadcontracts,contractsprise}=getcontracts()
        loadcontracts(token)
        const submit=async()=>{
            checkoutRef.value.redirectToCheckout()



        } 
        return{publishableKey,sessionId,contracts,contractsprise,submit,checkoutRef}

    }
  
   
   ,
    methods:{
        //async submit(){ this.$refs.checkoutRef.redirectToCheckout()},
       
      
        formatDate(dateString) 
                       {
                                const date = dayjs(dateString);
                                    // Then specify how you want your dates to be formatted
                                return date.format('dddd:D MMMM , YYYY');
                        },
        
    
   
       
    }

    
}
</script>
<style >
    
</style>