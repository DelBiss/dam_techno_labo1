<template>
<ion-page className="ion-page" id="main-content">
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list>
        <ion-list-header> Navigate </ion-list-header>
        <ion-menu-toggle auto-hide="false">
          <ion-item button>
            <ion-icon slot="start" :icon="home"></ion-icon>
            <ion-label> Home </ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu> 

  
    
    
      <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-toggle>
            <ion-button>
              <ion-icon slot="icon-only" :icon='menu'></ion-icon>
            </ion-button>
          </ion-menu-toggle>
        </ion-buttons>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      <ExploreContainer :name="loc" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonButtons,
  IonButton,
  IonItem  } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import { useRoute } from 'vue-router';
import { menuOutline, home } from 'ionicons/icons';


export default  defineComponent({
  name: 'Tab1Page',
  components: { ExploreContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage,IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonButtons,
  IonButton,
  IonItem },
  data() {
    
    return {
      txt: ["Tab 1 page","Hello","World"],
      m: {
        montreal :{
          name: 'Montréal',
          
        }
      },
      menuLocation: [
        {
          name: 'Montréal',
          url: '/meteo/montreal'
        },
        {
          name: 'Laval',
          url: '/meteo/laval'
        },
        {
          name: 'Québec',
          url: '/meteo/quebec'
        },
        {
          name: 'Position actuelle',
          url: '/meteo/current'
        }
      ]
    }
  },
    setup() {
      const route = useRoute();
      const menu = menuOutline
      const { location } = route.params;
      const loc = [location, "Montréal"]
      return { loc, home, menu };
    },
  
  ionViewDidEnter() {
    console.log("Tab1Page.ionViewDidEnter");
    
  },
  methods: {
    async getData() {
      console.log("Tab1Page.getData");
    }
  }
});
</script>
