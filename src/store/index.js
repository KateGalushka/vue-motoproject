import { createStore } from "vuex";
import moto from "./modules/moto";
import favorites from "./modules/favorites";
import auth from "./modules/auth";
import users from "./modules/users";
import storage from "./modules/storage";
import reviews from "./modules/reviews";

export default createStore({
  state: {
		loading: null,
		error: null
	
  },
  getters: {
	  isLoading: (state) => state.loading,
	  hasError: (state) => state.error,
		
  },
  mutations: {
	  setLoading(state, value) {
		  state.loading = value
	  },
	  setError(state, error) {
		  state.error = error
	  },
  },
  actions: {
		startLoading({commit}) {
			commit('setLoading', true)
			commit ('setError', null)
		},
		setError({ commit }, error) {
			commit('setError', error);
		},

		async generalApiOperation({commit, dispatch},{ operation, successCallback, errorCallBack }) {
			dispatch('startLoading')
			try {
				const res = await operation()
				if(successCallback) successCallback(res)
				return res
			} catch(error) {
				commit('setError', error)
				if (errorCallBack) errorCallBack(error)
			} finally {
				commit('setLoading', false)
			}
		}
	},
  modules: {
	moto,
	favorites,
	auth,
	users,
	storage,
	reviews
  },
});
