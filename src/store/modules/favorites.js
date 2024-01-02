export default ({
	namespaced: true,
	state: {
		favoriteList: []
	},
	getters:{
		getFavoriteList: ({ favoriteList }) => favoriteList,
		getFavoriteListCompleted: (state, getters, rootstate, rootgetters) => {
			if (state.favoriteList.length) {
				let favorites = [];
				state.favoriteList.forEach(id => favorites.push(rootgetters['moto/getMotorcycleById'](id)));
				return favorites;
			} else return []
		},
	},
	mutations:{
		setFavoriteList(state, list) {
			state.favoriteList = list;
		},
		// addToFavorites(state, motorcycleId) {
		// 	state.favoriteList.push(motorcycleId);
		// },
		// removeFromFavorites(state, motorcycleId) {
		// 	state.favoriteList = state.favoriteList.filter(id => id !== motorcycleId);
		// 	console.log('after remove ', state.favoriteList)
		// }
	},
	actions: {
		setFavoriteList({ commit }, list){
			console.log('favor list: ', list)
			commit('setFavoriteList', list);
		},
		toggleIsFavorite({ dispatch, getters }, { userId, bikeId }) {
			const isIncludedInFavorList = getters.getFavoriteList.find(id => id == bikeId);
			console.log('isIncludedInFavorList', isIncludedInFavorList)
			if (!isIncludedInFavorList) {
				dispatch('users/updateUserFavoriteBikes', { userId, bikeId }, { root:true });
			} else {
				dispatch('users/removeUserFavoriteBike', { userId, bikeId }, { root: true })
			}
		},
		// removeFromFavorites({ commit }, motorcycleId) {
		// 	commit('removeFromFavorites', motorcycleId)
		// }
	}
})