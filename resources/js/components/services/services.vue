<template  >
    <navbar />
    <jambotron />   
    <div class="container-md px-2 pt-5 services">  
        <div class="row border px-3 py-3 my-3 rounded bg-white shadow">
            <div class="form-check col-12 col-md-3">
                <input type="radio" name="services" v-model="selected_platforms" value="all" class="form-check-input" id="services">
                <label class="form-check-label" for="services" > All Services({{ services.length }})  </label>
            </div>
            <div class="form-check col-12 col-md-3">
                <input type="radio" name="services" v-model="selected_platforms" value="Sony" class="form-check-input" id="sony">
                <label class="form-check-label" for="sony"> Sony Services ({{ sonylistlength}}) </label>
            </div>
            <div class="form-check col-12 col-md-3">
                <input type="radio" name="services" v-model="selected_platforms" value="Microsoft" class="form-check-input" id="microsoft">
                <label class="form-check-label" for="microsoft"> Microsoft Services({{ microsoftlistlength }})  </label>
            </div>
            <div class="form-check col-12 col-md-3">
                <input type="radio" name="services" v-model="selected_platforms" value="Nintendo" class="form-check-input" id="nintedo">
                <label class="form-check-label" for="nintedo"> Nintedo Services({{ nintedolistlength }})  </label>
            </div>
          

        </div>                
          <div v-for="service in matchedlist" class="row mb-4 shadow p-0" >            
                <div class=" col-lg-2   p-2">
                    <img :src="`storage/images/${service.attributes.foto}`" alt="" class="img-thumbnail border-0">
                </div>
                <div class="col-lg-10 card p-0 border-0">
                            <div class="card-header border-0">
                            <h4>{{service.attributes.title}}</h4> 
                                <span v-for="device in service.relationships.devices" >
                                    <span  class="p bg-dark rounded text-white px-2 m-1">                       
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
                                <router-link :to="{name:'editservice',params:{id:service.id}}" class="btn btn-primary" >Editt</router-link>
                                <button class="btn btn-danger">Delete</button>
                            </div>
              

            </div>                        
          

</div>  
    </div> 
   
</template>
<script >
import service from'./service.vue'
import { computed,ref } from 'vue';
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import msnfooter from '../layouts/msnfooter.vue';
import getservices from '../../compasable/getservices';

export default {
    name:"services",
    components:
    {service, navbar,  jambotron,msnfooter},
    setup(){
         const selected_platforms=ref('all')        
        const {error,services,load}=getservices() 
        load()
        const nintedolistlength=ref(0)
        const sonylistlength=ref(0)
        const microsoftlistlength=ref(0)         
       const matchedlist=computed(()=>{
        const arr=services.value
        const nintedolist=ref([])
        const sonylist=ref([])
        const microsoftlist=ref([])
        arr.forEach(service=>{           
            service.relationships.devices.forEach((device)=>{              
                if(device.relationships.platform.platform =='Nintendo'){
                    if(!nintedolist.value.includes(service))
                            nintedolist.value.push(service)
                }
                else if(device.relationships.platform.platform =='Sony')
                {
                    if(!sonylist.value.includes(service))
                             sonylist.value.push(service)
                }
                else {
                    if(!microsoftlist.value.includes(service))
                        microsoftlist.value.push(service)
                }               
            })
        })
        nintedolistlength.value=nintedolist.value.length
        sonylistlength.value=sonylist.value.length
        microsoftlistlength.value=microsoftlist.value.length
        if(selected_platforms.value=='Sony')
        {
            return sonylist.value
        }
        else if(selected_platforms.value=='Microsoft')
                        {return microsoftlist.value }
        else if(selected_platforms.value=='Nintendo')
                            { return nintedolist.value }
        else
                   { return services.value}
       
       })
     
        return{error,services,matchedlist,selected_platforms,nintedolistlength,sonylistlength,microsoftlistlength}
    },
   
}
</script>
<style >
.services{
 
}
    
</style>
