const payment=()=>{
    const runpayment=async(token)=>{
        let data={
            price_data:{
                'currency':'usd',
            }
    
          };
        await axios.get('/sanctum/csrf-cookie');
            axios.post('/api/payment',data,{
                headers:{
                                                     "Access-Control-Allow-Origin" : '*',
                                                       "Accept": 'application/vnd.api+json',                                
                                                       "Authorization": `Bearer ${token}`,
                                                       'Access-Control-Allow-Credentials':true
                          }
            }).then(response=>{
                console.log(response)                  
            }) .catch((er)=>{console.log(er)})

    }
    return {runpayment}
    

}
export default payment