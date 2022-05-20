<script setup lang="ts">
import { defineProps  } from 'vue'
import { menuOutline } from 'ionicons/icons';
import { IonHeader, IonTitle, IonToolbar, IonSelect,IonSelectOption,IonButtons,IonIcon, IonButton, IonMenuToggle } from "@ionic/vue";

const props = defineProps<{
    title: string
}>()

</script>

<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>
                <ion-select placeholder="Select One">
                    <ion-select-option value="f">Female</ion-select-option>
                    <ion-select-option value="m">Male</ion-select-option>
                </ion-select>
            </ion-title>
        </ion-toolbar>
    </ion-header>
</template>