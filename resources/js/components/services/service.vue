<template >
    <div class="py-5 pointer" @click="Showservice(service.id)">        
        <div class="card mb-2 shadow-sm cursor-pointer"  >          
            <div class="card-header">
                <h3>{{service.attributes.title}}</h3>
                <span v-for="device in devices" >
                    <span v-if="device.relationships.services.find(e=>e.attributes.title===service.attributes.title)" class="p bg-dark rounded text-white px-2 m-1">                       
                           {{ device.attributes.title }}
                    </span>                     
                </span>
            </div>
            <div class="card-body p-0">
                    <div class="row">
                        <img :src="`public/storage/images/${service.attributes.foto}`" alt="" class=" ">
                        <p class=" col-10 mb-0 py-3 px-4">{{service.attributes.description}} <b></b></p>

                    </div>
                    
                    <div class="d-flex justify-content-between mb-1">
                        <span class="border bg-primary  text-white py-1 px-2">Prise:{{service.attributes.prise}}€.</span>
                        <span class="border bg-primary text-white  py-1 px-2">Waranty: {{service.attributes.waranty}} Month</span>
                    </div>
                    <router-link :to="{}" class="btn btn-success col-12 rounded-0">Auftrag Erstellen</router-link>
            </div>
           
            
        </div>
       
        
        
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name:"service",
    props:['newservice'],
    data(){
        return {
            devices:[],
            service:null,
            service:this.newservice
        }
    }, 
    created(){
        this.getalldevices();
       

    },
    computed:{
        ...mapGetters({
            user:"auth/getuser",
            authenticated:"auth/getauthenticated",
            token:"auth/gettoken",
         
        }),
    },
    methods:{
        Showservice(id){
            
            this.$router.push({name:"showservice",params:{id:id}})
        },
        async getalldevices()
        {
            await axios.get('/sanctum/csrf-cookie');
                        let config={
                                        headers:{
                                            Accept: 'application/vnd.api+json',                                
                                          
                                        }
                                    }
            await axios.get(`/api/devices`,config)
                        .then(response=>{
                                    this.devices=response.data.data
                                })
                        .catch(error=>{console.log(error)})  
                                  

        },
    }
    
        
    
    
}
</script>
<style scoped>
.pointer:hover{
    cursor: pointer;
}
    
</style>