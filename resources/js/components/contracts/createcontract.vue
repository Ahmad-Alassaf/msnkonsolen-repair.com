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
                <div class=" form  shadow m-auto pb-3">
                    <h4 class="bg-primary text-white px-2 py-1  shadow ">
                       Gerät
                    </h4>
                    <form @submit.prevent="submit" class="px-3">
                        <select  class="form-select mb-3"  v-model="contract_type">
                            <option value="">--Wählen Sie Auftrag aus--</option>
                            <option value="New">Neuer Auftraf </option>
                            <option value="Waranty">Garantie </option>
                        </select>
                         <div class="accordion" id="accordionExample" v-if="contract_type=='Waranty'">
                                    <div class="accordion-item"  v-for="contract in contracts">
                                      <h2 class="accordion-header" :id="`heading${contract.id}`">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="`#collapse${contract.id}`" aria-expanded="true" :aria-controls="`collapse${contract.id}`">
                                            JobsRef#:{{ contract.attributes.jobsnumber }}  Geräte: {{contract.attributes.device }}. created at:{{ formatedDate( contract.attributes.created_at) }}
                                        </button>
                                      </h2>
                                      <div :id="`collapse${contract.id}`" class="accordion-collapse collapse " :aria-labelledby="`heading${contract.id}`" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                         
                                            <div class="form-group mb-3">
                                                <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Fehler Beschreibung(Waranty)</h4>
                                                <textarea name="" class="form-control" id="" v-model="faultdescription" rows="5" placeholder="Beschreibung für Waranty..."></textarea>
                                            </div>
                                            <button class="btn btn-primary" @click.prevent="warantyorder(contract)">Waranty Bestellung</button>
                                        </div>
                                      </div>
                                    </div>
                                </div>          
                        <div v-else-if="contract_type=='New'">

                       
                        <select name="" id=""  v-model="selected_device"  class="form-select mb-3" >
                            <option value="">--Wählen Sie Gerät aus--</option>
                            <option v-for="device in devices" :value="device">{{ device.attributes.title }} </option>                               
                        </select>
                        <ul class="list-group  mr-auto my-2 px-5" v-if="selected_device !=null">
                            <li v-for=" service in selected_device.relationships.services" class="list-group-item d-flex justify-content-between mb-3 border  ">
                                <div class="d-flex w-100" >
                                    <input type="checkbox" class="m-1" name="" id="" v-model="selectedservices"  :value="service.id" >
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
                         <input type="submit" class="btn btn-primary w-100 mb-3" value="Speichern und Add zum Warenkorp" :disabled="!agbagreement"> 
                        </div>           
                      
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
import{ref,computed,} from 'vue'
import { useRouter, useRoute } from 'vue-router';
import dayjs from 'dayjs';
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
        const serialnumber=ref('')
        const selected_device=ref(null)
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
        const formatedDate=(input)=>{
            const date = dayjs(input);
              // Then specify how you want your dates to be formatted
            return  date.format('dddd:D MMMM , YYYY');
        }
    
        const {deviceserror,devices,loaddevices}=getdevices()
        loaddevices()
   /*      const  {services,error,load}=getservices()
        load() */

        const {contracts,contractserror,loadcontracts,contractsprise}=getcontracts()
        loadcontracts(token)
        const {addcontracterror,runaddcontract,newcontractid}=addcontract()
        const submit=()=>{
            console.log('selectedservices.value')
               console.log(selectedservices.value)
               console.log('selected_device.value')
               console.log(selected_device.value)
             runaddcontract({
                'Contract_Type':contract_type.value,
                'device':selected_device.value.attributes.title,
                'serialnumber':serialnumber.value,
                'accesories':accesories.value,
                'faultdescription':`${faultdescription.value}`,
                'status':'In ShoppingCart',
                'warantysiegel':warantysiegel.value,
                'casestatus':casestatus.value,
                'waterdamage':waterdamage.value,
                'earlierrepair':earlierrepair.value,
                'services':selectedservices.value

             },token).then(()=>{
                   console.log(newcontractid.value)
                  id.value=newcontractid.value
                 selectedservices.value=[]
                 serialnumber.value=[]            
                 selected_device.value=null
                 contract_type.value=''
                 norserialnumber.value=''
                 faultdescription.value=''
                 accesories.value=''
                 warantysiegel.value=''
                 earlierrepair.value=''
                 waterdamage.value=''
                 casestatus.value=''
                 agbagreement.value=''
                 console.log( 'id.value')
                 console.log( id.value)
                 router.push({name:'showcontract',params:{id:id.value}})

             })

        }
        const warantyorder=(contract)=>{
            console.log(contract.attributes.device)


            let serviceslist=[]
            contract.relationships.services.forEach(service=>{serviceslist.push(service.id)})
            runaddcontract({
                'Contract_Type':'Waranty',
                'device':contract.attributes.device,
                'serialnumber':contract.attributes.serialnumber,
                'accesories':contract.attributes.accesories,
                'faultdescription':`${contract.attributes.faultdescription}. \r\n WARANTY:${faultdescription.value}`,
                'status':'In ShoppingCart',
                'warantysiegel':contract.attributes.warantysiegel,
                'casestatus':contract.attributes.casestatus,
                'waterdamage':contract.attributes.waterdamage,
                'earlierrepair':contract.attributes.earlierrepair,
                'services':serviceslist



        }).then(()=>{
                 id.value=newcontractid.value
                 selectedservices.value=[]
                 serialnumber.value=[]            
                 selected_device.value=null
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
        return {    contract_type,faultdescription,serialnumber,casestatus,
                    waterdamage,accesories,warantysiegel,earlierrepair,
                    devices,selectedservices,selected_device,norserialnumber,
                    agbagreement,contracts,user,submit,formatedDate,warantyorder}

    },
    
}
</script>
<style scoped>
.container{
    background-color: #ffffffee;

}
    
</style>