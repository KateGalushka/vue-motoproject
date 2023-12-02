import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'


const routes = [
  {
   	path: "/",
   	name: "home",
    	component: HomeView,
  },
  {
		path: "/guide",
		name: "guide",
		component: () =>
			import("../views/GuideView.vue"),
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

export default router;
