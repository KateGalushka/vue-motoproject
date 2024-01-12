import DbOperations from '../helpers/DbOperations';
const collectionDB = new DbOperations('reviews');

export default {
	namespaced: true,
	state: () => ({
		reviewsList: [],
		loading: false,
		error: null,
	}),
	getters: {
		isLoading: (state) => state.loading,
		hasError: (state) => state.error,
		getReviewsList: (state) => state.reviewsList,
		getReviewsListByBikeId: (state) => (bikeId) => {
			return state.reviewsList.filter(review => review.bikeId == bikeId)

		}
		
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value
		},
		setError(state, error) {
			state.error = error
		},
		setReviewsList(state, list){
			state.reviewsList = list;
		}
	},
	actions: {
		async addReview({ dispatch }, reviewData) {
			console.log('reviewData: ', reviewData)
			await dispatch('generalApiOperation', {
				operation: () => collectionDB.addItem(reviewData)
			}, { root: true })
		},

		async updateReview({ dispatch }, { id, data }) {
			await dispatch('generalApiOperation', {
				operation: () => collectionDB.updateItem(id, data)
			}, { root: true })
		},
		async deleteReview({ dispatch }, id) {
			await dispatch('generalApiOperation', {
				operation: () => collectionDB.deleteItem(id)
			}, { root: true })
		},

		async loadReviewsList({ commit, dispatch }) {
			try {
				const result = await dispatch('generalApiOperation', {
					operation: () => collectionDB.loadItemsList()
				}, { root: true })
				if (result) {
					commit('setReviewsList', result)
				}
			}
			catch (error) {
				commit('setError', error);
			}
		},
		async loadReviewsListByMotorcycleId({ commit, dispatch }, bikeId) {
			try {
				const result = await dispatch('generalApiOperation', {
					operation: () => collectionDB.loadFilteredData("bikeId", "==", parseInt(bikeId))
				}, { root: true });
				if(result) {
					commit('setReviewsList', result)
				}
			} 
			catch(error) {
				commit('setError', error);
			}
			
		},


		



	},
}
