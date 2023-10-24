<template >
  <jambotron />
    <navbar />
    <div class="container py-5 shadow">
        <h1 class="text-center bg-secondary text-white">Benutzerverwaltung</h1>
       
          <div v-for="user in users" class="row mb-1 border-bottom py-2">
            
            <div class="col-sm-12 col-md-3  text-center">{{user.attributes.name}}</div>
            <div class="col-sm-12 col-md-4  text-center">{{user.attributes.email}}</div>
            <div class="col-sm-12 col-md-2  text-left">
              <ul class="list-group ">
                <li class="list-group-item text-center active" aria-current="true">Roles</li>
                <li v-for="role in user.roles" class="list-group-item px-0 py-0 border-0 text-center">
                  {{role.attributes.name}} 
                </li>
              </ul>
             
            </div>
            <div class="col-sm-12 col-md-3 ">
              <ul class="list-group">
                <li class="list-group-item text-center active" aria-current="true">Permissions</li>
                <li class="list-group-item text-center border-0 px-0"  v-for="role in user.roles">
                  <span class=""  v-for="permission in role.permissions" >{{permission.attributes.name}} </span>

                </li>
                <li class="list-group-item border-0 px-0"  v-for="permission in user.permissions">
                  <span class=""  >{{permission.attributes.name}} </span>

                </li>
              </ul>
              <span class=" " >
                 
              </span>  
            </div>
           
            <div class="col-12 text-center  d-flex  justify-content-between py-1">
                <router-link :to="{name:'edituser',params:{id:user.id}}" class="btn btn-primary mx-1">Edit</router-link>
                <button class="btn btn-danger" @click="deleteoneuser(user.id)">delete</button>
            </div>
          </div>       
    </div>
    <msnfooter />   
</template>
<script>
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import msnfooter from '../layouts/msnfooter.vue';
import { useStore } from 'vuex'
import {computed} from 'vue'
import getusers from '../../compasable/users/getusers'
import deleteuser from "../../compasable/users/deleteuser";
export default {
  components:{ navbar,jambotron,msnfooter    },
    setup(){
     
      const store = useStore()
        const token=computed(()=>{
            return store.getters["auth/gettoken"]

        })
        const {getusersErrors,users,loadusers}=getusers()
        const  {rundelete,deleteusererror}=deleteuser()
        loadusers(token)
        const deleteoneuser=(id)=>{
          rundelete(id).then(
            loadusers(token)

          )
        }
       
        return{users,deleteoneuser}
    
}
}
</script>
