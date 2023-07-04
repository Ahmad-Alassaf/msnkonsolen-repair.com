<template >
    <div>
       
            <navbar />
            <jambotron />
            <h1>
                Contact Page
            </h1>
        
    </div>
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
export default {
    name:"contact",
    components:{
        
        navbar,      
        jambotron,    
    },
    
}
</script>
<style lang="">
    
</style>