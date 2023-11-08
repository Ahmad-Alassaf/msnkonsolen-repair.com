<template >
    <footer class="py-1  footer ">
        <div class="container text-white">
            <div class="text-center py-3 fw-bolder fs-3">
                MSN Konsolenreparatur
            </div>
            <div class="d-flex justify-content-between  py-3 text-white" >
                <div> <router-link :to="{name:'home'}" class="text-white"> Unsere AGB</router-link></div>
                <div><router-link :to="{name:'home'}" class="text-white">Datenschutz</router-link></div>
                <div><router-link :to="{name:'home'}" class="text-white">Impressum</router-link></div>
            </div>
            <p class="text-white text-center ">Copyright: <span>©</span> Ahmad Al Asaf</p>
        </div>
       
        
    </footer>
</template>
<script>
export default {
    
    
}
</script>
<style >
.footer{
    background-color: #063773;
 
}
       
  
</style>