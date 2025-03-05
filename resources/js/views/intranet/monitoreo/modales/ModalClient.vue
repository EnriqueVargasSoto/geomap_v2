<script setup>
    const props = defineProps({
        //endpoint: String, // Ruta API
        isDialogVisible: {
            type: Boolean,
            required: true,
        },
        dato: {
            type: Object,
            default: () => ({}),
        },
        //tipo: String
    })

    const user = useCookie('userData')

    const filtros = ref({
        idEmpresa: user.value.idEmpresa,
        idSucursal: user.value.idSucursal,
        idSupervisor: user.value.idUsuario,
        zona: props.dato.zona,
        ruta: 'all',
        vendedor: props.dato.vendedorx,
        page: 1,
        per_page: 5,
    });

    const title = ref(null);

    const { data } = await useApi(createUrl('clientes-por-vendedor', {query: filtros}));
    const tableData = computed(() => data.value.data ?? []);
    const totalItems = computed(() => data.value.recordsTotal ?? []);

    const headers = ref([]);
    const itemsPerPage = ref(5);
    const page = ref(1);
    const check = ref(false);
    const items_selects = ref([]);

    const emit = defineEmits(['close']);



    const fetchInitTableClientes = async() => {
        try {
            const {data} = await useApi('/clientes-inicializa-tabla');

            headers.value = data?.value.data?.headers || [];
            itemsPerPage.value = data?.value.data?.per_page || 10;
            page.value = data?.value.data?.page || 1;
            check.value = data?.value.data?.check || false;
            items_selects.value = data?.value.data?.item_selects || [];

        } catch (error) {
            console.log('error: ', error);
        }
    }

    const onReset = () => {
        emit('close');
        filtros.value = {
            idEmpresa: null,
            idSucursal: null,
            idSupervisor: null,
            zona: null,
            ruta: null,
            idVendedor: null,
            page: null,
            per_page: null,
        };
    }

    onMounted(async () => {
        console.log('data: ', props.dato);
        filtros.value = {
            idEmpresa: user.value.idEmpresa,
            idSucursal: user.value.idSucursal,
            idSupervisor: user.value.idUsuario,
            zona: props.dato.zona,
            ruta: 'all',
            vendedor: props.dato.vendedorx,
            page: page,
            per_page: itemsPerPage,
        };
        title.value = 'Lista de Clientes: '+props.dato.nombrex;
        await fetchInitTableClientes();
    });
</script>

<template>
    <VDialog
        :model-value="props.isDialogVisible"
        @update:model-value="onReset"
        width="80%"
    >
        <!-- 👉 dialog close btn -->
        <DialogCloseBtn @click="onReset" />

        <!-- Dialog Content -->
        <VCard :title="title">
            <VCardText>
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

                    <!-- <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">

                        <div style="inline-size: 15.625rem;">
                            <AppTextField
                                v-model="searchQuery"
                                placeholder="Buscar..."
                            />
                        </div>
                    </div> -->
                </VCardText>

                <!-- <VDivider /> -->

                <!-- SECTION datatable -->
                <VDataTableServer
                    v-model:items-per-page="itemsPerPage"
                    v-model:model-value="selectedRows"
                    v-model:page="page"
                    :items="tableData"
                    item-value="id"
                    :items-length="totalItems"
                    :headers="headers"
                    class="text-no-wrap"
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
                        </div>
                    </template>

                    <template #bottom>
                        <TablePagination
                            v-model:page="page"
                            :items-per-page="itemsPerPage"
                            :total-items="totalItems"
                        />
                    </template>
                </VDataTableServer>
                <!-- SECTION -->
            </VCardText>
        </VCard>
    </VDialog>
</template>
<style scoped>
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
