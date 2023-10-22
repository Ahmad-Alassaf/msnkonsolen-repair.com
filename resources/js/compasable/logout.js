import {ref} from 'vue'
const logout=()=>{

    const runlogout=async(token)=>{
        await axios.get('/sanctum/csrf-cookie');
        let config={
                                                    headers:{
                                                        Accept: 'application/vnd.api+json',
                                                                                 
                                                        Authorization: `Bearer ${token}`
                                                    }
                                                } 
      
        
        
        await axios.post('/api/logout',config).then(({data})=>{
          console.log(data)
        })
    }

    return {runlogout}

}
export default logout