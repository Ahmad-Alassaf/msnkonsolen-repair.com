<template >
    <navbar />
    <jambotron />
    <div>
        <h1>
           Nicht gespeichert
        </h1>
        
    </div>

</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import msnfooter from './layouts/msnfooter.vue';
export default {
    name:"cancel",
    components:{
                    navbar,      
                    jambotron,
                    msnfooter   
                },
   
    mounted:()=>{
       
    },
    created() {
      
        
    },
    
}
</script>
<style lang="">
    
</style>