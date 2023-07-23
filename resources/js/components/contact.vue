<template >
    <div>
       
            <navbar />
            <jambotron />
            
            <div class=" px-0">
               
                <div class="row justify-content-center ">
                    <div class="col-md-6 px-0 ">
                        <location />

                    </div>
                    <div class=" row  col-md-6  py-3 px-5  mb-1">
                        <div class="col-12  ">
                            <h3 class=" py-0 m-0">Name</h3>
                            <p class=" px-3 py-0 m-0">MSN Konsolen Reparatur</p>

                        </div>
                        <div class="col-12 ">
                            <h3 class="  m-0">Email</h3>
                            <p class=" px-3 m-0">info@msnkonsolen-repair.com</p>

                        </div>
                        <div class="col-12  ">
                            <h3 class=" m-0">Phone</h3>
                            <p class=" px-3 m-0">004915175614666</p>

                        </div>
                        <div class="col-12">
                            <h3 class=" m-0">Adresse</h3>
                            <p class=" px-3 m-0">Nordweg. 1, 87730 Badgrönenbach, Deutschlan  </p>

                        </div>

                    </div>
                   
                </div>

                
            </div>
            <div class="bg-secondary  py-5">
                <div class=" px-0  ">
                 
                    <sendemail />
                </div>
                

            </div>
            <accordion />
           
            

                
            <foot />       
        
    </div>
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import foot from './layouts/foot.vue';
import sendemail from './sendemail.vue'
import location from "./location.vue"
import accordion from "./accordion.vue"

export default {
    name:"contact",
    components:{
        sendemail,
        navbar,      
        jambotron, 
        accordion,
        location  ,
        foot   
    },
    computed:{
       
    }
    
}
</script>
<style lang="">
    
</style>