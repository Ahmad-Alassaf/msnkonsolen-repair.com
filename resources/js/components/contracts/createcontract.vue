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
                        <ul class="list-group" v-if="contract_type=='Waranty'">
                            <li class="list-group-item active">Ihre Aufträge</li>
                            <li class="list-group-item "></li>
                        </ul>
                        <div v-else>

                       
                        <select name="" id=""  v-model="selected_device"  class="form-select mb-3" >
                            <option value="">--Wählen Sie Gerät aus--</option>
                            <option v-for="device in devices" :value="device">{{ device.attributes.title }} </option>                               
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
                                <input type="radio" name="siegelstatus" v-model="warantysiegel" value="Die sind entfernt oder beschädigt" class="form-check-inpu mx-1">
                                <label for="" class="form-check-label ">Die sind entfernt oder beschädigt </label>
                             </div>
                             <div class=" form-check ">                                
                                <input type="radio" name="siegelstatus" v-model="warantysiegel" value="Die Sind vorhanden und festbekleppt"  class="form-check-inpu mx-1">
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
import getdevices from '../../compasable/devices/getdevices'
import getservices from '../../compasable/getservices'
import getcontracts from '../../compasable/contracts/getcontracts'
import addcontract from '../../compasable/contracts/addcontract'
import { useStore } from 'vuex'
import{ref,computed} from 'vue'
import { useRouter, useRoute } from 'vue-router';
export default {
    name:"createcontract",
    components:{
        navbar,      
        jambotron,
        foot   ,
        useraddress   
    },
    setup(){
        const id=ref(null)
        const selectedservices=ref([])
        const serialnumber=ref([])
        const selected_device=ref('')
        const contract_type=ref('')
        const norserialnumber=ref('')
        const faultdescription=ref('')
        const accesories=ref('')
        const warantysiegel=ref('')
        const earlierrepair=ref('')
        const waterdamage=ref('')
        const casestatus=ref('')
        const agbagreement=ref('')
        const store = useStore()
        const router = useRouter();
        const token=computed(()=>{
            return store.getters["auth/gettoken"]

        })
        const user=computed(()=>{
            return store.getters["auth/getuser"]

        })
        const {deviceserror,devices,loaddevices}=getdevices()
        loaddevices()
        const  {services,error,load}=getservices()
        load()

        const {contracts,contractserror,loadcontracts,contractsprise}=getcontracts()
        loadcontracts(token)
       
        const submit=()=>{
            const {addcontracterror,runaddcontract,newcontractid}=addcontract()
             runaddcontract({
                'Contract_Type':contract_type.value,
                'device':selected_device.value.attributes.title,
                'serialnumber':serialnumber.value,
                'accesories':accesories.value,
                'faultdescription':faultdescription.value,
                'status':'In ShoppingCart',
                'warantysiegel':warantysiegel.value,
                'casestatus':casestatus.value,
                'waterdamage':waterdamage.value,
                'earlierrepair':earlierrepair.value,




             },token).then(()=>{
             
                id.value=newcontractid.value
                 selectedservices.value=[]
                 serialnumber.value=[]            
                 selected_device.value=''
                 contract_type.value=''
                 norserialnumber.value=''
                 faultdescription.value=''
                 accesories.value=''
                 warantysiegel.value=''
                 earlierrepair.value=''
                 waterdamage.value=''
                 casestatus.value=''
                 agbagreement.value=''
              
                 router.push({name:'showcontract',params:{id:id.value}})

             })

        }
        return {contract_type,faultdescription,serialnumber,casestatus,waterdamage,accesories,warantysiegel,earlierrepair,devices,services,selectedservices,selected_device,norserialnumber,agbagreement,contracts,user,submit}

    },
    
}
</script>
<style scoped>
.container{
    background-color: #ffffffee;

}
    
</style>