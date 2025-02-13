import { createApp } from 'vue';
import App from './App.vue';

import '@core-scss/template/index.scss'
import '@styles/styles.scss'

import { registerPlugins } from '@core/utils/plugins'

const app = createApp(App);

registerPlugins(app)

app.mount('#app');
