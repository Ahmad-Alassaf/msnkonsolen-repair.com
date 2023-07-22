<template >
    <div>
       
            <navbar />
            <jambotron />
            <div class="container px-0">
                <div class="row py-5  justify-content-center ">
                    <div class=" row  col-md-4 bg-secondary py-3 px-5  mb-1">
                        <div class="col-12  ">
                            <h3 class="text-white py-0 m-0">Name</h3>
                            <p class="text-white px-3 py-0 m-0">MSN Konsolen Reparatur</p>

                        </div>
                        <div class="col-12 ">
                            <h3 class="text-white  m-0">Email</h3>
                            <p class="text-white px-3 m-0">info@msnkonsolen-repair.com</p>

                        </div>
                        <div class="col-12  ">
                            <h3 class="text-white m-0">Phone</h3>
                            <p class="text-white px-3 m-0">004915175614666</p>

                        </div>
                        <div class="col-12">
                            <h3 class="text-white m-0">Adresse</h3>
                            <p class="text-white px-3 m-0">Nordweg. 1, 87730 Badgrönenbach, Deutschlan  </p>

                        </div>

                    </div>
                    <div class="col-md-8 px-0 ">
                        <sendemail />

                    </div>
                </div>

                
            </div>
            <div class="  my-3 ">
                <div class="container px-0  ">
                    <location />
                </div>
                

            </div>
            

                
            <foot />       
        
    </div>
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import foot from './layouts/foot.vue';
import sendemail from './sendemail.vue'
import location from "./location.vue"

export default {
    name:"contact",
    components:{
        sendemail,
        navbar,      
        jambotron, 
        location  ,
        foot   
    },
    computed:{
       
    }
    
}
</script>
<style lang="">
    
</style>