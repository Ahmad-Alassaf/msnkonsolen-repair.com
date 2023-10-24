<template >
    <div>
        <navbar />
        
        <div class=" mt-1"  v-if="contract!=null">
         
            <div class=" form col-6 shadow m-auto  ">
                <h4 class="bg-primary text-white px-2 py-1 text-center  shadow ">
                   Auftragänderung
                </h4>
                <form @submit.prevent="savechanges" v-if="contract.attributes !=null" class="px-3">
                    <div class=" text-center  py-3">
                        <h3>Auftrag</h3>
                        <p class="d-block  py-1 px-1">{{contract.attributes.Contract_Type}}</p>
                        <small class="d-block text-danger">Um Auftrag zu änedrn, Sie müssen der Auftrag Löchen und wieder einen neuen Auftrag erstellen</small>

                    </div>
                    <div class="py-3 text-center ">
                        <h3 >Gerät</h3>
                        <p for=""> {{contract.attributes.device}}</p>
                        <ul class="list-group  mr-auto my-2 px-5">
                           
                            <li v-for=" service in contract.relationships.services" class="list-group-item d-flex justify-content-between mb-3 border  ">                                   
                                    <div class="d-flex  justify-content-between  w-100 ">
                                        <p class="">{{service.attributes.title}}</p> 
                                        <p class="">  {{service.attributes.prise}} €</p> 
                                        <button class="btn btn-danger  rounded-5" @click="removeservice(service.id)"> X </button> 
                                    </div>               
                            </li>
                        </ul>

                    </div>
                    <select name="" id=""  v-model="selected_device" @change="changedevice(selected_device)"  class="form-select mb-3" >
                        <option  selected value="">--Select Device Type--</option>
                        <option v-for="device in devices" :value="device" >{{ device.attributes.title }} </option>                               
                    </select>
                    <ul class="list-group  mr-auto my-2 px-5" v-if="selected_device!=null">
                        <small v-if="selected_device.relationships.services.length>0" class="fst-italic text-success">Verfügbare Servicese für <span class="fw-bold text-primary">{{contract.attributes.device}}</span> </small>
                        <small v-else class="text-danger">Derzeit Keine Services verfügbar für {{contract.attributes.device}}</small>
                        <li v-for=" service in selected_device.relationships.services" class="list-group-item d-flex justify-content-between mb-3 border  ">
                            <div class="d-flex w-100" >
                                <div class="d-flex  justify-content-between  w-100">
                                    <span class="">{{service.title}}</span> 
                                    <span class="">  {{service.prise}} €</span> 
                                    <span class="btn btn-success  rounded-5" @click="addservice(service)">+ </span> 
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
                             class="form-check-input mx-1">
                            <label for="" class="form-check-label ">Die sind entfernt oder beschädigt </label>
                         </div>
                         <div class=" form-check ">                                
                            <input type="radio"
                             name="siegelstatus"
                             v-model="contract.attributes.warantysiegel"
                            
                             value="Vorhanden und Festebekelebt"
                              class="form-check-input mx-1">
                            <label for="" class="form-check-label ">Die Sind vorhanden und festbekleppt </label>
                         </div>            
                     </div>
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Reparaturfähigkeit</h4>
                        <div class=" form-check ">
                            <input type="radio" name="zustand" 
                             v-model="contract.attributes.earlierrepair"
                             value="Die Konsole oder Gerät wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert" 
                             :checked="contract.attributes.earlierrepair==='Die Konsole oder Gerät wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert'"
                             class="form-check-input mx-1">
                            <label for="">Die Konsole oder Geräte wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert</label>
                         </div>
                         <div class=" form-check ">
                            <input type="radio" name="zustand" 
                             v-model="contract.attributes.earlierrepair"
                             value="Die Konsole oder Gerät wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg" 
                             :checked="contract.attributes.earlierrepair==='Die Konsole oder Gerät wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg'"
                             class="form-check-input mx-1">
                            <label for="">Die Konsole oder Gerät wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg</label>
                         </div>
                   
                         <div class=" form-check ">
                            <input type="radio" name="zustand" 
                             v-model="contract.attributes.earlierrepair"
                              value="Nein, nicht geöffnet oder bearbeitet" 
                             :checked="contract.attributes.earlierrepair==='Nein, nicht geöffnet oder bearbeitet'"
                               class="form-check-input mx-1">
                            <label for="">Nein, nicht geöffnet oder bearbeitet</label>
                         </div>                             
                     </div>
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Flüssigkeitschaden</h4>
                        <div class=" form-check ">                            
                            <input type="radio" name="waterdamage" 
                            v-model="contract.attributes.waterdamage" 
                            value=0
                            :checked="contract.attributes.waterdamage===0"
                              class="form-check-inpu mx-1">
                            <label for="">Nein, kein Wasserschaden oder Flüssigkeitschaden</label>                                
                         </div>
                         <div class=" form-check ">
                            <input type="radio" name="waterdamage"
                             v-model="contract.attributes.waterdamage"
                              value=1
                              :checked="contract.attributes.waterdamage===1"
                               class="form-check-inpu mx-1">
                            <label for="" class="form-check-label ">  Die Konsole hat  Wasserschaden oder andere Flüssigkeitschaden </label>
                         </div>
                     </div>
                     <div class="py-3">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">
                            Aussicht Zustand
                        </h4>
                        <div class=" form-check ">
                            <input type="radio" name="case" 
                            v-model="contract.attributes.casestatus" 
                            value="Case oder Gehäuse hat ein Bruch oder schaden"
                            :checked="contract.attributes.casestatus==='Case oder Gehäuse hat ein Bruch oder schaden'"
                              class="form-check-input mx-1">
                            <label for="" class="form-check-label ">  Case oder Gehäuse hat ein Bruch oder schaden</label>
                         </div>
                         <div class=" form-check ">
                            <input type="radio" name="case" 
                            v-model="contract.attributes.casestatus"
                             value="Case ist in einem  guten Zustand"  
                             :checked="contract.attributes.casestatus==='Case ist in einem  guten Zustand'"
                             class="form-check-input mx-1">
                            <label for="" class="form-check-label ">Nein, Case ist in guten Zustand und hat nur leichte gebrauchte kratzen</label>
                         </div>
                     </div >
                 
                     <div class="py-3" v-if="contract.attributes.paidstatus=='payed'">
                        <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Send zur Reparaur</h4>
                       
                        <input type="text" class="form-control" v-model="contract.attributes.trackingnumber"   placeholder="Trackingnummer...">
                     </div>
                     <div v-if="contract.attributes.paidstatus=='payed'">
                        <div class="py-3" v-for="role in user.roles">
                            <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Auftrag Status</h4>
                            <select  class="form-select mb-3" v-model="contract.attributes.status"   v-if=" role.attributes.name=='Admin'" >
                                <option value="" >--Status ändern--</option>
                                
                                <option value="Sended To Repair" :selected="contract.attributes.status==='Sended To Repair'">  Sended To Repair</option>
                                <option value="Recieved in Repair" :selected="contract.attributes.status==='Recieved in Repair'">  Recieved in Repair</option>
                                <option value="in Bearbeiten" :selected="contract.attributes.status==='in Bearbeiten'"> in Bearbeiten </option>
                                <option value="in Bearbeiten" :selected="contract.attributes.status==='in Bearbeiten'"> in Bearbeiten </option>
                                <option value="Repaired" :selected="contract.attributes.status==='Repaired'"> Reparatur fertig </option>
                                <option value="Sended to Costumer" :selected="contract.attributes.status==='Sended to Costumer'"> rausgeschicken </option>
                            </select>
    
                         </div>

                     </div>
                     <div class="py-3" v-for="role in user.roles">
                        <div v-if="role.attributes.name=='Admin'" >
                            <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Techniker Diagnose</h4>
                            <textarea v-model="contract.attributes.techniciandiagnose" class="form-control" id="" cols="30" rows="10" placeholder="Technicher Diagnose..."></textarea>
    

                        </div>
                      
                     </div>
                     <div class="py-3" v-for="role in user.roles">
                        <div v-if="role.attributes.name=='Admin'">
                            <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Reparatur beschreibung</h4>
                            <textarea  v-model="contract.attributes.repairdetail" class="form-control" id="" cols="30" rows="10" placeholder="Beschreibung..."></textarea>
    

                        </div>

                     </div>

                    <input type="submit" class="btn btn-primary w-100 mb-3" value="Speichern " >
                </form>
            </div>
        </div>
        
    </div>
