<template >
    <div>

   
        <jambotron />
        <navbar />
        <div class="container py-5">
            <div class=" my-1">
                <form class="form d-flex">
                    <select name="" id="" class="form-select w-25">
                        <option value="Jobsref">Jobsref#</option>
                        <option value="Gerät">Gerät</option>
                        <option value="Seriennummer">Seriennummer</option>
                        <option value="Kundenemail">Kundenemail</option>
                    </select>
                    <input type="text " class="form-control" placeholder="Search..." v-model="searchTxt" >
                    <input type="submit" class="btn btn-primary mx-1" value="Search">
                </form>
                
            </div>
            <table class="table ">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                   
                    <th scope="col">Jobsref#</th>
                    <th scope="col">Gerät</th>
                    <th scope="col">Seriennummer</th>
                    <th scope="col">Kundenemail</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                   
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="contract in contracts">
                    <th scope="row">1</th>
                    
                    <td>{{contract.attributes.jobsnumber}}</td>
                    <td>
                        {{contract.attributes.device}}
                    </td>
                    <td>{{contract.attributes.serialnumber}}</td>
                    <td>{{contract.relationships.user.attributes.email}}</td>
                    <td>{{contract.attributes.status}}</td>
                    <td><router-link :to="{name:'showcontract',params:{id:contract.id}}" class="btn btn-primary">mehr...</router-link></td>
                   
                  </tr>
                 
                </tbody>
              </table>
           
             </div>
        
        </div>  
</template>
<script>
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
import msnfooter from '../layouts/msnfooter.vue';
import{ref, computed} from 'vue'

import addcontract from './addcontract.vue';
import getcontracts from '../../compasable/contracts/getcontracts';
export default {
    name:'contracts',
    components:{addcontract, navbar,jambotron, msnfooter},
  
    setup(){
        const searchTxt=ref('')
        const user=ref(null)
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contracts,contractserror,loadcontracts}=getcontracts()
        loadcontracts(token)
        return {contracts,searchTxt,user}
    }
  
    
}
</script>
<style lang="">
    
</style>