<template >
    <navbar />
    <jambotron />
    <div class="container ">
      
        <div class=" pt-5 ">
           
                <div class=" p-3">
                   
                            <div v-for="contract in contractslist" class="mb-1  d-flex">
                                             
                                <contract :contract="contract"  />
                            </div>
                            <p class="bg-secondary text-white text-center py-3">gesamtprise:{{ gesamtprise }}</p>
                      

                </div>          
                
                <div class="   d-flex align-items-center pb-4">
                   
                    <button class="btn btn-danger m-auto w-50"> Zahlung </button>
                    
                </div> 
                
         

        </div>
        
        
    </div>
    <foot />
</template>
<script>
import dayjs from 'dayjs';
import navbar from '../layouts/navbar.vue'

import jambotron from '../layouts/jambotron.vue';
import foot from '../layouts/foot.vue';
import {mapActions, mapGetters} from 'vuex'
import contract from '../contracts/contract.vue'
import { faThList } from '@fortawesome/free-solid-svg-icons';
export default {
    name:"products",
    components:{navbar,contract,  
    
      jambotron,
    
      foot },
    data(){
        return{
            gesamtprise:150
            
           
            
           
        }
    },
    created(){
        this.contracts()

      
        

    },
    computed:{
        ...mapGetters({
            contractslist:"auth/get_contracts_list"
        }),
       
    },
    methods:{
        ...mapActions({contracts:"auth/getcontracts"}),
        formatDate(dateString) 
                       {
                                const date = dayjs(dateString);
                                    // Then specify how you want your dates to be formatted
                                return date.format('dddd:D MMMM , YYYY');
                        },
    }

    
}
</script>
<style >
    
</style>