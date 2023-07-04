<template >
    <div>
        <h1 class="bg-dark text-white text-center rounded">
             Rolles Management
        </h1>
        <div class="text-end p-1">
          <button class="btn btn-success " @click="add=!add">{{ add?'Close':'New' }} </button><br>
        </div> 
        <form class="d-flex" v-if="add" @submit="addrole($event)">
          <input type="text" placeholder="Role Name..." v-model="role.name"  class="form-control mx-1">
          <input type="submit" class="btn btn-primary" :disabled="!role.name.trim()" value="Create" >
        </form>
        <table class="table">
            <thead>
              <tr>
               
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">guard Name</th>
                <th scope="col">Permissions</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in roleslist">
                <td>{{role.id}}</td>
                <td>{{role.attributes.name}}</td>
                <td>{{role.attributes.guard_name}}</td>
                <td class="  ">
                        <ul class="" style="list-style-type:none">
                          <li v-for="permission in role.permissions">
                            <span  class="bg-secondary  text-white px-1 rounded-5 ">{{permission.attributes.name}}</span> 

                          </li>
                        </ul>
                            
                </td>
                <td>
                    <router-link :to="{name:'editrole',params:{id:role.id}}" class="btn btn-primary mx-1" >{{edit?'Save':'Edit'}}</router-link>
                    <button class="btn btn-danger" @click="deleterole(role.id)">delete</button>

                </td>
                

              </tr>
            </tbody>
            </table>
        
    </div>
</template>
<script>
import{mapGetters,mapActions} from 'vuex'
export default {
    name:"roles",
    data(){return{
      role:{
        name:''
      },
      add:false, 
      edit:false,
      newpermissionslist:[],
      selected_permission:{}
    }},
    created(){
       this.roles();
       this.permissions();


    },
   
    computed:{...mapGetters({
        roleslist:"auth/get_roles_list",        
          permissionsList:"auth/get_permissions_list",
          token:"auth/gettoken"       
    })
  },
    methods:{
        ...mapActions({
           roles: "auth/getroles",
           permissions:"auth/getpermissions"
          
        }),
        addpermissiontolist(permession){
          this.newpermissionslist.push(permession)
        },
      
   async  addrole(e){        
          e.preventDefault();          
          await axios.get('/sanctum/csrf-cookie');
          let config={
                          headers:{
                              Accept: 'application/vnd.api+json',
                              Authorization: `Bearer ${this.token}`                               
                            
                          }
                      }
            await axios.post(`/api/roles`,this.role,config)
                        .then(()=>{
                          this.roles()
                          this.role.name=''
                          this.add=false
                        }
                          )
                        .catch(error=>{console.log(error)})  

        },
      async  deleterole(id){
       
          await axios.get('/sanctum/csrf-cookie');
                        let config={
                                        headers:{
                                            Accept: 'application/vnd.api+json',
                                            Authorization: `Bearer ${this.token}`                                
                                          
                                        }
                                    }
            await axios.delete(`/api/roles/${id}`,config)
                        .then(()=>{this.roles()})
                        .catch(error=>{console.log(error)})  

        },
        removePermission(id)
        {
          this.newpermissionslist= this.newpermissionslist.filter(permisson=>permisson.id !=id)
        }
      
    },
    
}
</script>
<style lang="">
    
</style>