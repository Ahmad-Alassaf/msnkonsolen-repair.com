<template >
    <div class=" form col-8 shadow m-auto  ">
        <h4 class="bg-primary text-white px-2 py-1  shadow ">
           Gerät
        </h4>
        <form @submit.prevent="submit" class="px-3">
            <select  class="form-select mb-3"  v-model="contract_type">
                <option value="">--Select Contract Type--</option>
                <option value="New">New Contract </option>
                <option value="Waranty">Waranty </option>
            </select>
            
            <select name="" id=""  v-model="selected_device"  class="form-select mb-3" >
                <option value="">--Select Device Type--</option>
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
                <label for="">Serial Number:</label>
               <input type="text" placeholder="Serial Number..." v-model="serialnumber" class="form-control mb-1" >
                <small class="mx-2">wenn Kein Serialnumber, Schreiben 'Kein Seriennummer'</small>
            </div>
            <div class="form-group mb-3">
                <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Fehler Beschreibung</h4>
                <textarea name="" class="form-control" id="" v-model="faultdescription" rows="5" placeholder="Text..."></textarea>
            </div>
            <div class="form-group mb-3">
                <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Zubehör zumitschicken</h4>
                <textarea name="accesories" v-model="accesories" class="form-control" id="" rows="3" placeholder="Text..."></textarea>
            </div>
             <div class="py-3">
                <h4 class="bg-secondary text-white px-2 py-1  shadow rounded">Garanty Siegeln Zustand</h4>
                <div class=" form-check ">
                
                    <input type="radio" name="siegelstatus" v-model="siegelstatus" value="Die sind entfernt oder beschädigt" class="form-check-inpu mx-1">
                    <label for="" class="form-check-label ">Die sind entfernt oder beschädigt </label>
                 </div>
                 <div class=" form-check ">
                    
                    <input type="radio" name="siegelstatus" v-model="siegelstatus" value="Vorhanden und Festbekelebt"  class="form-check-inpu mx-1">
                    <label for="" class="form-check-label ">Die Sind vorhanden und festbekleppt </label>
                 </div>

             </div>
             <div class="py-3">
                <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Reparaturfähigkeit</h4>
                <div class=" form-check ">
                    <input type="radio" name="zustand" id="" v-model="earlierrepair" value="Die Konsole oder Geräte wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich reapriert" class="form-check-inpu mx-1">
                    <label for="">Die Konsole oder Geräte wurde schon mal  geöffnet  wegen anderen Fehler und erfoigreich repariert</label>
                 </div>
                <div class=" form-check ">
                    <input type="radio" name="zustand" id="" v-model="earlierrepair" value="Die Konsole oder Geräte wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg"  class="form-check-inpu mx-1">
                    <label for="">Die Konsole oder Geräte wurde schon mal  geöffnet und bearbeitet aber ohne Erfolg</label>
                 </div>
                 <div class=" form-check ">
                    <input type="radio" name="zustand" id="" v-model="earlierrepair" value="Nein, nicht geöffnet oder bearbeitet"  class="form-check-inpu mx-1">
                    <label for="">Nein, nicht geöffnet oder bearbeitet</label>
                 </div>
                 
             </div>
             <div class="py-3">
                <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">Flüssigkeitschaden</h4>
                <div class=" form-check ">
                
                    <input type="radio" name="waterdamage" v-model="waterdamage" value="false"  class="form-check-inpu mx-1">
                    <label for="">Nein, kein Wasserschaden oder Flüssigkeitschaden</label>
                    
                 </div>
                 <div class=" form-check ">
                    <input type="radio" name="waterdamage" v-model="waterdamage" value="true" class="form-check-inpu mx-1">
                    <label for="" class="form-check-label ">  Die Konsole hat  Wasserschaden oder andere Flüssigkeitschaden </label>
                 </div>
             </div>
             <div class="py-3">
                <h4 class="bg-secondary text-white px-2 py-1 shadow rounded">
                    Aussicht Zustand
                </h4>
                <div class=" form-check ">
                    <input type="radio" name="case" v-model="casestatus" value="Case oder gehäuse hat ein Bruch oder schaden"  class="form-check-input mx-1">
                    <label for="" class="form-check-label ">  Case oder Gehäuse hat ein Bruch oder schaden</label>
                 </div>
                 <div class=" form-check ">
                    <input type="radio" name="case" v-model="casestatus" value="Nein, Case ist in guten Zustand und hat nur leichte  kratzen"  class="form-check-input mx-1">
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
</template>
<script>

import {mapGetters,mapActions} from 'vuex'
export default {
    name:"addcontract",
    data(){return{
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


           
    }},
    created(){
        this.getalldevices();       
    },
    computed:{
        ...mapGetters({
            token:"auth/gettoken",
            allservices:"auth/GET_SERVICES",
        }),
    },
    methods:{
        ...mapActions({
            increase:"auth/getcontracts",
            

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
                siegelstatus:this.siegelstatus,
                earlierrepair:this.earlierrepair,
                waterdamage:this.waterdamage,
                casestatus:this.casestatus,
                agbagreement:this.agbagreement

            },config)
                        .then((response)=>{
                            this.$router.push({name:'showcontract',params:{id:response.data.data.id}})

                        })
                        .catch(error=>{console.log(error)})

        }
        
    }
   
    
    
  
    
}
</script>
<style lang="">
    
</style>