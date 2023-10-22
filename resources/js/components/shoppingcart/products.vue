<template >
    <navbar />
    <jambotron />
    <div class="container-sm px-1 ">
        <div class=" pt-5 " v-if="unpaidcontracts.length>0">  
            <div class="card  mb-3 " style="" v-for="contract in unpaidcontracts">
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
            <router-link :to="{name:'kasse'}" class="btn btn-danger m-1"> Zur Kasse</router-link>
                
               
        </div>
        <div v-else class="alert alert-danger">
            <h1>
                Sie haben noch Keine Aufträge im Warenkorp
            </h1>

        </div>
       
    </div>
</template>
<script>
import dayjs from 'dayjs';
import navbar from '../layouts/navbar.vue'
import jambotron from '../layouts/jambotron.vue';
import msnfooter from '../layouts/msnfooter.vue';
import {ref,computed,onMounted,onUnmounted} from 'vue'
import { useStore } from 'vuex'
import getcontracts from '../../compasable/contracts/getcontracts';
import deletecontract from '../../compasable/contracts/deletecontract';
export default {
    name:"products",
    components:{navbar,   jambotron, msnfooter },
    setup(){
        const store=useStore()
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contracts,unpaidcontracts,contractserror,loadcontracts,contractsprise}=getcontracts()
        loadcontracts(token)   
        const deleteonecontract=(id)=>{
            const {deletecontracterror,runndeletecontract}=deletecontract()
        
              runndeletecontract(id,token)
              loadcontracts(token)
        }
        return{contracts,contractsprise,deleteonecontract,unpaidcontracts}
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