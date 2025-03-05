<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }

const selected = ref(['check1', 'check2', 'check3', 'check4'])
const selectedAtendidos = ref(['1', '0'])
const selectedOtros = ref([])

// Grupo 1 - Checkboxes
const grupo1 = ref([
  { label: 'Espectaculos', value: 'check1' },
  { label: 'Locales Permanente', value: 'check2' },
  { label: 'Bailes', value: 'check3' },
  { label: 'Mixto', value: 'check4' }
]);

// Grupo 1 - Checkboxes
const grupo2 = ref([
  { label: 'Atendidos', value: '1' },
  { label: 'No Atendidos', value: '0' },
]);

// Grupo 1 - Checkboxes
const grupo3 = ref([
  { label: 'Oportunidades', value: '1' },
  { label: 'Facturados', value: '1' },
  { label: 'Tracking Vendedor', value: '1' },
]);

const desserts = [
  {
    dessert: 'Espectaculos',
    calories: 159,
    fat: 6,
  },
  {
    dessert: 'Locales Permanentes',
    calories: 237,
    fat: 6,
  },
  {
    dessert: 'Bailes',
    calories: 262,
    fat: 6,
  },
  {
    dessert: 'Mixtos',
    calories: 305,
    fat: 6,
  },
  {
    dessert: 'Oportunidades de Atencion',
    calories: 356,
    fat: 6,
  },
]
</script>

<template>
    <section>
        <div class="page-container">
                <VRow class="mb-6">
                    <VCol cols="12" sm="4">
                        <VExpansionPanels multiple>
                            <VExpansionPanel
                            >
                                <VExpansionPanelTitle>
                                    <VCardTitle>Leyenda</VCardTitle>
                                </VExpansionPanelTitle>
                                <VExpansionPanelText>
                                    <VTable class="text-no-wrap" >
                                        <thead>
                                            <tr>
                                                <th>
                                                Rubros
                                                </th>
                                                <th>
                                                Atendidos
                                                </th>
                                                <th>
                                                No Atendidos
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            <tr
                                                v-for="item in desserts"
                                                :key="item.dessert"
                                            >
                                                <td>
                                                {{ item.dessert }}
                                                </td>
                                                <td>
                                                {{ item.calories }}
                                                </td>
                                                <td>
                                                {{ item.fat }}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </VTable>
                                </VExpansionPanelText>
                            </VExpansionPanel>
                        </VExpansionPanels>
                    </VCol>
                    <VCol cols="12" sm="4">
                        <VExpansionPanels multiple>
                            <VExpansionPanel
                            >
                                <VExpansionPanelTitle>
                                    <VCardTitle>Leyenda</VCardTitle>
                                </VExpansionPanelTitle>
                                <VExpansionPanelText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </VExpansionPanelText>
                            </VExpansionPanel>
                        </VExpansionPanels>
                    </VCol>
                    <VCol cols="12" sm="4">
                        <VExpansionPanels multiple>
                            <VExpansionPanel

                            >
                                <VExpansionPanelTitle>
                                    <VCardTitle>Filtros</VCardTitle>
                                </VExpansionPanelTitle>
                                <VExpansionPanelText>
                                    <!-- Grupo 1 -->
                                    <VCol cols="12" style="padding: 0px!important;">
                                        <fieldset class="fieldset-group">
                                            <legend>Rubro</legend>
                                            <VRow no-gutters>
                                                <VCol v-for="(item, index) in grupo1" :key="index" cols="auto" class="mr-4">
                                                    <VCheckbox v-model="selected" :label="item.label" :value="item.value" hide-details />
                                                </VCol>
                                            </VRow>
                                        </fieldset>
                                    </VCol>
                                    <!-- Grupo 1 -->
                                    <VCol cols="12" style="padding: 0px!important;">
                                        <fieldset class="fieldset-group">
                                            <legend>Atencion</legend>
                                            <VRow no-gutters>
                                                <VCol v-for="(item, index) in grupo2" :key="index" cols="auto" class="mr-4">
                                                    <VCheckbox v-model="selectedAtendidos" :label="item.label" :value="item.value" hide-details />
                                                </VCol>
                                            </VRow>
                                        </fieldset>
                                    </VCol>
                                    <!-- Grupo 1 -->
                                    <VCol cols="12" style="padding: 0px!important;">
                                        <fieldset class="fieldset-group">
                                            <legend>Otros</legend>
                                            <VRow no-gutters>
                                                <VCol v-for="(item, index) in grupo3" :key="index" cols="auto" class="mr-4">
                                                    <VCheckbox v-model="selectedOtros" :label="item.label" :value="item.value" hide-details />
                                                </VCol>
                                            </VRow>
                                        </fieldset>
                                    </VCol>
                                </VExpansionPanelText>
                            </VExpansionPanel>
                        </VExpansionPanels>
                    </VCol>
                </VRow>




            <VCard class="mb-6 third-card">

                <GoogleMap
                        api-key="AIzaSyA2PCkdFyC80CvWLpRPom2K5iIZ3u885sc"
                        style="width: 100%; height: 65vh;"
                        :center="center"
                        :zoom="15"
                    >

                        <Marker :options="{ position: center }" />
                    </GoogleMap>
            </VCard>

        </div>
    </section>

</template>
<style scoped>
/* Contenedor principal ocupa toda la pantalla */
.page-container {
  display: flex;
  flex-direction: column;
  height: 83vh; /* 100% de la altura de la ventana */
}

/* La tercera tarjeta ocupa el espacio restante */
.third-card {
  flex-grow: 1; /* Ocupa el espacio disponible */
  overflow: auto; /* Permite scroll si el contenido es grande */
}

.fieldset-group {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 5px;
}

legend {
  font-size: 14px;
  font-weight: bold;
}
</style>
