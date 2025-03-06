<script setup>
import ModalClient from './modales/modalClient.vue';
import ModalRubro from './modales/modalRubro.vue';

/* import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue' */

// TODO: Get type from backend

//!SECTION filtros

const isDialogVisible = ref(false);
const isDialogVisibleRubro = ref(false);
const modalData = reactive({
  dato: null, // Aquí se guardará el objeto de la fila seleccionada
});
const modalDataRubro = reactive({
  dato: null, // Aquí se guardará el objeto de la fila seleccionada
});

const user = useCookie('userData')

const router = useRouter()

const paramsForm = ref({
    idEmpresa : null,
	idSucursal : null,
    idPersona : null,
    zona: null
});

const filtros = ref({
    idEmpresa: null,
    idSucursal: null,
    idSupervisor: null,
    zona: null,
    ruta: null,
    fecha: null,
    idVendedor: null,
    page: null,
    per_page: null,
});

const zonas = ref([
    {idZona: 'all', descripcion: 'Todos'}
]);
const rutas = ref([
    {idRuta: 'all', descripcion: 'Todos'}
]);

const headersGestion = ref([]);
const itemsPerPage = ref(10)
const page = ref(1)
const check = ref(false);
const items_selects = ref([]);

const { data } = await useApi(createUrl('gestion', {query: filtros}));

const tableData = computed(() => data.value.data ?? []);

const totalItems = computed(() => data.value.recordsTotal ?? []);

const fechaFormateada = ref(null);

// 👉 Store
const searchQuery = ref('')

// Data table options

const sortBy = ref()
const orderBy = ref()
const selectedRows = ref([])

