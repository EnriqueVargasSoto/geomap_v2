<script setup>
import { GoogleMap, Marker } from 'vue3-google-map'

const geoJsonData = ref(null);

const user = useCookie('userData')
const router = useRouter()

// const center = { lat: 40.689247, lng: -74.044502 }

const selected = ref(['003', '001', '002', '007'])
const selectedAtendidos = ref(['1', '0'])
const selectedOtros = ref([])

// Grupo 1 - Checkboxes
const grupo1 = ref([
  { label: 'Espectaculos', value: '003' },
  { label: 'Locales Permanente', value: '001' },
  { label: 'Bailes', value: '002' },
  { label: 'Mixto', value: '007' }
]);


const loadGeoJson = async () => {
  //if (!mapRef.value) return;

  //const map = mapRef.value.$map;
  const dataLayer = new google.maps.Data({ map });

  // Cargar la geocerca desde tu JSON
  dataLayer.addGeoJson({
    type: "FeatureCollection",
    name: "2031",
    features: [
      {
        type: "Feature",
        properties: {
          RUTA: "2031",
        },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-77.007529, -12.08888],
              [-77.007659, -12.088898],
              [-77.008612, -12.08904],
              [-77.009293, -12.089136],
              [-77.020197, -12.090517],
              [-77.021764, -12.0912],
              [-77.022195, -12.093157],
              [-77.018743, -12.101992],
              [-77.016087, -12.107483],
              [-77.015679, -12.107953],
              [-77.012704, -12.098949],
              [-77.007529, -12.08888], // 🔹 Cerrar el polígono
            ],
          ],
        },
      },
    ],
  });

  // Estilo opcional para la geocerca
  dataLayer.setStyle({
    fillColor: "red",
    strokeColor: "black",
    strokeWeight: 2,
  });
};

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

// 🔹 Lista de objetos con coordenadas
const locations = ref([]);

const paramsForm = ref({
    idEmpresa: null,
    idSucursal: null,
    idSupervisor: null,
    zona: null,
    ruta: null,
    fecha: null,
    vendedor: null,
    rubros: selected.value.join(",")
});

const fetchLocations = async () => {
  try {
    const {data} = await useApi(createUrl('/clientes', {query: paramsForm})); // 🔹 Reemplaza con tu URL de API
    locations.value = data.value; // Suponiendo que la API devuelve un array de ubicaciones

    await fetchGeocerca();

    //await loadGeoJson();
  } catch (error) {
    console.error("Error obteniendo ubicaciones:", error);
  }
};

const fetchGeocerca= async () => {
  try {
    const {data} = await useApi(createUrl('/geocercas', {query: paramsForm})); // 🔹 Reemplaza con tu URL de API

    geoJsonData.value = JSON.parse(data.value[0].DatosJSON);
    console.log('GeoJSON cargado:', geoJsonData.value);
    await initMap(); // Llamamos a la función para inicializar el mapa una vez que tenemos los datos
  } catch (error) {
    console.error("Error obteniendo ubicaciones:", error);
  }
};

// 📌 Función para obtener iconos desde public/icons/
const getIconByRubro = (rubro, estado) => {
  const iconBase = "/icons/"; // Ruta desde public/
  if (rubro == "001" && estado == "0") {
        return `${iconBase}lp-001.png`;
  };

  if (rubro == "001" && estado == "1") {
        return `${iconBase}lp-002.png`;
  }

  if (rubro == "002" && estado == "0") {
        return `${iconBase}ba-001.png`;
  }

  if (rubro == "002" && estado == "1") {
        return `${iconBase}ba-002.png`;
  }

  if (rubro == "003" && estado == "0") {
        return `${iconBase}es-001.png`;
  }

  if (rubro == "003" && estado == "1") {
        return `${iconBase}es-002.png`;
  }
  if (rubro == "007" && estado == "0") {
        return `${iconBase}mi-001.png`;
  }

  if (rubro == "007" && estado == "1") {
        return `${iconBase}mi-002.png`;
  }

  return `${iconBase}oportunidad.png`;
};

const initMap = async () => {
  if (locations.value.length === 0) return; // No hacer nada si no hay ubicaciones

  // 🌎 Tomamos la primera ubicación como centro del mapa
  const center = {
    lat: parseFloat(locations.value[0].latitudCliente),
    lng: parseFloat(locations.value[0].longitudCliente),
  };

  // 🗺️ Crear el mapa en el div con ID "map"
  const map = new google.maps.Map(document.getElementById("map"), {
    center,
    zoom: 14, // Ajusta el zoom según la cantidad de ubicaciones
  });

  if (geoJsonData.value != null) {
    const dataLayer = new google.maps.Data({ map });


    dataLayer.addGeoJson(geoJsonData.value)

    // Estilo opcional para la geocerca
    dataLayer.setStyle({
        fillColor: "red",
        strokeColor: "red",
        strokeWeight: 2,
    });
  }

  // 📍 Agregar marcadores con los datos de la API
  locations.value.forEach((loc) => {
    const marker = new google.maps.Marker({
      position: { lat: parseFloat(loc.latitudCliente), lng: parseFloat(loc.longitudCliente) },
      map,
      title: loc.nombre,
      icon: {
        url: getIconByRubro(loc.rubro, loc.estado_rubro.trim()), // Usa la URL relativa desde public/
        scaledSize: new google.maps.Size(10, 10),
      },
    });

    // 🏷️ Agregar ventana de información
    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${loc.nombre}</strong><br>${loc.direccion}`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
};

// Observar cambios en checkboxes y actualizar mapa
watch([selected, selectedAtendidos, selectedOtros], async () => {
  paramsForm.value.rubros = selected.value.join(",")
  await fetchLocations()
})

const data = ref(null);
onMounted(async () => {
    data.value = history.state.data; // Accede a los datos
    console.log('Datos recibidos:', data.value);
    console.log('Datos recibidos:', data);
    paramsForm.value = {
        idEmpresa: user.value.idEmpresa,
        idSucursal: user.value.idSucursal,
        idSupervisor: user.value.idUsuario,
        zona: data.value.zona,
        ruta: data.value.ruta,
        fecha: user.value.fecha,
        vendedor: data.value.vendedorx,
        rubros: selected.value.join(",")
    }
  await fetchLocations();
});
</script>

<template>
    <section>
        <div class="page-container">
                <VRow class="mb-6">
                    <VCol cols="12" sm="6">
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
                    <!-- <VCol cols="12" sm="4">
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
                    </VCol> -->
                    <VCol cols="12" sm="6">
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
                        id="map"
                        ref="mapRef"
                        api-key="AIzaSyA2PCkdFyC80CvWLpRPom2K5iIZ3u885sc"
                        style="width: 100%; height: 65vh;"
                        :center="center"
                        :zoom="15"
                    >

                        <!-- <Marker :options="{ position: center }" /> -->
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
