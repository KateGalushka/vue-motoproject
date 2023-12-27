import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('users')
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
        loadUserPermissions({ commit }, userId) {
            // userId ??= rootGetters['bar/someGetter'].getUser.uid
            collectionDB.getItemById(userId).then((permissions) => {
					 commit('setPermissions', permissions)
            })
        },
        clearPermissions({ commit }) {
            commit('setPermissions', {})
        },

		  async loadUserById({dispatch}, userId) {
				if (userId) {
					this.currentUser = await dispatch('generalApiOperation', {
						operation: () => collectionDB.getItemById(userId)
					}, { root:true })
				return this.currentUser
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

			async deleteUser({dispatch}, userData) {
				this.currentUser = await dispatch('generalApiOperation', {
					operation: () => collectionDB.deleteItem(userData)
			}, { root:true })
			}

    },
}
