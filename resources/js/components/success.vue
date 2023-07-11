<template >
    <navbar />
    <jambotron />
    <div>
        <h1>
            Danke für  Ihre Zahlung 
        </h1>
        
    </div>
    <foot /> 
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import foot from './layouts/foot.vue';
export default {
    name:"success",
    components:{
                    navbar,      
                    jambotron,
                    foot   
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