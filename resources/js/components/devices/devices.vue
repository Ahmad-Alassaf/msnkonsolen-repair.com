<template >
    <div class="">
       
            <button class="btn btn-success  mb-1"  @click="add=!add">{{ add?'Close':'New Device' }}  </button>
            <div v-if="add" class="d-flex m-auto mb-1">
                <input type="text" class="form-control mx-1" v-model="device_title"  placeholder="Device Name...">               
                <select name="" id="" v-model="selected_platform" class="form-control mx-1">
                    <option v-for="platform in platforms"  :value="platform">{{platform.attributes.platform}}</option>
                </select>
                <button class="btn btn-success  " @click="this.addnewdevice()"> Add  </button>
            </div>    
            <table class="table table-success table-striped">
                <thead>
                  <tr>                
                    <th scope="col">Geräte</th>
                    <th scope="col">Plattform</th>
                    <th scope="col">Erstellt am</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>                               
                        <tr v-for="device in devices" >                        
                           
                            <td scope="col" >
                                {{ device.attributes.title }}
                            </td>
                            <td scope="col" >
                                {{ device.relationships.platform.platform }}
                                                             
                            </td>
                            <td scope="col"> {{ device.attributes.created_at }}</td>
                            <td scope="col" class="d-flex justify-content-end">
                                <button type="button" class="btn btn-primary mx-1 " @click="deviceEditing(index,device)">
                                   {{ (isEdit && rowindex===index)?'Speichern':'Bearbieten'}}
                                </button>
                               <button type="button" class="btn btn-danger " @click="deleteDevice(device.id)">löchen</button>
                            </td>                        
                        </tr>               
               </tbody>
            </table>
           
        </div>

</template>
<script>
import axios from 'axios';
import { mapGetters ,mapActions} from 'vuex'

export default {
    name:"devices",
    props:['devices','platforms'],
    data(){
        return{
           
            add:false,
            addbtn:true,
            isEdit:false,
            rowindex:null,
            selected_platform:null,
            device_title:'',
            editdata:{
                title:'',
                platform_id:''
            }

        }
    },
    created() {
       
    },
    computed:{
        ...mapGetters({
            user:"auth/getuser",
            authenticated:"auth/getauthenticated",           
            token:"auth/gettoken"
        }), 
       
    },
    mounted(){     
    },
    methods:{
        ...mapActions({
            alldevices:"auth/getdevices",
        }), 
        async addnewdevice(){
            await axios.get('/sanctum/csrf-cookie');
            let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${this.token}`
                                                        }
                                                    }
            await axios.post(`/api/devices`,{
                title:this.device_title,
                platform_id:this.selected_platform.id
            },config)
            .then( this.alldevices() )
            .catch(error =>{
                console.log(error );
            })

        },
      async  deleteDevice(id){
       
            await axios.get('/sanctum/csrf-cookie');
            let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${this.token}`
                                                        }
                         }
            await axios.delete(`/api/devices/${id}`,config)
            .then( this.alldevices())
            .catch(error=>{
                console.log(error );
            })
        },
        deviceEditing(index,device)
        {
            if( this.rowindex===index)
            {
                this.updatedevice(device.id);
                this.isEdit=!this.isEdit;
              
              

            }
            else{
                this.isEdit=!this.isEdit;
                this.rowindex=index;
                this.editdata.title=device.attributes.title;
                this.editdata.platform_id=device.relationships.id;

            }
            
           
            
           

            

        },
        async updatedevice(id)
        {
            console.log(this.editdata)
            await axios.get('/sanctum/csrf-cookie');
            await axios.put(`/api/devices/${id}`,this.editdata)
            .then()
            .catch(error=>{
                console.log(error );
            })

        }
        
    }
    
    
}
</script>
<style lang="">
    
</style>