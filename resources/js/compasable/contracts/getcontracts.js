import {ref } from 'vue'
const  getcontracts=()=>{
  
   const contracts=ref([])
   const unpaidcontracts=ref([])
   const paidcontracts=ref([])
   const contractserror=ref(null)
   const contractsprise=ref(0)
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
                unpaidcontracts.value=response.data.data.filter(element=>element.attributes.paidstatus=='unpaid')
                paidcontracts.value=response.data.data.filter(element=>element.attributes.paidstatus=='payed')
                response.data.data.forEach(contract=>{
                 contract.relationships.services.forEach(service=>{
                   
                   
                    contractsprise.value +=parseInt(service.attributes.prise) 
                   
                    })
                })
              }
           }) 

       }
       catch(err){
        contractserror.value=err.message
          

       }
   }
   return {contracts,unpaidcontracts,paidcontracts,contractserror,loadcontracts,contractsprise}
   
}
export default getcontracts