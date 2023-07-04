<template >
    <div class=" ">
        <h1 class="bg-dark text-white text-center rounded">
            All Permissions
        </h1>
       
        <div class="text-end p-1">
          <button class="btn btn-success " @click="add=!add">{{ add?'Close':'New' }} </button><br>
        </div>     
        <form @submit="addnewpermission($event)" class="d-flex p-1" v-if="add">
            <input type="text" placeholder="Permission..." v-model="permission.name" class="form-control mx-1">
            <input type="submit" class="btn btn-primary" :disabled="!permission.name.trim()" value="Create">
        </form>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">guard Name</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="permission in permissionslist">
                <td>{{permission.id}}</td>
                <td>{{permission.attributes.name}}</td>
                <td>{{permission.attributes.guard_name}}</td>
                <td>
                    <button class="btn btn-primary mx-1">Edit</button>
                    <button class="btn btn-danger" @click="deletepermission(permission.id)">delete</button>
                </td>
              </tr>
            </tbody>
            </table>
        
    </div>
</template>
<script>
import{mapGetters,mapActions} from 'vuex'
export default {
    name:"permissions",
    data(){
      return{
              permission:{
                          name:''
                        },
              add:false}
    },
    created(){
       this.permissions();

    },
   
    computed:{...mapGetters({
        permissionslist:"auth/get_permissions_list",
        token:"auth/gettoken"    
    })},
methods:{
        ...mapActions({ permissions: "auth/getpermissions" }),
        addpermissiontolist(permession){
          this.newpermissionslist.push(permession)
        },
   async  addnewpermission(e){
          e.preventDefault();
          await axios.get('/sanctum/csrf-cookie');
          let config={
                          headers:{
                              Accept: 'application/vnd.api+json',
                              Authorization: `Bearer ${this.token}` 
                          }
                      }
            await axios.post(`/api/permissions`,this.permission,config)
                        .then(()=>{
                          this.permissions()
                          this.permission.name=''
                          this.add=false
                        }
                          
                          )
                        .catch(error=>{console.log(error)})  

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