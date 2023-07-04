<template >
    <div>
        <div class="container">
            <input type="text" :value="device.data.attributes.title" >
        </div>
        
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    name:'device',
    props:['id'],
    data(){
        return{
            title:"",
            device:null,
        }
        
    },
    computed:{
       
    },
    created(){
        this.getDevice(),
        this.token()

    },
    methods: {
        ...mapGetters({
            user:"auth/getuser",
            authenticated:"auth/getauthenticated",
            token:"auth/gettoken"
        }),
        async getDevice()
        {
            await axios.get('/sanctum/csrf-cookie');
            let config={
                headers:{
                    Accept: 'application/vnd.api+json',
                    
                    Authorization: `Bearer ${this.token()}`
                }
            }
            await axios.get(`/api/devices/${this.$route.params.id}`,config)
            .then(response=>{
                console.log(response.data);
                this.device=response.data;

            })
            .catch(erorr=>{console.log(erorr)})
        }
        
    },
    
}
</script>
<style lang="">
    
</style>