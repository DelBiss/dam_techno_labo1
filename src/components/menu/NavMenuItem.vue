<script lang="ts">
  
  export type MenuItem = {
      name: string;
      icon?: string;
      url?: string;
      children?: MenuItem[];
  }
</script>
<script setup lang="ts">
    import { defineProps  } from 'vue'
    import { IonList,IonListHeader,IonMenuToggle,IonItem,IonIcon,IonLabel} from '@ionic/vue';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const props = defineProps<{
        item: MenuItem,
    }>()
</script>

<template>
    <ion-list>
        <div v-if="item.children">
            <ion-list-header>
            <ion-label>
                <ion-icon slot="start" v-if="item.icon" :icon="item.icon"></ion-icon>
                {{ item.name }}
            </ion-label>
            </ion-list-header>
            <NavMenuItem v-for="childItem in item.children" :key="childItem.name" :item="childItem" />
            
        </div>
        <ion-menu-toggle v-else>
            <ion-item button :href="item.url">
                <ion-icon slot="start" :icon="item.icon"></ion-icon>
                <ion-label>
                {{ item.name }}

                </ion-label>
            </ion-item>
        </ion-menu-toggle>
    </ion-list>
</template>
