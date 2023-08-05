<template >
    <navbar />
    <jambotron />
    <div class="container pt-5 shadow">
        <div>
            <router-link :to="{name:'addnewservice'}" class="btn btn-primary float-end">New</router-link>           
        </div>
        <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Waranty</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="service in services ">
               <td>
                <img :src="`storage/images/${service.attributes.foto}`" alt="" style="max-width: 100px; height: auto;" class="img-fluid border-0">
               </td>
                <td>{{service.attributes.title}}</td>
                <td>{{service.attributes.description}}</td>
                <td>{{service.attributes.waranty}}</td>
                <td>{{service.attributes.prise}}€</td>
                <td>
                    <router-link :to="{name:'showservice',params:{id:service.id}}" class="btn btn-primary m-1">anzeigen</router-link>
                    <router-link :to="{name:'editservice',params:{id:service.id}}" class="btn btn-success m-1">bearbeiten</router-link>
                    <button class="btn btn-danger m-1"  @click="deleteservic(service.id)">Löchen</button>
                </td>
              </tr>             
            </tbody>
          </table>
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