
<template>
  <div>
    <h1>Google map</h1>
    <GoogleMap
    :zoom="14"    
    :center="center"
     api-key="AIzaSyCBcDY3KDhse6SeN6QvUf7RS3YY1cLXLS8"
  style="width: 100%; height: 300px"
  >   <Marker :options="{ position: center }" />
  </GoogleMap>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { 
  GoogleMap, // core
  Marker,
 
} from 'vue3-google-map'
export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const center = { lat: 40.689247, lng: -74.044502 };

    return { center };
  },
});
</script>