const updateOptions = options => {
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const isAddNewUserDrawerVisible = ref(false)

const deleteUser = async id => {
  await $api(`/apps/users/${ id }`, { method: 'DELETE' })

  // Delete from selectedRows
  const index = selectedRows.value.findIndex(row => row === id)
  if (index !== -1)
    selectedRows.value.splice(index, 1)

  // Refetch User
  fetchUsers()
}


const currentTab = ref('item-1')

const goToDetail = (row) => {
    //sessionStorage.setItem('params', JSON.stringify({ id: 123, nombre: 'Ejemplo' }))
    router.push({ name: 'preventa', state: { data: row} });
};


const obtenerZonas = async () => {

    try {
        const response = await useApi(createUrl('zonas', {query: paramsForm}));

        console.log('zonas: ', response.data.value);
        zonas.value.push(...response.data.value.data);
        filtros.value.zona = zonas.value[0]?.idZona || null;
        paramsForm.value.zona = zonas.value[0]?.idZona || null;
        console.log('zona: ', filtros.value);
    } catch (error) {
        console.log('error: ', error);
    }
}

const obtenerRutas = async () => {
    console.log('parametros de ruta: ', paramsForm.value);
    try {
        const response = await useApi(createUrl('rutas', {query: paramsForm}));
        console.log('rutas: ', response.data.value);
        rutas.value.push(...response.data.value.data);
        filtros.value.ruta = rutas.value[0]?.idRuta || null;
        console.log('filtros: ', filtros.value);
    } catch (error) {
        console.log('error: ', error);
    }
}

const fetchInitTableGestion = async() => {
    try {
        const {data} = await useApi('/gestion-inicializa-tabla');

        headersGestion.value = data?.value.data?.headers || [];
        itemsPerPage.value = data?.value.data?.per_page || 10;
        page.value = data?.value.data?.page || 1;
        check.value = data?.value.data?.check || false;
        items_selects.value = data?.value.data?.item_selects || [];

    } catch (error) {
        console.log('error: ', error);
    }
}

const fetchInitTableCobranza = async() => {
    try {
        const {data} = await useApi('/cobranza-inicializa-tabla');

        headersCobranza.value = data?.value.data?.headers || [];
        itemsPerPageCobranza.value = data?.value.data?.per_page || 10;
        pageCobranza.value = data?.value.data?.page || 1;
        checkCobranza.value = data?.value.data?.check || false;
        items_selectsCobranza.value = data?.value.data?.item_selects || [];

    } catch (error) {
        console.log('error: ', error);
    }
}



// Función para abrir el modal con los datos de una fila
const openModal = (rowData) => {
  modalData.dato = rowData;
  isDialogVisible.value = true;
};

const openModalRubro = (rowData) => {
    console.log('ingresa a abrir rubros');
  modalDataRubro.dato = rowData;
  isDialogVisibleRubro.value = true;
};

// Función para convertir "DD/MM/YYYY" a "YYYY-MM-DD"
const convertirFecha = (fecha) => {
  if (!fecha) return null; // Si no hay fecha, retorna null
  const partes = fecha.split('/'); // Divide la fecha en partes [DD, MM, YYYY]
  if (partes.length !== 3) return null; // Validación de formato correcto
  return `${partes[2]}-${partes[1]}-${partes[0]}`; // Rearma en formato YYYY-MM-DD
};

onMounted(async () => {
    fechaFormateada.value = convertirFecha(user.value.fecha);
    filtros.value = {
        idEmpresa: user.value.idEmpresa,
        idSucursal: user.value.idSucursal,
        idSupervisor: user.value.idUsuario,
        zona: null,
        ruta: null,
        fecha: user.value.fecha,//convertirFecha(user.value.fecha),
        idVendedor: 'all',
        page: page,
        per_page: itemsPerPage,
    }
    paramsForm.value = {
        idEmpresa : user.value.idEmpresa,
        idSucursal : user.value.idSucursal,
        idPersona : user.value.idUsuario,
        zona: null
    };


    await fetchInitTableGestion();
    await fetchInitTableCobranza();
    await obtenerZonas();
    await obtenerRutas();
});

// Función para cerrar el modal
const closeModal = () => {
  isDialogVisible.value = false;
};

const closeModalRubro = () => {
  isDialogVisibleRubro.value = false;
};
</script>

<template>
    <section>

        <VCard class="mb-6">
            <VCardItem class="pb-4">
                <VCardTitle>Filtros para la búsqueda</VCardTitle>
            </VCardItem>

            <VCardText>
                <VRow>

                    <VCol
                        cols="12"
                        sm="3"
                    >
                        <AppSelect
                            v-model="filtros.zona"
                            label="Zona"
                            item-title="descripcion"
                            item-value="idZona"
                            placeholder="Seleccione Zona"
                            :items="zonas"
                            clearable
                            clear-icon="tabler-x"
                        />
                    </VCol>

                    <VCol
                        cols="12"
                        sm="3"
                    >
                        <AppSelect
                            v-model="filtros.ruta"
                            label="Ruta"
                            item-title="descripcion"
                            item-value="idRuta"
                            placeholder="Seleccione Ruta"
                            :items="rutas"
                            clearable
                            clear-icon="tabler-x"
                        />
                    </VCol>

                    <VCol
                        cols="12"
                        sm="3"
                    >
                        <AppDateTimePicker
                            v-model="fechaFormateada"
                            label="Fecha"
                            placeholder="Seleccionar Fecha"
                            disabled
                        />
                    </VCol>

                    <!-- <VCol
                        cols="12"
                        sm="3"
                        style="display: flex;align-items: flex-end;"
                    >
                        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">

                            <VBtn
                                prepend-icon="tabler-search"
                                @click="isAddNewUserDrawerVisible = true"
                            >
                                Buscar
                            </VBtn>

                            <VBtn
                                variant="tonal"
                                color="secondary"
                                prepend-icon="tabler-trash"
                            >
                                Limpiar
                            </VBtn>
                        </div>
                    </VCol> -->
                </VRow>
            </VCardText>
        </VCard>
        <VCard class="mb-6">

            <VTabs v-model="currentTab" height="50px">
                <VTab>Gestion</VTab>
                <VTab>Cobranza</VTab>
            </VTabs>

            <VCardText>
                <VWindow v-model="currentTab" touchless>
                    <VWindowItem

                        :key="1"
                        :value="`item-1`"
                    >

                        <VCardText class="d-flex flex-wrap gap-4">
                            <div class="me-3 d-flex gap-3">
                                <AppSelect
                                    :model-value="itemsPerPage"
                                    :items="items_selects"
                                    style="inline-size: 6.25rem;"
                                    @update:model-value="itemsPerPage = parseInt($event, 10)"
                                />
                            </div>
                            <VSpacer />

                            <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
                                <!-- 👉 Search  -->
                                <div style="inline-size: 15.625rem;">
                                    <AppTextField
                                        v-model="searchQuery"
                                        placeholder="Buscar..."
                                    />
                                </div>

                                <!-- 👉 Export button -->
                                <VBtn
                                    variant="tonal"
                                    color="secondary"
                                    prepend-icon="tabler-file-type-csv"
                                >
                                    Excel
                                </VBtn>

                                <!-- 👉 Export button -->
                                <VBtn
                                    variant="tonal"
                                    color="secondary"
                                    prepend-icon="tabler-file-type-pdf"
                                >
                                    PDF
                                </VBtn>

                                <!-- 👉 Add user button -->
                                <VBtn
                                    prepend-icon="tabler-table"
                                    @click="isAddNewUserDrawerVisible = true"
                                >
                                    Resumen
                                </VBtn>
                            </div>
                        </VCardText>

                        <VDivider />

                        <!-- SECTION datatable -->
                        <VDataTableServer
                            v-model:items-per-page="itemsPerPage"
                            v-model:model-value="selectedRows"
                            v-model:page="page"
                            :items="tableData"
                            item-value="id"
                            :items-length="totalItems"
                            :headers="headersGestion"
                            class="text-no-wrap custom-table"
                            :show-select ="check"
                            @update:options="updateOptions"
                            fixed-header
                        >

                            <template #item.clientes="{ item }">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    <a href="#" class="text-primary text-decoration-underline" @click.prevent="openModal(item)">
                                        {{ item.clientes }}
                                    </a>
                                </div>
                            </template>

                            <template #item.atendidos="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{parseInt(item.noCompra) + parseInt(item.cantidadVenta)}}
                                </div>
                            </template>

                            <template #item.atendidosPorcentaje="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{ Math.round(((parseInt(item.noCompra) + parseInt(item.cantidadVenta)) / parseInt(item.clientes)) * 100) / 100 }}%
                                </div>
                            </template>

                            <template #item.atendidosNoVentas="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{item.noCompra}}
                                </div>
                            </template>

                            <template #item.atendidosNoVentasPorcentaje="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{ Math.round((parseInt(item.noCompra) / parseInt(item.clientes)) * 100) / 100 }}%
                                </div>
                            </template>

                            <template #item.atendidosVentas="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{item.efectivos}}
                                </div>
                            </template>

                            <template #item.atendidosVentasPorcentaje="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{ Math.round((parseInt(item.efectivos) / parseInt(item.clientes)) * 100) / 100 }}%
                                </div>
                            </template>

                            <template #item.estado="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{item.estadoVendedor}}
                                </div>
                            </template>

                            <template #item.importe="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{item.importeVentasx}}
                                </div>
                            </template>

                            <template #item.drop="{ item }" style="text-align: center;">
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    {{item.importeVentasx}}
                                    {{ Math.round((parseInt('0'+item.importeVentasx) / (parseInt(item.noCompra) / parseInt(item.clientes))) * 100) / 100 }}%
                                </div>
                            </template>


                            <!-- Actions -->
                            <template #item.acciones="{ item }" >
                                <div class="d-flex align-center gap-x-2" style="justify-content: center;">
                                    <VBtn
                                        icon
                                        variant="text"
                                        color="medium-emphasis"
                                    >
                                        <VIcon icon="tabler-dots-vertical" />
                                        <VMenu activator="parent">
                                        <VList>
                                            <VListItem >
                                            <template #prepend>
                                                <VIcon icon="tabler-eye" />
                                            </template>

                                            <VListItemTitle>View</VListItemTitle>
                                            </VListItem>

                                            <VListItem @click="goToDetail(item)">
                                                <template #prepend>
                                                    <VIcon icon="tabler-map" />
                                                </template>
                                                <VListItemTitle>Mapa</VListItemTitle>
                                            </VListItem>

                                            <VListItem @click="openModalRubro(item)">
                                            <template #prepend>
                                                <VIcon icon="tabler-tag" />
                                            </template>
                                            <VListItemTitle>Rubros</VListItemTitle>
                                            </VListItem>
                                        </VList>
                                        </VMenu>
                                    </VBtn>
                                </div>
                            </template>

                            <!-- pagination -->
                            <template #bottom>
                                <TablePagination
                                    v-model:page="page"
                                    :items-per-page="itemsPerPage"
                                    :total-items="totalItems"
                                />
                            </template>
                        </VDataTableServer>
                        <!-- SECTION -->
                    </VWindowItem>

                    <VWindowItem

                        :key="2"
                        :value="`item-2`"
                    >

                        <span>afsads</span>
                    </VWindowItem>
                </VWindow>
            </VCardText>



        </VCard>

    </section>

    <ModalClient
        v-if="isDialogVisible"
        :isDialogVisible="isDialogVisible"
        :dato="modalData.dato"
        @close="closeModal"
    />

    <ModalRubro
        v-if="isDialogVisibleRubro"
        :isDialogVisible="isDialogVisibleRubro"
        :dato="modalDataRubro.dato"
        @close="closeModalRubro"
    />

</template>

<style scoped>
    .v-data-table th.fixed-start,
    .v-data-table td.fixed-start {
        position: sticky;
        left: 0;
        z-index: 11; /* Asegura que esté por encima de otras columnas */
        background: #605ca8 !important; /* Mantiene el fondo fijo */
    }
    .v-data-table thead tr th {
        z-index: 10;
    }

    :deep(.v-table__wrapper thead tr th) {
        background-color: #605ca8 !important;
        background: #605ca8 !important;
    }

    :deep(.v-table__wrapper th) {
        color: white !important;
        font-weight: bold !important;
        text-align: center;
    }

</style>
