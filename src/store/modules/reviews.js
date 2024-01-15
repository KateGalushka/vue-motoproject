import DbOperations from '../helpers/DbOperations';
import { maskEmail } from '../helpers/formattingHelper';
const collectionDB = new DbOperations('reviews');

export default {
	namespaced: true,
	state: () => ({
		reviewsList: [],
	}),

	getters: {
		getReviewsList: (state) => state.reviewsList,
		getReviewsListByBikeId: (state) => (bikeId) => {
			return state.reviewsList.filter(review => review.bikeId == bikeId)
		},
	},

	mutations: {
		setReviewsList(state, list){
			state.reviewsList = list;
		}
	},

	actions: {
		async addReview({ dispatch }, reviewData) {
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
				commit('setError', error, { root:true });
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
				commit('setError', error, { root: true });
			}
		},

		async getCompletedReviewsList({ state, dispatch, commit, rootGetters}) {
			let completedReviews = await Promise.all(
				state.reviewsList.map(async (review) => {
					let userName;
					try {
						const currentUser = await dispatch('users/loadUserById', review.author, { root: true });
						if (currentUser) {
							userName = currentUser.name || maskEmail(currentUser.email);
						}
					} catch (error) {
						commit('setError', error, { root:true });
					};
					const currentBike = rootGetters['moto/getMotorcycleById'](review.bikeId);
					return {
						id: review.id,
						bikeMake: currentBike.make,
						bikeModel: currentBike.model,
						date: new Date(review.date.seconds * 1000).toLocaleDateString(),
						author: userName,
						text: review.text,
						rating: review.rating
					};
				})
			);
			return completedReviews;
		},
	},
}
