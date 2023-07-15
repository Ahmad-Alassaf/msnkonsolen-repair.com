<template >
    <div class="home">
    <navbar />
    <jambotron />
   
        <advantesbar />
        <superangebute />
       
        <foot />   

    </div>
    
  
</template>
<script>

import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import foot from './layouts/foot.vue';
import advantesbar from './advantagesbar.vue';
import superangebute from './Superangebute.vue';
import { mapActions, mapGetters } from 'vuex'
export default {
    name:"home",
    components:{
        navbar,      
        jambotron,
        advantesbar,
        superangebute,
        foot    
    },
    data(){
        return {
            user:this.$store.state.auth.user
        }
    },
    created(){
       
        this.allservices();
        this.alldevices();
      

    },
    computed:{
        ...mapGetters({
            contractslist:"auth/get_contracts_list",
            devices:"auth/GET_DEVICES",
            services:"auth/GET_SERVICES"
        }),
    },
    methods: { 
        ...mapActions({
            alldevices:"auth/getdevices",
            allservices:"auth/getservices"

        }), 
    }
}
</script>
<style >

.home{
    background-color: #d8d8d866;
   
}
  
</style>