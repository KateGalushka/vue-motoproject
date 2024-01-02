import DbOperations from '../helpers/DbOperations';
const collectionDB = new DbOperations('users');

export default {
    namespaced: true,
    state: () => ({
        permissions: {},
		  currentUser: {},

        loading: false,
        error: null,
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,
        userPermissions: (state) => state.permissions,
    },
    mutations: {
        setPermissions(state, permissions) {
            state.permissions = permissions
        },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
		 async loadUserById({dispatch}, userId) {
			 if (userId) {
				 this.currentUser = await dispatch('generalApiOperation', {
					 operation: () => collectionDB.getItemById(userId)
					}, { root:true })
					return this.currentUser
				}
			},
			
			loadUserPermissions({ commit }, userId) {
				collectionDB.getItemById(userId).then((permissions) => {
				  commit('setPermissions', permissions)
				})
			},
			clearPermissions({ commit }) {
				 commit('setPermissions', {})
			},

			async loadUserFavoriteBikes({ dispatch }, userId) {
				const userObj = await dispatch('loadUserById', userId);
				console.log(userObj)
				if (userObj?.favoriteBikes?.length) {
					dispatch('favorites/setFavoriteList', userObj.favoriteBikes, { root: true })
				} else {
					dispatch('favorites/setFavoriteList', [], { root: true })
				}
			},
			async addUser({dispatch}, userData) {
				this.currentUser = await dispatch('generalApiOperation', {
					operation: () => collectionDB.addItem(userData)
				}, { root:true })
			},

			async addUserWithCustomId({dispatch}, { id, data }) {
				const userObj = await dispatch('loadUserById', id)
				console.log("after loading", userObj)
				if (!userObj?.email) {
					this.currentUser = await dispatch('generalApiOperation', {
						operation: () => collectionDB.addItemWithCustomId(id, data)
					}, { root: true })
				}
			},

			async updateUser({dispatch}, { id, data }) {
				await dispatch('generalApiOperation', {
					operation: () => collectionDB.updateItem(id, data)
				}, { root:true })
				if (this.currentUser.email === data.email) {
					this.currentUser = data
				}
			},
			async updateUserFavoriteBikes({ dispatch }, {userId, bikeId}) {
				console.log('in users update: ', userId, bikeId)
				try {
					const result = await dispatch('generalApiOperation', {
					operation: () => collectionDB.addItemToArray(userId, 'favoriteBikes', bikeId)
				}, { root:true });
					if (result) {
						await dispatch('loadUserFavoriteBikes', userId)
					}
				} catch(error) {
					console.log('An error occurred:', error);
				}
			},
						
		
		 async removeUserFavoriteBike({ dispatch }, { userId, bikeId}) {
			console.log('in users- removing, userId and bikeId', userId, bikeId)
				try {
					const result = await dispatch('generalApiOperation', {
						operation: () => collectionDB.removeItemFromArray(userId, 'favoriteBikes', bikeId)
					}, { root:true });
					console.log('result', result)
					if (result) {
						console.log('success', userId)
						await dispatch('loadUserFavoriteBikes', userId)
					}
				} catch (error) {
					console.log('An error occurred:', error);
				}
			},
				
			

			async deleteUser({dispatch}, userData) {
				this.currentUser = await dispatch('generalApiOperation', {
					operation: () => collectionDB.deleteItem(userData)
			}, { root:true })
			}

    },
}
