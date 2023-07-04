<template lang="">
    <div class="">
        <ul class="list-group ">
            <li class="list-group-item link" 
               :class="[service?'text-dark bg-white':'text-white bg-dark']" 
               @click="service?'':setLinks('service')"
            >Services</li>
            <li class="list-group-item link" 
               :class="[device?'text-dark bg-white':'text-white bg-dark']" 
               @click="device?'':setLinks('device')"
               >Devices</li>
            <li class="list-group-item link "
            :class="[contract?'text-dark bg-white':'text-white bg-dark']" 
               @click="contract?'':setLinks('contract')"
            >Contracts</li>
            <li class="list-group-item link "
            :class="[user?'text-dark bg-white':'text-white bg-dark']" 
               @click="user?'':setLinks('user')"
            >Users</li>
            <li class="list-group-item link "
            :class="[role?'text-dark bg-white':'text-white bg-dark']" 
               @click="role?'':setLinks('role')"
            >Roles</li>
            <li class="list-group-item link "
            :class="[permissions?'text-dark bg-white':'text-white bg-dark']" 
               @click="permissions?'':setLinks('permissions')"
            >Permissions</li>
        </ul>
        
    </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
    name:"sidebar",
    data(){
        return{
            service:this.$store.state.adminpage.service,
            device:this.$store.state.adminpage.device,
            contract:this.$store.state.adminpage.contract,
            user:this.$store.state.adminpage.user,
            role:this.$store.state.adminpage.role,
            permissions:this.$store.state.adminpage.permissions,
        }

    },
    methods:{
        ...mapActions({
            changeLinkstatus:'adminpage/setLinks'
        }),
        setLinks(link)
        {
          
            this.changeLinkstatus(link)
        }
        

    },
    computed:{
        service(){return this.$store.state.adminpage.service},
        device(){return this.$store.state.adminpage.device},
        contract(){return this.$store.state.adminpage.contract},
        user(){return this.$store.state.adminpage.user},
        role(){return this.$store.state.adminpage.role},
        permissions(){return this.$store.state.adminpage.permissions},

        

    }
    
}
</script>
<style  >
.link{
    background-color: rgb(37, 35, 35);
    

}
.link:hover{
    cursor: pointer;
}
    
</style>