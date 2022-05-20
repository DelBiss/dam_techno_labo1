

<script setup lang="ts">
    import { defineProps  } from 'vue'
    import { IonMenu, IonHeader,IonToolbar,IonTitle,IonContent} from '@ionic/vue';
    import NavMenuItem from '@/components/menu/NavMenuItem.vue';    
    import { MenuItem } from "@/components/menu/NavMenuItem.vue";
    

    interface MenuProps {
        title: string,
        items: MenuItem[],
    }
    
    const props = defineProps<MenuProps>()

    
</script>

<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{ props.title }}
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <NavMenuItem v-for="childItem in items" :key="childItem.name" :item="childItem" />
    </ion-content>
  </ion-menu>
</template>

