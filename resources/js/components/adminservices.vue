<template >
    <navbar />
    <jambotron />
    <div class="container pt-5 shadow">
        <div>
            <router-link :to="{name:'addnewservice'}" class="btn btn-primary float-end">New</router-link>
           
        </div>
        <table class="table">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Waranty</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="servic in services ">
               <td>
                <img :src="`storage/images/${servic.attributes.foto}`" alt="" style="max-width: 100px; height: auto;" class="img-fluid border-0">
               </td>
                <td>{{servic.attributes.title}}</td>
                <td>{{servic.attributes.description}}</td>
                <td>{{servic.attributes.waranty}}</td>
                <td>{{servic.attributes.prise}}€</td>
                <td>
                    <router-link :to="{name:'showservice',params:{id:servic.id}}" class="btn btn-primary m-1">Show</router-link>
                    <button class="btn btn-success m-1">Edit</button>
                    <button class="btn btn-danger m-1">delete</button>
                </td>
              </tr>
             
            </tbody>
          </table>

    </div>
    <foot />
   
        
    
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import getservices from "../compasable/getservices";
import foot from './layouts/foot.vue';

export default {
    name:"adminservices",
    components:{navbar,jambotron,foot},
    setup(){
        const {services,error,load}=getservices()
        load()
        
        return{services,error,load}
    }
    
}
</script>
<style lang="">
    
</style>