<template >
    <navbar />
    <jambotron />
    
    <div class="container pt-5" v-if="contract!=null" id="contract">
        <div class="d-flex justify-content-between ">
            <h3 class="px-2 py-2"> Auftragnummer: {{contract.attributes.jobsnumber}}</h3>
            <div class="">
                <h4 class="py-2 px-2 ">{{contract.attributes.status}}</h4>
                <p class="  text-center text-danger" v-if="contract.attributes.paidstatus=='unpaid'">{{contract.attributes.paidstatus}}</p>
                <p class="  text-center text-success" v-else>{{contract.attributes.paidstatus}}</p>


            </div>
           
        </div>
       
        
        <div class="row m-0 p-0">
            <div class="col-md-5 border p-0">
                <h4 class="bg-secondary text-white px-2 py-1">Kundendaten:</h4>
                <div class="row px-3">
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
                        <span >{{address.attributes.street}}. </span>
                        <span >{{address.attributes.hausnumber}}, </span>
                        <span >{{address.attributes.postal}} </span>
                        <span >{{address.attributes.city}}</span>
                    </div>
                </div>
                
            </div>
            <div class="col-md-7 border p-0">
                <h4 class="bg-secondary text-white px-2 py-1">Auftrag-Gerät Daten:</h4>
                <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                   <span>Auftrag Type</span>
                   <span>{{contract.attributes.Contract_Type}}</span>
                </div>
                <div class="d-flex py-1 px-2 justify-content-between border-bottom ">
                    <span>Erstellt am</span>
                    <span>{{formatedDate(contract.attributes.created_at)}}</span>
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
                    <span>Case status</span>
                    <span>{{contract.attributes.casestatus}}</span>
                 </div>
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Waranty Siegeln</span>
                    <span>{{contract.attributes.warantysiegel}}</span>
                 </div>
                 <div class="d-flex py-1 px-2 justify-content-between border-bottom">
                    <span>Flüssigkeitschaden</span>
                    <span>{{contract.attributes.waterdamage===0?'Nein':'Ja' }}</span>
                 </div>
                 <div class=" py-1 px-2  border-bottom">
                    <span class="d-block ">früher Reparatur</span>
                    <span class="px-3">{{contract.attributes.earlierrepair}}</span>
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
            <pre class="  ">{{contract.attributes.faultdescription}}</pre>
        </div>
        <div class="border">
            <h4 class="bg-secondary text-white px-2 py-1">Zubehör</h4>
            <p>{{contract.attributes.accesories}}</p>
        </div>
        <div class="border" v-if="contract.attributes.techniciandiagnose!=''">
            <h4 class="bg-secondary text-white px-2 py-1" >Technicker Diagnose</h4>
            <p>{{contract.attributes.techniciandiagnose}}</p>
        </div>
        <div class="border" v-if="contract.attributes.repairdetail!=''">
            <h4 class="bg-secondary text-white px-2 py-1" >Reparatur Beschreibung</h4>
            <p>{{contract.attributes.repairdetail}}</p>
        </div>
        <div class="py-2 d-none" id="customersignitur">
            <h3> Kunden Unterschreiben:</h3>
            <p>{{contract.relationships.user.attributes.name}}</p>
            <p>---------------------------</p>
        </div>
        <div class="d-flex py-1 px-2 justify-content-end" id="actionsbutton">
           
            <router-link :to="{name:'editcontract',params:{id:this.$route.params.id}}" class="btn btn-primary m-1 " > bearbeiten</router-link>
            <button class="btn btn-primary m-1" @click="saveaspdf()">PDF Speichern</button>
            <router-link :to="{name:'kasse',params:{}}" class="btn btn-danger m-1" v-if="contract.attributes.paidstatus=='unpaid'"> Zur Kasse</router-link>
           
        </div>
      
        
    </div>
</template>
<script>
import navbar from "../layouts/navbar.vue"
import jambotron from "../layouts/jambotron.vue"

import html2pdf from "html2pdf.js";
import dayjs from 'dayjs'
import { computed } from "vue"
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import getcontract from '../../compasable/contracts/getcontract.js'
export default {
    name:"showcontract",
    components:{
        navbar,      
        jambotron,
         
    },
    setup(){
        const route = useRoute();
        const store = useStore()
        const token=computed(()=>{
           return store.getters["auth/gettoken"]
        })
        const {contract,contracterror,loadcontract,contractprise}=getcontract(); 
        loadcontract(route.params.id,token)       
        const formatedDate=((data)=>{
               const date = dayjs(data);            
               return date.format('dddd:D MMMM , YYYY');
        })
        const saveaspdf=async ()=>{
            let actionsbuttun=document.getElementById('actionsbutton')
            actionsbuttun.classList.add('d-none')
           let customersignitur=document.getElementById('customersignitur')
           customersignitur.classList.remove('d-none')
           customersignitur.classList.add('d-block')            
            let pdf= document.getElementById("contract")
          
            
          html2pdf(pdf, {
				margin: 1,
  		     filename: contract.value.attributes.jobsnumber,
			}).then(()=>{
                actionsbuttun.classList.remove('d-none')
           actionsbuttun.classList.add('d-block')
           customersignitur.classList.add('d-none')

            });
         
          
      

        }
      
        return {contract,saveaspdf,formatedDate}
    }
          
   }
</script>
