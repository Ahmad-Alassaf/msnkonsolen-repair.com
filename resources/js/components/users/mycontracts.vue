<template >
    <section class="headersection" id="headersection">
        <navbar />
        <jambotron />

    </section>
    <div class="container py-5">
        <h1 class="text-center">Meine Aufträge</h1>
          
        <div class="container  text-center px-0">
            <div class="row py-4  mb-3 text-start contract banner rounded mb-2 position-relative"
            :class="{unpaid:contract.attributes.paidstatus=='unpaid',payed:contract.attributes.paidstatus=='payed'}"
            @click="showcontract(contract.id)"
             v-for="contract in contracts">
                <div class="col-2 text-center">{{ contract.attributes.jobsnumber }} </div> 
                <div class="col-4 ">{{ contract.attributes.device }} </div> 
                <div class="col-6 " v-for="service in contract.relationships.services">
                  {{ service.attributes.title}} --{{ service.attributes.prise }} €
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
import { useRouter } from "vue-router";
import router from "../../router";
export default {
    components:{ navbar, jambotron },
    setup(){
        const store=useStore()
        const router=useRouter()
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contracts,unpaidcontracts,paidcontracts,contractserror,loadcontracts,contractsprise}=getcontracts()
        loadcontracts(token)  
        const showcontract=(id)=>{
            router.push({name:'showcontract',params:{id:id}})

        }
        return {paidcontracts,contracts,showcontract}

    }
    
    
}
</script>
<style >
.contract{
    cursor: pointer;
    background-color: white;
}
.contract:hover{
    box-shadow:  2px 2px 4px #000000;
}
.unpaid::after{
    width:10px;
    height:100%;
    content: "";
    position: absolute;
    top: 0;

    background-color: red;

}
.payed::after{
    width:10px;
    height:100%;
    content: "";
    position: absolute;
    top: 0;

    background-color: green;

}
    
</style>