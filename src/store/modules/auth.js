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
	},
	getters: {
		getUser: (state) => state.user,
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
	},
	actions: {
		async saveLoginUserData({ commit, dispatch }, loginResult) {
			const user = loginResult?.user; 
			commit('setUser', user);
			if (user) {
				localStorage.setItem('user', JSON.stringify(user));
			}
			// This gives you a Google Access Token. You can use it to access the Google API.
			let credential = GoogleAuthProvider.credentialFromResult(loginResult);
			localStorage.setItem('authCredential', JSON.stringify(credential));
			dispatch('users/loadUserRole', user.uid, { root: true });
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
								name: loginResult?.user?.displayName,
								role: 'authedUser',
								favoriteBikes: [],
							}
						}, {root:true})
						resolve(loginResult)
					})
					.catch((error) => {
						commit('setError', error, { root:true })
						reject(error)
					});
			})
		},

		async loginWithCredential({ commit, dispatch }) {
			return new Promise((resolve, reject) => {
				commit('setLoading', true, { root: true });
				commit('setError', null, { root: true });
				let credential = localStorage.getItem('authCredential');

				if (credential) {
					credential = JSON.parse(credential);
					const token = GoogleAuthProvider.credential(credential.idToken);

					signInWithCredential(auth, token)
						.then((loginResult) => {
							dispatch('saveLoginUserData', loginResult);
							resolve(loginResult);
						})
						.catch((error) => {
							commit('setError', error, { root: true });
							reject(false);
						})
						.finally(() => {
							commit('setLoading', false, { root: true })
						})
				} else resolve(false)
			})
		},

		signUpWithWithEmailAndPassword({ dispatch, commit }, { email, password }) {
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
								}
							}, { root: true })
							// console.log('register with email:', loginResult)
							resolve(loginResult)
						})
						.catch((error) => {
							commit('setError', error, { root: true });
							reject(error.message)
						})
				}
			})
		},
  		signInWithWithEmailAndPassword({ dispatch, commit }, { email, password }) {
			return new Promise((resolve, reject) => {
				if (!email || !password) reject(false)
				else {
					const auth = getAuth()
					signInWithEmailAndPassword(auth, email, password)
						.then((loginResult) => {
							dispatch('saveLoginUserData', loginResult)
							resolve(loginResult)
						})
						.catch((error) => {
							commit('setError', error, { root: true });
							reject(error)
						})
				}
			})
		},
		logout({ commit, dispatch }) {
			signOut(auth)
				.then(() => {
					localStorage.removeItem('authCredential');
					localStorage.removeItem('user');

					commit('setUser', null);
					dispatch('users/clearUserRole', null, { root: true });
					dispatch('favorites/setFavoriteList', [], { root: true });
				})
				.catch((error) => {
					commit('setError', error, { root:true})
				})
		},
	},
}
