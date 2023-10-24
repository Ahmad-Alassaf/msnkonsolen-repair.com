import axios from 'axios'
import router from '@/router'
import { forEach } from 'lodash'

export default {
    namespaced: true,
    state:{
        authenticated:false,
        verified:false,
        token:'',
        session_id:'',
        user:{},
        contracts:0, 
        contractsList:[],
        usersList:[],
        rolesList:[],
        permissionsList:[],
        devices:[],
        services:[],
        platforms:[],
        Totalprice:0,
       
    },
    getters:{
        getauthenticated(state){return state.authenticated  },
        getuser(state){ return state.user  },
        gettoken(state){ return state.token},
        getsessionid(state){ return state.session_id},
        GET_CONTRACTS_COUNT(state){return state.contracts},
       
        get_contracts_list(state){return state.contractsList},
        get_contracts_prise(state){return state.Totalprice},

        get_users_list(state){return state.usersList},
        get_roles_list(state){return state.rolesList},
        get_permissions_list(state){return state.permissionsList},
        GET_DEVICES(state){return state.devices},
        GET_SERVICES(state){return state.services},
        GET_PLATFORMS(state){return state.platforms},
        GET_USER_ADDRESS(state){return state.user.Address},
       
       
    },
    mutations:{
        SET_AUTHENTICATED (state, value) {state.authenticated = value },
        SET_USER (state, value) { state.user = value },
        SET_TOKEN(state,value){state.token=value },
        SET_SESSION_ID(state,value){state.session_id=value },

        SET_CONTRACTS_COUNT(state,value){state.contracts=value },
        SET_CONTRACT_LIST(state,value){state.contractsList=value},
        SET_CONTRACTS_PRICE(state,value){state.Totalprice=value},

        SET_USERS_LIST(state,value){state.usersList=value},
        SET_ROLES_LIST(state,value){state.rolesList=value},
        SET_PERMISSIONS_LIST(state,value){state.permissionsList=value},
        SET_DEVICES(state,data){ state.devices=data },
        SET_SERVICES(state,data){ state.services=data },
        SET_PLATFORMS(state,data){ state.platforms=data },
        SET_USER_ADDRESS(state,data){state.user.Address=data}
       
      
    },
    actions:{
        async  login({commit},data)

        {
           
                await axios.get('/sanctum/csrf-cookie')                           
            return    await axios.post('/api/login',data).then(response=>{
                   
               
                   commit('SET_AUTHENTICATED',true)
                   commit('SET_USER',response.data.data.user)
                   commit('SET_TOKEN',response.data.data.token)
                   return response.data
                }).catch(error=>{
                   
                  return error.response.data

                })
        
        },
         attempt({commit},data)
        {
                 
                   commit('SET_AUTHENTICATED',true)                  
                   commit('SET_USER',data.user)
                   commit('SET_TOKEN',data.token)
 
        },
        async  register({dispatch},data)
        {
          
         await axios.get('/sanctum/csrf-cookie')
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                                
                
                }
            }
        await axios.post('/api/register',data,config).then((response)=>{
             dispatch('attempt',response.data.data)
        }).catch((er)=>{console.log(er)})
        }
        ,
        logout({commit}){
            commit('SET_USER',{})
            commit('SET_AUTHENTICATED',false)
            commit('SET_TOKEN','')
        },
        sessionid({commit},data)
        {
            commit('SET_SESSION_ID',data)

        },
        async getcontracts({commit,getters}){
            if(getters.gettoken){
                let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                                
                        Authorization: `Bearer ${getters.gettoken}`
                    }
                } 
                await axios.get('/sanctum/csrf-cookie')
                await axios.get('/api/contracts',config)
                           .then(response=>{
                               let Totalprice=0;
                               response.data.data.forEach(contract=>{
                                contract.relationships.services.forEach(service=>{
                                    Totalprice +=parseInt(service.attributes.prise) 
                                   })
                               })
                               commit('SET_CONTRACTS_PRICE',Totalprice);
                               commit('SET_CONTRACTS_COUNT',response.data.data.length)
                               commit('SET_CONTRACT_LIST',response.data.data)
                           })
            } 
            },
    async getusers({commit,getters}){
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${getters.gettoken}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                    await axios.get('/api/users',config)
                               .then(response=>{
                                 
                                   commit('SET_USERS_LIST',response.data.data)
                                  
                               })
    
            },
            async getroles({commit,getters}){
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${getters.gettoken}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                    await axios.get('/api/roles',config)
                               .then(response=>{
                                 
                                   commit('SET_ROLES_LIST',response.data.data)
                               })
    
            },
            async getpermissions({commit,getters}){
                let config={
                        headers:{
                            Accept: 'application/vnd.api+json',                                
                            Authorization: `Bearer ${getters.gettoken}`
                        }
                    } 
                    await axios.get('/sanctum/csrf-cookie')
                    await axios.get('/api/permissions',config)
                               .then(response=>{
                                 
                                   commit('SET_PERMISSIONS_LIST',response.data.data)
                               })    
            },
            async  getdevices({commit,getters})
            {
                let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                                
                        Authorization: `Bearer ${getters.gettoken}`
                    }
                }                
                await axios.get('/sanctum/csrf-cookie')
                 await axios.get('/api/devices',config)
                            .then(response=>{
                            commit('SET_DEVICES',response.data.data)
                            })
                            
            },
            async  getservices({commit}){
                await axios.get('/sanctum/csrf-cookie');
                let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                    
                       // Authorization: `Bearer ${this.token()}`
                    }
                }
                await axios.get(`/api/services`,config)
                .then(response=>{ 
                    commit('SET_SERVICES',response.data.data)
                })           
            },
            async  getplatforms({commit,getters}){
                await axios.get('/sanctum/csrf-cookie');
                let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                    
                        Authorization: `Bearer ${getters.gettoken}`
                    }
                }
                await axios.get(`/api/platforms`,config)
                .then(response=>{ 
                    commit('SET_PLATFORMS',response.data.data)
                })           
            },
            GETSERVICEDEVICES({getters},data){
               
                let alldevices=getters.GET_DEVICES
                let servicdevices=[]

                alldevices.forEach(device=>
                    {
                                device.relationships.services.forEach((service)=>
                                {
                                    if(  service.attributes.title==data)
                                    servicdevices.push(
                                        
                                    
                                    
                                        )
                                })
                    })

                    return servicdevices
                   
              

            },
            async getuseraddresses({commit,getters}){
                await axios.get('/sanctum/csrf-cookie');
                let config={
                    headers:{
                        Accept: 'application/vnd.api+json',                    
                        Authorization: `Bearer ${getters.gettoken}`
                    }
                }
                await axios.get(`/api/address`,config)
                .then(response=>{ 
                    commit('SET_USER_ADDRESS',response.data.data)
                })   

            }
       
       
    }
}