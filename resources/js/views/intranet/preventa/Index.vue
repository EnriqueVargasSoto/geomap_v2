<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const center = { lat: 40.689247, lng: -74.044502 }
</script>

<template>
    <section>
        <div class="page-container">
            <VCard class="mb-6">
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
            </VCard>

            <VCard class="mb-6">
                <VExpansionPanels multiple>
                    <VExpansionPanel

                    >
                        <VExpansionPanelTitle>
                            <VCardTitle>Filtros</VCardTitle>
                        </VExpansionPanelTitle>
                        <VExpansionPanelText>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </VExpansionPanelText>
                    </VExpansionPanel>
                </VExpansionPanels>
            </VCard>

            <VCard class="mb-6 third-card">
               <!--  <GoogleMap
                        api-key="AIzaSyA2PCkdFyC80CvWLpRPom2K5iIZ3u885sc"
                        style="width: 100%; height: 65vh;"
                        :center="center"
                        :zoom="15"
                    >
                        <Marker :options="{ position: center }" />
                    </GoogleMap> -->
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
</style>
