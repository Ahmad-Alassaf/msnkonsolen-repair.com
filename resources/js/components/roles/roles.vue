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
        <form class="d-flex mb-2" v-if="add" @submit.prevent="addrole()">
          <input type="text" placeholder="Role Name..." v-model="name"  class="form-control mx-1">
          <input type="submit" class="btn btn-primary"  value="Create" >
        </form>
        <div class=" ">
          <div class="row px-1 bg-secondary text-white">           
            <div class="col-2 ">Name</div>
            <div class="col-2 ">guard Name</div>
            <div class="col-6 ">Permissions</div>
            <div class="col-2 text-center">Actions</div>
          </div>
          <div class="row py-1 mb-1 border shadow" v-for="role in roles">          
            <div class="col-2 "  >{{role.attributes.name}}</div>
            <div class="col-2 "  >{{role.attributes.guard_name}}</div>
            <div class="col-6">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between" v-for="permession in role.permissions">
                 <span>
                  {{ permession.attributes.name }}

                 </span>
                 <button class="btn btn-danger" @click="deletepermission(role.id,permession.attributes.name)">X</button>
                </li>
              </ul>
              <div class="form-check">
                <input type="checkbox" class="form-check-input"  name=""  @click="addpermissionchecked(role.id)"  id="">
                <label for="" class="form-check-label">Click To Add Permission to Role</label>
              
              </div>
              <div class="" v-if="addpermission && checkedrole==role.id">
                <label for="" class="">To Add Permission to Role Select item:</label>                 
                <select  class="form-control w-50 ml-auto"  @change="addpermissiontorole(role.id)" v-model="selected_permission">
                    <option v-for="permission in permissions" :value="permission" class="text-center"> {{permission.attributes.name}}</option>                        
                </select>
            </div> 
            </div>
            <div class="col-2 text-center"  >
            
              <button class="btn btn-danger" @click="deleteROLE(role.id,role.attributes.name)">X</button>

            </div>
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
import { computed,ref } from 'vue';
import getroles from '../../compasable/roles/getroles.js'
import getpermissions from '../../compasable/permissions/getpermissions'
import newrole from '../../compasable/roles/newrole'
import assigningpermission from '../../compasable/roles/assignpermission'
import removepermission from '../../compasable/roles/removepermission'
import deleterole from '../../compasable/roles/deleterole'
import Swal from 'sweetalert2'
export default {
    name:"roles",
    components:{ navbar, jambotron,foot },
 
    setup(){
      const add=ref(false)
      const addpermission=ref(false)
      const checkedrole=ref(0)
      const edit=ref(false)
      const name=ref('')
      const selected_permission=ref(null)
      const store = useStore()
      const swalWithBootstrapButtons = Swal.mixin()
      const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
      const {rolesError,roles,loadroles}=getroles()
      const {addnewroleError,addnewrole}=newrole()

      
      loadroles(token)
      const {permissionsError,permissions,loadpermissions}=getpermissions()
      loadpermissions(token)
      const addrole=()=>{
       
        addnewrole(name.value,token.value).then(()=>{
          Swal.fire(
                                                                   
                                                                      'Saved',
                                                                       'Role: '+name.value+' erfolgreich hingefügt.',
                                                                       'success',
                                                                    
                                                                     
                                       ).then(()=>{
                                          loadroles(token)
                                          add.value=false
                                          name.value=''

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
      const addpermissiontorole=(id)=>{
        const {runnassigning}=assigningpermission()
              runnassigning(id,selected_permission.value.attributes.name,token.value)
              loadroles(token)


      }
      const deletepermission=(id,permissionname)=>{
        const  {runremoving}=removepermission()
             runremoving(id,permissionname,token)
             loadroles(token)
      }
      const addpermissionchecked=(roleID)=>{
      
        addpermission.value=!addpermission.value
        checkedrole.value=roleID


      }
      return{add,addpermission,checkedrole,edit,name,rolesError,roles,permissions,selected_permission,addrole,deleteroleError,deleteROLE,addpermissiontorole,deletepermission,addpermissionchecked}

    },
    
}
</script>
