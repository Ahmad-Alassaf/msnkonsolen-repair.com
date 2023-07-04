<template >
    <div>
        <div class="my-1">
            <form class="form d-flex">
                <input type="text " class="form-control" placeholder="Search..." v-model="searchTxt" >
                <input type="submit" class="btn btn-primary mx-1" value="Search">
            </form>
            
        </div>
       
        <table class="table table-success table-striped table-hover">
            <thead>
                <tr>                   
                    <th >Contract</th>
                    <th >Jobs Nummber</th>
                    <th >serialnumber</th>
                    <th >User</th>
                    <th >Device</th>
                    <th >Services</th>
                    <th >Contract Status</th>                   
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
               <tr v-for="contract in contractslist">
                    <contract :contract="contract"/>
                </tr> 
               
            </tbody>           
        </table>      
        
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

import contract from './contract.vue'
import addcontract from './addcontract.vue';
export default {
    name:'contracts',
    props:['contractslist'],
    components:{contract,addcontract},
    data(){
        return{searchTxt:'' ,
                user:null,       
          
            }
    },
    created()
    {
       
     
       
    },
    computed:{
        ...mapGetters({
            token:"auth/gettoken", 
            contractslist:"auth/get_contracts_list",
            user:"auth/getuser"          

        }), 
       

      
           

    },
    methods: { 
              ...mapActions({user:'auth/getuser'}), 
          
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
<style lang="">
    
</style>