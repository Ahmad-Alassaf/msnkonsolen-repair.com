import {ref} from 'vue'
const editecontract=()=>{
    const editcontracterror=ref(null)
    const recieving=async(token,data)=>{
     try{
                let config={
                    headers:{
                                Accept: 'application/vnd.api+json',                                
                                Authorization: `Bearer ${token}`
                            }
                    } 
                await axios.get('/sanctum/csrf-cookie');  
                
                console.log(data.relationships.services) 
                let serviceslist=[]
                console.log('serviceslist befor push')
                console.log(serviceslist)  
                data.relationships.services.forEach(element=>{
                    if(! serviceslist.includes(element.id))
                          serviceslist.push(element.id)

                })     
                console.log('serviceslist after push')
                console.log(serviceslist)                                       
                await  axios.put(`/api/contracts/${data.id}`,{
                                                            'device':data.attributes.device,
                                                            'serialnumber':data.attributes.serialnumber,
                                                            'faultdescription':data.attributes.faultdescription,  
                                                            'casestatus':data.attributes.casestatus,
                                                            'waterdamage':data.attributes.waterdamage,
                                                            'earlierrepair':data.attributes.earlierrepair,
                                                            'accesories':data.attributes.accesories,
                                                            'paidstatus':data.attributes.paidstatus,
                                                            'warantysiegel':data.attributes.warantysiegel,       
                                                            'status':data.attributes.status,
                                                            'trackingnumber':data.attributes.trackingnumber,
                                                            'services':serviceslist
                },config)
                .then(()=>{
                  
                    
                    })
            .catch((er)=>{
                console.log(err)
                throw Error('Some Thing went Wrong')
            })

    }
    catch(err){

        editcontracterror.value=err
        console.log(editcontracterror.value)
     }
    }


    return {recieving}
}


export default editecontract