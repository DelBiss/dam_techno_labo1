

<script setup lang="ts">
    // Importation des modules
    import { IonSplitPane,IonPage, IonContent,IonFooter,IonList,IonListHeader,IonItem,IonText,IonLabel, IonTitle,IonToolbar,IonHeader,IonSelect,IonSelectOption,IonLoading, SelectChangeEventDetail} from "@ionic/vue";
    import {Geolocation} from "@capacitor/geolocation";
    
    import { inject, Ref, ref, watchEffect } from "vue";
    
    import { MeteoServiceKey } from "@/injection";
    import { Geocoding, MeteoData } from "@/interface_type/openWeather";
    
    import jsonLocationOption from "./location.json";

    // Injection des services
    const MeteoS = inject(MeteoServiceKey)
    
    // Data
    interface ILocationSelection {
        label : string,
        value: string|null
    }
    const locationOptions:ILocationSelection[] = [
            {
                "label": "Montreal",
                "value": "Montreal"
            },
            {
                "label": "Laval",
                "value": "Laval"
            },
            {
                "label": "Quebec",
                "value": "Quebec"
            },
            {
                "label": "Position Actuelle",
                "value": null
            }
        ];
    
    // Déclaration des variables
    var currentPosition:Geocoding|null = null;
    // const locationSelection = json_locationSelection
    // Déclaration des variables reactive
    const isLoading = ref(true);

    const location:Ref<string|null> = ref(locationOptions[0].value);
    const locationMeteoData:Ref<MeteoData|null> = ref(null);

    function locationChange(event:CustomEvent<SelectChangeEventDetail>){
        location.value = event.detail.value;
    }

    watchEffect(async () => {
        
        if(MeteoS){
            isLoading.value = true;
            if(location.value){
                locationMeteoData.value = await MeteoS.getWeatherByLocation(location.value);
                
            }else{
                const coordinate = await Geolocation.getCurrentPosition({maximumAge:2*60*1000});
                locationMeteoData.value = await MeteoS.getWeatherByPosition(coordinate.coords);
            }
            isLoading.value = false;
        }
    });    
</script>

<template>
<ion-page>
    <ion-split-pane content-id="main-content">
        

        <div class="ion-page" id="main-content">
            <ion-header>
                <ion-toolbar color="primary">
                    <ion-title>
                        Ma météo
                    </ion-title>
                </ion-toolbar>
            </ion-header>
            <ion-content>
                <ion-loading
                    :is-open="isLoading"
                    message="Please wait..."
                />
                <ion-list>
                    <ion-list-header class="date">
                        {{(new Date).toLocaleDateString('fr-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}}
                    </ion-list-header>
                    <ion-item color="secondary">
                        <ion-label>Ville</ion-label>
                        <ion-select :value="location" @ionChange="locationChange" >

                            <ion-select-option v-for="locationOption in locationOptions" :key="locationOption.label" :value="locationOption.value">
                                {{locationOption.label}}
                            </ion-select-option>                            
                        
                        </ion-select>
                    </ion-item>
                </ion-list>

                <!-- Only show if we have some MeteoData -->
                <div class="ion-padding condition" v-if="locationMeteoData">
                    <div class="city">
                        {{locationMeteoData.geocoding.local_names['fr'] ? locationMeteoData?.geocoding.local_names['fr'] : locationMeteoData?.geocoding.name}}
                    </div>
                    <div class="temperature">
                        {{locationMeteoData?.current.temp}}°C
                    </div>
                        <img :src="'http://openweathermap.org/img/wn/'+locationMeteoData?.current.weather[0].icon+'@2x.png'" />
                    <div class="description">
                        {{locationMeteoData?.current.weather[0].description}}
                    </div>
                </div>
            </ion-content>
            <ion-footer >
                <ion-toolbar color="primary">
                    <ion-text class="ion-padding">©️ Philippe Allard-Rousse</ion-text>
                </ion-toolbar>
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