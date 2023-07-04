import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import auth from '@/store/auth'
import adminpage  from './adminpage'
import devices  from './devices'
import shoppingcart  from '@/store/shoppingcart'


const store = createStore({
    plugins:[
        createPersistedState()
    ],
    modules:{
        auth,
        adminpage,
        devices,
        shoppingcart
     
    }
})

export default store