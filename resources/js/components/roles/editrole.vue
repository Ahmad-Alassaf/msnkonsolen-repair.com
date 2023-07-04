<template  >
    <navbar />
    <div class="bg-gray">
        <div class="container pt-5 bg-white">
            <h1 class="bg-dark text-white text-center rounded py-1">Edit {{role.attributes.name}} Role</h1>
            <button class="btn btn-primary" @click="this.$router.back()">Back</button>

           
               
                    <label for="role">Role:</label>
                <div class="d-flex justify-content-between">
                    <input type="text " name="role" class="form-control m-1"   v-model="role.attributes.name" :disabled="!edit">
                    <button class="btn btn-primary m-1" @click="editsavename()">{{edit?'Save':'Edit'}}</button>

                </div>
               
                <span v-for="role in roleslist">{{}}</span>

                <label for="newPermission" v-if="newpermissionslist.length>0">Grant Permission/Permissions</label>
                <ul class=" p-1 m-2" name="newPermission">
                    <li  v-for="permission  in role.permissions"  class="mb-1 mx-0 border rounded  p-1 d-flex  justify-content-between">
                      <span class="bg-dark text-white px-2 py-1 rounded mx-1">{{permission.attributes.name}}</span>
                       <button class="btn btn-danger text-white rounded px-1 py-1" @click="removePermission(permission.id)">Remove</button>
                    </li>
                  </ul>
                  <label for="">Available Permissions:</label>
                <select   class="form-control"   v-model="selected_permission"  @change="addpermissiontolist()">
                    <option  value=""  selected  >--Select Permission--</option>
                    <option  v-for="permission in permissionsList" :value="permission">{{permission.attributes.name}}</option>
                 </select>
             
            
        </div>

    </div>
   
    
</template>
<script>
import navbar from '../layouts/navbar.vue'
import{mapGetters} from 'vuex'
export default {
    name:"editrole",
    components:{navbar},
    data(){
        return {
            edit:false,
          
            role:{
                id:'',
                attributes:{
                    name:''

                },
                permissions:[]
               
            },
            selected_permission:'',
            newpermissionslist:[],
            inputdata:{
                name:'',
                guard_name:'web'
            }
           
          

        }
    },
    created(){   
        this.role=this.roleslist.find(element=>{return element.id==this.$route.params.id})   
},
    computed:{
                    ...mapGetters({
                    roleslist:"auth/get_roles_list",        
                    permissionsList:"auth/get_permissions_list",
                    token:"auth/gettoken"       
                }),
   
  },
  methods:{
    async editsavename(){
       
        if(this.edit)
        {
                    try
                    {
                    await axios.get('/sanctum/csrf-cookie');
                    let config={
                                    headers:{
                                        Accept: 'application/vnd.api+json',
                                        Authorization: `Bearer ${this.token}`                                
                                        
                                    }
                            }
                                this.inputdata.name=this.role.attributes.name; 
                    await axios.put(`/api/roles/${this.role.id}`,this.inputdata,config)
                                .then((response)=>
                                {
                                    this.role=response.data.data
                                    this.edit=!this.edit
                                }).catch(error=>{console.log(error)}) 
                }
                catch(error){console.log(error) }
        }
        else{ this.edit=!this.edit }
    },
    async save()
    {
        await axios.get('/sanctum/csrf-cookie');
                        let config={
                                        headers:{
                                            Accept: 'application/vnd.api+json',
                                            Authorization: `Bearer ${this.token}`                                
                                          
                                        }
                                    }
           
            await axios.put(`/api/roles`,this.role,config)
                        .then(()=>{this.roles()})
                        .catch(error=>{console.log(error)})  


    },
    
    async addpermissiontolist(){
        await axios.get('/sanctum/csrf-cookie');
                        let config={
                                        headers:{
                                            Accept: 'application/vnd.api+json',
                                            Authorization: `Bearer ${this.token}`                                
                                          
                                        }
                                    }
                                    
                                  this.inputdata.name=this.selected_permission.attributes.name; 
            await axios.put(`/api/roles/assignPermission/${this.$route.params.id}`,this.inputdata,config)
                        .then((response)=>{
                            console.log(response)
                                  this.role=response.data.data
                                 
                        })
                        .catch(error=>{console.log(error)})  

        },
        removePermission(id)
        {
          this.role.permissions= this.role.permissions.filter(permisson=>permisson.id !=id)
        }
  }
   
   
   


    
}
</script>
<style lang="">
    
</style>