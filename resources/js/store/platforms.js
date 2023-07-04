export default {
    namespaced: true,
    state:{platforms:{}},
    getters:{getplatforms(state){return state.platforms}},

    mutations:{
        SET_PLATFORMS(state,data){ state.platforms=data }
    },
    actions:{
        async  platforms({commit})
        {
           
         await axios.get('/sanctum/csrf-cookie')
         let response= await axios.get('/api/platforms')
         return commit('SET_PLATFORMS',response.data)
        },
    }


}