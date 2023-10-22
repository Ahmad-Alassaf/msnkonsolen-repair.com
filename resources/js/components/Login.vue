<template>
    <navbar />
    <jambotron />
    <div class="container h-100 pt-5">
        <div class="row h-100 align-items-center">
            <div class="col-12 col-md-6 offset-md-3">
                <div class="card shadow sm">
                    <div class="card-body">
                        <h1 class="text-center">Login</h1>
                        <p v-if="credintioalError!=''" class="text-danger ">{{credintioalError}}</p>
                        <hr/>
                        <form action="javascript:void(0)" class="row" method="post">
                            <div class="col-12" v-if="Object.keys(validationErrors).length > 0">
                                <div class="alert alert-danger">
                                    <ul class="mb-0">
                                        <li v-for="(value, key) in validationErrors" :key="key">{{ value[0] }}</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="form-group col-12">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="text" v-model="auth.email" name="email" id="email" class="form-control">
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" v-model="auth.password" name="password" id="password" class="form-control">
                            </div>
                            <div class="col-12 mb-2">
                                <button type="submit" :disabled="processing" @click="loginn" class="btn btn-primary btn-block">
                                    {{ processing ? "Please wait" : "Login" }}
                                </button>
                            </div>
                            <div class="col-12 text-center">
                                <label>Don't have an account? <router-link :to="{name:'register'}">Register Now!</router-link></label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
   
</template>

<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';

import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import {ref,computed} from 'vue'
export default {
    name:"login",
    components:{
      
      navbar,      
      jambotron, 
  },
  setup(){
   
    const store=useStore()
    const router=useRouter()
    const auth=ref({
                 email:"",
                password:""
    })
   
   
    const processing=ref(false)
    const validationErrors=ref({})
    const credintioalError=ref("")
    const loginn=async ()=>{
        
        processing.value = true
         await   store.dispatch('auth/login',auth.value).then(result=>{
              
               if(result.data=="")
               {
                credintioalError.value=result.message
                processing.value = false
               }
               else if(result.message=='The password field is required.'){
                credintioalError.value=result.message
                processing.value = false

               }
               else if(result.message=='The email field is required.'){
                credintioalError.value=result.message
                processing.value= false

               }
               else if(result.message=='The password must be at least 6 characters.'){
                credintioalError.value=result.message
                processing.value = false

               }
               else if(result.message=='The email must be a valid email address.'){
                credintioalError=result.message
                processing = false

               }
               else if(result.message=='The email must be a valid email address. (and 1 more error)'){
                credintioalError.value=result.message
                processing.value = false

               }
               else{
                router.push("/")
               }
            })

    }
    return {loginn,auth,processing,validationErrors,credintioalError}

  
}// end Setup()
}
</script>