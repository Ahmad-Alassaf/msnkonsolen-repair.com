<template >
    <div>
        <navbar />
        <div class="container p-5 bg-white">
            <div class="">
                <button class="btn btn-primary mb-2" @click="this.$router.back()">Back</button>
                <h1 class="bg-dark text-white rounded ">
                   {{ user.attributes.name}}
                  
                </h1>
            </div>
           
            <div class="card ">
                <div class="card-header">
                    {{  user.attributes.name }}
                    {{ user.attributes.email }}
                    
                </div>
                <div class="card-body w-50 m-auto">
                    <h3 class="text-center">Roles</h3>
                        <ul class="list-group ">
                            <li v-for="role in user.roles" class="list-group-item mb-2 border shadow">
                                <div class="d-flex justify-content-between ">
                                <span>  {{role.attributes.name}}</span>
                                <button class="btn btn-danger" @click="deleterolefromnewrolelist(role.attributes.name)">Delete</button>
                                </div>
                            </li>
                        </ul>
                        <div class=" ">
                            <label for="">To Add Role Select item:</label>                 
                            <select  class="form-control w-50 ml-auto" v-model="selected_role" @change="addonerole()">
                                <option v-for="role in roles" :value="role" class="text-center"> {{role.attributes.name}}</option>                        
                            </select>
                        </div>  
                
                
                    <h3 class="text-center">Permissions</h3>
                        <ul class="list-group">
                            <li v-for="permission in user.permissions" class="list-group-item  mb-2 border shadow">
                                <div class="d-flex justify-content-between">
                                    <span>  {{permission.attributes.name}}</span>
                                    <button class="btn btn-danger" @click="deletepermission(permission.attributes.name)">Delete</button>
                                </div>
                            
                            </li>
                        </ul>
                        <div class=" ">
                            <label for="">To Add Permission Select item:</label>                 
                            <select  class="form-control w-50 ml-auto" v-model="selected_permission" @change="addpermission()">
                                <option v-for="permission in permissions" :value="permission" class="text-center"> {{permission.attributes.name}}</option>                        
                            </select>
                        </div>  
                </div>
                
                </div>
            

        </div>
    
       
        
    </div>
</template>
<script>
import navbar from '../layouts/navbar.vue'
import{ref,computed} from 'vue'
import {useStore} from 'vuex'
import { useRoute } from 'vue-router'
import getuser from '../../compasable/users/getuser'
import getroles from '../../compasable/roles/getroles'
import addrole from '../../compasable/users/addrole'
import removerole from '../../compasable/users/removerole'
import getpermissions from '../../compasable/permissions/getpermissions'

import { mapGetters,mapActions } from 'vuex';
export default {
    name:"edituser",
    components:{navbar},
    setup(){
        const selected_role=ref(null)
        const grant=ref(false)
        const newRolesList=ref([])
        const newPermissionList=ref([null])
        const input=ref(null)
        const store = useStore()
        const route = useRoute()
        const userID=computed(()=>{
            return route.params.id
        })
        const token=computed(()=>{
            return store.getters["auth/gettoken"]

        })
       
        const {roles,loadroles}=getroles()
        loadroles(token)
        const {permissions,loadpermissions}=getpermissions()
        loadpermissions(token)
        const {getuserErrors,user,loaduser}=getuser()
        loaduser(userID.value,token)

        
        const addonerole=()=>{
            const {addroleEror,runnaddrole}=addrole()
          
           
            runnaddrole(userID.value,selected_role.value.attributes.name,token.value).then(()=>{ loaduser(userID.value,token)})
           

        }
        const deleterolefromnewrolelist=(roleName)=>{
          
            const {removeroleerror,runremoving}=removerole()
            console.log('role Name')
            console.log(roleName)
            runremoving(userID.value,roleName,token.value).then(()=>{loaduser(userID.value,token.value)})
        }
        return {user,roles,permissions,newRolesList,newPermissionList,input,grant,deleterolefromnewrolelist,selected_role,addonerole}
    },
    methods:{
        addnewrole()
        {
            if(!this.newRolesList.includes(this.selected_role))
            this.newRolesList.push(this.selected_role)
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