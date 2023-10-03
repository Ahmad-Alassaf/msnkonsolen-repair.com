const editecontract=()=>{
    const recieving=async(token,data)=>{
     try{
                let config={
                    headers:{
                                Accept: 'application/vnd.api+json',                                
                                Authorization: `Bearer ${token}`
                            }
                    } 
                await axios.get('/sanctum/csrf-cookie');                                           
                await  axios.post(`/api/contracts/${id}`,data,config)
                .then(()=>{
                        console.log('Contract recieved successfully')
                    
                    })
            .catch((er)=>{
                console.log(er)
                throw Error('Some Thing went Wrong')
            })

    }
    catch(err){ deletecontracterror.value=err }
    }


    return {recieving}
}


export default editecontract