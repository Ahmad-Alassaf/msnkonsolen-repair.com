<template >
    <section class="headersection" id="headersection">
        <navbar />
        <jambotron />

    </section>
    <div class="container py-5">
        <h1 class="">Bezahlte Aufträge</h1>
          
        <div class="container  text-center px-0">
            <div class="row py-4 px-1 mb-3 text-start shadow rounded mb-2" v-for="contract in contracts">
                <div class="col-2 ">{{ contract.attributes.jobsnumber }} </div> 
                <div class="col-3 ">{{ contract.attributes.device }} </div> 
                <div class="col-5 " v-for="service in contract.relationships.services">
                  {{ service.attributes.title}} --{{ service.attributes.prise }} €
                </div> 
                <div class="col-1 " v-if="contract.attributes.paidstatus=='payed'">
                    <span class="bg-success rounded px-2 text-white">Bezahlt</span>
                </div>
                <div  class="col-2 " v-else>
                    <span class="bg-danger rounded px-2  text-white">Nicht bezahlt</span>
                </div>
             </div>
           
             
        
      

     </div>
        
    </div>
</template>
<script>
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import getcontracts from '../../compasable/contracts/getcontracts';
import {ref,computed,onMounted,onUnmounted} from 'vue'
import { useStore } from 'vuex'
export default {
    components:{ navbar, jambotron },
    setup(){
        const store=useStore()
        
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contracts,unpaidcontracts,paidcontracts,contractserror,loadcontracts,contractsprise}=getcontracts()
        loadcontracts(token)  
        return {paidcontracts,contracts}

    }
    
    
}
</script>
<style lang="">
    
</style>