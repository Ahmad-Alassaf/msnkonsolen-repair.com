<template >
    <navbar />
    <jambotron />
    <div>
        <h1>
            Danke für  Ihre Zahlung 
        </h1>
        
    </div>

</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import msnfooter from './layouts/msnfooter.vue';
export default {
    name:"success",
    components:{
                    navbar,      
                    jambotron,
                    msnfooter   
                },
    props:['test'],
    mounted:()=>{
       
    },
    created() {
        console.log('test:')
        console.log(this.test);
        
    },
    
}
</script>
<style lang="">
    
</style>