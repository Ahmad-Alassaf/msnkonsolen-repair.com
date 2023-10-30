<template lang="">
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-0 p-0  "  id="navbar">
            <div class="container-fluid">
                <div class="row">
                    <router-link class="navbar-brand py-0" :to="{name:'home'}">MSN-Reparatur</router-link>
               
                </div>
                
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="container px-0">
                    <div class=" collapse navbar-collapse " id="navbarNavDropdown">
                        <ul class="navbar-nav    me-auto text-white" style="">
                            <li class="nav-item p-0 ">
                                <router-link :to="{name:'home'}" class="text-white nav-link navlink-hover  text-center active">Home </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name:'services'}" class="nav-link navlink-hover text-white text-center">services </router-link>
                            </li>
                            <li class="nav-item ">
                                <router-link :to="{name:'contact'}" class="nav-link navlink-hover text-white text-center">Kontakt </router-link>
                            </li>
                            
                            <li class="nav-item"  >
                                <router-link :to="{name:'createcontract'}" class="nav-link navlink-hover text-white text-center">Auftrag Erstellen </router-link>
                            </li>
                            <li class="nav-item text-center" v-if="authenticated">
                                <!-- <router-link :to="{name:'adminpage'}" class="nav-link">Admin </router-link> -->
                                <div class="dropdown "  v-for="role in user.roles">
                                    <a class="nav-link dropdown-toggle text-white" v-if="role.attributes.name=='Admin'" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                      Admin
                                    </a>
                                  
                                    <ul class="dropdown-menu rounded-0 border-0  bg-dark mt-0 text-white text-center" aria-labelledby="dropdownMenuLink">
                                        <li class=" ">
                                            <router-link class="nav-link bg-dark router-hover text-white" :to="{name:'contracts'}">Contracts</router-link>
    
                                        </li>
                                        <li class=" ">
                                            <router-link class="nav-link bg-dark router-hover text-white" :to="{name:'adminservices'}">services</router-link>
    
                                        </li>
                                        <li class=" ">
                                            <router-link class="nav-link bg-dark router-hover text-white" :to="{name:'devices'}">devices</router-link>
    
                                        </li>
                                        <li class=" ">
                                            <router-link class="nav-link bg-dark router-hover text-white" :to="{name:'platforms'}">platforms</router-link>
    
                                        </li>
                                        <li class=" ">
                                            <router-link class="nav-link bg-dark router-hover text-white" :to="{name:'users'}">users</router-link>    
                                        </li>
                                        <li class=" ">
                                            <router-link class="nav-link bg-dark router-hover text-white" :to="{name:'roles'}">roles</router-link>    
                                        </li>
                                        <li class=" ">
                                            <router-link class="nav-link bg-dark router-hover text-white" :to="{name:'permissions'}">permissions</router-link>    
                                        </li>
                                       
                                    </ul>
                                  </div>
                            </li>
                        </ul>
                        <div class="d-flex ">
                            <ul class="navbar-nav  d-flex w-100">
                                <li class="nav-item " v-if="authenticated">
                                    <router-link :to="{name:'products'}" class="nav-link">
                                        <i class="fa-solid fa-cart-shopping text-white"></i>
                                        <span class="bg-danger text-whit rounded px-1" v-if="unpaidcontracts.length>0">
                                          {{unpaidcontracts.length}} 
                                        </span>
                                    </router-link>
                                   
                                </li>
                                <li class="nav-item dropdown" v-if="authenticated">
                                    <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                     {{user.attributes.name}} 
                                    </a>
                                   
                                    <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                        <router-link class="dropdown-item"  :to="{name:'profile'}">{{user.attributes.name}} </router-link>
                                        <router-link class="dropdown-item"  :to="{name:'mycontracts'}"> My Contracts</router-link>
                                        <a class="dropdown-item"  @click="signOut">Logout</a>
                                    </div>
                                   
                                </li>
                                <li class="nav-item " v-else>
                                    <router-link :to="{name:'login'}" class="nav-link">Login </router-link>
                                   
                                </li>
                               
                               
    
                            </ul>
                        </div>
                    </div>

                </div>

                
            </div>
        </nav>
        
    </div>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
import {ref,computed,onMounted} from 'vue'
import getcontracts from '../../compasable/contracts/getcontracts'

import Logout from "../../compasable/logout"
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
export default {
    setup(){
        const sticky=ref(15)
        const permissions=ref([])
        const contractslist=ref([])
        const store=useStore()
        const router=useRouter()
        const token =computed(()=>{
             return store.getters["aut/gettoken"]

        })
        const authenticated=computed(()=>{
            return store.getters["auth/getauthenticated"]
        })
      
            const {contracts,unpaidcontracts,contractserror,loadcontracts,contractsprise}=getcontracts()           
      loadcontracts(token)     
        const signOut=()=>{
            const {runlogout}=Logout()
            runlogout(token).then(()=>{
                store.dispatch("auth/logout")
               
            }).then(()=>{ router.push("/")})
            .catch(err=>{console.log(err)})
           
        }
       
       
        const user=computed(()=>{
            return store.getters["auth/getuser"]
        })
        onMounted(()=>{
            document.addEventListener('scroll',()=>{
                let navbar=window.document.getElementById("navbar");
                        if (window.pageYOffset >= sticky) {navbar.classList.add("sticky")} 
                        else {navbar.classList.remove("sticky");}

            })
        })
       
      
        return{contracts,unpaidcontracts,signOut,authenticated,user}


    },
   

    

}
</script>
<style >
.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgb(136, 133, 133) !important;
    z-index:10;
  }
.router-hover:hover{
    display: block;
    position: relative !important;
    font-weight: bold;
    padding-left: 20px !important;
    background-color: whitesmoke !important ;
    color: rgb(182, 73, 0)!important ;
    transition: all 500ms;
    
}
.router-hover:hover::before{
    content: "";
    position: absolute;
    top: 0px;
    left: 0px;
    width: 5px;
    height: 100%;
    background-color:rgb(182, 73, 0)!important ;

}
.navlink-hover{
    position: relative;
}
.navlink-hover:hover{
    height: 100% !important;
    display: block;
    
    font-weight: bold;
   
    background-color: whitesmoke !important ;
    color: rgb(182, 73, 0)!important ;
    transition: all 250ms ease-in-out; 
}
.navlink-hover::before{
    content: "";
    position: absolute;
    width: 0px;
    bottom: 0px;
    left: 0%;
    height: 0px;
    background-color:rgb(182, 73, 0)!important ;
    transition: all 250ms ease-in-out; 
    

}
.navlink-hover:hover::before{
   
    width: 100%;
    bottom: 0px;
    left: 0%;
    height: 3px;
   
   
   
}
</style>