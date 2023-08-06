<template >
    <navbar />
    <jambotron />
  
    <div class="container pt-5 shadow">
      <router-link :to="{name:'addnewservice'}" class="btn btn-primary ">New</router-link>     
      
        <div class="row mb-1  " v-for="service in services ">
          <div class="col-12  col-lg-2">
            <img :src="`storage/images/${service.attributes.foto}`" alt="" class="img-thumbnail border-0 w-100">
          </div>
          <div class="col-lg-10">
            <div class="card-header border-0">
              <h4>{{service.attributes.title}}</h4> 
                  <span v-for="device in service.relationships.devices" >
                      <span  class="p bg-dark rounded text-white px-2 m-1">                       
                          {{ device.attributes.title }}
                      </span>                     
                  </span>
              </div>
              <div class="card-body py-2">
              <p class="lead bg-white">{{service.attributes.description}}</p>
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

    <foot />
</template>
<script>
import {computed} from 'vue'
import { useStore } from 'vuex'
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import foot from './layouts/foot.vue';
import getservices from "../compasable/getservices";

import deleteservice from '../compasable/deleteservice';
import Swal from 'sweetalert2'
export default {
    name:"adminservices",
    components:{navbar,jambotron,foot},
    setup(){
        const {services,error,load}=getservices()        
        const store = useStore()
        
        load()
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        function deleteservic(id){           
                  const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: 'btn btn-success',
                      cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                  })
          swalWithBootstrapButtons.fire({
                          title: 'Sind Sie sicher?',
                          text: "Sie können nicht nacher Service anzeigen!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Ja ',
                          cancelButtonText: 'Nein',                        
                        }).then((result) => {                         
                          if (result.value) {
                            const {executedelete,message}=deleteservice()
                                  executedelete(id,token)                                 
                                    swalWithBootstrapButtons.fire({
                                                                    position: 'center',
                                                                      icon: 'success',
                                                                      title: 'Service erfolgreich gelöcht.',
                                                                      showConfirmButton: false,
                                                                      timer: 1500
                                        })                                
                                        load()
                          } else if (result.dismiss === Swal.DismissReason.cancel) {
                            swalWithBootstrapButtons.fire(
                              'Cancelled',
                              'Your imaginary file is safe :)',
                              'error'
                            )
                          }
                        })
         
        }
        return{services,error,load,token,deleteservic}
    }
}
</script>
<style lang="">
    
</style>