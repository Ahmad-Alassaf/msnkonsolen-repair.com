<template >
    <div >
        <section class="headersection" id="headersection">
            <navbar />
            <jambotron />
        </section>     
         <section class="bodysection" id="bodysection">
            <advantesbar />
            <msnbanner @setupmicrsoft="showmicrosoft" @setupsony="showsony" @setupnintendo="shownintendo" />
            <micrsoft  v-if="micrsoft"/>
            <sony  v-if="sony"/>
            <nintendo  v-if="nintendo"/>
            <superangebute />
            <emailbanner />
            <div class="py-5">
                <location />
            </div>          
            <div class="  py-5">              
                <accordion />               
            </div>           
            <div class=" py-5">               
                <sendemail /> 
            </div>
            <msnfooter  /> 
         </section>
       
    </div>
    
  
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import msnfooter from './layouts/msnfooter.vue';
import advantesbar from './homecomponents/advantagesbar.vue';
import superangebute from './homecomponents/Superangebute.vue';
import msnbanner from './homecomponents/msnbanner.vue'
import micrsoft from './homecomponents/micrsoft.vue'
import sony from './homecomponents/sony.vue'
import nintendo from './homecomponents/nintendo.vue'
import emailbanner from './homecomponents/benachrictenemail.vue'
import location from './location.vue'
import accordion from "./accordion.vue"
import sendemail from './sendemail.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
    name:"home",
   
    components:{
        navbar,      
        jambotron,
        advantesbar,
        superangebute,
        msnbanner,
        micrsoft,
        sony,
        nintendo,
        emailbanner,
        location,
        sendemail,
        msnfooter ,
        accordion   
    },
    data(){
        return {
            user:this.$store.state.auth.user,
            micrsoft:false,
            sony:false,
            nintendo:false,
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
        showmicrosoft(currentvalue){
            
            this.micrsoft=currentvalue
            this.sony=false;
            this.nintendo=false

        },
        showsony(currentvalue){
         
         this.sony=currentvalue
         this.micrsoft=false
         this.nintendo=false

     },
     shownintendo(currentvalue){
         
         this.nintendo=currentvalue
         this.micrsoft=false
         this.sony=false

     },
       
    }
}
</script>
<style >
.bgcolor{
    background-color: rgb(195, 207, 219);
}
.mybackgroundcolor{
    background-color:   #063773;

}

  
</style>