<template >
    <navbar />
    <jambotron />
    <div class="container bg-white  px-0">
        <h1 class="bg-dark text-white text-center m-0">Platforms</h1>
        <form class="form pt-5 px-1" @submit.prevent="addoneplatform()">
            <div class="d-flex w-lg-50 m-auto">
                <select name="platforms" v-model="platformtxt" class="form-select mx-1 "  aria-label="Default select " >
                    <option selected>-- Platform auswahlen --</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Nintendo">Nintendo</option>
                    <option value="Sony">Sony</option>
                </select>
               
                <input type="submit" value="add" class="btn btn-primary ">

            </div>
           
        </form>
        <div class="pt-5 px-1">
            <div class="row m-auto mb-1  " v-for="platform in platforms">
               
                <div  class="col-12 col-md-6  border py-1 text-center shadow mb-1 rounded">
                   <span class="py-1 px-2 ">{{ platform.attributes.platform }}</span> 
     
                 </div>
                 <div class="col-12 col-md-6 d-flex  justify-content-center">
                     <button class="btn  btn-danger  mx-1" @click="deleteoneplatform(platform.id)">Löchen</button>
     
                 </div>           
       
         </div>

        </div>
        

    </div>
  
    <msnfooter />
</template>
<script>
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import msnfooter from '../layouts/msnfooter.vue';
import getplatforms from '../../compasable/platforms/getplatforms'
import deleteplatform  from '../../compasable/platforms/deleteplatform'
import addnewplatform from '../../compasable/platforms/addplatform'
import { computed,ref,reactive } from "vue";
import { useStore } from 'vuex'
import Swal from 'sweetalert2'
export default {
    components:{navbar,jambotron,msnfooter},
    setup(){
        const platformtxt= ref(null)
        const platformexist=ref(false)
       
        const {platformserrors,loadplatforms,platforms}=getplatforms()
        const store = useStore()
        const token=computed(()=>{
            return store.getters["auth/gettoken"]

        })
        loadplatforms(token)
        function deleteoneplatform(id){
           
            const {rundeleteplatform,deleteplatformerrors}=deleteplatform()
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
                            rundeleteplatform(id,token);
                                   loadplatforms(token)                                 
                                    swalWithBootstrapButtons.fire({
                                                                    position: 'center',
                                                                      icon: 'success',
                                                                      title: 'Service erfolgreich gelöcht.',
                                                                      showConfirmButton: false,
                                                                      timer: 1500
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
        function addoneplatform(){

            platforms.value.forEach(platform => {
              
                if(platform.attributes.platform==platformtxt.value)
                {
                    platformexist.value=true


                }
                
            });           
            if(!platformexist.value){
                const {error,runaddplatform}=addnewplatform()
                 runaddplatform(platformtxt.value,token)
                loadplatforms(token)
            }
            else{
                Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: `${platformtxt.value} Platform ist bereit im Datenbank`,
                           
                            })

                platformexist.value=false
            }
        }
        return{platformtxt,platformserrors,platforms,deleteoneplatform,addoneplatform}
    }
    
}
</script>
<style lang="">
    
</style>