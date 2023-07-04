<template lang="">
    <div>
        <navbar />
     
        <div class="  p-5">
            <div class="row">
                <div class="col-2 ">
                    <sidebar />
                </div>
                <div class="col-10 ">
                    <services v-if="this.$store.state.adminpage.service" :services="services" :devices="devices"/>
                    <device v-else-if="this.$store.state.adminpage.device" :devices="devices" :platforms="platforms"/>
                    <contracts v-else-if="this.$store.state.adminpage.contract" :contractslist="contractslist"/>
                    <users v-else-if="this.$store.state.adminpage.user" />
                    <roles v-else-if="this.$store.state.adminpage.role" />
                    <permissions v-else-if="this.$store.state.adminpage.permissions" />
                   
                </div>
            </div>

        </div>
       
       
       
    </div>
</template>
<script>
import navbar from './layouts/navbar.vue'
import sidebar from './sidebar.vue'
import services from '@/components/services/services.vue'
import device from './devices/devices.vue'
import users from './users/users.vue'
import roles from './roles/roles.vue'
import permissions from './permissions/permissions.vue'
import contracts from './contracts/contracts.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
    name:"adminpage",
    components:{navbar,sidebar,services,device,contracts,users,roles,permissions },
    data(){
        return{ }
        },
    created(){
        this.alldevices();
        this.allservices();
        this.allplatforms();
      

    },
    computed:{
        ...mapGetters({
            contractslist:"auth/get_contracts_list",
            devices:"auth/GET_DEVICES",
            services:"auth/GET_SERVICES",
            platforms:"auth/GET_PLATFORMS"
        }),
    },
    mounted(){
      

    },
    methods: { 
        ...mapActions({
            alldevices:"auth/getdevices",
            allservices:"auth/getservices",
            allplatforms:"auth/getplatforms",

        }),      
                async getallcontracts()
                    {
                                    let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${this.token}`
                                                        }
                                                    } 
                                    await axios.get('/sanctum/csrf-cookie');                                           
                                    await  axios.get(`/api/contracts`,config)
                                                .then(()=>this.contracts())
                                                .catch(()=>{console.log('Failed!!!!!')})

                    }, 
                   
            }     
    
}
</script>
<style >
    
</style>