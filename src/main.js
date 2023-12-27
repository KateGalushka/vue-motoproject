import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import './assets/styles/style.scss'
import './assets/styles/resetMy.css'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})

const app = createApp(App);

// Check if user data exists in LocalStorage and update the store
const storedCredential = JSON.parse(localStorage.getItem('authCredential'));
if (storedCredential) {
	store.dispatch('auth/loginWithCredential', storedCredential)
		.then((loginResult) => {
			console.log('User authenticated:', loginResult);
		})
		.catch((error) => {
			console.error('Error while logging in with stored credential:', error);
		});
}

app.use(store).use(router).use(vuetify).use(i18n).mount("#app");
