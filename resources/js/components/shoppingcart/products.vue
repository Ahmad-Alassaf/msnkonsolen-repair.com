<template >
    <navbar />
    <jambotron />
    <div class="container-sm px-1 ">
        <div class=" pt-5 ">  
            <div class="card  mb-3 " style="" v-for="contract in contracts">
                <div class="row  g-0" >
                    <div class="col-md-1 text-center p-0 " >               
                        <img :src="`storage/images/${contract.relationships.services[0].attributes.foto}`" alt=""   class="img-fluid">               
                    </div>
                    <div class="col-md-11 p-0">
                        <div class="card-body p-0">
                                        <div class="card-header fw-bold">
                                      
                                            JobsRef#: {{contract.attributes.jobsnumber}}
                                        
                                        </div>
                                                <div class="px-1 fw-bold">     
                                                    <p class="m-0">{{contract.attributes.device}}. SN:{{contract.attributes.serialnumber}}</p>  
                                                </div>
                                                <div class="">
                                                    <ul class=" list-group mb-0 p-0">
                                                        <li class="list-group-item border-0 rounded-0 py-0 fw-bold  px-1">Bestellung</li>
                                                        <li v-for="service in contract.relationships.services" class="list-group-item border-0 py-0"> 
                                                            {{ service.attributes.title }} 
                                                            <span class="bg-danger text-white rounded px-1 ">{{ service.attributes.prise }}</span> €
                                                        </li>
                                                    </ul>                                    
                                                </div>
                            </div>
                    </div>
                        <div class="card-footer text-center  py-2 d-flex justify-content-between">
                            <span class="  px-2  ">
                                Auftragkosten:{{ gesamtprise  }}€ + Versandkosten
                            </span> 
                            <button class="btn btn-danger  " @click="deleteonecontract(contract.id)"><i class="fa-solid fa-trash"></i></button> 
                        </div>  
                    </div>
            </div>
                            <p class="bg-secondary text-white text-center py-3">gesamtprise:{{ contractsprise }}</p>
                
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
</template>
<script>
import dayjs from 'dayjs';
import navbar from '../layouts/navbar.vue'
import jambotron from '../layouts/jambotron.vue';
import msnfooter from '../layouts/msnfooter.vue';

import { StripeCheckout } from '@vue-stripe/vue-stripe';
import axios from 'axios';
import {ref,computed,onMounted,onUnmounted} from 'vue'
import { useStore } from 'vuex'
import getcontracts from '../../compasable/contracts/getcontracts';
import deletecontract from '../../compasable/contracts/deletecontract';
export default {
    name:"products",
    components:{navbar,  StripeCheckout, jambotron, msnfooter },
    setup(){
        const store = useStore()
        const publishableKey=ref('pk_test_51NRR9iJmrCQ5cBeW5Mk3NT6Zy2O9CfCc3JWkeECXfamrlJ1P5xontXDeQJdc7ek5nTo8pANsmloesdI9keh5uARn00fvM20aij')
        const sessionId=ref(null)
        const checkoutRef=ref(null)
        //get session ID
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
                                await  axios.post('/api/getsession',{contractslist:contracts.value},config)
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
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contracts,contractserror,loadcontracts,contractsprise}=getcontracts()
       

        loadcontracts(token)
      /*   const unpaidcontracts=computed(()=>{
            return contracts.filter(contract=>{contract.paidstatus=='payed'})
        }) */
    
        const submit=async()=>{
            checkoutRef.value.redirectToCheckout()
        } 
        const deleteonecontract=(id)=>{
            const {deletecontracterror,runndeletecontract}=deletecontract()
        
              runndeletecontract(id,token)
              loadcontracts(token)
        }
   
        onUnmounted(() => {
            sessionId.value=null
            

        })
        return{publishableKey,sessionId,contracts,contractsprise,submit,checkoutRef,deleteonecontract}
    }
   ,
    methods:{
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
@media (max-width: 575.98px) { 
    .container{
        padding: 0px!important;

    }
 }
    
</style>