import DbOperations from '../helpers/DbOperations';
const collectionDB = new DbOperations('users');

export default {
    namespaced: true,
    state: () => ({
		  currentUser: {},
		  role: null,
    }),
    getters: {
        userRole: (state) => state.role,
    },
    mutations: {
        setUserRole(state, role) {
            state.role = role
        },
    },
    actions: {
		async loadUserById({dispatch}, userId) {
			 if (userId) {
				 this.currentUser = await dispatch('generalApiOperation', {
					 operation: () => collectionDB.getItemById(userId)
					}, { root:true });
					return this.currentUser;
				}
			},
		loadUserRole({ commit }, userId) {
			collectionDB.getItemById(userId).then((role) => {
				commit('setUserRole', role)
			})
		},
		clearUserRole({ commit }) {
			commit('setUserRole', null)
		},

		async addUser({dispatch}, userData) {
			this.currentUser = await dispatch('generalApiOperation', {
				operation: () => collectionDB.addItem(userData)
			}, { root:true })
		},

		async addUserWithCustomId({dispatch}, { id, data }) {
			const userObj = await dispatch('loadUserById', id)
				// console.log("after loading", userObj)
			if (!userObj?.email) {
				this.currentUser = await dispatch('generalApiOperation', {
					operation: () => collectionDB.addItemWithCustomId(id, data)
				}, { root: true })
			}
		},

		async loadUserFavoriteBikes({ dispatch }, userId) {
			const userObj = await dispatch('loadUserById', userId);
				//  console.log(userObj);
			if (userObj?.favoriteBikes?.length) {
			 	dispatch('favorites/setFavoriteList', userObj.favoriteBikes, { root: true });
			} else {
			 	dispatch('favorites/setFavoriteList', [], { root: true });
			}
		},

			async updateUserFavoriteBikes({ dispatch, commit }, {userId, bikeId}) {
				try {
					const result = await dispatch('generalApiOperation', {
					operation: () => collectionDB.addItemToArray(userId, 'favoriteBikes', bikeId)
				}, { root:true });
					if (result) {
						await dispatch('loadUserFavoriteBikes', userId)
					}
				} catch(error) {
					commit('setError', error, { root:true});
				}
			},
				
		 	async removeUserFavoriteBike({ dispatch, commit }, { userId, bikeId}) {
			// console.log('in users- removing, userId and bikeId', userId, bikeId)
				try {
					const result = await dispatch('generalApiOperation', {
						operation: () => collectionDB.removeItemFromArray(userId, 'favoriteBikes', bikeId)
					}, { root:true });
					if (result) {
						await dispatch('loadUserFavoriteBikes', userId)
					}
				} catch (error) {
					commit('setError', error, { root: true });
				}
			},
		},
}
