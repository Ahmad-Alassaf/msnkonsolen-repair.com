<template >
    <jambotron />
    <navbar />
    <div class="container py-5" v-if="service.attributes!=null">
        <form @submit.prevent="save()" method="put" enctype="multipart/form-data">
       
        <div class="card mb-2 shadow-sm"  >          
            <div class="card-header" v-if="service">
               
               <input type="text" class="form-control" v-model="service.attributes.title" >
              <span v-for="device in devices" >
                    <input type="checkbox" :id="device.id"   :value="device"  @click="adddevice(device)"   :checked="service.relationships.devices.find(e=>e.attributes.title===device.attributes.title)"> {{ device.attributes.title }}
                                        
                </span >
            </div>
            <div class="card-body p-0">
                <div class="d-flex">
                    <div class="col-3   ">
                        <img v-if="!changefotofalg"  :src="`../storage/images/${service.attributes.foto}` " alt="" class="img-thumbnail m-1 " style="height: 15rem; width:auto" >
                        <img v-if="changefotofalg" :src="url" alt="" class="img-thumbnail m-1 " style="height: 15rem; width:auto" >
                        <input type="file" class="" @change="onImageChange"  name="foto" id="getFile" >
                    </div>
                    <div class="col-9">
                        <textarea name="" class="form-control mx-auto bg-white m-1"  id="" rows="10" v-model="service.attributes.description" >{{service.attributes.description}}</textarea>
                        <div class="d-flex">
                            <div class="w-50 m-1 ">
                                <Label for="nummber" class="">Waranty:</Label>
                                <input type="number" id="nummber" min="1" max="6" v-model="service.attributes.waranty" class="form-control ">
                            </div>
                            <div class="w-50 m-1">
                                <Label>Prise:</Label>
                                <input type="number" min="20" max="150" v-model="service.attributes.prise" class="form-control ">
                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
            <input type="submit" value="Save" class="btn btn-primary">
        </div>
    </form>
        
    </div>
</template>
<script>
import navbar from "../layouts/jambotron.vue";
import jambotron from '../layouts/navbar.vue';
import { mapActions,mapGetters } from 'vuex';
export default {
    name:"editservice",
    components:{
      
      navbar,      
      jambotron,    
  },
    data(){
        return{
            service:{},
            url:null,
            deviceslist:[],
            changefotofalg:false,
            url:null,
            newdevices:[],
            newfoto:"",
          

        }
    },
    computed:{ 
        ...mapGetters({
            user:"auth/getuser",
            authenticated:"auth/getauthenticated",
            token:"auth/gettoken",
            services:"auth/GET_SERVICES",
            devices:"auth/GET_DEVICES"
        }),       
    },
    created(){
        this.getService();
      
       

    },
    methods: {
       ...mapActions({
        getservices:"auth/getservices",
        getservicedevices:"auth/GETSERVICEDEVICES"

       }),
       onImageChange(event){
             this.changefotofalg=true
            this.newfoto=event.target.files[0]
           
            this.url = URL.createObjectURL( event.target.files[0]);
           

        },
        adddevice(device){  
            let index=-1
            
            for(let i in this.service.relationships.devices)
            {
                if(this.service.relationships.devices[i].attributes.title==device.attributes.title)
                {
                    index=i
                   
                }
            }
            if(index==-1){
                this.service.relationships.devices.push(device)
            }
            else{
                this.service.relationships.devices.splice(index,1)
            }
                    
                
          
             
          

        },
         async save(){
            let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${this.token}`
                                                        }
                                                    } 
            await axios.get('/sanctum/csrf-cookie');
            let list=[]
            this.service.relationships.devices.forEach(e=>{
                list.push(e.id)
            })
            let fd=new FormData();
            fd.append('title',this.service.attributes.title);
            fd.append('device',this.service.attributes.device);
            fd.append('description',this.service.attributes.description);
            fd.append('waranty',this.service.attributes.waranty);
            fd.append('prise',this.service.attributes.prise);
            fd.append('foto',this.newfoto);
            fd.append('list',list);
           
            await axios.put(`/api/services/${this.service.id}`,{
                'title':this.service.attributes.title,
                'device':'Device',
                'description':this.service.attributes.description,
                'waranty':this.service.attributes.waranty,
                'prise':this.service.attributes.prise,
                'foto':this.newfoto,
                'list':list

            },config)
            .then((response)=>{
                console.log(response)
               
                
          
            })
            .catch(error=>{
                console.log(error );
            })
           
            

        },
       async  getService(){
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                    Authorization: `Bearer ${this.token}`
                }
            }
            await axios.get(`/api/services/${this.$route.params.id}`,config).then(response=>{
                this.service=response.data.data;
              
            })           
        },
       
    }
  
    
}
</script>
<style lang="">
    
</style>