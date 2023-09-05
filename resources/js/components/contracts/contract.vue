<template >
           <div class="card  mb-3 " style="" v-if="contract !=null">
            <div class="row  g-0">
                <div class="col-3 text-center p-0"  >               
                    <img :src="`storage/images/${contract.relationships.services[0].attributes.foto}`" alt="" style="height:100%"  class="img-fluid">               
                </div>
                <div class="col-9 p-0">
                    <div class="card-body p-0">
                                    <div class="card-header ">
                                    <h3 class="">
                                        JobsRef#: {{contract.attributes.jobsnumber}}
                                    </h3> 
                                    </div>
                                            <div class="px-1 ">     
                                                <p class="m-0">{{contract.attributes.device}}. SN:{{contract.attributes.serialnumber}}</p>               
                                                
                                            </div>
                                            <div class="">
                                                <ul class=" list-group mb-0 p-0">
                                                    <li class="list-group-item border-0 rounded-0">Bestellung</li>
                                                    <li v-for="service in contract.relationships.services" class="list-group-item border-0"> 
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
                        <button class="btn btn-danger  " @click="deletecontract(contract.id)"><i class="fa-solid fa-trash"></i></button> 
                    </div>  
                </div>
        </div>
</template>
<script>
import dayjs from 'dayjs';

import{ref, computed,toRefs } from 'vue'
import getcontract from '../../compasable/contracts/getcontract';
import deletecontract from '../../compasable/contracts/deletecontract'
import { useRoute } from 'vue-router';
export default {
   
   
    setup(props){
      
        const { contract } = toRefs(props)
      
       
       
        return {contract}

    }
   
  
      
   
   
}
</script>
<style lang="">
    
</style>