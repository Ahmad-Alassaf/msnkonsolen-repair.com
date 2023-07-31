<template >
    <navbar />
    <jambotron />
    <div class="container bg-white border p-0 ">
        <h1 class="bg-dark text-white text-center m-0">Platforms</h1>
        <form class="form pt-5" @submit.prevent="addoneplatform()">
            <div class="d-flex">
                <input type="text" v-model="platformtxt" class="form-control rounded-0" name="" id="">
                <input type="submit" value="add" class="btn btn-primary rounded-0">

            </div>
           
        </form>
        <div class="pt-5">
            <div class="row  m-auto mb-1 border" v-for="platform in platforms">
               
                <div  class="col-6  ">
                   <span class="py-1 px-2 ">{{ platform.attributes.platform }}</span> 
     
                 </div>
                 <div class="col-6  d-flex justify-content-end">
                     <button class="btn btn-primary border-0 rounded-0 mx-1">Bearbeiten</button>
                     <button class="btn btn-danger border-0 rounded-0 mx-1" @click="deleteoneplatform(platform.id)">Löchen</button>
     
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
import getplatforms from '../../compasable/platforms/getplatforms'
import deleteplatform  from '../../compasable/platforms/deleteplatform'
import addnewplatform from '../../compasable/platforms/addplatform'
import { computed,ref,reactive } from "vue";
import { useStore } from 'vuex'
export default {
    components:{navbar,jambotron,foot},
    setup(){
        const platformtxt= ref(null)
        const {platformserrors,loadplatforms,platforms}=getplatforms()
        const store = useStore()
        const token=computed(()=>{
            return store.getters["auth/gettoken"]

        })
        loadplatforms(token)
        function deleteoneplatform(id){
            const {rundeleteplatform,deleteplatformerrors}=deleteplatform()
            rundeleteplatform(id,token);
            loadplatforms(token)


        }
        function addoneplatform(){
            const {error,runaddplatform}=addnewplatform()
            runaddplatform(platformtxt.value,token)
            loadplatforms(token)

        }

        return{platformtxt,platformserrors,platforms,deleteoneplatform,addoneplatform}
    }
    
}
</script>
<style lang="">
    
</style>