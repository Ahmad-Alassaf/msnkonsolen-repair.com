<template lang="">
    <div class="bg-dark bg-hover text-white py-3">
        <hr style="border: none; border-top: 3px dashed  white" />
        <div class="container ">
            <div class="row  align-items-center ">
                <div class="text-center  py-3 px-3 col ">
                    <span class="fst-italic Microsoft  py-4 px-1" style="font-size:18px">Microsoft</span>
                    
                </div>
                <div class="text-center  py-3 px-3 col">
                    <span class="fst-italic Sony  py-4 px-4 " style="font-size:18px">Sony</span>
                    
                </div>
                <div class="text-center  py-3 px-3 col ">
                    <span class="fst-italic Nintendo  py-4 px-1" style="font-size:18px">Nintendo</span>
                    
                </div>

            </div>
          
            
        </div>
        <hr style="border: none; border-top: 3px dashed  white" />
        
    </div>
</template>
<script>
export default {
    name:"msnbanner"
    
}
</script>
<style >
.Microsoft{
    border:2px solid #212529;
}
.Microsoft:hover{
    cursor: pointer;
    
   
    font-weight: bold;
   
    border-radius: 50%;

}
 .bg-hover .Microsoft:hover{
    background-color: green;
    transition: all 20ms;
    border:2px solid white;

}
.sony{
    border:2px solid #212529;

}

.Sony:hover{
    cursor: pointer;
  
   
    font-weight: bold;
   
    border-radius: 50%;

}
.Nintendo{
    border:2px solid #212529;

}

.bg-hover .Sony:hover{
    background-color: rgb(51, 5, 177);
    border:2px solid white;

}
.Nintendo:hover{
    cursor: pointer;
    font-weight: bold;
  
    border-radius: 50%;

}
.bg-hover .Nintendo:hover{
    background-color: rgb(146, 8, 8);
    border:2px solid white;
  

}

    
</style>