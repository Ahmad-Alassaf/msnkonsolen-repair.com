<template >
   
            <div class="col-2 text-center  p-1">               
                <img :src="`storage/images/${contract.relationships.services[0].attributes.foto}`" alt="" class="img-fluid">               
            </div>
            <div class="col-10">
                <h3 class=" text-center bg-secondary text-white w-100 "> Auftragnummer: {{contract.attributes.jobsnumber}}</h3>
                <div class="d-flex  ">                    
                    <div class=" d-flex col-10 justify-content-between">               
                        <div class="px-2 ">
                            <p class="m-0">Auftrag: {{contract.attributes.Contract_Type}}</p>                        
                            <p class="m-0">Gerät:{{contract.attributes.device}}</p>               
                            <p class="m-0">Gerät Serienummer:{{contract.attributes.serialnumber}}</p>  
                        </div>
                        <div>
                            <ul class=" mb-0">
                                <li v-for="service in contract.relationships.services"> 
                                    {{ service.attributes.title }} 
                                    <span class="bg-danger text-white rounded px-1">{{ service.attributes.prise }}</span> €
                                </li>
                            </ul>
                            <div class="bg-primary text-center text-white  px-2  w-100 ">Auftragkosten:{{ gesamtprise  }}€ + Versandkosten</div>
                        </div>
                    </div> 
                    <div class="col-2  d-flex align-items-center">
                        <button class="btn btn-danger m-auto" @click="deletecontract(contract.id)"><i class="fa-solid fa-trash"></i></button> 
                    </div>         
                </div>
            </div>
   
</template>
<script>
import dayjs from 'dayjs';
import {mapActions, mapGetters} from 'vuex'
export default {
    name:'contract',
    props:['contract'],
    data(){
        return{
            serviceslist:this.contract.relationships.services
        }

    },
   
    components:{},
    computed:{
        ...mapGetters({
            token:"auth/gettoken",
                 

        }),
        gesamtprise(){
            let costing=0;
            this.serviceslist.forEach(element => {
                costing +=parseInt(element.attributes.prise)
                
            });
           
          return costing

        }

    }, 
      
    methods:{
        ...mapActions({
            contracts:'auth/getcontracts'}),
       async deletecontract(id)
        {
            let config={
                                headers:{
                                    Accept: 'application/vnd.api+json',                                
                                    Authorization: `Bearer ${this.token}`
                                }
                        } 
            await axios.get('/sanctum/csrf-cookie');                                           
            await  axios.delete(`/api/contracts/${id}`,config)
                        .then(()=>{
                                console.log('Contract deleted successfully')
                                this.contracts()
                            })
                        .catch((er)=>{console.log(er)})

        },
        formatDate(dateString) 
                       {
                                const date = dayjs(dateString);
                                    // Then specify how you want your dates to be formatted
                                return date.format('dddd:D MMMM , YYYY');
                        },
    }
   
}
</script>
<style lang="">
    
</style>