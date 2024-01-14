import { createRouter, createWebHistory } from "vue-router";
import store from '@/store'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
   	path: "/",
   	name: "home",
    	component: HomeView,
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/login',
		name: 'login',
		component: () => import("../views/LoginPage.vue"),
		meta: {
			requiresAuth: false,
		},
	},
  {
		path: "/guide",
		name: "guide",
		component: () => import("../views/GuideView.vue"),
		meta: {
			requiresAuth: false,
		},
	},
		
	{
		path: '/guide/details/:bikeId',
		name: 'bike-details',
		// props: true,
		component: () => import("../views/DetailsView.vue"),
		meta: {
			requiresAuth: false,
		}, 
	},
	{
		path: '/guide/reviews/:bikeId',
		name: 'bike-reviews',
		props: true,
		component: () => import("../views/ReviewsView.vue"),
		meta: {
			requiresAuth: false,
		},  
	},
	{
		path: '/favorites',
		name: 'favorites',
		component: () => import("../views/FavoriteListView.vue"),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: "/contacts",
		name: "contacts",
		component: () => import("../views/ContactsView.vue"),
		meta: {
			requiresAuth: false,
		},
	},
	{
		path: '/:path(.*)*',
		name: 'page-not-found',
		meta: {
			requireAuth: false,
		},
		component: () => import('../views/PageNotFound.vue')
	}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
	if (to.meta?.requiresAuth) {
		let isAuthenticated = store.state.auth.user;
		// if (!isAuthenticated) {
		// 	try {
		// 		isAuthenticated = await store.dispatch('auth/loginWithCredential')
		// 	} 
		// 	catch(error) {
		// 		console.log('not Authenticated', error)
		// 	}
		// }

		if (!isAuthenticated) {
			store.dispatch('auth/setIntendedRoute', to.name);
			return {
				name: 'login',
				query: { redirect: to.fullPath }
			}
		}
	}
})

export default router;
