<template >
    <div>
        <h1 class="bg-dark text-white text-center rounded">Users Management</h1>
        <table class="table">
            <thead>
              <tr>
               
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Roles</th>
                <th scope="col">Inhirited Permissions</th>
                <th scope="col">Direct Permissions</th>
                

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userslist">
                <td>{{user.id}}</td>
                <td>{{user.attributes.name}}</td>
                <td>{{user.attributes.email}}</td>
                <td>
                  <span class="bg-dark text-white rounded-5 px-2 " v-for="role in user.roles">{{role.attributes.name}} </span> 
                </td>
                <td>
                  <span class=" " v-for="role in user.roles">
                      <span class="bg-secondary text-white rounded-5 px-2 " v-for="permission in role.permissions">{{permission.attributes.name}} </span>
                  </span>  
                </td>
                <td>
                  <span class="bg-success text-white rounded-5 px-2 " v-for="permission in user.permissions">{{permission.attributes.name}} </span> 
                </td>
                <td>
                    <router-link :to="{name:'edituser',params:{id:user.id}}" class="btn btn-primary mx-1">Edit</router-link>
                    <button class="btn btn-danger">delete</button>

                </td>
                

              </tr>
            </tbody>
            </table>
        
    </div>
</template>
<script>
import{mapGetters,mapActions} from 'vuex'
export default {
    name:"users",
    data(){return{}},
    created(){
       this.users();

    },
   
    computed:{...mapGetters({ userslist:"auth/get_users_list" })},
    methods:{
        ...mapActions({
           users: "auth/getusers"
        })
      
    },
    
}
</script>
<style lang="">
    
</style>