<template >
    <navbar />
    <jambotron />
    <div class="container py-5">
      
       
          
            <div class="col-12   m-auto">
                <h3 class="bg-primary text-white px-2 py-1">Kundendaten</h3>
                <div class=" border m-auto">
                    <h3 class="px-3 text-center">
                        {{ user.attributes.name }}
                    </h3 >
                    <h3 class="px-3 text-center">
                        {{ user.attributes.email }}
                    </h3>
                    <useraddress :user="user"/>
                    

                 </div>

                
                
            </div>
            <div class="md-8 mt-1">
                <div class=" form  shadow m-auto  ">
                    <h4 class="bg-primary text-white px-2 py-1  shadow ">
                       Gerät
                    </h4>
                    <form @submit.prevent="submit" class="px-3">
                        <select  class="form-select mb-3"  v-model="contract_type">
                            <option value="">--Wählen Sie Auftrag aus--</option>
                            <option value="New">Neuer Auftraf </option>
                            <option value="Waranty">Garantie </option>
                        </select>
                        
                        <select name="" id=""  v-model="selected_device"  class="form-select mb-3" >
                            <option value="">--Wählen Sie Gerät aus--</option>
                            <option v-for="device in devices.data" :value="device">{{ device.attributes.title }} </option>                               
                        </select>
                        <ul class="list-group  mr-auto my-2 px-5" v-if="selected_device!=''">
                            <li v-for=" service in selected_device.relationships.services" class="list-group-item d-flex justify-content-between mb-3 border  ">
                                <div class="d-flex w-100" >
                                    <input type="checkbox" class="m-1" name="" id="" v-model="selectedservices"  :value="service" >
                                    <div class="d-flex  justify-content-between  w-100">
                                        <span class="">{{service.title}}</span> 
                                        <span class="">  {{service.prise}} €</span> 
                                    </div> 
                                </div>                               
                            </li>
                        </ul>
                        <div class="form-group mb-3">
                            <label for="">Seriennummer:</label>
                           <input type="text" placeholder="Seriennummer..." v-model="serialnumber" class="form-control mb-1" >
                            <small class="mx-2">wenn Kein Serialnumber, Schreiben 'Kein Seriennummer'</small>
                        </div>
                        <div class="form-group mb-3">
                            <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Fehler Beschreibung</h4>
                            <textarea name="" class="form-control" id="" v-model="faultdescription" rows="5" placeholder="Beschreibung..."></textarea>
                        </div>
                        <div class="form-group mb-3">
                            <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Zubehör zumitschicken</h4>
                            <textarea name="accesories" v-model="accesories" class="form-control" id="" rows="3" placeholder="Zubehör..."></textarea>
                        </div>
                         <div class="py-3">
                            <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Garanty Siegeln Zustand</h4>
                            <div class=" form-check ">                            
                                <input type="radio" name="siegelstatus" v-model="siegelstatus" value="Die sind entfernt oder beschädigt" class="form-check-inpu mx-1">
                                <label for="" class="form-check-label ">Die sind entfernt oder beschädigt </label>
                             </div>
                             <div class=" form-check ">                                
                                <input type="radio" name="siegelstatus" v-model="siegelstatus" value="Die Sind vorhanden und festbekleppt"  class="form-check-inpu mx-1">
                                <label for="" class="form-check-label ">Die Sind vorhanden und festbekleppt </label>
                             </div>            
                         </div>
                         <div class="py-3">
                            <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">vorige Reparatur</h4>
                            <div class=" form-check ">
                                <input type="radio" name="zustand" id="" v-model="earlierrepair" 
                                value="Die Konsole oder Gerät wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert" class="form-check-inpu mx-1">
                                <label for="">Die Konsole oder Gerät wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert</label>
                             </div>
                            <div class=" form-check ">
                                <input type="radio" name="zustand" id="" v-model="earlierrepair" 
                                value="Die Konsole oder Gerät wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg"  class="form-check-inpu mx-1">
                                <label for="">Die Konsole oder Geräte wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg</label>
                             </div>
                             <div class=" form-check ">
                                <input type="radio" name="zustand" id="" v-model="earlierrepair"
                                 value="Nein, nicht geöffnet oder bearbeitet"  class="form-check-inpu mx-1">
                                <label for="">Nein, nicht geöffnet oder bearbeitet</label>
                             </div>                             
                         </div>
                         <div class="py-3">
                            <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Flüssigkeitschaden</h4>
                            <div class=" form-check ">                            
                                <input type="radio" name="waterdamage" v-model="waterdamage" value="Nein, kein Wasserschaden oder Flüssigkeitschaden"  class="form-check-inpu mx-1">
                                <label for="">Nein, kein Wasserschaden oder Flüssigkeitschaden</label>                                
                             </div>
                             <div class=" form-check ">
                                <input type="radio" name="waterdamage" v-model="waterdamage" value="Die Konsole hat  Wasserschaden oder andere Flüssigkeitschaden" class="form-check-inpu mx-1">
                                <label for="" class="form-check-label ">  Die Konsole hat  Wasserschaden oder andere Flüssigkeitschaden </label>
                             </div>
                         </div>
                         <div class="py-3">
                            <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">
                                Aussicht Zustand
                            </h4>
                            <div class=" form-check ">
                                <input type="radio" name="case" v-model="casestatus" value="Case oder Gehäuse hat ein Bruch oder schaden"  class="form-check-input mx-1">
                                <label for="" class="form-check-label ">  Case oder Gehäuse hat ein Bruch oder schaden</label>
                             </div>
                             <div class=" form-check ">
                                <input type="radio" name="case" v-model="casestatus" value="Case ist in einem  guten Zustand"  class="form-check-input mx-1">
                                <label for="" class="form-check-label ">Case ist in einem  guten Zustand</label>
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
   
    <foot /> 
