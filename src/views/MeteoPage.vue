

<script setup lang="ts">
    import { IonSplitPane,IonPage, IonContent,IonFooter,IonList,IonItem,IonLabel, IonTitle,IonToolbar,IonHeader,IonSelect,IonSelectOption,IonLoading} from "@ionic/vue";
    import {Geolocation} from "@capacitor/geolocation";
    
    import { useRoute } from "vue-router";
    import { inject, Ref, ref, watchEffect } from "vue";
    
    import { MeteoServiceKey } from "@/injection";
    import { Geocoding, MeteoData } from "@/interface_type/openWeather";
    
    const route = useRoute();
    const { location } = route.params;
    const title = ref(typeof location === "string" ? location : location[0]);
    const city:Ref<string|null> = ref(null);
    var currentPosition:Geocoding|null = null;
    const MeteoS = inject(MeteoServiceKey)
    const Meteodata:Ref<MeteoData|null> = ref(null);

    const selectLocation= [
        {
            name: "Position Actuelle",
            city: null,
        },
        {
            name: "Montreal",
            city: "Montreal"
        },
        {
            name: "Laval",
            city: "Laval"
        },
        {
            name: "Quebec",
            city: "Quebec"
        }
        ];

    const loading = ref(false);

    function cityChange(event: { target: { value: any; }; }){
        if (event) {
            city.value = event.target.value;
        }
    }
    watchEffect(async () => {
        console.log("loading");
        if(MeteoS){
            loading.value = true;
            if(city.value){
                Meteodata.value = await MeteoS.getWeatherByCity(city.value);
                
            }else{
                const coordinate = await Geolocation.getCurrentPosition();
                currentPosition = await MeteoS.reverseGeoCode(
                    coordinate.coords.latitude,
                    coordinate.coords.longitude
                );
                console.log(currentPosition);
                Meteodata.value = await MeteoS.getWeatherByPosition(currentPosition.lat,currentPosition.lon,currentPosition);
            }
            console.log(Meteodata.value);
            loading.value = false;
        }
    });    
</script>

<template>
<ion-page>
    <ion-split-pane content-id="main-content">
        

        <div class="ion-page" id="main-content">
            <ion-header>
                <ion-toolbar>
                    <ion-title>
                        Ma météo
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-loading
                    :is-open="loading"
                    message="Please wait..."
                />
                    <div class="date ion-padding">
                        {{(new Date).toLocaleDateString('fr-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
                    </div>
                <ion-list>
                    <ion-item>
                        <ion-label>Ville</ion-label>
                        <ion-select :value="city" @ionChange="cityChange">
                            <ion-select-option v-for="aLocation in selectLocation" :key="aLocation.name" :value="aLocation.city">{{aLocation.name}}</ion-select-option>                            
                        </ion-select>
                    </ion-item>
                </ion-list>
                <div class="ion-padding condition" v-if="Meteodata">
                    <div class="city">
                        {{Meteodata.geocoding.local_names['fr'] ? Meteodata?.geocoding.local_names['fr'] : Meteodata?.geocoding.name}}
                    </div>
                    <div class="temperature">
                        {{Meteodata?.current.temp}}°C
                    </div>
                        <img :src="'http://openweathermap.org/img/wn/'+Meteodata?.current.weather[0].icon+'@2x.png'" />
                    <div class="description">
                        {{Meteodata?.current.weather[0].description}}
                    </div>
                </div>
            </ion-content>
            <ion-footer>
                <div class="foot ion-padding">©️ Philippe Allard-Rousse</div>
                </ion-footer>
        </div>
    </ion-split-pane>
    </ion-page>
</template>

<style scoped>
    .condition {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .city{
        font-size: xx-large;
    }
    .date{
        text-align: center;
        text-transform: capitalize;
        font-size: x-large;
    }
    .temperature{
        font-size: x-large;
        
    }
    .description {
        font-size: large;
        text-transform: capitalize;
    }

    .foot{
        font-size: small;
    }
</style>