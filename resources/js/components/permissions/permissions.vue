<template >
  <jambotron />
  <navbar />
    <div class=" container  py-5 ">
        <h1 class="bg-dark text-white text-center ">
             Permissions Management
        </h1>
       
        <div class="text-end p-1">
          <button class="btn btn-success " @click="add=!add">{{ add?'Close':'New' }} </button><br>
        </div>     
        <form @submit.prevent="addpermission" class="d-flex p-1" v-if="add">
            <input type="text" placeholder="Permission..." v-model="permissionname" class="form-control mx-1">
            <input type="submit" class="btn btn-primary" :disabled="!permissionname.trim()" value="Create">
        </form>
        <div class=" ">
          <div class="row px-1 bg-secondary text-white">
           
            <div class="col-5 ">Name</div>
            <div class="col-4 ">guard Name</div>
            <div class="col-2 text-center">Actions</div>
          </div>
          <div class="row py-1 mb-1 border shadow" v-for="permission in permissions">
          
            <div class="col-5 "  >{{permission.attributes.name}}</div>
            <div class="col-3 "  >{{permission.attributes.guard_name}}</div>
            <div class="col-2 d-flex justify-content-center"  > <button class="btn btn-danger" @click="deleteonepermission(permission)">delete</button></div>
          </div>

        </div>
    
          
         
          
    </div>
    <foot />     
</template>
<script>
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import foot from '../layouts/foot.vue';
import { useStore } from 'vuex'
import {ref,computed} from 'vue'
import getpermissions from '../../compasable/permissions/getpermissions'
import addnewpermission from '../../compasable/permissions/addnewpermission'
import deletepermission from '../../compasable/permissions/deletepermission'
import Swal from 'sweetalert2'
export default {
    name:"permissions",
    components:{ navbar, jambotron,foot },
 
    setup(){
      const swalWithBootstrapButtons = Swal.mixin()
      const add=ref(false)
      const permissionname=ref('')
      const store = useStore()
      const token=computed(()=>{
        return store.getters["auth/gettoken"]

      })
      const {permissionsError,permissions,loadpermissions}=getpermissions()
      loadpermissions(token)
      const addpermission=()=>{
        const {runaddnewpermission}=addnewpermission()
        runaddnewpermission(permissionname.value,token.value).then(()=>{
          Swal.fire(
                                                                   
                                                                   'Saved',
                                                                    'Permission : '+permissionname.value+' erfolgreich hingefügt.',
                                                                    'success',
                                                                 
                                                                  
                                    ).then(()=>{
                                      loadpermissions(token)
                                       add.value=false
                                       permissionname.value=''

                                     })  
         
        })
          .catch(error=>{
            Swal.fire({
                                 icon: 'error',
                                title: 'Oops...',
                                text: error,
                                
                               
                              })

        })
      }
      const {deletepermissionError,rundeletepermission}=deletepermission()
      const deleteonepermission=(permission)=>{
        swalWithBootstrapButtons.fire({
                          title: 'Sind Sie sicher?',
                          text: "Sie können nicht nachher Role anzeigen!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Ja ',
                          cancelButtonText: 'Nein',                        
                        }).then((result) => { 
                                                            
                          if (result.value) {
                       
                            rundeletepermission(permission.id,token).then(()=>{
                              swalWithBootstrapButtons.fire({
                                                                    position: 'top',
                                                                      icon: 'success',
                                                                      title: 'Permission: '+permission.attributes.name+' erfolgreich gelöcht.',
                                                                      showConfirmButton: false,
                                                                      timer: 1500
                                        }).then(()=>{
                                          loadpermissions(token)       
                                        }) 
                            }).catch(error=>{
                              Swal.fire({
                                 icon: 'error',
                                title: 'Oops...',
                                text: error,
                                
                               
                              })
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

      return {permissions,add,permissionname,addpermission,deleteonepermission}
    }
   ,
    created(){
      

    },
   
methods:{
       
        addpermissiontolist(permession){
          this.newpermissionslist.push(permession)
        },
   async  addnewpermission(e){
        

        },
      async  deletepermission(id){
              await axios.get('/sanctum/csrf-cookie');
                        let config={
                                        headers:{
                                            Accept: 'application/vnd.api+json',
                                            Authorization: `Bearer ${this.token}`  
                                        }
                                    }
            await axios.delete(`/api/permissions/${id}`,config)
                        .then(()=>{
                          this.permissions()
                         
                        })
                        .catch(error=>{console.log(error)})  

        },
      
    },
    
}
</script>
<style lang="">
    
</style>