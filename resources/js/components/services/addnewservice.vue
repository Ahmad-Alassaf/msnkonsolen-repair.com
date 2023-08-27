<template >
    <navbar />
    <jambotron />
    <div class="container">
       
        <form @submit.prevent="addnewservice()" method="post" class="form row pt-5" enctype="multipart/form-data">
            <div class="col-md-3 ">
                <img v-if="url" :src="url"  alt="" class="img-thumbnail border-0">
                <input type="file" class="form-control" name="foto"  @change="onImageChange">
               
            </div>
            <div class="col-md-8">
                <input type="text" v-model="formdata.title" class="form-control" placeholder="Service Name...">
                <div class="row">
                    <div class="col-md-4">
                        <span v-for="device in devices.data" class="d-flex m-2">
                            <input type="checkbox" class="fform-check-inpu" v-model="formdata.list" :value="device.id" > 
                            {{ device.attributes.title }}
                          </span>

                    </div>
                    <div class="col-md-8 pt-2">
                        <textarea class="form-control" cols="30" rows="5" v-model="formdata.description" placeholder="Service Description...."></textarea>
                        <div class="d-flex">
                            <div class="w-50 m-1 ">
                                <Label for="nummber" class="">Waranty:</Label>
                                <input type="number" id="nummber" min="1" max="6" v-model="formdata.waranty" class="form-control ">
                            </div>
                            <div class="w-50 m-1">
                                <Label>Prise:</Label>
                                <input type="number" min="20" max="150" v-model="formdata.prise" class="form-control ">
                            </div>
                        </div>
                        
                    </div>
                </div>
            <input type="submit" value="Add" class="btn btn-primary w-100"> 

            </div>
            
        </form>
    </div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex';
import navbar from "../layouts/navbar.vue";
import jambotron from '../layouts/jambotron.vue';
export default {
    name:"addnewservice",
    components:{navbar,jambotron},
    data(){
        return{
            url: null,
            formdata:{
                title:'',
                device:'device',
                description:'',
                waranty:'',
                prise:'',
                foto:'',
                list:[]

            }
           ,
           
            devices:[],
          
        }
    },
    created(){
        this.getdevices();
    },
    computed:{
        ...mapGetters({
            token:"auth/gettoken"
        }),
    },
    methods:{
        ...mapActions({
        getnewservices:"auth/getservices"
       }),
        async getdevices(){
            await axios.get('/sanctum/csrf-cookie');
            await axios.get(`/api/devices`)
            .then(response=>{
                this.devices=response.data;
            })
            .catch(error=>{
                console.log(error );
            })

        },
        onImageChange(event){
            this.formdata.foto=event.target.files[0]
            this.url = URL.createObjectURL( this.formdata.foto);
            console.log( "this.formdata.foto")
            console.log( this.formdata.foto)

        },
        async addnewservice()
        {
            let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${this.token}`
                                                        }
                                                    } 
            await axios.get('/sanctum/csrf-cookie');
            let fd=new FormData();
            fd.append('title',this.formdata.title);
            fd.append('device',this.formdata.device);
            fd.append('description',this.formdata.description);
            fd.append('waranty',this.formdata.waranty);
            fd.append('prise',this.formdata.prise);
            fd.append('foto',this.formdata.foto);
            fd.append('list',this.formdata.list);
            await axios.post(`/api/services`,fd,config)
            .then(()=>{
                this.getnewservices()
                this.formdata.title=''
                this.formdata.device='Device'
                this.formdata.description=''
                this.formdata.waranty=''
                this.formdata.prise=''
                this.formdata.foto=''
                this.formdata.list=[]
                this.url=null
                this.$router.push({name:'adminservices'})
                
          
            })
            .catch(error=>{
                console.log(error );
            })

        }
    }
    
}
</script>
<style lang="">
    
</style>