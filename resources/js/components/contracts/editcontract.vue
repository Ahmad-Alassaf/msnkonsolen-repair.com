<template >
    <div>
        <navbar />
        <h1>
            Edit
        </h1>
        <div class=" mt-1"  v-if="contract !=null">
            <div class=" form col-8 shadow m-auto  ">
                <h4 class="bg-primary text-white px-2 py-1  shadow ">
                   Gerät
                </h4>
                <form @submit.prevent="submit" class="px-3">
                    <select  class="form-select mb-3" v-model="contract.attributes.Contract_Type"   >
                        <option value="">--Select Contract Type--</option>
                        <option value="New" :selected="contract.attributes.Contract_Type==='New'">New Contract </option>
                        <option value="Waranty" :selected="contract.attributes.Contract_Type==='Waranty'">Waranty </option>
                    </select>
                    
                    <select name="" id=""  v-model="contract.attributes.device"  class="form-select mb-3" >
                        <option value="">--Select Device Type--</option>
                        <option v-for="device in devices.data" :value="device" :selected="contract.attributes.device===device.attributes.title">{{ device.attributes.title }} </option>                               
                    </select>
                    <ul class="list-group  mr-auto my-2 px-5" v-if="contract.selected_device!=null">
                        <li v-for=" service in contract.selected_device.relationships.services" class="list-group-item d-flex justify-content-between mb-3 border  ">
                            <div class="d-flex w-100" >
                                <input type="checkbox" class="m-1" name="" id=""   :value="service" >
                                <div class="d-flex  justify-content-between  w-100">
                                    <span class="">{{service.title}}</span> 
                                    <span class="">  {{service.prise}} €</span> 
                                </div> 
                            </div>                               
                        </li>
                    </ul>
                    <div class="form-group mb-3">
                        <label for="">Serial Number:</label>
                       <input type="text" placeholder="Serial Number..." v-model="contract.attributes.serialnumber" class="form-control mb-1" >
                        <small class="mx-2">wenn Kein Serialnumber, Schreiben 'Kein Seriennummer'</small>
                    </div>
                    <div class="form-group mb-3">
                        <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Fehler Beschreibung</h4>
                        <textarea name="" class="form-control" id="" v-model="contract.attributes.faultdescription"  rows="5" placeholder="Text..."></textarea>
                    </div>
                    <div class="form-group mb-3">
                        <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Zubehör zumitschicken</h4>
                        <textarea name="accesories" v-model="accesories" class="form-control" id="" rows="3" placeholder="Text..."></textarea>
                    </div>
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Garanty Siegeln Zustand</h4>
                        <div class=" form-check ">                            
                            <input type="radio" 
                            name="siegelstatus" v-model="contract.attributes.warantysiegel"
                           
                             value="Die sind entfernt oder beschädigt" 
                             class="form-check-inpu mx-1">
                            <label for="" class="form-check-label ">Die sind entfernt oder beschädigt </label>
                         </div>
                         <div class=" form-check ">                                
                            <input type="radio" name="siegelstatus"
                             v-model="contract.attributes.warantysiegel"
                            
                             value="Vorhanden und Festebekelebt"
                              class="form-check-inpu mx-1">
                            <label for="" class="form-check-label ">Die Sind vorhanden und festbekleppt </label>
                         </div>            
                     </div>
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Reparaturfähigkeit</h4>
                        <div class=" form-check ">
                            <input type="radio" name="zustand" id="" v-model="contract.attributes.earlierrepair" value="Die Konsole oder Geräte wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich reapriert" class="form-check-inpu mx-1">
                            <label for="">Die Konsole oder Geräte wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert</label>
                         </div>
                        <div class=" form-check ">
                            <input type="radio" name="zustand" id="" v-model="contract.attributes.earlierrepair" value="Die Konsole oder Geräte wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg"  class="form-check-inpu mx-1">
                            <label for="">Die Konsole oder Geräte wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg</label>
                         </div>
                         <div class=" form-check ">
                            <input type="radio" name="zustand" id="" v-model="contract.attributes.earlierrepair" value="Nein, nicht geöffnet oder bearbeitet"  class="form-check-inpu mx-1">
                            <label for="">Nein, nicht geöffnet oder bearbeitet</label>
                         </div>                             
                     </div>
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Flüssigkeitschaden</h4>
                        <div class=" form-check ">                            
                            <input type="radio" name="waterdamage" v-model="contract.attributes.waterdamage" value="Nein, kein Wasserschaden oder Flüssigkeitsschaden"  class="form-check-inpu mx-1">
                            <label for="">Nein, kein Wasserschaden oder Flüssigkeitschaden</label>                                
                         </div>
                         <div class=" form-check ">
                            <input type="radio" name="waterdamage" v-model="contract.attributes.waterdamage" value="Die Konsole hat  Wasserschaden oder andere Flüssigkeitsschaden" class="form-check-inpu mx-1">
                            <label for="" class="form-check-label ">  Die Konsole hat  Wasserschaden oder andere Flüssigkeitschaden </label>
                         </div>
                     </div>
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">
                            Aussicht Zustand
                        </h4>
                        <div class=" form-check ">
                            <input type="radio" name="case" v-model="contract.attributes.casestatus" value="Case oder gehäuse hat ein Bruch oder schaden"  class="form-check-input mx-1">
                            <label for="" class="form-check-label ">  Case oder Gehäuse hat ein Bruch oder schaden</label>
                         </div>
                         <div class=" form-check ">
                            <input type="radio" name="case" v-model="contract.attributes.casestatus" value="Nein, Case ist in guten Zustand und hat nur leichte  kratzen"  class="form-check-input mx-1">
                            <label for="" class="form-check-label ">Nein, Case ist in guten Zustand und hat nur leichte gebrauchte kratzen</label>
                         </div>
                     </div >
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">AGB</h4>
                        <div class="form-check    ">
                            <input type="checkbox" name="agb"  v-model="agbagreement" class="form-check-input mx-2">
                            <label for="" class="form-check-label "><a href="#"> AGB</a> gelesen und einverstanden</label>
                        </div>
                     </div>             
                    <input type="submit" class="btn btn-primary w-100 mb-3" value="Speichern und Add zum Warenkorp" :disabled="!agbagreement">
                </form>
            </div>
        </div>
        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
