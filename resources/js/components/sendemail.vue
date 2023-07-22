<template >
  
  
        <h3 class="mb-1 bg-secondary p-0 px-5  text-white rounded-5"> Ihre Nachricht</h3>
        <form @submit.prevent="sendemail()" class="form rounded px-3 py-2 w-lg-50  justify-content-center m-auto ">
            
            <input type="text" v-model="mailData.from" placeholder="Ihre Email Adresse..." class="form-control mb-1" name="to" id="">
            <input type="text" v-model="mailData.subject" placeholder="Betreff..." class="form-control mb-1" name="subject" id="">
            <textarea name="content" v-model="mailData.content" placeholder="Ihre Nachricht..." cols="30" class="form-control mb-2" rows="10"></textarea>
            <input type="submit" value="Absenden " class="btn btn-primary m-2  d-block m-auto">

        </form>
       
        
   
   
</template>
<script>


import { mapGetters,mapActions } from 'vuex';
export default {
    name:"sendemail",
    components:{},
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