<template >
    <navbar />
    <jambotron />
   
    <div class="pagenotfound  border container py-5">
        <H1>Page Not Found !!!!</H1>
        
    </div>
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
export default {
    components:{navbar,jambotron},
    name :'pagenotfound'
    
}
</script>
<style scoped>
.pagenotfound{
    height: 65vh;
}
    
</style>