import navbar from '../layouts/navbar.vue'
export default {
    name:"editcontract",
    components:{navbar} ,
    data(){
        return{
            services:[],
            devices:[],        
            selectedservices:[],
            agbagreement:false,
            contract:           
            {
                serialnumber:'',
                selected_device:'', 
                contract_type:'',
                norserialnumber:'',
                faultdescription:'',
                accesories:'',
                warantysiegel:'',
                earlierrepair:'',
                waterdamage:'',
                casestatus:'',

            }
            
        }
    },
    created(){
        this.getalldevices();  
        this.getcontract()     
    },
    computed:{
        ...mapGetters({
            user:"auth/getuser",
            authenticated:"auth/getauthenticated",
            contractscount:"auth/GET_CONTRACTS_COUNT",
            token:"auth/gettoken",
            allservices:"auth/GET_SERVICES",
        }),
       
    },

    methods:{
        async getalldevices()
        {
            await axios.get('/sanctum/csrf-cookie');
                        let config={
                                        headers:{
                                            Accept: 'application/vnd.api+json',                                
                                            Authorization: `Bearer ${this.token}`
                                        }
                                    }
            await axios.get(`/api/devices`,config)
                        .then(response=>{
                                    this.devices=response.data
                                })
                        .catch(error=>{console.log(error)})                                   

        },
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
                                                    console.log(response.data.data.attributes.Contract_Type)
                                                    this.contract=response.data.data
                                                    

                                                })
                                                .catch(()=>{console.log('Failed!!!!!')})

                    }, 
    }
    
}
</script>
<style lang="">
    
</style>