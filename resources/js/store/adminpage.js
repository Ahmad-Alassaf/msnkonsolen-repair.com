export default {
    namespaced: true,
    state:{
            service:false,
            device:false,
            contract:false,
            user:false,
            role:false,
            permissions:false
    },
    getters:{
        getservice(state){return state.service},
        getdevice(state){return state.device},
        getcontract(state){return state.contract},
        getuser(state){return state.user},
        getroles(state){return state.role},
        getpermissions(state){return state.permission},
        
    },
    mutations:{
        SET_SERVICE(state,vlaue){state.service=vlaue; },
        SET_CONTRACT(state,vlaue){state.contract=vlaue},
        SET_DEVICE(state,vlaue){state.device=vlaue},
        SET_USER(state,value){state.user=value},
        SET_ROLE(state,value){state.role=value},
        SET_PERMISSION(state,value){state.permissions=value}
    },
    actions:{
        setLinks({commit},link)
        {
           
            switch (link) {
                case 'service':
                    commit('SET_SERVICE',!this.service)
                    commit('SET_CONTRACT',false)
                    commit('SET_DEVICE',false)
                    commit('SET_USER',false)
                    commit('SET_ROLE',false)
                    commit('SET_PERMISSION',false)
                    
                    break;
                case 'device':
                    commit('SET_DEVICE',!this.device)
                    commit('SET_CONTRACT',false)
                    commit('SET_SERVICE',false)
                    commit('SET_USER',false)
                    commit('SET_ROLE',false)
                    commit('SET_PERMISSION',false)
                    
                    break;
                case 'contract':
                    commit('SET_CONTRACT',!this.contract)
                    commit('SET_DEVICE',false)
                    commit('SET_SERVICE',false)
                    commit('SET_USER',false)
                    commit('SET_ROLE',false)
                    commit('SET_PERMISSION',false)
                    break;
                    case 'user':
                        commit('SET_USER',!this.contract)
                        commit('SET_DEVICE',false)
                        commit('SET_SERVICE',false)
                        commit('SET_CONTRACT',false)
                        commit('SET_ROLE',false)
                        commit('SET_PERMISSION',false)
                        break;
                case 'role':
                    commit('SET_ROLE',!this.role)
                    commit('SET_USER',false)
                    commit('SET_DEVICE',false)
                    commit('SET_SERVICE',false)
                    commit('SET_CONTRACT',false)
                   
                    commit('SET_PERMISSION',false)
                    break;
                    case 'permissions':
                        commit('SET_PERMISSION',!this.permissions)
                        commit('SET_USER',false)
                        commit('SET_DEVICE',false)
                        commit('SET_SERVICE',false)
                        commit('SET_CONTRACT',false)
                        commit('SET_ROLE',false)
                       
                        break;

            }

        }
    }

}