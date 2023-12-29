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
		addToFavorites(state, motorcycleId) {
			state.favoriteList.push(motorcycleId);
		},
		removeFromFavorites(state, motorcycleId) {
			state.favoriteList = state.favoriteList.filter(id => id !== motorcycleId);
			console.log('after remove ', state.favoriteList)
		}
	},
	actions: {
		loadFavoriteList({ commit }, list){
			commit('setFavoriteList', list);
		},
		toggleIsFavorite({ commit, dispatch, getters }, motorcycleId) {
			const isIncludedInFavorList = getters.getFavoriteList.find(id => id == motorcycleId);
			if (!isIncludedInFavorList) {
				commit('addToFavorites', motorcycleId)
			} else {
				dispatch('removeFromFavorites', motorcycleId)
			}
		},
		removeFromFavorites({ commit }, motorcycleId) {
			commit('removeFromFavorites', motorcycleId)
		}
	}
})