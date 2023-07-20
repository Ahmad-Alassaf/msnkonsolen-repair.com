<template >
    <navbar />
    <jambotron />
    <div class="container py-5">
        <form @submit.prevent="sendemail()" class="form rounded px-3 py-2 w-lg-50  justify-content-center m-auto shadow">
            <h3 class="mb-1 bg-secondary py-1 px-2 rounded text-white"> E-Mail</h3>
            <input type="text" v-model="mailData.from" placeholder="Ihre Email Addresse..." class="form-control mb-1" name="to" id="">
            <input type="text" v-model="mailData.subject" placeholder="Subject..." class="form-control mb-1" name="subject" id="">
            <textarea name="content" v-model="mailData.content" placeholder="Message..." cols="30" class="form-control mb-2" rows="10"></textarea>
            <input type="submit" value="Absenden " class="btn btn-primary m-2  d-block m-auto">

        </form>
       
        
    </div>
    <foot />   
</template>
<script>
import navbar from "./layouts/navbar.vue";
import jambotron from './layouts/jambotron.vue';
import foot from './layouts/foot.vue';
import { mapGetters,mapActions } from 'vuex';
export default {
    name:"sendemail",
    components:{navbar,jambotron,foot},
    data(){
        return {
            mailData:{
                from:'',
                subject:'',
                content:''
            }
        }

    },
    computed:{
        ...mapGetters({
            token:"auth/gettoken"
        }),
    },
    methods:{
       async sendemail(){
            let config={
                                                        headers:{
                                                            Accept: 'application/vnd.api+json',                                
                                                            Authorization: `Bearer ${this.token}`
                                                        }
                                                    } 
            await axios.get('/sanctum/csrf-cookie');
            let fd=new FormData();
            fd.append('from',this.mailData.from);
            fd.append('subject',this.mailData.subject);
            fd.append('content',this.mailData.content);
           
            await axios.post(`/api/sendemail`,fd,config)
            .then((response)=>{
                                
                               this.$swal({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Your work has been saved',
                                        showConfirmButton: false,
                                        timer: 1500
                                        })
                                                        
          
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