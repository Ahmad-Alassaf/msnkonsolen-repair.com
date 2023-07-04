<template >
    <navbar />
    <jambotron />
    
    <div class="container pt-5" v-if="contract!=null">
        <h3 class="px-2 py-2"> Auftragnummer: {{contract.attributes.jobsnumber}}</h3>
        <div class="row m-0 p-0">
            <div class="col-5 border p-0">
                <h4 class="bg-secondary text-white px-2 py-1">Kundendaten:</h4>
                <div class="px-3">
                    <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                        <span>Name:</span>
                        <span>{{contract.relationships.user.attributes.name}}</span>
                     </div>
                    
                     <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                        <span>Email:</span>
                        <span>{{contract.relationships.user.attributes.email}}</span>
                     </div>
                     <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                        <span>Tel:</span>
                        <span>0151xxxxxxxx</span>
                     </div>
                    
                    <h6>Address</h6>
                    <div class="d-flex justify-content-between col-6" v-for=" address in contract.relationships.user.relationships.Address">
                        <span >{{address.attributes.street}}</span>
                        <span >{{address.attributes.hausnumber}}</span>
                        <span >{{address.attributes.postal}}</span>
                        <span >{{address.attributes.city}}</span>
                    </div>
                </div>
                
            </div>
            <div class="col-7 border p-0">
                <h4 class="bg-secondary text-white px-2 py-1">Auftrag-Gerät Daten:</h4>
                <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                   <span>Auftrag Type</span>
                   <span>{{contract.attributes.Contract_Type}}</span>
                </div>
                <div class="d-flex py-1 px-2 justify-content-between border-bottom ">
                    <span>Erstellt am</span>
                    <span>{{contract.attributes.created_at}}</span>
                 </div>
                <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Gerät</span>
                    <span>{{contract.attributes.device}}</span>
                 </div>
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Serial Number</span>
                    <span>{{contract.attributes.serialnumber}}</span>
                 </div>
                 
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Case oder Gehäuse status</span>
                    <span>{{contract.attributes.casestatus}}</span>
                 </div>
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Waranty Siegeln</span>
                    <span>{{contract.attributes.warantysiegel}}</span>
                 </div>
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Flüssigkeitschaden</span>
                    <span>{{contract.attributes.waterdamage}}</span>
                 </div>
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>früher Reparatur</span>
                    <span>{{contract.attributes.earlierrepair}}</span>
                 </div>
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Services</span>
                    <ul>
                        <li v-for="service in contract.relationships.services">
                            <span >{{service.attributes.title}}</span>
                        </li>
                    </ul>
                    
                 </div>
               
                
            </div>
        </div>
        <div class="border">
            <h4 class="bg-secondary text-white px-2 py-1">Fehler Beschreibung</h4>
            <p>{{contract.attributes.faultdescription}}</p>
        </div>
        <div class="border">
            <h4 class="bg-secondary text-white px-2 py-1">Zubehör</h4>
            <p>{{contract.attributes.accesories}}</p>
        </div>
        <div class="d-flex py-1 px-2 justify-content-between">
            <router-link :to="{name:'editcontract',params:{id:this.$route.params.id}}" class="btn btn-primary" > Edit</router-link>
            <button class="btn btn-danger"> Zur Kasse</button>
        </div>
      
        
    </div>
</template>
<script>
import navbar from "../layouts/navbar.vue"
import jambotron from "../layouts/jambotron.vue";
import {mapGetters} from 'vuex'
export default {
    name:"showcontract",
    components:{
        navbar,      
        jambotron,
         
    },
    data(){
        return {
            contract:null
        }
    },
    computed:{
        ...mapGetters({
            token:"auth/gettoken", 
            contractslist:"auth/get_contracts_list",
                

        }), 
    },
    created(){
        this.getcontract()

    },
    methods: { 
                async getcontract()
                    {
                                    let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${this.token}`
                                                        }
                                                    } 
                                    await axios.get('/sanctum/csrf-cookie');                                           
                                    await  axios.get(`/api/contracts/${this.$route.params.id}`,config)
                                                .then(response=>
                                                {
                                                    this.contract=response.data.data

                                                })
                                                .catch(()=>{console.log('Failed!!!!!')})

                    }, 
                   
            }   
        }
    

</script>
<style lang="">
    
</style>