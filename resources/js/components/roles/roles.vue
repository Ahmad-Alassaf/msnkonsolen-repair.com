<template >
  <jambotron />
  <navbar />
      
    <div class="container py-5">
      <h1 class="bg-dark text-white text-center ">
        Roles Management
    </h1>
        <div class="text-end p-1">
          <button class="btn btn-success " @click="add=!add">{{ add?'Close':'New' }} </button><br>
        </div> 
        <form class="d-flex" v-if="add" @submit.prevent="addrole()">
          <input type="text" placeholder="Role Name..." v-model="name"  class="form-control mx-1">
          <input type="submit" class="btn btn-primary"  value="Create" >
        </form>
      

        <table class="table table-hover">
            <thead>
              <tr >
               
                <th scope="1" >ID</th>
                <th >Name</th>
                <th >guard Name</th>
                <th >Permissions</th>
                <th >Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roles">
                <td>{{role.id}}</td>
                <td>{{role.attributes.name}}</td>
                <td>{{role.attributes.guard_name}}</td>
                <td  class="">
                        <ul class="list-group" style="list-style-type:none">
                          <li v-for="permission in role.permissions" class="list-group-item">
                           {{permission.attributes.name}}

                          </li>
                        </ul>
                            
                </td>
                <td colspan="1" class=" ">
                    <router-link :to="{name:'editrole',params:{id:role.id}}" class="btn btn-primary mx-1" >{{edit?'Save':'Edit'}}</router-link>
                    <button class="btn btn-danger" @click="deleteROLE(role.id,role.attributes.name)">delete</button>

                </td>
                

              </tr>
            </tbody>
            </table>
               
    </div>
    <foot />  
</template>
<script>
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import foot from '../layouts/foot.vue';
import { useStore } from 'vuex'
import { computed,ref } from 'vue';
import getroles from '../../compasable/roles/getroles.js'
import newrole from '../../compasable/roles/newrole'
import deleterole from '../../compasable/roles/deleterole'
import Swal from 'sweetalert2'
export default {
    name:"roles",
    components:{ navbar, jambotron,foot },
 
    setup(){
      const add=ref(false)
      const edit=ref(false)
      const name=ref('')
      const store = useStore()
      const swalWithBootstrapButtons = Swal.mixin()
      const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
      const {rolesError,roles,loadroles}=getroles()
      const {addnewroleError,addnewrole}=newrole()

      
      loadroles(token)
      const addrole=()=>{
       
        addnewrole(name.value,token.value).then(()=>{
          Swal.fire(
                                                                   
                                                                      'Saved',
                                                                       'Role: '+name.value+' erfolgreich hingefügt.',
                                                                       'success',
                                                                    
                                                                     
                                       ).then(()=>{
                                          loadroles(token)
                                          add.value=false

                                        })    
         
        }).catch(error=>{
                        Swal.fire({
                                 icon: 'error',
                                title: 'Oops...',
                                text: error,
                                
                               
                              })
                      })
       
      }
      const {deleteroleError,rundeleterole}=deleterole()
      const deleteROLE=(id,role)=>{     
                  swalWithBootstrapButtons.fire({
                          title: 'Sind Sie sicher?',
                          text: "Sie können nicht nachher Role anzeigen!",
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Ja ',
                          cancelButtonText: 'Nein',                        
                        }).then((result) => { 
                                                            
                          if (result.value) {
                            rundeleterole(id,token).then(()=>{
                              swalWithBootstrapButtons.fire({
                                                                    position: 'top',
                                                                      icon: 'success',
                                                                      title: 'Role: '+role+' erfolgreich gelöcht.',
                                                                      showConfirmButton: false,
                                                                      timer: 1500
                                        }).then(()=>{
                                          loadroles(token)           
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
      return{add,edit,name,rolesError,roles,addrole,deleteroleError,deleteROLE}

    },
    
}
</script>
<style lang="">
    
</style>