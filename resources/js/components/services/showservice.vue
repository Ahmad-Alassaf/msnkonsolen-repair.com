<template >
   
    <jambotron />
    <navbar />
    <div class="container py-5">
        <div class="card mb-2 shadow-sm" v-if="service !=null" >          
            <div class="card-header">
                <h3>{{service.attributes.title}}</h3>
              <span v-for="device in devices" >
                    <span v-if="device.relationships.services.find(e=>e.attributes.title===service.attributes.title)" class="p bg-dark rounded text-white px-2 m-1">                       
                           {{ device.attributes.title }}
                    </span>                     
                </span >
            </div>
            <div class="card-body p-0">
                <div class="row">
                    <div class="d-flex">
                        <img :src="`../storage/images/${service.attributes.foto}`" alt="" class=" " style="height: 18rem; width:auto">
                       <p class="  mb-0 py-3 px-4">{{service.attributes.description}} <b></b></p>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                    <span class="border bg-dark text-white rounded px-2">Prise:{{service.attributes.prise}}€.</span>
                    <span class="border bg-dark text-white rounded px-2">Waranty: {{service.attributes.waranty}} Month</span>
                </div>
            </div>
            
           
           
        </div>
        
    </div>
</template>
<script>
import navbar from "../layouts/jambotron.vue";
import jambotron from '../layouts/navbar.vue';
import getservice from '../../compasable/getservice'
import getdevices from "../../compasable/getdevices";
import { useRoute } from 'vue-router';
export default {
    name:"showservice",
    components:{
      
        navbar,      
        jambotron,    
    },
 
  setup(){
    const route = useRoute();
   
    const {error,service,loadservice}=getservice(route.params.id)
    const {deviceserror,devices,loaddevices}=getdevices()
    loadservice()
    loaddevices()
    return {error,service,deviceserror,devices}
  }



    
}
</script>
<style lang="">
    
</style>