</template>
<script>
import Swal from 'sweetalert2'
import navbar from '../layouts/navbar.vue'
import {ref, computed,onMounted} from 'vue'
import { useStore  } from 'vuex'
import { useRoute,useRouter } from 'vue-router'
import getcontract from '../../compasable/contracts/getcontract'
import getdevices from '../../compasable/devices/getdevices'
import editcontract from '../../compasable/contracts/editecontract'
export default {
    name:"editcontract",
    components:{navbar} ,
    setup(){
        const user=ref(null)
        const route = useRoute();
        const router=useRouter();
        const store=useStore();
        const selected_device=ref(null)
       
        const Trackingnummer=ref(false)
        const token=computed(()=>{
          
            return store.getters['auth/gettoken']

        })
         user.value=  store.getters['auth/getuser']
         const {contract,contracterror,loadcontract,contractprise}=getcontract(); 
         const {deviceserror,devices,loaddevices} =getdevices()
         loadcontract(route.params.id,token) 
        
        loaddevices()
       
        const changedevice=(device)=>{
            for(let i=0;i<contract.value.relationships.services.length;i++){
                contract.value.relationships.services.splice(i,1)

            }
          
            contract.value.attributes.device=device.attributes.title
        }
        const addservice=(newservice)=>{
            const localservice={
                'id':newservice.id,
                'attributes':{
                    'title':newservice.title,
                    'prise':newservice.prise,
                },
               
            } 
            let serviceexist=false
            contract.value.relationships.services.forEach(element => {
                if(element.id==newservice.id)
                {
                    serviceexist=true

                }
                
            });
            if(! serviceexist){ contract.value.relationships.services.push(localservice)}
            else{
                Swal.fire({
                                                                   
                                                                      icon: 'error',
                                                                      title: 'Service bereits gefügt !',
                                                                      text:'Man kann nicht ein Service zwei mal fügen',
                                                                     
                                        })  
            }
        }
        const removeservice=(id)=>{
            let index=0
            // Finde Element to delete it
            contract.value.relationships.services.forEach(element => 
            {
                if(element.id==id)
                {
                    index=contract.value.relationships.services.indexOf(element)

                }
            })
            // End Find Element 
            // If Elemenet founded
            if(index!=-1)
            {
                let text = "Sind Sie Sicher !\nEither OK or Cancel.";
                if (confirm(text) == true) {
                    contract.value.relationships.services.splice(index,1)
                }
                
                
                                 
            }
        }
        const savechanges=()=>{
            const  {recieving}=editcontract()
            recieving(token,contract.value)
            .then(()=>{
            
                            
            })
            .catch(err=>()=>{
              
            if(err.value.response.status==401)
            {
              store.dispatch("auth/logout")
            }
            })

        }
        return {contract , devices,user,selected_device,Trackingnummer,changedevice,addservice,removeservice,savechanges} 
    },    
}
</script>