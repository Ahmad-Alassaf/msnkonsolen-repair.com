<template >
    <div>
        <navbar />
        <div class="container p-5 bg-white">
            <div class="">
                <button class="btn btn-primary mb-2" @click="this.$router.back()">Back</button>
                <h1 class="bg-dark text-white rounded ">
                   {{ this.user.attributes.name}}
                  
                </h1>
            </div>
           
            <div class="card ">
                <div class="card-header">
                    {{  this.user.attributes.name }}
                    {{  this.user.attributes.email }}
                    
                </div>
                <div class="card-body w-50 m-auto">
                    <h3 class="text-center">Roles</h3>
                        <ul class="list-group ">
                            <li v-for="role in this.user.roles" class="list-group-item mb-2 border shadow">
                                <div class="d-flex justify-content-between ">
                                <span>  {{role.attributes.name}}</span>
                                <button class="btn btn-danger" @click="deleterolefromnewrolelist(role.attributes.name)">Delete</button>
                                </div>
                            </li>
                        </ul>
                        <div class=" ">
                            <label for="">To Add Role Select item:</label>                 
                            <select  class="form-control w-50 ml-auto" v-model="selected_role" @change="addroles()">
                                <option v-for="role in roleslist" :value="role" class="text-center"> {{role.attributes.name}}</option>                        
                            </select>
                        </div>  
                
                
                    <h3 class="text-center">Permissions</h3>
                        <ul class="list-group">
                            <li v-for="permission in this.user.permissions" class="list-group-item  mb-2 border shadow">
                                <div class="d-flex justify-content-between">
                                    <span>  {{permission.attributes.name}}</span>
                                    <button class="btn btn-danger" @click="deletepermission(permission.attributes.name)">Delete</button>
                                </div>
                            
                            </li>
                        </ul>
                        <div class=" ">
                            <label for="">To Add Permission Select item:</label>                 
                            <select  class="form-control w-50 ml-auto" v-model="selected_permission" @change="addpermission()">
                                <option v-for="permission in permissionsList" :value="permission" class="text-center"> {{permission.attributes.name}}</option>                        
                            </select>
                        </div>  
                </div>
                
                </div>
            

        </div>
    
       
        
    </div>
</template>
<script>
import navbar from '../layouts/navbar.vue'

import { mapGetters,mapActions } from 'vuex';
export default {
    name:"edituser",
    components:{navbar},
   
    data(){
        return{
            user:{
               
            },
            grant:false,
            newRolesList:[],
            newPermissionList:[],
            selected_role:'',
            selected_permission:'',
            input:{
                        'name':'',
                        'guard_name':'web',
                        'type':''
                    }
          
        }
    },
    created()
    {
        this.getuser(); 
    },
    computed:{
                    ...mapGetters({
                    roleslist:"auth/get_roles_list",        
                    permissionsList:"auth/get_permissions_list",
                        
                }),
                
   
  },
    methods:{
        ...mapGetters({
           
            authenticated:"auth/getauthenticated",
            token:"auth/gettoken"
        }),
        async getuser(){
            try{
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${this.token()}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                    await axios.get(`/api/users/${this.$route.params.id}`,config)
                               .then(response=>{
                                 
                                  this.user=response.data.data
                                  
                               })
                
            }
            catch(error){
                console.log(error)
            }
           
        },
        addnewrole()
        {
            if(!this.newRolesList.includes(this.selected_role))
            this.newRolesList.push(this.selected_role)
        },
     async   deleterolefromnewrolelist(rolename)
        {
            
         
                try{
                
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${this.token()}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                   this.newRolesList.forEach(e=>{
                    this.user.roles.push(e)
                   })
                    this.input.name=rolename;
                    await axios.put(`/api/removerole/${this.$route.params.id}`,this.input,config)
                               .then(response=>{
                                  this.user=response.data.data
                                  
                               })
                
            }
            catch(error){
                console.log(error)
            }

           

        },
        async deletepermission(name){
            
            try{
                
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${this.token()}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                   this.newRolesList.forEach(e=>{
                    this.user.roles.push(e)
                   })
                    this.input.name=name;
                    await axios.put(`/api/removepermission/${this.$route.params.id}`,this.input,config)
                               .then(response=>{
                                  this.user=response.data.data
                                  
                               })
                
            }
            catch(error){
                console.log(error)
            }


        },
       async addroles(){
            if(!this.grant)
            {
                this.grant=!this.grant
            }
            else{
                try{
                
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${this.token()}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                   this.newRolesList.forEach(e=>{
                    this.user.roles.push(e)
                   })
                    this.input.name=this.selected_role.attributes.name;
                    this.input.type='role'
                    await axios.put(`/api/users/${this.$route.params.id}`,this.input,config)
                               .then(response=>{
                                  this.user=response.data.data
                               })
            }
            catch(error){
                console.log(error)
            }
            }
        },
        async addpermission(){
            try{
                 
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${this.token()}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                   
                    this.input.name=this.selected_permission.attributes.name;
                    this.input.type='permission'
                    await axios.put(`/api/users/${this.$route.params.id}`,this.input,config)
                               .then(response=>{
                                  this.user=response.data.data
                                  
                               })

            }
            catch(error){ console.log(error)

            }
        }
      
    }
    
}
</script>
<style lang="">
    
</style>