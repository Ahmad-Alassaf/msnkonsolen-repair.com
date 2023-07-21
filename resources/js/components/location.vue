
<template>
  <div>
    <h1>Google map</h1>
    <GoogleMap
    :zoom="14"    
    :center="center"
  api-key="AIzaSyCBcDY3KDhse6SeN6QvUf7RS3YY1cLXLS8"
  style="width: 100%; height: 300px"
  >
  </GoogleMap>
  </div>
</template>

<script>

import { 
  GoogleMap, // core
  Marker,
  Polyline,
  Polygon,
  Rectangle,
  Circle,
  CustomControl,
} from 'vue3-google-map'
export default {
  name: "location",
  data() {
    return {
      center: { 
        lat: 39.7837304,
        lng: -100.4458825
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null
    };
  },

  mounted() {
    this.locateGeoLocation();
  },

  methods: {
    initMarker(loc) {
      this.existingPlace = loc;
    },
    addLocationMarker() {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        };
        this.locationMarkers.push({ position: marker });
        this.locPlaces.push(this.existingPlace);
        this.center = marker;
        this.existingPlace = null;
      }
    },
    locateGeoLocation: function() {
      navigator.geolocation.getCurrentPosition(res => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        };
      });
    }
  }
};
</script>
