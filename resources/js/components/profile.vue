<template >
   
            
                <useraddress :user="user" />

            
           
       
   
</template>
<script>

import useraddress from "./Addresses/useraddress.vue"
import {mapGetters} from 'vuex';
export default {
    name:"profile",
    props:['user'],
    components:{useraddress},
    data(){
        return{
            formdata:{
                      street:'',
                      hausnumber:'',
                      postal:'',
                      city:'',
            },
           
            config:{}
        }
    },
    computed:{
    },
    created(){
      this.config={
                headers:{
                    Accept: 'application/vnd.api+json',
                    
                    Authorization: `Bearer ${this.token()}`
                }
            },
      
       this.getaddresses();
           
    },
   
    methods:{
        ...mapGetters({
            USER:"auth/getuser",
            authenticated:"auth/getauthenticated",
            token:"auth/gettoken"
        }),
        
        async getaddresses()
        {
            await axios.get('/sanctum/csrf-cookie');
            await axios.get(`/api/address`,this.config).then(response=>{
             
                this.addresses=response.data;

            }).catch(erorr=>{console.log(erorr)})


        },
        async getuser()
        {
            await axios.get('/sanctum/csrf-cookie');
            await axios.get(`/api/user`,this.$route.params.id).then(response=>{
               
                this.user=response.data;

            }).catch(erorr=>{console.log(erorr)})


        },

    },
   
   /*  computed:{
        ...mapGetters({
            user:"auth/getuser",
            authenticated:"auth/getauthenticated"
        })
    } */
    
}
</script>
<style >
    
</style>