<template >
    <div class=" container  py-3   ">
       
      
        <div class="row  ">
            <div class=" col-md-6 col-lg-3 mb-2">
                  <div class="card    border-0"  >
                    <img src="../../../../public/storage/images/joycons.jpg" style="height:15rem;  " class="card-img-top " alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Analogstick</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <router-link :to="{name:'createcontract'}" class="btn btn-primary">Auftrag erstellen</router-link>
                     
                    </div>

                  </div>
            </div>
            <div  class=" col-md-6 col-lg-3 mb-2">
                  <div class="card " >
                    <img src="../../../../public/storage/images/reinigung2.jpg" style="height:15rem"  class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Reinigung</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <router-link :to="{name:'createcontract'}" class="btn btn-primary">Auftrag erstellen</router-link>
                    </div>
                  </div>
            </div>
            <div  class=" col-md-6 col-lg-3 mb-2">
                  <div class="card   " >
                    <img src="../../../../public/storage/images/laser.jpg" style="height:15rem"  class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">Laser</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <router-link :to="{name:'createcontract'}" class="btn btn-primary">Auftrag erstellen</router-link>
                    </div>
                  </div>
            </div>
            <div  class=" col-md-6 col-lg-3 mb-2">
                  <div class="card   " >
                    <img src="../../../../public/storage/images/netzteil.jpg" style="height:15rem"  class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">PS4 Netzteil</h5>
                      <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      <router-link :to="{name:'createcontract'}" class="btn btn-primary">Auftrag erstellen</router-link>
                    </div>
                  </div>
            </div>
           
              
              
             
             
        </div>
      
          
        
    </div>
</template>
<script>
export default {
    name:"superangebute"
    
}
</script>
<style lang="">
    
</style>