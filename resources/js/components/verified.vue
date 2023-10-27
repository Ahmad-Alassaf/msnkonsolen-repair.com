<template lang="">
    <div>
        <h1>Email verified</h1>
        
    </div>
</template>
<script>
import {useRoute,useRouter} from 'vue-router'
import {useStore} from 'vuex'
import { onMounted,computed } from "vue";
    import { ref } from 'vue';
export default {
    name:"verified",
    setup() {
        const route=useRoute()
        const router=useRouter()
                    onMounted(async () => {
                        try {
                                const params = new urlsearchparams(route.query)
                                let res = await axios.get(
                                'verify-email/' +
                                    route.params.id +
                                    '/' +
                                    route.params.hash,
                                { params }
                                )
                               router.push({ name: 'platform-dashboard' })
                            } catch (error) {
                                console.log(error.response)
                                router.push({ name: 'platform-dashboard' })
                            }
                       


        })
    }
    
}
</script>
<style lang="">
    
</style>