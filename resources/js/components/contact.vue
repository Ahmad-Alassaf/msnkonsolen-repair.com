<template >
    <div>
       
            <navbar />
            <jambotron />
            <div class="container">
                <div class="row py-5">
                    <div class=" row  col-md-4 bg-secondary py-3 rounded">
                        <div class="col-12  py-1">
                            <h3 class="text-white">Name</h3>
                            <p class="text-white px-3">MSN Konsolen Reparatur</p>

                        </div>
                        <div class="col-12">
                            <h3 class="text-white">Email</h3>
                            <p class="text-white px-3">info@msnkonsolen-repair.com</p>

                        </div>
                        <div class="col-12">
                            <h3 class="text-white">Phone</h3>
                            <p class="text-white px-3">004915175614666</p>

                        </div>
                        <div class="col-12">
                            <h3 class="text-white">Adresse</h3>
                            <p class="text-white px-3">Nordweg. 1, 87730 Badgrönenbach, Deutschlan  </p>

                        </div>

                    </div>
                    <div class="col-md-8">
                        <sendemail />

                    </div>
                </div>
            </div>
            

                
          
        
    </div>
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import sendemail from './sendemail.vue'
export default {
    name:"contact",
    components:{
        sendemail,
        navbar,      
        jambotron,    
    },
    
}
</script>
<style lang="">
    
</style>