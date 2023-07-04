<template  class="container pt-5">
    <navbar />
    <jambotron />   
    <div class="container pt-5">        
          <div v-for="service in services" class="row mb-4 shadow p-0" >                         
            <div class=" col-lg-2   p-2">
                <img :src="`storage/images/${service.attributes.foto}`" alt="" class="img-thumbnail border-0">
            </div>
            <div class="col-lg-10 card p-0 border-0">
                        <div class="card-header border-0">
                        <h4>{{service.attributes.title}}</h4> 
                            <span v-for="device in devices" >
                                <span v-if="service.relationships.devices.find(e=>e.attributes.title===device.attributes.title)" class="p bg-dark rounded text-white px-2 m-1">                       
                                    {{ device.attributes.title }}
                                </span>                     
                            </span>
                        </div>
                        <div class="card-body">
                        <p class="lead">{{service.attributes.description}}</p>
                        <div class="d-flex justify-content-between">
                            <span class="bg-dark text-white rounded px-1">{{service.attributes.prise}} €</span>
                            <span  class="bg-dark text-white rounded px-1">{{service.attributes.waranty}} Month</span>
                        </div> 
                        </div>
                        <div class="card-footer d-flex justify-content-between" v-if="authenticated " >
                            <router-link :to="{name:'editservice',params:{id:service.id}}" class="btn btn-primary" >Edit</router-link>
                            <button class="btn btn-danger" @click="deleteservice(service.id)">Delete</button>
                        </div>
            </div>

</div>  
    </div> 
</template>
<script >

import service from'./service.vue'

import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import getservices from '../../compasable/getservices';

export default {
    name:"services",
    components:
    {service,  navbar,      
        jambotron},
    setup(){
      
        const {error,services,load}=getservices()
        load()
        return{error,services}

    }
   
   
   
   
   
}
</script>
