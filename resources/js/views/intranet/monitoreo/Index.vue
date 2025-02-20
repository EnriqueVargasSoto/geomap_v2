<script setup>
/* import AddNewUserDrawer from '@/views/apps/user/list/AddNewUserDrawer.vue' */

// 👉 Store
const searchQuery = ref('')
const selectedRole = ref()
const selectedPlan = ref()
const selectedStatus = ref()

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
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

const {
  data: usersData,
  execute: fetchUsers,
} = await useApi(createUrl('/apps/users', {
  query: {
    q: searchQuery,
    status: selectedStatus,
    plan: selectedPlan,
    role: selectedRole,
    itemsPerPage,
    page,
    sortBy,
    orderBy,
  },
}))

const users = computed(() => usersData.value.users)
const totalUsers = computed(() => usersData.value.totalUsers)

// 👉 search filters
const roles = [
  {
    title: 'Admin',
    value: 'admin',
  },
  {
    title: 'Author',
    value: 'author',
  },
  {
    title: 'Editor',
    value: 'editor',
  },
  {
    title: 'Maintainer',
    value: 'maintainer',
  },
  {
    title: 'Subscriber',
    value: 'subscriber',
  },
]

const plans = [
  {
    title: 'Basic',
    value: 'basic',
  },
  {
    title: 'Company',
    value: 'company',
  },
  {
    title: 'Enterprise',
    value: 'enterprise',
  },
  {
    title: 'Team',
    value: 'team',
  },
]

const status = [
  {
    title: 'Pending',
    value: 'pending',
  },
  {
    title: 'Active',
    value: 'active',
  },
  {
    title: 'Inactive',
    value: 'inactive',
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

const widgetData = ref([
  {
    title: 'Session',
    value: '21,459',
    change: 29,
    desc: 'Total Users',
    icon: 'tabler-users',
    iconColor: 'primary',
  },
  {
    title: 'Paid Users',
    value: '4,567',
    change: 18,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-plus',
    iconColor: 'error',
  },
  {
    title: 'Active Users',
    value: '19,860',
    change: -14,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-check',
    iconColor: 'success',
  },
  {
    title: 'Pending Users',
    value: '237',
    change: 42,
    desc: 'Last Week Analytics',
    icon: 'tabler-user-search',
    iconColor: 'warning',
  },
])

const date = ref('')

const currentTab = ref('item-1')
const tabItemContent = 'Candy canes donut chupa chups candy canes lemon drops oat cake wafer. Cotton candy candy canes marzipan carrot cake. Sesame snaps lemon drops candy marzipan donut brownie tootsie roll. Icing croissant bonbon biscuit gummi bears. Pudding candy canes sugar plum cookie chocolate cake powder croissant.'

const goToDetail = (id) => {
    router.push({ name: 'monitoreo/preventa', params: { id } });
};
</script>

<template>
    <section>
        <!-- 👉 Widgets -->
        <!-- <div class="d-flex mb-6">
            <VRow>
                <template
                    v-for="(data, id) in widgetData"
                    :key="id"
                >
                    <VCol
                        cols="12"
                        md="3"
                        sm="6"
                    >
                        <VCard>
                            <VCardText>
                                <div class="d-flex justify-space-between">
                                    <div class="d-flex flex-column gap-y-1">
                                        <div class="text-body-1 text-high-emphasis">
                                            {{ data.title }}
                                        </div>
                                        <div class="d-flex gap-x-2 align-center">
                                            <h4 class="text-h4">
                                                {{ data.value }}
                                            </h4>
                                            <div
                                                class="text-base"
                                                :class="data.change > 0 ? 'text-success' : 'text-error'"
                                            >
                                                ({{ prefixWithPlus(data.change) }}%)
                                            </div>
                                        </div>
                                        <div class="text-sm">
                                            {{ data.desc }}
                                        </div>
                                    </div>
                                    <VAvatar
                                        :color="data.iconColor"
                                        variant="tonal"
                                        rounded
                                        size="42"
                                    >
                                        <VIcon
                                            :icon="data.icon"
                                            size="26"
                                        />
                                    </VAvatar>
                                </div>
                            </VCardText>
                        </VCard>
                    </VCol>
                </template>
            </VRow>
        </div>
 -->
        <VCard class="mb-6">
            <VCardItem class="pb-4">
                <VCardTitle>Filtros para la búsqueda</VCardTitle>
            </VCardItem>

            <VCardText>
                <VRow>
                    <!-- 👉 Select Status -->
                    <VCol
                        cols="12"
                        sm="3"
                    >
                        <AppDateTimePicker
                            v-model="date"
                            label="Default"
                            placeholder="Select date"
                        />
                    </VCol>

                    <!-- 👉 Select Role -->
                    <VCol
                        cols="12"
                        sm="3"
                    >
                        <AppSelect
                            v-model="selectedRole"
                            label="Zona"
                            placeholder="Seleccione Zona"
                            :items="roles"
                            clearable
                            clear-icon="tabler-x"
                        />
                    </VCol>

                    <!-- 👉 Select Plan -->
                    <VCol
                        cols="12"
                        sm="3"
                    >
                        <AppSelect
                            v-model="selectedPlan"
                            label="Ruta"
                            placeholder="Seleccione Ruta"
                            :items="plans"
                            clearable
                            clear-icon="tabler-x"
                        />
                    </VCol>

                    <VCol
                        cols="12"
                        sm="3"
                        style="display: flex;align-items: flex-end;"
                    >
                        <div class="app-user-search-filter d-flex align-center flex-wrap gap-4">
                            <!-- 👉 Add user button -->
                            <VBtn
                                prepend-icon="tabler-search"
                                @click="isAddNewUserDrawerVisible = true"
                            >
                                Buscar
                            </VBtn>
                            <!-- 👉 Export button -->
                            <VBtn
                                variant="tonal"
                                color="secondary"
                                prepend-icon="tabler-trash"
                            >
                                Limpiar
                            </VBtn>
                        </div>
                    </VCol>
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
                        v-for="item in 2"
                        :key="item"
                        :value="`item-${item}`"
                    >

                        <VCardText class="d-flex flex-wrap gap-4">
                            <div class="me-3 d-flex gap-3">
                                <AppSelect
                                    :model-value="itemsPerPage"
                                    :items="[
                                    { value: 10, title: '10' },
                                    { value: 25, title: '25' },
                                    { value: 50, title: '50' },
                                    { value: 100, title: '100' },
                                    { value: -1, title: 'All' },
                                    ]"
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
                            :items="users"
                            item-value="id"
                            :items-length="totalUsers"
                            :headers="headers"
                            class="text-no-wrap"
                            show-select
                            @update:options="updateOptions"
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
                                    :total-items="totalUsers"
                                />
                            </template>
                        </VDataTableServer>
                        <!-- SECTION -->
                    </VWindowItem>
                </VWindow>
            </VCardText>



        </VCard>

    </section>
</template>
