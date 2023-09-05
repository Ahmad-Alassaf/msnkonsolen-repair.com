import {ref } from 'vue'
const  getcontract=()=>{
  
   const contract=ref([])
   const contracterror=ref(null)
   const contractprise=ref(0)
   const loadcontract=async(id,token)=>{
       try{
         
           await axios.get('/sanctum/csrf-cookie');
           let config={
               headers:{
                   Accept: 'application/vnd.api+json',                    
                   Authorization: `Bearer ${token}`
               }
           }
           await axios.get(`/api/contracts/${id}`,config)
           .then(response=>{ 
             
              if(!response.data){
               throw Error('No contracts available')
              }
              else{
                contract.value=response.data.data
                ////
               
              
                 contract.relationships.services.forEach(service=>{
                    contractprise +=parseInt(service.attributes.prise) 
                    })
               
              }
           }) 

       }
       catch(err){
        contracterror.value=err.message
          

       }
   }
   return {contract,contracterror,loadcontract,contractprise}
   
}
export default getcontract