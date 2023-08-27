import {ref } from 'vue'
const  getcontracts=()=>{
  
   const contracts=ref([])
   const contractserror=ref(null)
   const loadcontracts=async(token)=>{
       try{
         
           await axios.get('/sanctum/csrf-cookie');
           let config={
               headers:{
                   Accept: 'application/vnd.api+json',                    
                   Authorization: `Bearer ${token}`
               }
           }
           await axios.get(`/api/contracts`,config)
           .then(response=>{ 
             
              if(!response.data){
               throw Error('No contracts available')
              }
              else{
                contracts.value=response.data.data
            
              }
           }) 

       }
       catch(err){
        contractserror.value=err.message
          

       }
   }
   return {contracts,contractserror,loadcontracts}
   
}
export default getcontracts