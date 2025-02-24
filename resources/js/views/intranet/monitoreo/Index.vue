<script setup>
/* import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue' */

// TODO: Get type from backend

//!SECTION filtros

const user = useCookie('userData')
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
const headersCobranza = ref([]);
const itemsPerPage = ref(10)
const itemsPerPageCobranza = ref(10)
const page = ref(1)
const pageCobranza = ref(1)
const check = ref(false);
const checkCobranza = ref(false);
const items_selects = ref([]);
const items_selectsCobranza = ref([]);

const { data } = await useApi(createUrl('gestion', {query: filtros}));
const { dataCobranza } = ref();//await useApi(createUrl('gestion', {query: filtros}));

const tableData = computed(() => data.value.data ?? []);
const tableDataCobranza = ref([]);// computed(() => data.value.data ?? []);

const totalItems = computed(() => data.value.recordsTotal ?? []);
const totalItemsCobranza = ref(0);//computed(() => data.value.total ?? []);

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

// Headers
const headers = [
  {
    title: 'Jefe de Unidad de Negocio',
    key: 'user',
  },
  {
    title: 'Teléfono',
    key: 'role',
  },
  {
    title: 'Zona',
    key: 'plan',
  },
  {
    title: 'Ruta',
    key: 'billing',
  },
  {
    title: 'Establecimientos',
    key: 'status',
  },
  {
    title: 'Establecimientos Atendidos',
    key: 'status',
  },
  {
    title: 'Establecimientos Efectivos %',
    key: 'status',
  },
  {
    title: 'Establecimientos no Atendidos',
    key: 'status',
  },
  {
    title: 'Establecimientos no Atendidos %',
    key: 'status',
  },
  {
    title: 'Establecimientos sin Visita',
    key: 'status',
  },
  {
    title: 'Establecimientos sin Visita %',
    key: 'status',
  },
  {
    title: 'Estado',
    key: 'status',
  },
  {
    title: 'Cantidad Licencias',
    key: 'status',
  },
  {
    title: 'Importe Total',
    key: 'status',
  },
  {
    title: 'Drop Licencias',
    key: 'status',
  },
  {
    title: 'Drop Soles',
    key: 'status',
  },
  {
    title: 'Visitados',
    key: 'status',
  },
  {
    title: 'Acciones',
    key: 'actions',
    sortable: false,
  },
]





const resolveUserRoleVariant = role => {
  const roleLowerCase = role.toLowerCase()
  if (roleLowerCase === 'subscriber')
    return {
      color: 'success',
      icon: 'tabler-user',
    }
  if (roleLowerCase === 'author')
    return {
      color: 'error',
      icon: 'tabler-device-desktop',
    }
  if (roleLowerCase === 'maintainer')
    return {
      color: 'info',
      icon: 'tabler-chart-pie',
    }
  if (roleLowerCase === 'editor')
    return {
      color: 'warning',
      icon: 'tabler-edit',
    }
  if (roleLowerCase === 'admin')
    return {
      color: 'primary',
      icon: 'tabler-crown',
    }

  return {
    color: 'primary',
    icon: 'tabler-user',
  }
}

const resolveUserStatusVariant = stat => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

const isAddNewUserDrawerVisible = ref(false)

const addNewUser = async userData => {
  await $api('/apps/users', {
    method: 'POST',
    body: userData,
  })

  // Refetch User
  fetchUsers()
}

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

const goToDetail = (id) => {
    router.push({ name: 'monitoreo/preventa', params: { id } });
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
                            class="text-no-wrap"
                            :show-select ="check"
                            @update:options="updateOptions"
                            fixed-header
                        >
                            <!-- User -->
                            <template #item.user="{ item }">
                                <div class="d-flex align-center gap-x-4">
                                    <VAvatar
                                    size="34"
                                    :variant="!item.avatar ? 'tonal' : undefined"
                                    :color="!item.avatar ? resolveUserRoleVariant(item.role).color : undefined"
                                    >
                                    <VImg
                                        v-if="item.avatar"
                                        :src="item.avatar"
                                    />
                                    <span v-else>{{ avatarText(item.fullName) }}</span>
                                    </VAvatar>
                                    <div class="d-flex flex-column">
                                    <h6 class="text-base">
                                        <RouterLink

                                        class="font-weight-medium text-link"
                                        >
                                        {{ item.fullName }}
                                        </RouterLink>
                                    </h6>
                                    <div class="text-sm">
                                        {{ item.email }}
                                    </div>
                                    </div>
                                </div>
                            </template>

                            <!-- 👉 Role -->
                            <template #item.role="{ item }">
                                <div class="d-flex align-center gap-x-2">
                                    <VIcon
                                    :size="22"
                                    :icon="resolveUserRoleVariant(item.role).icon"
                                    :color="resolveUserRoleVariant(item.role).color"
                                    />

                                    <div class="text-capitalize text-high-emphasis text-body-1">
                                    {{ item.role }}
                                    </div>
                                </div>
                            </template>

                            <!-- Plan -->
                            <template #item.plan="{ item }">
                                <div class="text-body-1 text-high-emphasis text-capitalize">
                                    {{ item.currentPlan }}
                                </div>
                            </template>

                            <!-- Status -->
                            <template #item.status="{ item }">
                                <VChip
                                    :color="resolveUserStatusVariant(item.status)"
                                    size="small"
                                    label
                                    class="text-capitalize"
                                >
                                    {{ item.status }}
                                </VChip>
                            </template>

                            <!-- Actions -->
                            <template #item.actions="{ item }">
                                <!-- <IconBtn @click="deleteUser(item.id)">
                                    <VIcon icon="tabler-trash" />
                                </IconBtn>

                                <IconBtn>
                                    <VIcon icon="tabler-eye" />
                                </IconBtn> -->

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

                                        <VListItem :to="{ name: 'preventa', params: { id: 123 } }">
                                        <template #prepend>
                                            <VIcon icon="tabler-map" />
                                        </template>
                                        <VListItemTitle>Edit</VListItemTitle>
                                        </VListItem>

                                        <VListItem @click="deleteUser(item.id)">
                                        <template #prepend>
                                            <VIcon icon="tabler-tag" />
                                        </template>
                                        <VListItemTitle>Delete</VListItemTitle>
                                        </VListItem>
                                    </VList>
                                    </VMenu>
                                </VBtn>
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
</template>

<style scoped>
    .v-data-table th.fixed-start,
    .v-data-table td.fixed-start {
    position: sticky;
    left: 0;
    z-index: 11; /* Asegura que esté por encima de otras columnas */
    background: white; /* Mantiene el fondo fijo */
    }
    .v-data-table thead tr th {
    z-index: 10;
    }
</style>
