<template >
    <navbar />
    <jambotron />
    <div class="container pt-5">
        <h1 class="bg-dark text-white text-center m-0">Devices</h1>
        <form class="form pt-5 px-1 d-flex" @submit.prevent="newdevice">
            <select name="" v-model="selectedplatform"  class="form-select mx-1 "  aria-label="Default select " >
                <option value="" selected>-- Platform auswahlen --</option>
                <option :value="platform" v-for="platform in platforms">{{platform.attributes.platform}}</option>
                
            </select>
            <input type="text " placeholder="Gerät..." class="form-control" v-model="devicetxt">
            <input type="submit" value="add" class="btn btn-primary ">
           
        </form>
        <div class="container pt-5">
            <ul class="list-group">
               
                <li v-for="device in devices" class="list-group-item mb-1 border-0  shadow ">
                    <div class="row">
                        <div class="col-12 col-md-10 mb-1 py-3">
                            <h3>{{device.attributes.title}}</h3>
                            <span class="badge rounded-pill bg-dark">{{device.relationships.platform.platform}}</span>
                        </div>
                        
                        <div class="col-2 "> <button class="btn btn-danger " @click="deleteonedevice(device.id)">Löchen</button></div>
                    </div>
                   
                   
                </li>
            </ul>

        </div>
    </div>
   
</template>
<script>
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import msnfooter from '../layouts/msnfooter.vue';
import axios from 'axios';
import getplatforms from '../../compasable/platforms/getplatforms';
import addnewdevice  from '../../compasable/devices/addnewdevice'
import getdevices from '../../compasable/devices/getdevices'
import deletedevice from "../../compasable/devices/deletedevice";
import { useStore } from 'vuex'
import { computed,ref,reactive } from "vue";
import Swal from 'sweetalert2'
export default {
    name:"devices",
    components:{navbar,jambotron,msnfooter},
    setup(){
       const devicetxt=ref('')
       const selectedplatform=ref(null)
        const {platformserrors,loadplatforms,platforms}=getplatforms()
        const store = useStore()
        const token=computed(()=>{
            return store.getters["auth/gettoken"]

        })
        loadplatforms(token)
        const {addnewdeviceErrors,runaddnewdevice}=addnewdevice()
        const {deviceserror,devices,loaddevices}=getdevices()
        loaddevices()
        function newdevice(){
                       runaddnewdevice({device_title:devicetxt.value,platform_id:selectedplatform.value.id},token)  
                       loaddevices()       

        }
        function deleteonedevice(id){
          
             
           
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
                            const {err,rundeletedevice}=deletedevice()
                              rundeletedevice(id,token)  
                              loaddevices()                                
                                    swalWithBootstrapButtons.fire({
                                                                    position: 'center',
                                                                      icon: 'success',
                                                                      title: 'Service erfolgreich gelöcht.',
                                                                      showConfirmButton: false,
                                                                      timer: 500
                                        })                                
                                       
                          } else if (result.dismiss === Swal.DismissReason.cancel) {
                            swalWithBootstrapButtons.fire(
                              'Cancelled',
                              'Your imaginary file is safe :)',
                              'error'
                            )
                          }
                        })
         
        

        }
         
        return {platforms,devicetxt,selectedplatform,devices,newdevice,deleteonedevice}

    },

    
    
    
}
</script>
<style lang="">
    
</style>