<template>
<IonPage className="ion-page" id="main-content">
<IonMenu content-id="main-content">
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Menu</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent>
      <IonList>
        <IonListHeader>
          Navigate
        </IonListHeader>
        <IonMenuToggle auto-hide="false">
          <IonItem button>
            <ion-icon :icon="home" slot="start"></ion-icon>
            <IonLabel>
              Home
            </IonLabel>
          </IonItem>
        </IonMenuToggle>
      </IonList>
    </IonContent>
  </IonMenu>

  
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuToggle>
            <IonButton>
               <ion-icon :icon="menuOutline" slot="icon-only"></ion-icon>
              
            </IonButton>
          </IonMenuToggle>
        </IonButtons>
        <IonTitle>Header</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <h1>Main Content</h1>
      <p>Click the icon in the top left to toggle the menu.</p>
    </IonContent>
  </IonPage>

</template>
<style>
.my-custom-menu {
  --width: 500px;
}
</style>

<script>
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonFooter, 
  IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonPage ,
  IonButtons,
  IonButton,
  IonItem,
  menuController
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { menuOutline, home } from 'ionicons/icons';
export default defineComponent({
  components: {
    IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonMenu,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonIcon,
  IonLabel,
  IonPage ,
  IonButtons,
  IonButton,
  IonItem
  },
  setup(){
    return {home,
    menuOutline}
  },
  methods: {
    openFirst() {
      menuController.enable(true, 'first');
      menuController.open('first');
    },
    openEnd() {
      menuController.open('end');
    },
    openCustom() {
      menuController.enable(true, 'custom');
      menuController.open('custom');
    }
  }
});
</script>