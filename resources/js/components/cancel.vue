<template >
    <navbar />
    <jambotron />
    <div>
        <h1>
           Nicht gespeichert
        </h1>
        
    </div>
    <foot /> 
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import foot from './layouts/foot.vue';
export default {
    name:"cancel",
    components:{
                    navbar,      
                    jambotron,
                    foot   
                },
   
    mounted:()=>{
       
    },
    created() {
      
        
    },
    
}
</script>
<style lang="">
    
</style>