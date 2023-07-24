<template lang="">
    <div class="bg-dark bg-hover text-white py-3">
        <hr style="border: none; border-top: 3px dashed  white" />
        <div class="container ">
            <form class="">
                <div class="row   ">
                
                        <input type="email" name="" id="" 
                        class=" border-0 py-2  col-sm-12  col-md-9 col-lg-11 ">
                        <input type="submit" name="submit" value="submit" 
                        class="btn btn-primary submitbutton border-0 rounded-0 col-sm-3  col-md-2 col-lg-1 ">


                  
                    
                </div>
                
            </form>
          
            
        </div>
        <hr style="border: none; border-top: 3px dashed  white" />
        
    </div>
</template>
<script>
export default {
    name:"emailbanner"
    
}
</script>
<style >
@media only screen and (max-width: 767px) {
    .submitbutton{
       
        border: 2px solid white;
        border-radius: 7px !important;
        margin:10px auto ;

    }
    
}

    
</style>