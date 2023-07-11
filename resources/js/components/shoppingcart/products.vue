<template >
    <navbar />
    <jambotron />
    <div class="container ">
      
        <div class=" pt-5 ">
           
                <div class=" p-3">
                   
                            <div v-for="contract in contractslist" class="mb-1  d-flex">
                                             
                                <contract :contract="contract"  />
                            </div>
                            <p class="bg-secondary text-white text-center py-3">gesamtprise:{{ gesamtprise }}</p>
                      

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
import { faThList } from '@fortawesome/free-solid-svg-icons';
import { StripeCheckout } from '@vue-stripe/vue-stripe';
export default {
    name:"products",
    components:{navbar,contract,  StripeCheckout,
    
      jambotron,
    
      foot },
    data(){
        
        return{
            
            publishableKey : 'pk_test_51NRR9iJmrCQ5cBeW5Mk3NT6Zy2O9CfCc3JWkeECXfamrlJ1P5xontXDeQJdc7ek5nTo8pANsmloesdI9keh5uARn00fvM20aij',
            sessionId:null
                 
           
           
        }
    },
    mounted(){
        this.getsession()

    },
    created(){
        this.contracts()

      
        

    },
    computed:{
        ...mapGetters({
            contractslist:"auth/get_contracts_list",
            token:"auth/gettoken",
        }),
      
    },
    methods:{
        ...mapActions({contracts:"auth/getcontracts"}),
        formatDate(dateString) 
                       {
                                const date = dayjs(dateString);
                                    // Then specify how you want your dates to be formatted
                                return date.format('dddd:D MMMM , YYYY');
                        },
        gesamtprise(){
            let totalprise=0
                                    this.contractslist.forEach(contract => {
                                        contract.relationships.services.forEach(service=>{
                                            console.log('Service:'+service.attributes.title)
                                            totalprise += (parseInt(service.attributes.prise));
                                        })
                                        
                                    });
                                    console.log("Total price:"+totalprise)
                                    return totalprise;

        },
       async  getsession(){
                            let config={   
                                        headers:{
                                                                        "Access-Control-Allow-Origin" : '*',
                                                                        "Accept": 'application/vnd.api+json',                                
                                                                        "Authorization": `Bearer ${this.token}`,
                                                                        'Access-Control-Allow-Credentials':true
                                            }

                                    } 
                                   
            let totalprise=this.gesamtprise();
            await axios.get('/sanctum/csrf-cookie');            
            await  axios.post('/api/getsession',{contractslist:this.contractslist,totalprise:totalprise},config).then(response=>{
                console.log(response.data)
                    this.sessionId=response.data.id

                  
                  
                }) .catch((er)=>{console.log(er)})

         },
         submit () {
                            // You will be redirected to Stripe's secure checkout page
                            this.$refs.checkoutRef.redirectToCheckout();
                    },
         async   payment(){
              let data={
                price_data:{
                    'currency':'usd',

                }

              };
            
             
            await axios.get('/sanctum/csrf-cookie');
                axios.post('/api/payment',data,{
                    headers:{
                                                         "Access-Control-Allow-Origin" : '*',
                                                           "Accept": 'application/vnd.api+json',                                
                                                           "Authorization": `Bearer ${this.token}`,
                                                           'Access-Control-Allow-Credentials':true
                              }
                }).then(response=>{

                    console.log(response)
                  
                }) .catch((er)=>{console.log(er)})
            }
    }

    
}
</script>
<style >
    
</style>