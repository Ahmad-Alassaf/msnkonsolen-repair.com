<template >
    <div class="">
           
            <form @submit.prevent="addnewaddress()" v-if="user.Address.length==0" class=" form    w-25   m-auto p-2 px-4 ">
                        
                            
                <input type="text" class="form-control m-1" v-model="formdata.street" placeholder="Strasse...">
                <input type="text" class="form-control m-1" v-model="formdata.hausnumber"  placeholder="Hausnummer...">
                <input type="text" class="form-control m-1" v-model="formdata.postal"  placeholder="PLZ...">
                <input type="text" class="form-control m-1" v-model="formdata.city"  placeholder="Ort...">
        
        
            <input type="submit" value="Add" class="btn btn-primary w-100 m-1">
        </form>
        <div  v-else class=" align-items-center justify-content-center  ">
            <div  v-for="address in user.Address" class="  m-auto shadow px-2 py-2 rounded-2">
                <button class="btn btn-danger mx-1 float-end" @click="deleteaddress(address.id)">X</button>
                <div class="d-flex ">
                    <h5 class="m-0 ">Strasse:</h5>
                    <p class="my-0 mx-1">{{address.attributes.street}}</p>

                </div>
                <div class="d-flex">
                    <h5 class="m-0 ">Hausnummer:</h5>
                    <p class="my-0 mx-1">{{address.attributes.hausnumber}}</p>

                </div>
                
                <div class="d-flex">
                    <h5 class="m-0 ">PLZ:</h5>
                    <p class="my-0 mx-1">{{address.attributes.postal}}</p>

                </div>
                <div class="d-flex">
                    <h5 class="m-0 ">Ort:</h5>
                    <p class="my-0 mx-1">{{address.attributes.city}}</p>

                </div>
                 
                
            </div>

            

        </div>
           
    </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'

export default {
    name:"useraddress",
    props:['user'],
    data(){
        return{
            formdata:{
                      street:'',
                      hausnumber:'',
                      postal:'',
                      city:'',
            },
            config:{}
        }
    },
    created(){
        this.config={
                headers:{
                    Accept: 'application/vnd.api+json',                    
                    Authorization: `Bearer ${this.token()}`
                }
            }
      

    },
    methods:{
        ...mapGetters({
            USER:"auth/getuser",
            authenticated:"auth/getauthenticated",
            token:"auth/gettoken"
        }),
        ...mapActions({
                  addresses:"auth/getuseraddresses",
        }),
        async addnewaddress()
        {
            await axios.get('/sanctum/csrf-cookie');
            await axios.post(`/api/address`,this.formdata,this.config).then(response=>{
                this.addresses()
              this.$router.push('/createcontract')

            }).catch(erorr=>{console.log(erorr)})

        },
        async deleteaddress(id){
          
            await axios.get('/sanctum/csrf-cookie');
            await axios.delete(`/api/address/${id}`,this.config).then(response=>{
              
                this.addresses()

            }).catch(erorr=>{console.log(erorr)})

        }
    }
    
}
</script>
<style lang="">
    
</style>