</template>
<script>
import navbar from "../layouts/navbar.vue";
import useraddress from "../Addresses/useraddress.vue"
import foot from '../layouts/foot.vue';
import jambotron from '../layouts/jambotron.vue';
import {mapGetters} from 'vuex'
import { mapActions } from "vuex";
export default {
    name:"createcontract",
    components:{
        navbar,      
        jambotron,
        foot   ,
        useraddress   
    },
    data(){
        return{
            services:[],
            devices:[],        
            selectedservices:[],
            serialnumber:'',
            selected_device:'', 
            contract_type:'',
            norserialnumber:'',
            faultdescription:'',
            accesories:'',
            siegelstatus:'',
            earlierrepair:'',
            waterdamage:'',
            casestatus:'',
            agbagreement:false
        }
    },
    created(){
        this.getalldevices();       
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
        ...mapActions({
            contracts:"auth/getcontracts",
        }),
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
        async submit()
        {
            await axios.get('/sanctum/csrf-cookie');
            let config={
                            headers:{
                                Accept: 'application/vnd.api+json',                                
                                Authorization: `Bearer ${this.token}`
                            }
                        }
            let device_title=this.selected_device.attributes.title;
            let serviceslist=[];
            this.selectedservices.forEach(e=>{
                serviceslist.push(e.id)
            })
           
            await axios.post(`/api/contracts`,{
                Contract_Type:this.contract_type,
                device:device_title,
                serialnumber:this.serialnumber,
                services:serviceslist,
                faultdescription:this.faultdescription,
                accesories:this.accesories,
                siegelstatus:this.siegelstatus.trim(),
                earlierrepair:this.earlierrepair,
                waterdamage:this.waterdamage.trim(),
                casestatus:this.casestatus.trim(),
                agbagreement:this.agbagreement

            },config)
                        .then((response)=>{
                            console.log(response.data)
                            this.contracts();
                            this.$router.push({name:'showcontract',params:{id:response.data.data.id}})

                        })
                        .catch(error=>{console.log(error)})
                       

        }
    }
    
}
</script>
<style scoped>
.container{
    background-color: #ffffffee;

}
    
</style>