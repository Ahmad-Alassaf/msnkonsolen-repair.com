<template >
           <div class="row  shadow mb-2">
                <div class="col-md-2 text-center p-0"  >               
                    <img :src="`storage/images/${contract.relationships.services[0].attributes.foto}`" alt=""  class="img-fluid">               
                </div>
                <div class="col-sm-12  col-md-8  p-0 text-center">
                        <h3 class=" text-center bg-dark text-white w-100 "> JobsRef#: {{contract.attributes.jobsnumber}}</h3>
                            <div class="px-1 ">     
                                <p class="m-0">{{contract.attributes.device}}</p>               
                                <p class="m-0">SN:{{contract.attributes.serialnumber}}</p>  
                            </div>
                            <div class="">
                                <ul class=" list-group mb-0">
                                    <li class="list-group-item active rounded-0">Bestellung</li>
                                    <li v-for="service in contract.relationships.services" class="list-group-item"> 
                                        {{ service.attributes.title }} 
                                        <span class="bg-danger text-white rounded px-1">{{ service.attributes.prise }}</span> €
                                    </li>
                                </ul>
                               
                            </div>
                            <span class="bg-danger text-center text-white  px-2  float-start py-1 my-1 ">
                                Auftragkosten:{{ gesamtprise  }}€ + Versandkosten
                            </span>   
                    </div>
                    <div class="col-sm-12 col-md-2  text-center align-self-center py-2 ">
                        <button class="btn btn-danger  " @click="deletecontract(contract.id)"><i class="fa-solid fa-trash"></i></button> 
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