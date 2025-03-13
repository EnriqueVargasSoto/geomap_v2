<script setup>
/* import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
 */
    import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
    import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
    import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
    import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
    import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
    import authV2MaskDark from '@images/pages/misc-mask-dark.png'
    import authV2MaskLight from '@images/pages/misc-mask-light.png'

     import logo from '@images/xalesmap_high_quality.png'

    const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
    const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

    definePage({
        meta: {
            layout: 'blank',
            public: true,
        },
    })

    const isPasswordVisible = ref(false)
    const route = useRoute()
    const router = useRouter()
    const ability = useAbility()

    const empresas = ref([]);
    const sucursales = ref([]);

    const errors = ref({
        empresa: null,//'Debe seleccionar una empresa.',
        sucursal: null,//'Debe Seleccionar una sucursal.',
        usuario: null,//'Campo usuario no debe estar vacio.',
        clave: null,//'Campo Contraseña no debe estar vacio.',
    })

    const refVForm = ref()

    const form = ref({
        empresa: null,
        sucursal: null,
        usuario: null,
        clave: null,
    })

    const login = async () => {
        console.log('form: ', form.value);
        try {

            const { data, error } = await useApi(`/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form.value),
                onResponseError({response}){
                    errors.value.usuario = response.data.message;
                }
            });

            console.log('data login:', data);

            const userAbilityRules = [
                {
                action: 'manage',
                subject: 'all',
                },
            ];

            useCookie('userAbilityRules').value = userAbilityRules
            ability.update(userAbilityRules)
            useCookie('userData').value = data.value.user
            useCookie('accessToken').value = data.value.token
            await nextTick(async () => {
                //router.replace(route.query.to ? String(route.query.to) : '/')
                await router.push({ name: '/'});
            })
        } catch (err) {
            console.error(err)
        }
    }

    const onSubmit = () => {
        refVForm.value?.validate().then(({ valid: isValid }) => {
            if (isValid)
            login()
        })
    }

    const fetchInitComponent= async () => {
        try {
            const { data } = await useApi(`/empresas`);

            empresas.value = data?.value.data || [];

            form.value.empresa_id = empresas.value[0] ? empresas.value[0].idEmpresa : null;
            sucursales.value = empresas.value[0] ? empresas.value[0].sucursales : [];

        } catch (error) {
            console.error("Error al cargar la configuración de la tabla:", error);
        }
    };

    const handleSelectChange = (value) => {
        //const empresa = empresas.value.find(e => e.id === selectedEmpresaId.value);
        const auxEmpresa = empresas.value.find(e => e.idEmpresa === value);
        sucursales.value = auxEmpresa.sucursales;
        form.value.sucursal_id = null; // Limpia la sucursal cuando cambia la empresa
        console.log(form);
    }

    // Llamar `fetchInitTabla` una vez al montar el componente
    onMounted(async () => {await fetchInitComponent();});
</script>

<template>
    <RouterLink to="/">
        <div class="auth-logo d-flex align-center gap-x-3">
            <img :src="logo" alt="Logo" style="height: 70px;">
        </div>
    </RouterLink>

    <VRow
        no-gutters
        class="auth-wrapper bg-surface"
    >
        <VCol
            md="8"
            class="d-none d-md-flex"
        >
            <div class="position-relative bg-background w-100 me-0">
                <div
                    class="d-flex align-center justify-center w-100 h-100"
                    style="padding-inline: 6.25rem;"
                >
                    <VImg
                        max-width="613"
                        :src="authThemeImg"
                        class="auth-illustration mt-16 mb-2"
                    />
                </div>

                <img
                    class="auth-footer-mask flip-in-rtl"
                    :src="authThemeMask"
                    alt="auth-footer-mask"
                    height="280"
                    width="100"
                >
            </div>
        </VCol>

        <VCol
            cols="12"
            md="4"
            class="auth-card-v2 d-flex align-center justify-center"
        >
            <VCard
                flat
                :max-width="500"
                class="mt-12 mt-sm-0 pa-6"
            >
                <VCardText>
                    <h4 class="text-h4 mb-1">
                        Binvenido a <span class="text-capitalize">GeoMap</span>! 👋🏻
                    </h4>
                    <p class="mb-0">Inicie sesión en su cuenta.</p>
                </VCardText>
                <VCardText>
                    <VForm ref="refVForm" @submit.prevent="onSubmit">
                        <VRow>
                            <!-- email -->
                            <VCol cols="12">
                                <AppSelect
                                    v-model="form.empresa"
                                    :items="empresas"
                                    item-title="razonSocial"
                                    item-value="idEmpresa"
                                    label="Empresa"
                                    placeholder="Seleccione Empresa"
                                    :rules="[requiredValidator]"
                                    :error-messages="errors.empresa"
                                    @update:modelValue="handleSelectChange"
                                />
                            </VCol>

                            <!-- email -->
                            <VCol cols="12">
                                <AppSelect
                                    v-model="form.sucursal"
                                    :items="sucursales"
                                    item-title="nombre"
                                    item-value="idSucursal"
                                    label="Sucursal"
                                    placeholder="Seleccione Sucursal"
                                    :rules="[requiredValidator]"
                                    :error-messages="errors.sucursal"
                                />
                            </VCol>

                            <!-- email -->
                            <VCol cols="12">
                                <AppTextField
                                    v-model="form.usuario"
                                    autofocus
                                    label="Usuario"
                                    type="text"
                                    placeholder="Usuario"
                                    :rules="[requiredValidator]"
                                    :error-messages="errors.usuario"
                                />
                            </VCol>

                            <!-- password -->
                            <VCol cols="12">
                                <AppTextField
                                    v-model="form.clave"
                                    label="Password"
                                    placeholder="············"
                                    :type="isPasswordVisible ? 'text' : 'password'"
                                    :rules="[requiredValidator]"
                                    :error-messages="errors.clave"
                                    autocomplete="password"
                                    :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                                    @click:append-inner="isPasswordVisible = !isPasswordVisible"
                                />

                                <div class="d-flex align-center flex-wrap justify-space-between my-6"></div>

                                <VBtn
                                    block
                                    type="submit"
                                >
                                    Login
                                </VBtn>
                            </VCol>

                        </VRow>
                    </VForm>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<style lang="scss">
@use "@core-scss/template/pages/page-auth";
</style>
