import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
   	path: "/",
   	name: "home",
    	component: HomeView,
		meta: {
			requireAuth: false,
		},
  },
  {
		path: "/guide",
		name: "guide",
		component: () => import("../views/GuideView.vue"),
	},
	{
		path: '/guide/details/:bikeId',
		name: 'bike-details',
		// props: true,
		component: () => import("../views/DetailsView.vue") 
	},
	{
		path: '/favorites',
		name: 'favorites',
		component: () => import("../views/FavoriteListView.vue")
	},
	{
		path: '/login',
		name: 'login',
		component: () => import("../views/LoginPage.vue")
	},
	{
		path: "/contacts",
		name: "contacts",
		component: () =>
			import("../views/ContactsView.vue"),
	},
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
	if (to.meta?.requireAuth) {
		let isAuthenticated = store.state.auth.user;

		if (!isAuthenticated) {
			isAuthenticated = await store.dispatch('auth/loginWithCredential')
		}

		if (!isAuthenticated)
			return {
				name: 'login'
			}
	}
})

export default router;
