import { auth } from '@/firebase-config.js'
import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithCredential,
	signOut,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from 'firebase/auth'

export default {
	namespaced: true,
	state: {
		user: null,
		loading: false,
		error: null,
		intendedRoute: null
	},
	getters: {
		getUser: (state) => state.user,
		getIntendedRoute: (state) => state.intendedRoute
	},
	mutations: {
		setUser(state, user) {
			state.user = user
		},
		setLoading(state, loading) {
			state.loading = loading
		},
		setError(state, error) {
			state.error = error
		},
		setIntendedRoute(state, route) {
			state.intendedRoute = route;
		},
	},
	actions: {
		setIntendedRoute({ commit }, route) {
			commit('setIntendedRoute', route)

		},
		async saveLoginUserData({ commit, dispatch }, loginResult) {
			// console.log('loginResult', loginResult)
			//--------- user data -------
			const user = loginResult?.user // об'єкт користувача
			commit('setUser', user)
			
			//--------- user access token -------
			// This gives you a Google Access Token. You can use it to access the Google API.
			let credential = GoogleAuthProvider.credentialFromResult(loginResult)
			console.log('credential: ', credential)

			localStorage.setItem('authCredential', JSON.stringify(credential)),

			dispatch('users/loadUserPermissions', user.uid, { root: true })
		},

		loginWithGoogle({ commit, dispatch }) {
			return new Promise((resolve, reject) => {
				const provider = new GoogleAuthProvider()
				signInWithPopup(auth, provider)
					.then((loginResult) => {
						dispatch('saveLoginUserData', loginResult)
						dispatch('users/addUserWithCustomId', {
							id: loginResult?.user?.uid,
							data: {
								email: loginResult?.user?.email,
								role: 'authedUser',
								favoriteBikes: [],
								reviews: []
							}
						}, {root:true})
						console.log('loginResult: ',loginResult)
						resolve(loginResult)
					})
					.catch((error) => {
						commit('setError', error)
						reject(error)
					});
			})
		},

		async loginWithCredential({ commit, dispatch }) {
			return new Promise((resolve, reject) => {
				commit('setLoading', true);
				commit('setError' , null);
				let credential = localStorage.getItem('authCredential')

				if (credential) {
					credential = JSON.parse(credential);
					const token = GoogleAuthProvider.credential(credential.idToken)

					signInWithCredential(auth, token)
						.then((loginResult) => {
							dispatch('saveLoginUserData', loginResult);
							resolve(loginResult);
						})
						.catch((error) => {
							console.log(error);
							commit('setError', error);
							reject(false);
						})
						.finally(() => {
							commit('setLoading', false)
						})
				} else resolve(false)
			})
		},

		signUpWithWithEmailAndPassword({ dispatch }, { email, password }) {
			return new Promise((resolve, reject) => {
				if (!email || !password) reject(false)
				else {
					const auth = getAuth()
					
					createUserWithEmailAndPassword(auth, email, password)
						.then((loginResult) => {
							dispatch('saveLoginUserData', loginResult)
							dispatch('users/addUserWithCustomId', {
								id: loginResult?.user?.uid,
								data: {
									email: loginResult?.user?.email,
									role: 'authedUser',
									favoriteBikes: [],
									reviews: []
								}
							}, { root: true })
							console.log('register with email:', loginResult)
							resolve(loginResult)
						})
						.catch((error) => {
							reject(error.message)
							// const errorCode = error.code;
							// const errorMessage = error.message;
						})
				}
			})
		},
  		signInWithWithEmailAndPassword({dispatch}, { email, password }) {
			return new Promise((resolve, reject) => {
				if (!email || !password) reject(false)
				else {
					const auth = getAuth()
					signInWithEmailAndPassword(auth, email, password)
						.then((loginResult) => {
							dispatch('saveLoginUserData', loginResult)
							// dispatch('users/addUserWithCustomId', {
							// 	id: loginResult?.user?.uid,
							// 	data: {
							// 		email: loginResult?.user?.email,
							// 		role: 'authedUser'
							// 	}
							// }, { root: true })
							console.log('loginResult after signIn', loginResult)
							resolve(loginResult)
						})
						.catch((error) => {
							reject(error)
							// const errorCode = error.code;
							// const errorMessage = error.message;
						})
				}
			})
		},
		logout({ commit, dispatch }) {
			signOut(auth)
				.then(() => {
					localStorage.removeItem('authCredential')
					commit('setUser', null);
					dispatch('users/clearPermissions', null, { root: true })
				})
				.catch((error) => {
					commit('setError', error)
				})
		},
	},
}
