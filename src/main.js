import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./plugins/i18n";
import './assets/styles/resetMy.scss'
import './assets/styles/style.scss'


// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives,
})

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

/* add icons to the library */
library.add(fas, far)


// Pagination
import VueAwesomePaginate from "vue-awesome-paginate";
import "vue-awesome-paginate/dist/style.css";

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
} else {
	const storedUser = localStorage.getItem('user');
	if (storedUser) {
		store.commit('auth/setUser', JSON.parse(storedUser))
	}
}

app.use(store).use(router).use(vuetify).use(i18n).use(VueAwesomePaginate).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
